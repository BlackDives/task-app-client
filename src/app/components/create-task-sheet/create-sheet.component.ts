import { Component, inject } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task/task-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status, Priority, NewTask } from '../../interfaces/task';

@Component({
  selector: 'create-sheet',
  templateUrl: './create-sheet.component.html',
  styleUrl: './create-sheet.component.css',
  imports: [ReactiveFormsModule],
})
export class CreateSheet {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<CreateSheet>>(MatBottomSheetRef);
  private formBuilder = inject(FormBuilder);
  private taskService = inject(TaskService);
  private snackbarService = inject(MatSnackBar);

  createTaskForm = this.formBuilder.group({
    taskTitle: ['', Validators.required],
    description: ['', Validators.required],
    status: ['Not Started', Validators.required],
    priority: ['Low', Validators.required],
  });

  onDismiss(): void {
    this._bottomSheetRef.dismiss();
  }

  onCreate(): void {
    const val = this.createTaskForm.value;

    if (val.taskTitle && val.description && val.priority && val.status) {
      const newTask: NewTask = {
        title: val.taskTitle,
        description: val.description,
        status: this.statusConvert(val.status),
        priority: this.priorityConvert(val.priority),
      };
      this.taskService.addUserTask(newTask).subscribe({
        next: (data) => {},
        error: (error) => {
          this.snackbarService.open('Error Creating Task', 'Close', {
            duration: 3000,
          });
        },
        complete: () => {
          this.snackbarService.open('Task Successfully Created', 'Close', {
            duration: 3000,
          });
          this._bottomSheetRef.dismiss();
        },
      });
    }
  }

  statusConvert(status: string): Status {
    switch (status) {
      case 'Not Started':
        return Status.NOT_STARTED;
      case 'Started':
        return Status.STARTED;
      case 'Finished':
        return Status.FINISHED;
      default:
        return Status.NOT_STARTED;
    }
  }

  priorityConvert(priority: string): Priority {
    switch (priority) {
      case 'Low':
        return Priority.LOW;
      case 'Medium':
        return Priority.MEDIUM;
      case 'High':
        return Priority.HIGH;
      default:
        return Priority.LOW;
    }
  }
}
