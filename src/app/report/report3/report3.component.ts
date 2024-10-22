import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { Report3, Report3Service } from 'src/app/services/report3.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare let $:any;

@Component({
  selector: 'app-report3',
  templateUrl: './report3.component.html',
  styleUrls: ['./report3.component.css']
})
export class Report3Component implements OnInit, AfterViewInit {

  public dataTable: DataTable = <DataTable>{};
  public data: string[][] = [];

  public reports: Report3[] = [];
  public report: Report3 = <Report3>{};

  public frmDate: string = new Date().toISOString().split('T')[0];
  public toDate: string = new Date().toISOString().split('T')[0];
  

  constructor(
    private readonly _report: Report3Service,
    private readonly _router: Router) { 

    this.dataTable = {
      headerRow: ['หมวด', 'จำนวน' ],
      footerRow: ['หมวด', 'จำนวน' ],
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

    let table = $('#report3-table').DataTable({
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
    let table = $('#report3-table').DataTable();
    table.clear();
    this.data = [];

    if(this.reports) {

      this.reports.forEach(s => {
        this.data.push([
          s.groupname,
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
          labels: this.reports.map(row => row.groupname),
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
