import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { TaskListDetailedComponent } from './task-list-detailed/task-list-detailed.component';

const routes: Routes = [
  { path: 'api/task_lists', component: MainComponent },
  { path: 'api/task_lists/:id', component: TaskListDetailedComponent, pathMatch: 'full' },
  { path: 'api/task_lists/:id/tasks', component: TaskListDetailedComponent, pathMatch: 'full'},
  { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
