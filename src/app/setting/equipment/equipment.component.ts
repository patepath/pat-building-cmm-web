import { Component, OnInit } from '@angular/core';
import { Equipment, EquipmentService } from 'src/app/services/equipment.service';
import { Group, GroupService } from 'src/app/services/group.service';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}


declare let $:any;

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

	public dataTable!: DataTable;
	public data!: string[][];

  public groups: Group[] = [];
  public group: Group | undefined = <Group>{};
  public groupRef: number = 0;

  public equipments: Equipment[] = [];
  public equipment: Equipment = <Equipment>{};

  constructor(
    private readonly _groupServ: GroupService,
    private readonly _equipmentServ: EquipmentService
    ) {}

  ngOnInit(): void {
    this.dataTable = {
      headerRow: ['Group', 'Code', 'Name' ],
      footerRow: ['Group', 'Code', 'Name' ],
      dataRows: [],
    };

    this._groupServ.findAll().subscribe(s => {
      if(s) {
        this.groups = s;
      }
    });
  }

  ngAfterViewInit(): void {
    this.initTable();
  }

  initTable() {
    let self = this;

    let table = $('#equipment-table').DataTable({
      dom: 'frtip',
      buttons: ['copy', 'csv', 'excel', 'print'],
      columnDefs: [
        { target: [0], width: '10em' },
        { target: [1], width: '6em', className: 'text-center' },
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
      self.equipment = self.equipments[table.row($tr).index()];
      self.groupRef = self.equipment.group == undefined ? 0 : self.equipment.group.id;
      $('#equipment-modal').modal('show');
    });

    self.search();
  }

  refreshTable() {
    let table = $('#equipment-table').DataTable();
    table.clear();
    this.data = [];

    if(this.equipments) {
      this.equipments.forEach(s => {
        this.data.push([
          s.group == undefined ? '': s.group.name,
          s.code,
          s.name
        ]);
      });
    }

    table.rows.add(this.data);
    table.draw();
  }

  search() {
    this._equipmentServ.findAll().subscribe(s => {
      this.equipments = s;
      this.refreshTable();
    });
  }

  insert() {
    this.groupRef = this.equipment.group == undefined ? 0 : this.equipment.group.id;
    this.equipment = <Equipment>{};
    this.equipment.id = 0;

    $('#equipment-modal').modal('show');
  }

  save() {
    this.equipment.group = this.groups.find(group => group.id === this.groupRef);

    this._equipmentServ.save(this.equipment).subscribe(s => {
      if(s) {
        this.search();
        this.close();
      }
    });
  }

  close() {
    $('#equipment-modal').modal('hide');
  }
}
