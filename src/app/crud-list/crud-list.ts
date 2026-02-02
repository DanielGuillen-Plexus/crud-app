import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { UserService } from '../user-service';
import { CommonModule } from '@angular/common';
import { UserData } from '../user-data';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-crud-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <section>
      <mat-form-field>
        <mat-label>Filter</mat-label>
        <input matInput (keyup)="filterUsers($event)" placeholder="Nombres o apellidos"/>
      </mat-form-field>
      <table mat-table [dataSource]="userDataList">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let user">{{ user.name }}</td>
        </ng-container>
        <ng-container matColumnDef="surname">
          <th mat-header-cell *matHeaderCellDef>Surname</th>
          <td mat-cell *matCellDef="let user">{{ user.surname }}</td>
        </ng-container>
        <ng-container matColumnDef="mail">
          <th mat-header-cell *matHeaderCellDef>Email</th>
          <td mat-cell *matCellDef="let user">{{ user.mail }}</td>
        </ng-container>
        <ng-container matColumnDef="options">
          <th mat-header-cell *matHeaderCellDef>Opciones</th>
          <td mat-cell *matCellDef="let user">
            <button matButton="elevated" (click)="deleteUser(user.id)">Borrar</button>
            <button matButton="elevated" [routerLink]="['/update', user.id]">Modificar</button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
        <tr mat-row *matRowDef="let myRowData; columns: columnsToDisplay"></tr>
      </table>
      <mat-paginator
        [pageSizeOptions]="[5, 10, 15]"
        showFirstLastButtons
        aria-label="Select a page"
      >
      </mat-paginator>
    </section>
  `,
  styleUrls: ['./crud-list.scss'],
})
export class CrudList implements OnInit {
  userService: UserService = inject(UserService);
  // userDataList: UserData[] = [];
  userDataList = new MatTableDataSource<UserData>([]);
  columnsToDisplay = ['name', 'surname', 'mail', 'options'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor() {}

  ngAfterViewInit() {
    this.userDataList.paginator = this.paginator;
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {  
    const users = this.userService.getAllUsers();
    // this.userDataList = users;
    this.userDataList.data = users;
  }

  filterUsers(event:Event){
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const users = this.userService.getAllUsers().filter(usuario => (usuario.name+" "+usuario.surname).toLowerCase().includes(filterValue));
    this.userDataList.data = users;
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id);
    this.loadUsers();
  }
}
