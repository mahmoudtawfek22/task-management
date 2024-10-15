import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskdetailsComponent } from './components/taskdetails/taskdetails.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent, title: 'Task' },
  {
    path: 'task/:id',
    component: TaskdetailsComponent,
    title: 'Task Details',
  },
];
