import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task-list-detailed',
  templateUrl: './task-list-detailed.component.html',
  styleUrls: ['./task-list-detailed.component.css']
})
export class TaskListDetailedComponent implements OnInit {
  id: string;

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {
  }
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // console.log(params);
      if (typeof params['id'] !== 'undefined') {
        this.id = params['id'];
        // console.log(this.id);
      } else {
        this.id = '';
      }
    });
    this.getTaskList(this.id);
  }

  task_list = [{name: "testName"}];
  tasks = [];

  getTasks = (id) => {
    this.api.getTasks(id).subscribe(
      data => {
        this.tasks = data
      },
      error => {
        console.log(error);
      }
    )
  }

  getTaskList = (id) => {
    // console.log(id);
    this.api.getTaskList(id).subscribe(
      data =>{
        this.task_list = data
        this.getTasks(id)
      },
      error => {
        console.log(error);
      }
    )
  }

  create(task_list_id){
    // console.log(task_list_id);
    this.router.navigate(["api/new_task/"], { queryParams: { task_list_id : task_list_id } });
  }
}
