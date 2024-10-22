import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Department, DepartmentService } from 'src/app/services/department.service';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare let $:any;

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit, AfterViewInit {

	public dataTable!: DataTable;
	public data!: string[][];

  public depts: Department[] = [];
  public dept: Department = <Department>{};

  constructor(private readonly deptServ: DepartmentService) {}

  ngOnInit(): void {
    this.dataTable = {
      headerRow: ['Code', 'Name' ],
      footerRow: ['Code', 'Name' ],
      dataRows: [],
    };
  }

  ngAfterViewInit(): void {
    this.initTable();
  }

  initTable() {
    let self = this;

    let table = $('#department-table').DataTable({
      dom: 'frtip',
      buttons: ['copy', 'csv', 'excel', 'print'],
      columnDefs: [
        { target: [0], width: '6em', className: 'text-center' },
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
      self.dept = self.depts[table.row($tr).index()];
      $('#department-modal').modal('show');
    });

    self.search();
  }

  refreshTable() {
    let table = $('#department-table').DataTable();
    table.clear();
    this.data = [];

    if(this.depts) {
      this.depts.forEach(s => {
        this.data.push([
          s.code,
          s.name
        ]);
      });
    }

    table.rows.add(this.data);
    table.draw();
  }

  search() {
    this.deptServ.finAll().subscribe(s => {
      this.depts = s;
      this.refreshTable();
    });
  }

  insert() {
    this.dept = <Department>{};
    this.dept.id = 0;

    $('#department-modal').modal('show');
  }

  save() {
    this.deptServ.save(this.dept).subscribe(s => {
      if(s) {
        this.search();
        this.close();
      }
    });
  }

  close() {
    $('#department-modal').modal('hide');
  }
}
