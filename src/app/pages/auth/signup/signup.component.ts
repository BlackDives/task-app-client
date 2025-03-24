import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'signup-component',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  signUpFormBuilder = this.formBuilder.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    emailAddress: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  onSignUp() {
    const val = this.signUpFormBuilder.value;
    if (val.password !== val.confirmPassword) {
      this.snackBar.open('Passwords do not match', 'Close', { duration: 2000 });
      return;
    }

    if (
      val.username &&
      val.firstName &&
      val.lastName &&
      val.emailAddress &&
      val.password
    ) {
      this.authService
        .signup({
          username: val.username,
          firstName: val.firstName,
          lastName: val.lastName,
          email: val.emailAddress,
          password: val.password,
        })
        .subscribe({
          next: () => {},
          error: (error) => {
            console.log(error);
            this.snackBar.open('Error registering user', 'Close', {
              duration: 2000,
            });
          },
          complete: () => {
            this.snackBar.open('Account Created!', 'Close', { duration: 2000 });
            this.router.navigateByUrl('/tasks');
          },
        });
    }
  }
}
