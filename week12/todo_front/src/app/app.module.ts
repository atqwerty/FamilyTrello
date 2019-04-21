import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { TaskListDetailedComponent } from './task-list-detailed/task-list-detailed.component';
import { TaskDetailedComponent } from './task-detailed/task-detailed.component';
import { NewTaskListComponent } from './new-task-list/new-task-list.component';
import { NewTaskComponent } from './new-task/new-task.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TaskListDetailedComponent,
    TaskDetailedComponent,
    NewTaskListComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
