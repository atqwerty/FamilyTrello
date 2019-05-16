import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.css']
})
export class NewTaskListComponent implements OnInit {

  name: string;
  familyId: string;
  boards = [];

  constructor(private api: ApiService, private router: Router, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit() {this.activatedRoute.params.subscribe(params => {
    // console.log(params);
    if (typeof params['familyId'] !== 'undefined') {
      this.familyId = params['familyId'];
    } else {
      console.log("anothers")
    }
  });
}

  submit() {
    this.api.createTaskList(localStorage.getItem('asdf'), this.name, this.familyId).subscribe(
       data => {
         this.router.navigate(["api/family/" + this.familyId]);
       },
       error => {
         console.error(error);
       }
    );
  }

}
