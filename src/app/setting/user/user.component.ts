import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User, UserService } from 'src/app/services/user.service';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare let $:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit, AfterViewInit {
	public dataTable!: DataTable;
	public data!: string[][];

  public users: User[]=[]; 
  public user: User=<User>{}; 

  public password1: string='';
  public password2: string='';

  constructor(
    private readonly userServ: UserService
  ) { }

  ngOnInit(): void {
    this.dataTable = {
      headerRow: ['User Name', 'Full Name', 'Position', 'Role', 'Status' ],
      footerRow: ['User Name', 'Full Name', 'Position', 'Role', 'Status' ],
      dataRows: [],
    };
  }

  ngAfterViewInit(): void {
    this.initTable();
  }

  initTable() {
    let self = this;

    let table = $('#user-table').DataTable({
      dom: 'frtip',
      buttons: ['copy', 'csv', 'excel', 'print'],
      columnDefs: [
        { target: [0, -1, -2], width: '10em', className: 'text-center' },
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
      //let $tr = $(this).closest('tr');
      $(this).css('cursor', 'pointer');
      $(this).css('font-weight', 'bold');
    });

    table.on('mouseout', 'tr', function(this: any) {
      //let $tr = $(this).closest('tr');
      $(this).css('font-weight', 'normal');
    });

    table.on('click', 'td', function(this: any) {
      let $tr = $(this).closest('tr');
      self.user = self.users[table.row($tr).index()];
      $('#user-modal').modal('show');
    });

    self.search();
  }

  refreshTable() {
    let table = $('#user-table').DataTable();
    table.clear();
    this.data = [];

    if(this.users) {
      this.users.forEach(s => {
        this.data.push([
          s.name,
          s.firstname + ' ' + s.lastname,
          s.position,
          this.getRoleName(s.role),
          this.getStatusName(s.status)
        ]);
      });
    }

    table.rows.add(this.data);
    table.draw();
  }

  getRoleName(role: number): string {
    switch(role) {
      case 1:
        return "ผู้รับเรื่อง";

      case 2:
        return "ช่าง";

      case 3:
        return "หัวหน้าฝ่าย";
    }

    return "";
  }

  getStatusName(status: number): string {
    switch(status) {
      case 0:
        return "ยกเลิกการใช้งาน"

      case 1:
        return "ใช้งานปกติ"
    }

    return ""
  }

  insert() {
    this.user.id = 0;
    this.user.name = '';
    this.user.password = '';
    this.user.role = 1;
    this.user.status = 1;
    $('#user-modal').modal('show');
  }

  save() {
    this.user.password = this.password1;

    this.userServ.register(this.user).subscribe(s => {
      if(s) {
        this.search();
        this.close();
      }
    });
  }

  search() {
    this.userServ.findAll().subscribe(s => {
      this.users=s;
      this.refreshTable();
    });
  }

  close() {
    $('#user-modal').modal('hide');
  }
}
