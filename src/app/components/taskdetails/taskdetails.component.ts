import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-taskdetails',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.css'],
})
export class TaskdetailsComponent implements OnInit {
  taskDetails?: Task;
  id!: string;
  taskForm!: FormGroup;
  _unsubscribe$: Subject<boolean> = new Subject();

  constructor(
    private taskSer: TaskService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.taskForm = this.fb.group({
      name: ['', [Validators.required]],
      completed: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.taskSer.getSingleTask(this.id).subscribe((res) => {
      this.taskDetails = res;
      this.taskForm.patchValue({
        name: this.taskDetails.name,
        completed: this.taskDetails.completed,
      });
    });
  }
  onSubmit() {
    let close = document.getElementById('close-modal') as HTMLButtonElement;
    this.taskSer
      .updateTask(this.id, this.taskForm.value)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (res) => {
          // this.router.navigate(['/employee', this.taskDetails?._id]);
          this.ngOnInit();
          close.click();
        },
        (err) => {
          console.error(err);
        }
      );
  }
  close() {
    this.taskForm.patchValue({
      name: this.taskDetails?.name,
      completed: this.taskDetails?.completed,
    });
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
