import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user-service';
import { CommonModule } from '@angular/common';
import { UserData } from '../user-data';
import { RouterModule } from '@angular/router';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-crud-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section>
      <table>
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>APELLIDO</th>
            <th>CORREO</th>
            <th>OPCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let userData of userDataList$ | async">
            <!-- <tr *ngFor="let userData of userDataList"> -->
            <td>{{ userData.name }}</td>
            <td>{{ userData.surname }}</td>
            <td>{{ userData.mail }}</td>
            <td>
              <button (click)="deleteUser(userData.id)">Borrar</button>
              <button [routerLink]="['/update', userData.id]">Modificar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styleUrls: ['./crud-list.css'],
})
export class CrudList implements OnInit {
  private refreshList$ = new BehaviorSubject<void>(undefined);
  userService: UserService = inject(UserService);
  // userDataList$!: Observable<UserData[]>;
  // userDataList: UserData[] = [];
  userDataList$ = this.refreshList$.pipe(switchMap(() => this.userService.getAllUsers()));
  constructor() {
    // this.userDataList = this.userService.getAllUsers();
  }

  ngOnInit(): void {
    // this.loadUsers();
    // console.log('Carga');
  }

  deleteUser(id: string) {
    if (confirm('Desea borrar el usuario?')) {
      this.userService
        .deleteUser(id)
        .subscribe({ next: () => this.refreshList$.next()
          // setTimeout(() => this.loadUsers(), 100) 
        });
      console.log('borrado');
    }
  }
  // loadUsers() {
  //   this.userService.getAllUsers().subscribe({
  //     next: (users) => {
  //       this.userDataList = users;},
  //     error: (err) => console.error('Error cargando usuarios', err),});}

  loadUsers() {
    this.userDataList$ = this.userService.getAllUsers();
    console.log('load');
  }
}
