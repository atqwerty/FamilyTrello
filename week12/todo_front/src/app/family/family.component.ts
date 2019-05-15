import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {

  name: string;
  family: any;

  constructor(private api: ApiService) { }

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
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

}
