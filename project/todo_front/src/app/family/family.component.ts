import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {

  name: string;
  family: any;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getFamily()
  }

  getFamily = () => {
    this.api.getFamily(localStorage.getItem('asdf')).subscribe(
      data => {
        this.family = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  createFamily = () => {
    this.api.createFamily(localStorage.getItem('asdf'), this.name).subscribe(
      data => {
        this.router.navigate(['api/family']);
      },
      error => {
        console.log(error);
      }
    )
  }

}
