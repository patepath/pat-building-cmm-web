import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Group, GroupService } from 'src/app/services/group.service';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare let $:any;

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, AfterViewInit {

	public dataTable!: DataTable;
	public data!: string[][];

  public groups: Group[] = [];
  public group: Group = <Group>{};

  constructor(private readonly groupServ: GroupService) {}

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

    let table = $('#group-table').DataTable({
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
      self.group = self.groups[table.row($tr).index()];
      $('#group-modal').modal('show');
    });

    self.search();
  }

  refreshTable() {
    let table = $('#group-table').DataTable();
    table.clear();
    this.data = [];

    if(this.groups) {
      this.groups.forEach(s => {
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
    this.groupServ.findAll().subscribe(s => {
      this.groups = s;
      this.refreshTable();
    });
  }

  insert() {
    this.group = <Group>{};
    this.group.id = 0;

    $('#group-modal').modal('show');
  }

  save() {
    this.groupServ.save(this.group).subscribe(s => {
      if(s) {
        this.search();
        this.close();
      }
    });
  }

  close() {
    $('#group-modal').modal('hide');
  }
}
