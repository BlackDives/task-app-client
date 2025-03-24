import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  imports: [RouterOutlet, NavBar],
})
export class MainComponent {}
