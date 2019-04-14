import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  task_lists = [{name: "testName"}];

  constructor(private api: ApiService) {
    this.getAllTaskLists();
  }

  getAllTaskLists = () => {

    this.api.getAllTaskLists().subscribe(
      data =>{
        this.task_lists = data
      },
      error => {
        console.log(error);
      }
    )
  }

}
