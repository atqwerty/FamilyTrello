import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ApiService]
})

export class MainComponent implements OnInit {

  ngOnInit() {
  }

  families = [];

  constructor(private api: ApiService, private router: Router) {
    this.getAllFamilies();
  }

  getAllFamilies = () => {
    console.log(localStorage.getItem('asdf'));
    this.api.getFamily(localStorage.getItem('asdf')).subscribe(
      data =>{
        this.families = data;
        // console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  create(){
    this.router.navigate(["api/new_family"]);
  }

  // delete(task_list_id: number){
  //   this.api.deleteTaskList(localStorage.getItem('asdf'), task_list_id).subscribe(
  //     data => {
  //       console.log('data', data);
        
  //       this.api.getAllTaskLists(localStorage.getItem('asdf')).subscribe(value => {
  //         console.log('value', value);
  //         this.families = value;
  //       });
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }
}
