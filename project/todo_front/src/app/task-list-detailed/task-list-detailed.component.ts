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
  family_id: string;

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {
  }
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.id = params['id'];
        this.family_id = params['family_id'];
      } else {
        this.id = '';
      }
    });
    this.getTasks(this.id);
  }

  task_list = [{name: "testName"}];
  tasks = [];

  getTasks = (id) => {
    this.api.getTasks(localStorage.getItem('asdf'), this.id, this.family_id).subscribe(
      data => {
        this.tasks = data
      },
      error => {
        console.log(error);
      }
    )
  }

  getTaskList = (id) => {
    this.api.getTaskList(localStorage.getItem('asdf'), this.id, this.family_id).subscribe(
      data =>{
        this.task_list = data;
        this.getTasks(this.id);
      },
      error => {
        console.log(error);
      }
    )
  }

  create(task_list_id){
    this.router.navigate(["api/family/" + this.family_id + "/task_lists/" + this.id + "/new_task"], { queryParams: { task_list_id : this.id, family_id : this.family_id } });
  }

  delete(task_id){
    this.api.deleteTask(localStorage.getItem('asdf'), this.id, task_id).subscribe(
      data => {
        this.getTasks(this.id);
      },
      error => {
        console.log(error);
      }
    )
  }
}
