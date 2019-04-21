import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ApiService]
})

// export interface ITaskList {
//   id: number;
//   name: string;
// }
export class MainComponent implements OnInit {

  ngOnInit() {
  }

  task_lists = [{name: "testName"}];

  constructor(private api: ApiService, private router: Router) {
    this.getAllTaskLists();
  }

  getAllTaskLists = () => {

    this.api.getAllTaskLists().subscribe(
      data =>{
        this.task_lists = data;
        
      },
      error => {
        console.log(error);
      }
    )
  }

  create(){
    this.router.navigate(["api/new_task_list"]);
  }
}
