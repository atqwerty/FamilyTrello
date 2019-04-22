import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-detailed',
  templateUrl: './task-detailed.component.html',
  styleUrls: ['./task-detailed.component.css']
})
export class TaskDetailedComponent implements OnInit {

  task_id: string;
  task_list_id: string;
  task: any;

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // console.log(params);
      if (typeof params['task_lists_id'] !== 'undefined') {
        this.task_list_id = params['task_lists_id'];
        this.task_id = params['task_id'];
        // console.log(this.id);
      } else {
        // this.id = '';
        console.log("error")
      }
    });
    this.getTaskInfo(this.task_list_id, this.task_id);
  }

  getTaskInfo = (task_list_id, task_id) =>{
    this.api.getTaskInfo(task_list_id, task_id).subscribe(
      data => {
        this.task = data
      },
      error => {
        console.log(error);
      }
    )
  }

  delete(task_id){
    this.api.deleteTask(this.task_list_id, task_id).subscribe(
      datae => {
        console.log("data");
      },
      error => {
        console.log(error);
      }
    )
  }

}
