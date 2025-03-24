import { Component, inject, signal } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPatchOperation, Priority, Status } from '../../interfaces/task';
import { TaskService } from '../../services/task/task-service';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface TaskDialogData {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  date: Date;
}

@Component({
  selector: 'task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css',
  imports: [ReactiveFormsModule],
})
export class TaskDialog {
  isEditMode = signal(false);
  readonly dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  data = inject<TaskDialogData>(DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  private taskService = inject(TaskService);
  private snackbarService = inject(MatSnackBar);

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

  onClose(): void {
    this.dialogRef.close();
  }

  onEdit(): void {
    this.isEditMode.set(true);
  }

  onDelete(): void {
    this.taskService.deleteUserTask(this.data.id).subscribe({
      next: (data) => {},
      error: (error) => {
        console.log(error);
        this.snackbarService.open('Error Deleting Task', 'Close', {
          duration: 2000,
        });
      },
      complete: () => {
        this.snackbarService.open('Task Successfully Deleted', 'Close', {
          duration: 2000,
        });
        this.dialogRef.close();
      },
    });
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
        this.dialogRef.close();
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
