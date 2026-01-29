import { Component, inject } from '@angular/core';
import { UserService } from '../user-service';
import { CommonModule } from '@angular/common';
import { UserData } from '../user-data';

@Component({
  selector: 'app-crud-list',
  standalone: true,
  imports: [CommonModule],
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
        <td><button (click)= "userService.deleteUser(userData.id)">Borrar</button></td>
      </tr>
    </tbody>
  </table>
  </section>
  `,
  styleUrls: ['./crud-list.css'],
})
export class CrudList {
  userService: UserService = inject(UserService);
  userDataList: UserData[] = [];
  
  constructor (){
    this.userDataList = this.userService.getAllUsers();
  }
}
