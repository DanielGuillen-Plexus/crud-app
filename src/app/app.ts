import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
  <header class="header">
    <a routerLink="">Home</a>
    <a routerLink="create">Create</a>
  </header>
  <br>
  <section class="content"> 
    <router-outlet></router-outlet>
  </section>
  `,
  styleUrls: ['./app.css'],
  imports: [RouterModule],
})
export class App {
  title = signal('crud-app');
}
