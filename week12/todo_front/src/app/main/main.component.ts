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

  task_lists = [];

  constructor(private api: ApiService, private router: Router) {
    this.getAllTaskLists();
  }

  getAllTaskLists = () => {
    console.log(localStorage.getItem('asdf'));
    this.api.getAllTaskLists(localStorage.getItem('asdf')).subscribe(
      data =>{
        this.task_lists = data;
        // console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  create(){
    this.router.navigate(["api/new_task_list"]);
  }

  delete(task_list_id: number){
    this.api.deleteTaskList(localStorage.getItem('asdf'), task_list_id).subscribe(
      data => {
        console.log('data', data);
        
        this.api.getAllTaskLists(localStorage.getItem('asdf')).subscribe(value => {
          console.log('value', value);
          this.task_lists = value;
        });
      },
      error => {
        console.log(error);
      }
    )
  }
}
