import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService, Issue } from '../../services/issue.service';
import { Department, DepartmentService } from 'src/app/services/department.service';
import { Group, GroupService } from 'src/app/services/group.service';
import { Equipment, EquipmentService } from 'src/app/services/equipment.service';
import { Category, CategoryService } from 'src/app/services/category.service';
import { Application } from 'src/app/services/application.service';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare let $:any;

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css']
})
export class NewIssueComponent implements OnInit {

	public dataTable!: DataTable;
	public data!: string[][];

	public issues!: Issue[];
	public issue!: Issue;

	public issueNo!: string;
	public issueBy!: string;
	public location!: string;
	public issueDescription!: string;

	public phones: String[]=[];
	public currPhone: String='';

	public depts: Department[] = [];
	public deptRef: number = 0;

	public groups: Group[] = [];
	public groupRef: number = 0;

	public categories: Category[] = [];
	public category: Category = <Category>{};
	public categoryRef: number = 0;

	public equipments: Equipment[] = [];
	public equipmentRef: number = 0;

	public application: Application=<Application>{};

	constructor(
		private readonly router: Router,
		private readonly _issueServ: IssueService,
		private readonly _deptServ: DepartmentService,
		private readonly _groupServ: GroupService,
		private readonly _categoryServ: CategoryService,
		private readonly _equipmentServ: EquipmentService) { 
		
		this._deptServ.finAll().subscribe(s => {
			if(s) {
				this.depts = s;
			}
		});

		this._groupServ.findAll().subscribe(s => {
			if(s) {
				this.groups = s;
			}
		});

		this._categoryServ.findAll().subscribe(s => {
			if(s) {
				this.categories = s;
			}
		});

		this.newIssue();
	}

	ngOnInit(): void {
		this.dataTable = {
			headerRow: ['วันที่', 'เลขที่รับเรื่อง', 'ประเภทงาน', 'อุปกรณ์', 'ชื่อผู้แจ้ง', 'โทรศัพท์ติดต่อ' ],
			footerRow: ['วันที่', 'เลขที่รับเรื่อง', 'ประเภทงาน', 'อุปกรณ์', 'ชื่อผู้แจ้ง', 'โทรศัพท์ติดต่อ' ],
			dataRows: [],
		};

		this.data = [];
	}

	ngAfterViewInit(): void {
		this.initTable();
		this.search();
	}

	initTable() {
		let self = this;

		let table = $('#new-issue-table').DataTable({
			dom: 'frtip',
			buttons: ['copy', 'csv', 'excel', 'print'],
			columnDefs: [
				{ target: [0], width: '10em', className: 'text-center' },
				{ target: [1], width: '8em', className: 'text-center' },
				{ target: [-1], width: '8em' },
				{ target: [2], width: '15em' },
			],
			responsive: true,
			language: {
				search: "_INPUT_",
				searchPlaceholder: "Search records",
			},
			paging: true,
			pageLength: 5,
			pagingType: "full_numbers",
		});

		table.on('mouseover', 'tr', function(this: any) {
			$(this).css('cursor', 'pointer');
			$(this).css('font-weight', 'bold');
		});

		table.on('mouseout', 'tr', function(this: any) {
			$(this).css('font-weight', 'normal');
		});

		table.on('click', 'td', function(this: any) {
			self.editIssue(table.row(this).index());
		});
	}

	refreshTable() {
		let table = $('#new-issue-table').DataTable();
		table.clear();
		this.data = [];

		if(this.issues) {
			this.issues.forEach(s => {
				var created = new Date(String(s.created));

				this.data.push([
					created.toLocaleDateString(), 
					s.code,
					s.equipment?.group == undefined ? '' : s.equipment.group.name,
					s.equipment == undefined ? '' : s.equipment.name,
					s.caller, 
					s.phoneno,
				]);
			});

			table.rows.add(this.data);
		}

		table.draw();
	}

	search() {
		this.issues = [];
		let value = localStorage.getItem('application');	
		this.application = value === null ? <Application>{} : JSON.parse(value);

		this._issueServ.findProceeding(this.application.currentIssueType).subscribe(s => {
			if(s) {
				this.issues=s;
			}

			this.refreshTable();
		});
	}

	newIssue() {
		let value = localStorage.getItem('application');	
		this.application = value === null ? <Application>{} : JSON.parse(value);

		this.issue = <Issue> {};
		this.issue.id = 0;

		if(this.application.currentIssueType === 1 || this.application.currentIssueType ===2) {
			this.issue.type = this.application.currentIssueType;
		} else {
			this.issue.type = 1;
		}

		this.issue.created = new Date();
		this.issue.code = '';
	}

	editIssue(inx: number) {
		this.issue = this.issues[inx];

		this.deptRef = this.issue.department == undefined ? 0 : this.issue.department.id;
		this.groupRef = this.issue.equipment?.group == undefined ? 0 : this.issue.equipment.group.id;

		this.equipmentRef = this.issue.equipment == undefined ? 0 : this.issue.equipment.id;
		this.equipments = [];

		this.categoryRef = this.issue.category == undefined ? 0 : this.issue.category.id;

		this._equipmentServ.findByGroup(this.groupRef).subscribe(s => {
			if(s) {
				this.equipments = s;
			}
		});
	}

	changeGroup() {
		this.equipmentRef = 0;

		if(this.groupRef > 0) {
			this._equipmentServ.findByGroup(this.groupRef).subscribe(s => {
				if(s) {
					this.equipments=s;
				}
			});

		} else {
			this.equipments = [];
		}
	}

	save() {
		let value = localStorage.getItem('application');	
		this.application = value === null ? <Application>{} : JSON.parse(value);
		this.issue.type = this.application.currentIssueType;

		this.issue.department = this.depts.find(s => s.id === this.deptRef)
		this.issue.equipment = this.equipments.find(s => s.id === this.equipmentRef);
		this.issue.category = this.categories.find(s => s.id == this.categoryRef);
		this.issue.building = this.issue.building == undefined ? '' : this.issue.building;
		this.issue.floor = this.issue.floor == undefined ? '' : this.issue.floor;
		this.issue.status = 1;
		
		if(this.issue.id == 0) {
			this.issue.created = new Date();
		}

		this._issueServ.save(this.issue).subscribe(s => {
			if(s) {
				this.newIssue();
				this.search();
			}
		});
	}

	print() {
		this.save();
		
		let created = new Date(this.issue.created);
		let type = this.issue.type == 1 ? 'แจ้งซ่อม' : 'ซ่อมบำรุง';

	    const url = this.router.serializeUrl(this.router.createUrlTree(
	      ['/page/prn-issue'], 
	      { 
	        queryParams: {
				created: created.getDate() + '/' + (created.getMonth() + 1) + '/' + created.getFullYear(),
				time: created.getHours() + ":" + created.getMinutes() + ":" + created.getSeconds(),
				code: this.issue.code,
				type: type,
				group: this.groups.find(s => s.id === this.groupRef)?.code,
				category: this.issue.category?.code,
				caller: `${this.issue.caller} อาคาร: ${this.issue.building} ชั้น: ${this.issue.floor}`,
				phoneno: this.issue.phoneno,
				department: this.issue.department?.name,
				location: this.issue.location,
				description: this.issue.description,
	        } 
	      }
	    ));

	    window.open(url, '_blank');
	}

}
