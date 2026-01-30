import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user-service';
import { CommonModule } from '@angular/common';
import { UserData } from '../user-data';
import { RouterModule } from '@angular/router';

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
      <tr *ngFor="let userData of userDataList">
        <td>{{ userData.name }}</td>
        <td>{{ userData.surname }}</td>
        <td>{{ userData.mail }}</td>
        <td><button (click)= "userService.deleteUser(userData.id)">Borrar</button>
        <button [routerLink]='["/update",userData.id]'>Modificar</button></td>
      </tr>
    </tbody>
  </table>
  </section>
  `,
  styleUrls: ['./crud-list.css'],
})
export class CrudList implements OnInit {
  userService: UserService = inject(UserService);
  userDataList: UserData[] = [];

  constructor() {
    // this.userDataList = this.userService.getAllUsers();
  }

  ngOnInit(): void {
    // 2. Mueve la lógica aquí
     this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.userDataList = users;
      },
      error: (err) => console.error("Error cargando usuarios", err)
    });
  }

}