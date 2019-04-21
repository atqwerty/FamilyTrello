import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  name: string;
  created_at: string;
  due_to: string;
  status: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  submit() {
    this.api.createTask(this.name, this.created_at, this.due_to, this.status).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
      }
    )
  }
}
