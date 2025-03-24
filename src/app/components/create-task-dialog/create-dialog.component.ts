import { Component, inject, model } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../../services/task/task-service';
import { NewTask, Priority, Status } from '../../interfaces/task';

@Component({
  selector: 'create-task-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.css',
  imports: [ReactiveFormsModule],
})
export class CreateTaskDialog {
  readonly dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  private formBuilder = inject(FormBuilder);
  private taskService = inject(TaskService);
  private snackbarService = inject(MatSnackBar);
  private data = inject(DIALOG_DATA);

  createTaskForm = this.formBuilder.group({
    taskTitle: ['', Validators.required],
    description: ['', Validators.required],
    status: ['Not Started', Validators.required],
    priority: ['Low', Validators.required],
  });

  onClose(): void {
    this.dialogRef.close();
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
        next: (data) => {
          this.data = 'yo';
        },
        error: (error) => {
          this.snackbarService.open('Error Creating Task', 'Close', {
            duration: 3000,
          });
        },
        complete: () => {
          console.log(this.data);
          this.snackbarService.open('Task Successfully Created', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close();
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
