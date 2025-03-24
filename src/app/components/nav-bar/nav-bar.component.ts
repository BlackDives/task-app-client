import { Component, inject } from '@angular/core';
import { signal, computed } from '@angular/core';
import { Calculator } from '../../services/math';
import { AuthService } from '../../services/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBar {
  firstName = signal('Kam');
  private authService = inject(AuthService);
  private router = inject(Router);
  private calculator = inject(Calculator);

  updateName(name: string) {
    this.firstName.set(name);
  }

  onLogoutClick(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
