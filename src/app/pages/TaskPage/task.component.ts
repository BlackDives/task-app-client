import { Component, signal, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import {
  BreakpointObserver,
  BreakpointState,
  LayoutModule,
} from '@angular/cdk/layout';
import { TaskCard } from '../../components/task-card/task-card.component';
import { CreateTaskDialog } from '../../components/create-task-dialog/create-dialog.component';
import { CreateSheet } from '../../components/create-task-sheet/create-sheet.component';
import { Priority, Status, Task } from '../../interfaces/task';
import { TaskService } from '../../services/task/task-service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

export interface ExampleDialogData {
  title: string;
}

@Component({
  selector: 'task-page',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [TaskCard, CreateTaskDialog, CreateSheet, LayoutModule],
})
export class TaskPage {
  constructor() {
    inject(BreakpointObserver)
      .observe(['(max-width: 768px)'])
      .subscribe((result: BreakpointState) => {
        if (result.breakpoints['(max-width: 768px)']) {
          this.screenIsLarge = false;
          this.dialog.closeAll();
        } else if (!result.breakpoints['(max-width: 768px)']) {
          this.screenIsLarge = true;
          this.sheet.dismiss();
        }
      });
  }
  private screenIsLarge: boolean = true;
  readonly dialog = inject(Dialog);
  private sheet = inject(MatBottomSheet);
  private taskService = inject(TaskService);
  allTasks = signal<Task[]>([]);
  taskDate = new Date().toLocaleString().split(',')[0];

  ngOnInit() {
    this.loadTasks();
  }

  openCreateDialog(): void {
    if (this.screenIsLarge) {
      const dialogRef = this.dialog.open(CreateTaskDialog);
      this.dialog.afterAllClosed.subscribe(() => {
        this.loadTasks();
      });
    } else {
      this.sheet.open(CreateSheet);
    }
  }

  loadTasks() {
    this.taskService.getUserTasks().subscribe({
      next: (data) => {
        console.log(data);
        this.allTasks.update((currentItems) => [...data]);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  statusConvert(status: Status): string {
    switch (status) {
      case Status.NOT_STARTED:
        return 'Not Started';
      case Status.STARTED:
        return 'Started';
      case Status.FINISHED:
        return 'Finished';
      default:
        return 'Not Started';
    }
  }

  priorityConvert(priority: Priority): string {
    switch (priority) {
      case Priority.LOW:
        return 'Low';
      case Priority.MEDIUM:
        return 'Medium';
      case Priority.HIGH:
        return 'High';
      default:
        return 'Low';
    }
  }
}
