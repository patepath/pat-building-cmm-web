import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Department, DepartmentService } from 'src/app/services/department.service';
import { Equipment, EquipmentService } from 'src/app/services/equipment.service';
import { Group, GroupService } from 'src/app/services/group.service';
import { Issue, IssueService } from 'src/app/services/issue.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/services/user.service';
import { PartProfile, PartProfileService } from 'src/app/services/part-profile.service';
import { Part, PartService } from 'src/app/services/part.service';
import { Category, CategoryService } from 'src/app/services/category.service';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare let $:any;

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.css']
})
export class EditIssueComponent implements OnInit, AfterViewInit {

    public dataTable: DataTable = <DataTable>{};
    public data: string[][] = [];

    public issues: Issue[] = [];
    public issue: Issue = <Issue>{};

    public depts: Department[] = [];
    public dept: Department = <Department>{};
    public deptRef: number = 0;

    public groups: Group[] = [];
    public group: Group = <Group>{};
    public groupRef: number = 0;

    public equipments: Equipment[] = [];
    public equipment: Equipment = <Equipment>{};
    public equipmentRef: number = 0;

    public categories: Category[] = [];
    public category: Category = <Category>{};
    public categoryRef: number = 0;

    public partProfiles: PartProfile[] = [];
    public partProfile: PartProfile = <PartProfile>{};
    public partProfileRef: number = 0;

    public parts: Part[] = [];
    public part: Part = <Part>{};
    public partRef: number = 0;
    public partInx: number = 0;

    public techs: User[] = [];
    public techRef: number = 0;

    public satisfy: number = 0;

    constructor(
      private readonly _activeRoute: ActivatedRoute,
      private readonly _router: Router,
      private readonly _issueServ: IssueService,
      private readonly _deptServ: DepartmentService,
      private readonly _groupServ: GroupService,
      private readonly _equipmentServ: EquipmentService,
      private readonly _categoryServ: CategoryService,
      private readonly _partProfileServ: PartProfileService,
      private readonly _partServ: PartService,
      private readonly _techServ: UserService) {

      this.dataTable = {
        headerRow: ['รหัส', 'อะไหล่', 'จำนวน', 'หน่วย'],
        footerRow: ['รหัส', 'อะไหล่', 'จำนวน', 'หน่วย'],
        dataRows: [],
      };

      this.data = [];

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

      this._techServ.findAllTech().subscribe(s => {
        if(s) {
          this.techs = s;
        }
      });

      this.issue = <Issue>{};
      this.issue.id = 0;
    }

    ngOnInit(): void {
      this._activeRoute.params.subscribe(parms => {
        if(parms) {
          this._issueServ.findOne(parms['id']).subscribe(s => {
            if(s) {
              this.issue = s;
              this.deptRef = this.issue.department == undefined ? 0 : this.issue.department.id;
              this.categoryRef = this.issue.category == undefined ? 0 : this.issue.category.id;
              this.groupRef = this.issue.equipment?.group == undefined ? 0 : this.issue.equipment.group?.id;
              this.techRef = this.issue.tech == undefined ? 0 : this.issue.tech.id;

              this._equipmentServ.findByGroup(this.groupRef).subscribe(e => {
                if(e) {
                  this.equipments = e;
                  this.equipmentRef = this.issue.equipment == undefined ? 0 : this.issue.equipment.id;

                  this._partProfileServ.findByEquipment(this.equipmentRef).subscribe(p => {
                    if(p) {
                      this.partProfiles = p;
                    }
                  });
                }
              });
            }
          });
        }
      });
    }

    ngAfterViewInit(): void {
      this.initTable();

      this._partServ.findByIssue(this.issue.id).subscribe(s => {
        if(s) {
          this.parts = s;
          this.refreshTable();
        }
      });
    }

    initTable() {
      let self = this;

      let table = $('#parts-table').DataTable({
        dom: 'Bfrtip',
        buttons: [ {
            text: 'เปลี่ยนอะไหล่',
            action: function ( e: any, dt: any, node: any, config: any ) {
              self.addParts();
            }
        }],
        columnDefs: [
          { target: [0, 2, 3], width: '10em', className: 'text-center' },
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
        var inx = table.row(this).index()
        self.editParts(self.parts[inx], inx)
      });
    }

    refreshTable() {
      let table = $('#parts-table').DataTable();
      table.clear();
      this.data = [];

      if(this.parts) {
        this.parts.forEach(s => {
          this.data.push([
            s.code,
            s.name,
            String(s.qty),
            s.unit,
          ]);
        });

        table.rows.add(this.data);
      }
      
      table.draw();
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

    markComplete() {
      this.issue.status = 3;
      this.issue.lastModifiedDate = new Date();
      this.issue.finishedDate = new Date();

      this._issueServ.save(this.issue).subscribe(s => {
        if(s) {
          history.back();
        }
      });
    }

    markCancel() {
      this.issue.status = 0;
      this.issue.lastModifiedDate = new Date();
      this.issue.finishedDate = new Date();

      this._issueServ.save(this.issue).subscribe(s => {
        if(s) {
          history.back();
        }
      });
    }

    save() {
      this.issue.department = this.depts.find(s => s.id === this.deptRef)
      this.issue.equipment = this.equipments.find(s => s.id === this.equipmentRef);
      this.issue.category = this.categories.find(s => s.id === this.categoryRef);
      this.issue.tech = this.techs.find(s => s.id === this.techRef);
      this.issue.status = 1;
      this.issue.lastModifiedDate = new Date();
      this.issue.finishedDate = new Date('0000-00-00 00:00:00');

      this._partServ.deleteByIssue(this.issue.id).subscribe(r => {
        this.parts.forEach(s => {
          this._partServ.save(s).subscribe(r => {});       
        });
      });

      this._issueServ.save(this.issue).subscribe(s => {
        if(s) {
          history.back();
        }
      });
    }

    changeParts() {
      var value = this.partProfiles.find(s => s.id === this.partProfileRef);

      if(value) {
        this.partProfile = value;
      } else {
        this.partProfile = <PartProfile>{};
      }
    }

    addParts() {
      this.partProfile = <PartProfile>{};
      this.partProfileRef = 0;
      this.part = <Part>{};
      this.partRef = 0;
      this.partInx = -1;

      $('#parts-modal').modal('show');
    }

    editParts(part: Part, inx: number) {
      this.part = part;
      this.partInx = inx;

      $('#parts-modal').modal('show');
    }

    saveParts() {
      if(this.partInx < 0) {
        this.parts.push(this.part);
      } else {
        this.parts[this.partInx] = this.part;
      }

      this.refreshTable();
      this.closeParts();
    }

    delParts() {
      if(confirm('ต้องการลบอะไหล่ใช่หรือไม่?')) {
        this.parts.splice(this.partInx, 1);
        this.refreshTable();
        this.closeParts();
      } 
    }

    closeParts() {
      $('#parts-modal').modal('hide');
    }
}
