import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ApiService]
})
export class MainComponent implements OnInit {

  ngOnInit() {
  }

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
