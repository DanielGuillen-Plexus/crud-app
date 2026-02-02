import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
  <header class="header">
    <button mat-button [matMenuTriggerFor]="menu">Menu</button>
    <mat-menu #menu="matMenu">
      <button mat-menu-item routerLink="">Home</button>
      <button mat-menu-item routerLink="create">Create User</button>
    </mat-menu>
  </header>
  <section class="content"> 
    <router-outlet></router-outlet>
  </section>
  `,
  styleUrls: ['./app.css'],
  imports: [RouterModule, MatButtonModule, MatMenuModule],
})
export class App {
  title = signal('crud-app');
}
