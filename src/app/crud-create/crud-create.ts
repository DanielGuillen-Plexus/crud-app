import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../user-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserDto } from '../user-dto';

@Component({
  selector: 'app-crud-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
  <section>
    <h4>Crear usuario:</h4><br>
    <form [formGroup]="createForm" (ngSubmit)="submitUser()">
      <label for="first-name">First name:</label>
        <input type="text" id="first-name" formControlName="name">
        <label for="last-name">Last name:</label>
        <input type="text" id="last-name" formControlName="surname">
        <label for="mail">Email:</label>
        <input type="email" id="mail" formControlName="mail">
      <br>
        <button type="submit" class="primary">Create</button>
      </form>
  </section>
  `,
  styleUrls: ['./crud-create.css'],
})
export class CrudCreate {
  route: ActivatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  private router = inject(Router);
  createForm = new FormGroup({
    name: new FormControl<string>(''),
    surname: new FormControl<string>(''),
    mail: new FormControl<string>('')
  });
  constructor() { }

  submitUser() {

    const dto = this.createForm.value as UserDto;
    this.userService.saveUser(dto).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }
}
