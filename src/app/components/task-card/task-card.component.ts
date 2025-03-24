import { Component, inject, input, output } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { TaskDialog } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
  imports: [TaskDialog],
})
export class TaskCard {
  key = input.required<string>();
  taskTitle = input.required<string>();
  taskPriority = input<string>();
  taskStatus = input<string>();
  taskDescription = input.required<string>();
  taskStartDate = input.required<string>();
  handleClick = output;
  readonly dialog = inject(Dialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskDialog, {
      data: {
        id: this.key(),
        title: this.taskTitle(),
        description: this.taskDescription(),
        priority: this.taskPriority(),
        status: this.taskStatus(),
        date: this.taskStartDate(),
      },
    });
  }
}
