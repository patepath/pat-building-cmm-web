import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prn-issue',
  templateUrl: './prn-issue.component.html',
  styleUrls: ['./prn-issue.component.css']
})
export class PrnIssueComponent implements OnInit {

  public created!: string | null;
  public time!: string | null;
  public code!: string | null;
  public type!: string | null;
  public group!: string | null;
  public category!: string | null;
  public equipment!: string | null;
  public caller!: string | null;
  public phoneno!: string | null;
  public department!: string | null;
  public location!: string | null;
  public description!: string | null;

  public groupStyle!: string | null;
  public categoryStyle!: string | null;

  constructor() { }

  ngOnInit(): void {
    let url =  new URL(window.location.href);
    let params = url.searchParams;

    this.created = params.get('created');
    this.time = params.get('time');
    this.code = params.get('code');
    this.caller = params.get('caller');
    this.phoneno = params.get('phoneno');
    this.group = params.get('group');
    this.category = params.get('category');
    this.department = params.get('department');
    this.location = params.get('location');
    this.description = params.get('description');

    this.groupStyle = `position: absolute; top: ${this.get_groupY()}cm; left: 2.1cm`;
    this.categoryStyle = `position: absolute; top: ${this.get_categoryY()}cm; left: 10.6cm`;

    setTimeout(() => {
      window.onafterprint = () => { window.close() };
      window.print();
    }, 500);
  }

  get_groupY(): string {
    switch(this.group) {
      case '001':
        return '5.7';

      case '002':
        return '6.2';

      case '003':
        return '6.7';

      case '004':
        return '7.1';

      case '005':
        return '7.6';

      case '006':
        return '8.1';

      case '007':
        return '8.55';

      case '008':
        return '9.0';

      case '009':
        return '9.5';
    }

    return '';
  }

  get_categoryY() {
    switch(this.category) {
      case '001':
        return '5.7';

      case '002':
        return '6.2';

      case '003':
        return '6.7';

      case '004':
        return '7.1';

      case '005':
        return '7.6';

      case '006':
        return '8.1';

      case '007':
        return '8.55';

      case '008':
        return '9.0';

      case '009':
        return '9.5';
    }

    return '';
  }


}
