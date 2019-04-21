import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.css']
})
export class NewTaskListComponent implements OnInit {

  name: string;

  constructor(private api: ApiService, private router: Router) { }
  
  ngOnInit() {
  }

  submit() {
    this.api.createTaskList(this.name).subscribe(
       data => {
         // refresh the list
        //  console.log(data);
         this.router.navigate(["api/task_lists"]);
       },
       error => {
         console.error(error);
       }
    );
  }

}
