import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  task_list_id: number;
  name: string;
  created_at: string;
  due_on: string;
  status: string;

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (typeof params['task_list_id'] !== 'undefined') {
        this.task_list_id = params['task_list_id'];
        
      }
    });
  }

  submit() {
    console.log(this.task_list_id);
    this.api.createTask(this.name, this.created_at, this.due_on, this.status, this.task_list_id).subscribe(
      data => {
        this.router.navigate(["api/task_lists/" + this.task_list_id]);
      },
      error => {
        console.error(error);
      }
    )
  }
}
