import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { UserService } from '../user-service';
import { CommonModule } from '@angular/common';
import { UserData } from '../user-data';
import { RouterModule } from '@angular/router';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';
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
    MatInputModule,
  ],
  template: `
    <section>
      <mat-form-field>
        <mat-label>Filter</mat-label>
        <input matInput (keyup)="filterUsers($event)" placeholder="Nombres o apellidos" />
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
        <ng-container matColumnDef="departament">
          <th mat-header-cell *matHeaderCellDef>Departament</th>
          <td mat-cell *matCellDef="let user">{{ user.departament }}</td>
        </ng-container>
        <ng-container matColumnDef="birthdate">
          <th mat-header-cell *matHeaderCellDef>Birthdate</th>
          <td mat-cell *matCellDef="let user">{{ user.birthdate | date: 'dd/MM/yyyy' }}</td>
        </ng-container>
        <ng-container matColumnDef="options">
          <th mat-header-cell *matHeaderCellDef class="options">Options</th>
          <td mat-cell *matCellDef="let user" class="options">
            <button matButton="elevated" id="delete" (click)="deleteUser(user.id)">Delete</button>
            <button matButton="elevated" id="modify" [routerLink]="['/update', user.id]">Update</button>
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
  private refreshList$ = new BehaviorSubject<void>(undefined);
  private userService: UserService = inject(UserService);
  userDataList = new MatTableDataSource<UserData>([]);
  private allUsers: UserData[] = [];
  columnsToDisplay = ['name', 'surname', 'mail','departament','birthdate', 'options'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor() {}

  ngOnInit() {
    this.loadUsers();
  }
  private loadUsers() {
    this.refreshList$.pipe(switchMap(() => this.userService.getAllUsers())).subscribe({
      next: (users) => {
        this.allUsers = users;
        this.userDataList.data = users;
      },
    });
  }
  ngAfterViewInit() {
    this.userDataList.paginator = this.paginator;
  }

  deleteUser(id: string) {
    if (confirm('Desea borrar el usuario?')) {
      this.userService.deleteUser(id).subscribe({ next: () => this.refreshList$.next() });
      console.log('borrado');
    }
  }

  filterUsers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const users = this.allUsers.filter((usuario) =>
      (usuario.name + ' ' + usuario.surname).toLowerCase().includes(filterValue),
    );
    this.userDataList.data = users;
  }
}
