import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Category, CategoryService } from 'src/app/services/category.service';
import { Department, DepartmentService } from 'src/app/services/department.service';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare let $:any;


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

	public dataTable!: DataTable;
	public data!: string[][];

  public depts: Department[] = [];
  public dept: Department = <Department>{};

  public categories: Category[] = [];
  public category: Category = <Category>{};

  constructor(private readonly categoryServ: CategoryService) {}

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

    let table = $('#category-table').DataTable({
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
      self.category = self.categories[table.row($tr).index()];
      $('#category-modal').modal('show');
    });

    self.search();
  }

  refreshTable() {
    let table = $('#category-table').DataTable();
    table.clear();
    this.data = [];

    if(this.categories) {
      this.categories.forEach(s => {
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
    this.categoryServ.findAll().subscribe(s => {
      this.categories = s;
      this.refreshTable();
    });
  }

  insert() {
    this.dept = <Department>{};
    this.dept.id = 0;

    this.category = <Category>{};
    this.category.id = 0;

    $('#category-modal').modal('show');
  }

  save() {
    this.categoryServ.save(this.category).subscribe(s => {
      if(s) {
        this.search();
        this.close();
      }
    });
  }

  close() {
    $('#category-modal').modal('hide');
  }
}
