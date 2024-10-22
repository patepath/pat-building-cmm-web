import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { Report5, Report5Service } from 'src/app/services/report5.service';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare let $:any;

@Component({
  selector: 'app-report5',
  templateUrl: './report5.component.html',
  styleUrls: ['./report5.component.css']
})
export class Report5Component implements OnInit, AfterViewInit {

  public dataTable: DataTable = <DataTable>{};
  public data: string[][] = [];

  public reports: Report5[] = [];
  public report: Report5 = <Report5>{};

  public frmDate: string = new Date().toISOString().split('T')[0];
  public toDate: string = new Date().toISOString().split('T')[0];
  

  constructor(
    private readonly _report: Report5Service,
    private readonly _router: Router) { 

    this.dataTable = {
      headerRow: ['ระดับความพึงพอใจ', 'จำนวน' ],
      footerRow: ['ระดับความพึงพอใจ', 'จำนวน' ],
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

    let table = $('#report5-table').DataTable({
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
    let table = $('#report5-table').DataTable();
    table.clear();
    this.data = [];

    if(this.reports) {
      var status='';

      this.reports.forEach(s => {
        switch(Number(s.satisfication)) {
          case 0:
            status = 'ไม่ระบุ';
            break;

          case 1:
            status = 'พึ่งพอใจมาก';
            break;

          case 2:
            status = 'พึ่งพอใจ';
            break;

          case 3:
            status = 'ปกติ';
            break;

          case 4:
            status = 'ไม่พึ่งพอใจ';
            break;

          case 5:
            status = 'ไม่พึ่งพอใจมาก';
            break;

          default:
            status = 'ไม่ระะุ'
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
            switch(Number(row.satisfication)) {
              case 0:
                return 'ไม่ระบุ';

              case 1:
                return 'พึ่งพอใจมาก';

              case 2:
                return 'พึ่งพอใจ';

              case 3:
                return 'ปกติ';

              case 4:
                return 'ไม่พึ่งพอใจ';

              case 5:
                return 'ไม่พึ่งพอใจมาก';
                
              default:
                return 'ไม่ระบุ';
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
