import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Equipment, EquipmentService } from 'src/app/services/equipment.service';
import { Group, GroupService } from 'src/app/services/group.service';
import { PartProfile, PartProfileService } from 'src/app/services/part-profile.service';
import { PartService } from 'src/app/services/part.service';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare let $:any;

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit, AfterViewInit {

	public dataTable!: DataTable;
	public data!: string[][];

  public groups: Group[] = [];
  public group: Group | undefined = <Group>{};
  public groupRef: number = 0;

  public equipments: Equipment[] = [];
  public equipment: Equipment = <Equipment>{};
  public equipmentRef: number = 0;

  public partProfiles: PartProfile[] = [];
  public partProfile: PartProfile = <PartProfile>{};

  constructor(
    private readonly _groupServ: GroupService,
    private readonly _equipmentServ: EquipmentService,
    private readonly _partProfileServ: PartProfileService,
    ) {

    this.dataTable = {
      headerRow: ['Equipment', 'Code', 'Name', 'Unit' ],
      footerRow: ['Equipment', 'Code', 'Name', 'Unit' ],
      dataRows: [],
    };

    this.groupRef = 0;
    this._groupServ.findAll().subscribe(s => {
      if(s) {
        this.groups = s;
      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initTable();
    this.search();
  }

  initTable() {
    let self = this;

    let table = $('#part-table').DataTable({
      dom: 'Bfrtip',
      buttons: [{
        text: 'New Parts',
        action: function ( e: any, dt: any, node: any, config: any ) {
          self.insert();
        }
      }, 'copy', 'csv', 'excel', 'print'],
      columnDefs: [
        { target: [0], width: '10em' },
        { target: [1, -1], width: '6em', className: 'text-center' },
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
      self.partProfile = self.partProfiles[table.row($tr).index()];
      $('#part-modal').modal('show');
    });
  }

  refreshTable() {
    let table = $('#part-table').DataTable();
    table.clear();
    this.data = [];

    if(this.partProfiles) {
      this.partProfiles.forEach(s => {
        this.data.push([
          s.equipment == undefined ? '' : s.equipment.group == undefined ? '' : s.equipment.group.name,
          s.code,
          s.name,
          s.unit,
        ]);
      });
    }

    table.rows.add(this.data);
    table.draw();
  }

  search() {
    this._partProfileServ.findByEquipment(this.equipmentRef).subscribe(s => {
      if(s) {
        this.partProfiles = s;
        this.refreshTable();
      }
    });
  }

  changeGroup() {
    this.equipmentRef = 0; 

    this._equipmentServ.findByGroup(this.groupRef).subscribe(s => {
      if(s) {
          this.equipments = s; 
      }
    });
  }

  changeEquioment() {
    this.search();
  }

  insert() {
    this.partProfile = <PartProfile>{};
    this.partProfile.id = 0;

    $('#part-modal').modal('show');
  }

  save() {
    var value = this.equipments.find(equipment => equipment.id === this.equipmentRef);

    if(value) {
      this.partProfile.equipment = value;

      this._partProfileServ.save(this.partProfile).subscribe(s => {
        if(s) {
          this.search();
          this.close();
        }
      });
    }
  }

  close() {
    $('#part-modal').modal('hide');
  }
}
