import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-family-detailed',
  templateUrl: './family-detailed.component.html',
  styleUrls: ['./family-detailed.component.css']
})
export class FamilyDetailedComponent implements OnInit {

  task_lists = [];
  familyId: string;

  constructor(private api: ApiService, private router: Router, private activatedRoute: ActivatedRoute) { 
    
  }

  ngOnInit() {this.activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.familyId = params['id'];
      } else {
        console.log("error")
      }
    });
    this.getTaskLists();
  }

  getTaskLists = () => {
    this.api.getAllTaskLists(localStorage.getItem('asdf'), this.familyId).subscribe(
      data => {
        this.task_lists = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  create(){
    this.router.navigate(['api/family/' + this.familyId + '/new_task_list']);
  }

  delete = (task_list_id: string) => {
    this.api.deleteTaskList(localStorage.getItem('asdf'), this.familyId,  task_list_id).subscribe(
      data => {
        this.getTaskLists();
      },
      error => {
        console.log(error);
      }
    )
  }

}
