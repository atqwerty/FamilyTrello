import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username: string;
  password: string;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.api.logUser({'username': this.username, 'password': this.password}).subscribe (
      data => {
        localStorage.setItem(
          'asdf',
          data['token']
        );
        this.router.navigate(["api/family"]);
      },
      error => {
        console.log(error);
      }
    )
  }

}
