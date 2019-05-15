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
      if (typeof params['id'] !== 'undefined') {
        this.familyId = params['id'];
        // console.log(this.familyId);
      } else {
        console.log("s")
      }
    });
    this.getTaskLists();
  }

  // pass family id in order to get designated task lists
  getTaskLists = () => {
    this.api.getAllTaskLists(localStorage.getItem('asdf'), this.familyId).subscribe(
      data => {
        this.task_lists = data;
        // console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  create(){
    this.router.navigate(['api/family/' + this.familyId + '/new_task_list']);
  }

}
