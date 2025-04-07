import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'mobile-nav-menu',
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.css',
  imports: [MatSidenavModule, MatButtonModule, RouterOutlet],
})
export class MobileNav {}
