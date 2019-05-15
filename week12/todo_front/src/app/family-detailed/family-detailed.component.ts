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
    // console.log(params);
    if (typeof params['familyId'] !== 'undefined') {
      this.familyId = params['familyId'];
      console.log(this.familyId);
    } else {
      console.log("error")
    }
  });
    this.getTaskLists();
  }

  // pass family id in order to get designated task lists
  getTaskLists = () => {
    this.api.getAllTaskLists(localStorage.getItem('asdf')).subscribe(
      data => {
        // this.task_lists = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  create(){

    this.router.navigate(['api/new_task_list']);
  }

}
