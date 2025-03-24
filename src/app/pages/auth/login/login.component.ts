import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  email = new FormControl('');

  login() {
    const val = this.loginForm.value;

    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe(() => {
        console.log('User is logged in');
        this.router.navigateByUrl('/tasks');
      });
    }
  }
}
