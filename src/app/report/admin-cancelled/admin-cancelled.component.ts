import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Issue, IssueService } from 'src/app/services/issue.service';
import { Application } from 'src/app/services/application.service';
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare let $:any;

@Component({
  selector: 'app-admin-cancelled',
  templateUrl: './admin-cancelled.component.html',
  styleUrls: ['./admin-cancelled.component.css']
})
export class AdminCancelledComponent implements OnInit, AfterViewInit {

    public dataTable: DataTable = <DataTable>{};
    public data: string[][] = [];

    public issues: Issue[] = [];
    public issue: Issue = <Issue>{};

    public frmDate: string = new Date().toISOString().split('T')[0];
    public toDate: string = new Date().toISOString().split('T')[0];

    public application: Application=<Application>{};

    constructor(private readonly _issueServ: IssueService) { 
      this.dataTable = {
        headerRow: ['วันที่', 'เลขที่รับเรื่อง', 'ผู้แจ้ง', 'อาคาร', 'ชั้น', 'ที่อยู่', 'อุปกรณ์', 'อาการเสีย' ],
        footerRow: ['วันที่', 'เลขที่รับเรื่อง', 'ผู้แจ้ง', 'อาคาร', 'ชั้น', 'ที่อยู่', 'อุปกรณ์', 'อาการเสีย' ],
        dataRows: [],
      };
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
      this.initTable();
      this.search();
    }

    initTable() {
      let self = this;

      let table = $('#admin-cancelled-table').DataTable({
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'print'],
        columnDefs: [
          { target: [1], width: '10em', className: 'text-center' },
          { target: [0, 2], width: '8em', className: 'text-center' },
          { target: [3, 4, 5], width: '6em' },
        ],
        responsive: true,
        language: {
          search: "_INPUT_",
          searchPlaceholder: "Search records",
        },
        paging: true,
        pageLength: 15,
        pagingType: "full_numbers",
      });

//      table.on('mouseover', 'tr', function(this: any) {
//        $(this).css('cursor', 'pointer');
//        $(this).css('font-weight', 'bold');
//      });
//
//      table.on('mouseout', 'tr', function(this: any) {
//        $(this).css('font-weight', 'normal');
//      });
//
//      table.on('click', 'td', function(this: any) {
//        let $tr = $(this).closest('tr');
//        self.issue = self.issues[table.row($tr).index()];
//        $('#department-modal').modal('show');
//      });
    }

    refreshTable() {
      let table = $('#admin-cancelled-table').DataTable();
      table.clear();
      this.data = [];

      if(this.issues) {
        this.issues.forEach(s => {
          var created = new Date(String(s.created));
          var year = created.getFullYear()+543;
          var month = created.getMonth() + 1;
          var date = created.getDate();

          this.data.push([
            `${year}-${month}-${date}`,
            s.code,
            s.building == undefined ? '' : String(s.building),
            s.floor == undefined ? '' : s.floor,
            s.location == undefined ? '' : s.location,
            s.equipment == undefined ? '' : s.equipment.name,
            s.caller,
            s.phoneno,
          ]);
        });
      }

      table.rows.add(this.data);
      table.draw();
    }

    search() {
      let value = localStorage.getItem('application');
      this.application = value === null ? <Application>{} : JSON.parse(value);

      this._issueServ.findCancelled(this.application.currentIssueType).subscribe(s => {
        this.issues = s;
        this.refreshTable();
      });
    }

    generate() {
      let value = localStorage.getItem('application');
      this.application = value === null ? <Application>{} : JSON.parse(value);

      this._issueServ.findCancelledByDate(this.application.currentIssueType, this.frmDate, this.toDate).subscribe(s => {
        this.issues = s;
        this.refreshTable();
      });
    }

    insert() {
//      this.dept = <Department>{};
//      this.dept.id = 0;
//
//      $('#department-modal').modal('show');
    }

    save() {
//      this.deptServ.save(this.dept).subscribe(s => {
//        if(s) {
//          this.search();
//          this.close();
//        }
//      });
    }

    close() {
      $('#issue-modal').modal('hide');
    }
}
