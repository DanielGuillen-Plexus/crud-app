import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../user-service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UserDto } from '../user-dto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-crud-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <section>
      <h3>User creation:</h3>
      <br />
      <form [formGroup]="createForm" (ngSubmit)="submitUser()">
        <mat-form-field appearance="outline">
          <mat-label>First name:</mat-label>
          <input matInput type="text" id="first-name" formControlName="name" />
          @if (createForm.controls.name.hasError('required') && createForm.controls.name.touched) {
            <mat-error>Name is required.</mat-error>
          }
          @if (createForm.controls.name.hasError('minlength') && createForm.controls.name.touched) {
            <mat-error>Name must have at least 3 letters.</mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label for="last-name">Last name:</mat-label>
          <input matInput type="text" id="last-name" formControlName="surname" />
          @if (
            createForm.controls.surname.hasError('required') && createForm.controls.surname.touched
          ) {
            <mat-error>Surname is required.</mat-error>
          }
          @if (
            createForm.controls.surname.hasError('minlength') && createForm.controls.surname.touched
          ) {
            <mat-error>Surname must have at least 3 letters.</mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label for="mail">Email:</mat-label>
          <input matInput type="email" id="mail" formControlName="mail" />
          @if (createForm.controls.mail.hasError('required') && createForm.controls.mail.touched) {
            <mat-error>Email is required.</mat-error>
          }
          @if (createForm.controls.mail.hasError('email') && createForm.controls.mail.touched) {
            <mat-error>Email must be valid.</mat-error>
          }
          @if (
            createForm.controls.mail.hasError('emailExists') && createForm.controls.mail.touched
          ) {
            <mat-error>Email is in use already.</mat-error>
          }
        </mat-form-field>
        <br />
        <button
          [disabled]="createForm.invalid"
          matButton="filled"
          type="submit"
          id="submit"
          class="primary"
        >
          Create
        </button>
      </form>
    </section>
  `,
  styleUrls: ['./crud-create.scss'],
})
export class CrudCreate {
  route: ActivatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  private router = inject(Router);
  createForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    mail: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.checkEmailAsync.bind(this)],
      updateOn: 'blur',
    }),
  });
  constructor() {}
  // checkEmailunique(control: AbstractControl): ValidationErrors | null {
  //   if (!control.value) return null;
  //   return this.userService.findUserMail(this.id, control.value) ? { emailExists: true } : null;
  // }

  checkEmailAsync(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    if (!email) return of(null);

    const exists = this.userService.findNewUserMail(email);
    return of(exists ? { emailExists: true } : null);
  }
  submitUser() {
    if (this.userService.saveUser(this.createForm.value as UserDto)) {
      this.router.navigateByUrl('/');
    }
  }
}
