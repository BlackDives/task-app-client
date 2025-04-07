import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'mobile-nav-menu',
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.css',
  imports: [MatSidenavModule, MatButtonModule, RouterOutlet],
})
export class MobileNav {
  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  onLogoutClick(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
