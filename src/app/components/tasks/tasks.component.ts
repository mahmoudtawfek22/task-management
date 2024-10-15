import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    NgxPaginationModule,
    CurrencyPipe,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks!: Task[];
  lastTasks!: Task[];
  searchValue!: string;
  p: number = 1;
  total: number = 0;
  constructor(private taskSer: TaskService) {}
  ngOnInit(): void {
    this.getAllTasks();
  }
  getAllTasks() {
    this.taskSer.getAllTasks().subscribe(
      (res) => {
        console.log(res);
        this.tasks = res;
        this.lastTasks = [...this.tasks];
        this.total = this.lastTasks.length;
      },
      (err) => {
        console.error(err);
      }
    );
  }
  update(event: any, id: string) {
    this.taskSer
      .updateTask(id, { completed: event.target.checked })
      .subscribe((res) => {
        this.getAllTasks();
      });
  }
  search() {
    console.log(this.searchValue);

    this.searchValue = this.searchValue.toLowerCase();
    this.tasks = this.lastTasks.filter((task) =>
      task.name.toLowerCase().includes(this.searchValue)
    );
    if (this.searchValue.length == 0) {
      this.tasks = this.lastTasks;
    }
  }
}
