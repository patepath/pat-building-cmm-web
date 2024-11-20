import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public name: string='';
  public password: string='';
  public isInvalid: boolean=false;

  constructor(
    private readonly router: Router,
    private readonly userServ: UserService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.userServ.login(this.name, this.password).subscribe(s => {
      if(s) { 
        this.isInvalid = false;
        localStorage.setItem('user', JSON.stringify(s));

        switch(s.role) {
          case 1:
            this.router.navigate(['/admin/new-issue']);
            break;

          case 2:
            this.router.navigate(['/admin/new-issue']);
            break;
        }

      } else {
        this.isInvalid = true;
      }
    });
  }
}
