import { Component, inject, input, output } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { TaskDialog } from '../task-dialog/task-dialog.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TaskSheet } from '../task-sheet/task-sheet.component';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
  imports: [TaskDialog],
})
export class TaskCard {
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

  screenIsLarge: boolean = false;
  key = input.required<string>();
  taskTitle = input.required<string>();
  taskPriority = input<string>();
  taskStatus = input<string>();
  taskDescription = input.required<string>();
  taskStartDate = input.required<string>();
  handleClick = output;
  readonly dialog = inject(Dialog);
  readonly sheet = inject(MatBottomSheet);

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

  openSheet(): void {
    const sheetRef = this.sheet.open(TaskSheet, {
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
