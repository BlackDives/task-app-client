import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './components/nav-bar/nav-bar.component';
import { MobileNav } from './components/mobile-nav-bar/mobile-nav.component';

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  imports: [RouterOutlet, NavBar, MobileNav],
})
export class MainComponent {}
