import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { TaskListDetailedComponent } from './task-list-detailed/task-list-detailed.component';
import { TaskDetailedComponent } from './task-detailed/task-detailed.component';
import { NewTaskListComponent } from './new-task-list/new-task-list.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'api/login', component: UserComponent, pathMatch: 'full'},
  { path: 'api/new_task_list', component: NewTaskListComponent, pathMatch: 'full' },
  { path: 'api/new_task', component: NewTaskComponent, pathMatch: 'full' },
  { path: 'api/task_lists', component: MainComponent },
  { path: 'api/task_lists/:id', component: TaskListDetailedComponent, pathMatch: 'full' },
  // { path: 'api/task_lists/:id/tasks', component: TaskListDetailedComponent, pathMatch: 'full'},
  { path: 'api/task_lists/:task_lists_id/tasks/:task_id', component: TaskDetailedComponent, pathMatch: 'full' },
  { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
