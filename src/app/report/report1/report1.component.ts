import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { Report1, Report1Service } from 'src/app/services/report1.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare let $:any;

@Component({
  selector: 'app-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.css']
})
export class Report1Component implements OnInit, AfterViewInit {
  public dataTable: DataTable = <DataTable>{};
  public data: string[][] = [];

  public reports: Report1[] = [];
  public report: Report1 = <Report1>{};

  public frmDate: string = new Date().toISOString().split('T')[0];
  public toDate: string = new Date().toISOString().split('T')[0];
  

  constructor(
    private readonly _report: Report1Service,
    private readonly _router: Router) { 

    this.dataTable = {
      headerRow: ['ประเภทงาน', 'จำนวน' ],
      footerRow: ['ประเภทงาน', 'จำนวน' ],
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

    let table = $('#report1-table').DataTable({
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
    let table = $('#report1-table').DataTable();
    table.clear();
    this.data = [];

    if(this.reports) {

      this.reports.forEach(s => {
        var type = '';

        switch(Number(s.type)) {
          case 0:
            type = '- ไม่ระบุ -'
            break;

          case 1:
            type = 'แจ้งซ่อม'
            break;

          default:
            type = 'ซ่อมบำรุง'
        }

        this.data.push([
          type,
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
          labels: this.reports.map(row => row.type == 0 ? '- ไม่ระบุ -' : row.type == 1 ? 'แจ้งซ่อม' : 'ซ่อมบำรุง'),
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
