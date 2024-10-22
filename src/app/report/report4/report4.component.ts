import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { Report4, Report4Service } from 'src/app/services/report4.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare let $:any;

@Component({
  selector: 'app-report4',
  templateUrl: './report4.component.html',
  styleUrls: ['./report4.component.css']
})
export class Report4Component implements OnInit, AfterViewInit {

  public dataTable: DataTable = <DataTable>{};
  public data: string[][] = [];

  public reports: Report4[] = [];
  public report: Report4 = <Report4>{};

  public frmDate: string = new Date().toISOString().split('T')[0];
  public toDate: string = new Date().toISOString().split('T')[0];
  

  constructor(
    private readonly _report: Report4Service,
    private readonly _router: Router) { 

    this.dataTable = {
      headerRow: ['สถานะ', 'จำนวน' ],
      footerRow: ['สถานะ', 'จำนวน' ],
      dataRows: [],
    };
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initTable();
  }

  initTable() {
    let self = this;

    let table = $('#report4-table').DataTable({
      dom: 'Bfrtip',
      buttons: ['copy', 'csv', 'excel', 'print'],
      columnDefs: [
        { target: [-1], width: '10em', className: 'text-center' },
      ],
      ordering: false,
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      },
      paging: false,
    });

    table.on('mouseover', 'tr', function(this: any) {
      $(this).css('cursor', 'pointer');
      $(this).css('font-weight', 'bold');
    });

    table.on('mouseout', 'tr', function(this: any) {
      $(this).css('font-weight', 'normal');
    });
  }

  refreshTable() {
    let table = $('#report4-table').DataTable();
    table.clear();
    this.data = [];

    if(this.reports) {
      var status='';

      this.reports.forEach(s => {
        switch(Number(s.status)) {
          case 0:
            status = 'ยกเลิก';
            break;

          case 1:
            status = 'ระหว่างดำเนินการ';
            break;

          case 2:
            status = 'รอปิดงาน';
            break;

          default:
            status = 'ปิดงาน'
        }       

        this.data.push([
          status,
          String(s.total)
        ]);
      });
    }

    table.rows.add(this.data);
    table.draw();

    var chartdiv = <HTMLDivElement>document.getElementById('chart');
    var chartarea = <HTMLCanvasElement>document.createElement("canvas");
    chartdiv.replaceChildren(chartarea);

    new Chart(
      chartarea,
      {
        type: 'pie',
        data: {
          labels: this.reports.map(row => {
            switch(Number(row.status)) {
              case 0:
                return 'ยกเลิก';
                break;

              case 1:
                return 'ระหว่างดำเนินการ';
                break;

              case 2:
                return 'รอปิดงาน';
                break;

              default:
                return 'ปิดงาน';
            }
          }),
          datasets: [
            {
              label: 'รวม',
              data: this.reports.map(row => row.total)
            }
          ]
        }
      }
    );
  }

  generate() {
    this._report.generage(this.frmDate, this.toDate).subscribe(s => {
      this.reports = s;
      this.refreshTable();
    });
  }
}
