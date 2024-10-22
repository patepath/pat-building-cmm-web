import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Issue, IssueService } from 'src/app/services/issue.service';
import { Application } from 'src/app/services/application.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare let $:any;

@Component({
  selector: 'app-admin-completed',
  templateUrl: './admin-completed.component.html',
  styleUrls: ['./admin-completed.component.css']
})
export class AdminCompletedComponent implements OnInit, AfterViewInit {

    public dataTable: DataTable = <DataTable>{};
    public data: string[][] = [];

    public issues: Issue[] = [];
    public issue: Issue = <Issue>{};

    public today: Date = new Date();
    public start: Date = new Date();
    public frmDate: string;
    public toDate: string

    public application: Application=<Application>{};

    constructor(
      private readonly _issueServ: IssueService, 
      private readonly _router: Router) { 

      this.dataTable = {
        headerRow: ['วันที่รับเรื่อง', 'วันที่เสร็จ', 'เลขที่รับเรื่อง', 'ผู้แจ้ง', 'อาคาร', 'ชั้น', 'ที่อยู่', 'อุปกรณ์', 'อาการ', 'การแก้ไข', 'ผู้รับผิดชอบ' ],
        footerRow: ['วันที่รับเรื่อง', 'วันที่เสร็จ', 'เลขที่รับเรื่อง', 'ผู้แจ้ง', 'อาคาร', 'ชั้น', 'ที่อยู่', 'อุปกรณ์', 'อาการ', 'การแก้ไข', 'ผู้รับผิดชอบ' ],
        dataRows: [],
      };

      this.start.setMonth(this.today.getMonth() - 3);

      this.frmDate = this.start.toISOString().split('T')[0];
      this.toDate = this.today.toISOString().split('T')[0];
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
      this.initTable();
      this.generate();
    }

    initTable() {
      let self = this;

      let table = $('#admin-completed-table').DataTable({
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', { 
          extend: 'print',
          title: '',
          messageTop:     function() {
                            return `
                            <div>เรียน หบค./ชบค.</div>
                            <div>เรื่อง แจ้งผลการรับแจ้งและผลการตรวจซ่อมที่แล้วเสร็จ<div>
                            <div style="margin-top: 1em; margin-left: 4em">ประจำวันที่ ${self.getToday().getDate()}/${self.getToday().getMonth() + 1}/${self.getToday().getFullYear()+543} ดังนี้</div>
                            <p>
                            `
                          },
          messageBottom:  function() {
                            return `
                            <div style="margin-top: 4em; text-align: center">
                              <div>จึงเรียนมาเพื่อโปรดทราบ</div>
                              <div style="margin-top: 3em">(.........................................)</div>
                              <div>ช่างเทคนิค 4</div>
                              <div>.........../.........../...........</div>
                            </div>`
                          }
        }],
        columnDefs: [
          { target: [0, 1, 3], width: '6em', className: 'text-center' },
          { target: [2], width: '8em', className: 'text-center' },
          { target: [4,5,6], width: '6em' },
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

      table.on('mouseover', 'tr', function(this: any) {
        $(this).css('cursor', 'pointer');
        $(this).css('font-weight', 'bold');
      });

      table.on('mouseout', 'tr', function(this: any) {
        $(this).css('font-weight', 'normal');
      });

      table.on('click', 'td', function(this: any) {
        let $tr = $(this).closest('tr');
        self.issue = self.issues[table.row($tr).index()];
        self._router.navigate(['admin/edit-issue', { id: self.issue.id }]);
      });
    }

    refreshTable() {
      let table = $('#admin-completed-table').DataTable();
      table.clear();
      this.data = [];

      if(this.issues) {
        this.issues.forEach(s => {
          var created = new Date(String(s.created));
          var cyear = created.getFullYear()+543;
          var cmonth = created.getMonth() + 1;
          var cdate = created.getDate();

          var finishdate = new Date(String(s.finishedDate));
          var year = finishdate.getFullYear()+543;
          var month = finishdate.getMonth() + 1;
          var date = finishdate.getDate();

          this.data.push([
            `${cyear}-${cmonth}-${cdate}`,
            `${year}-${month}-${date}`,
            s.code,
            s.caller,
            s.building == undefined ? '': s.building,
            s.floor == undefined ? '' : s.floor,
            s.location == undefined ? '' : s.location,
            s.equipment == undefined ? '' : s.equipment.name,
            s.description,
            s.solution,
            s.techname == undefined ? '' : s.techname
          ]);
        });
      }

      table.rows.add(this.data);
      table.draw();
    }

    search() {
      let value = localStorage.getItem('application');
      this.application = value === null ? <Application>{} : JSON.parse(value);

      this._issueServ.findCompleted(this.application.currentIssueType).subscribe(s => {
        this.issues = s;
        this.refreshTable();
      });
    }

    generate() {
      let value = localStorage.getItem('application');
      this.application = value === null ? <Application>{} : JSON.parse(value);

      this._issueServ.findCompletedByDate(this.application.currentIssueType, this.frmDate, this.toDate).subscribe(s => {
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

    getToday() {
      let today = new Date()
      return today;
    }
}
