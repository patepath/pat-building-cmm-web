import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { Report2, Report2Service } from 'src/app/services/report2.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare let $:any;
@Component({
  selector: 'app-report2',
  templateUrl: './report2.component.html',
  styleUrls: ['./report2.component.css']
})
export class Report2Component implements OnInit, AfterViewInit {

  public dataTable: DataTable = <DataTable>{};
  public data: string[][] = [];

  public reports: Report2[] = [];
  public report: Report2 = <Report2>{};

  public frmDate: string = new Date().toISOString().split('T')[0];
  public toDate: string = new Date().toISOString().split('T')[0];
  

  constructor(
    private readonly _report: Report2Service,
    private readonly _router: Router) { 

    this.dataTable = {
      headerRow: ['หน่วยงาน', 'จำนวน' ],
      footerRow: ['หน่วยงาน', 'จำนวน' ],
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

    let table = $('#report2-table').DataTable({
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
    let table = $('#report2-table').DataTable();
    table.clear();
    this.data = [];

    if(this.reports) {

      this.reports.forEach(s => {
        this.data.push([
          s.deptname,
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
          labels: this.reports.map(row => row.deptname),
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
