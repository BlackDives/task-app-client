import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../../services/task/task-service';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Status, Priority, JsonPatchOperation } from '../../interfaces/task';
import { CreateSheet } from '../create-task-sheet/create-sheet.component';

@Component({
  selector: 'task-sheet',
  templateUrl: './task-sheet.component.html',
  styleUrl: './task-sheet.component.css',
  imports: [ReactiveFormsModule],
})
export class TaskSheet {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<CreateSheet>>(MatBottomSheetRef);
  isEditMode = signal(false);
  private formBuilder = inject(FormBuilder);
  private taskService = inject(TaskService);
  private snackbarService = inject(MatSnackBar);
  readonly data = inject(MAT_BOTTOM_SHEET_DATA);

  private originalValues = {
    title: this.data.title,
    description: this.data.description,
    status: this.data.status,
    priority: this.data.priority,
  };

  editTaskForm = this.formBuilder.group({
    title: [this.data.title, Validators.required],
    description: [this.data.description, Validators.required],
    status: [this.data.status, Validators.required],
    priority: [this.data.priority, Validators.required],
  });

  onDismiss(): void {
    this._bottomSheetRef.dismiss();
  }

  onEdit(): void {
    this.isEditMode.set(true);
  }

  onEditCancel(): void {
    this.isEditMode.set(false);
  }

  onEditSave(): void {
    const operations: JsonPatchOperation[] = [];
    const val = this.editTaskForm.value;
    const ogVal = this.originalValues;

    if (val.title !== ogVal.title) {
      operations.push({ op: 'replace', path: '/Title', value: val.title });
    }
    if (val.description !== ogVal.description) {
      operations.push({
        op: 'replace',
        path: '/Description',
        value: val.description,
      });
    }
    if (val.status !== ogVal.status && val.status) {
      operations.push({
        op: 'replace',
        path: '/Status',
        value: this.statusConvert(val.status),
      });
    }
    if (val.priority !== ogVal.priority && val.priority) {
      operations.push({
        op: 'replace',
        path: '/Priority',
        value: this.priorityConvert(val.priority),
      });
    }

    this.taskService.updateUserTask(this.data.id, operations).subscribe({
      next: (data) => {},
      error: (error) => {
        console.log(error);
        this.snackbarService.open('Error Updating Task', 'Close', {
          duration: 2000,
        });
      },
      complete: () => {
        this.snackbarService.open('Task Successfully Updated', 'Close', {
          duration: 2000,
        });
        this._bottomSheetRef.dismiss();
      },
    });
  }

  onDelete(): void {
    this.taskService.deleteUserTask(this.data.id).subscribe({
      next: (data) => {},
      error: (error) => {},
      complete: () => {
        this.snackbarService.open('Task Successfully Deleted', 'Close', {
          duration: 2000,
        });
        this._bottomSheetRef.dismiss();
      },
    });
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
