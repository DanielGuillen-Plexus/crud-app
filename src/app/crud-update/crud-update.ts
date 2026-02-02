import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../user-service';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UserDto } from '../user-dto';
import { UserData } from '../user-data';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-crud-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <section>
      <h3>User data modification:</h3>
      <br />
      <form [formGroup]="updateForm" (ngSubmit)="updateUser()">
        <mat-form-field appearance="outline">
          <mat-label>First name:</mat-label>
          <input matInput type="text" id="first-name" formControlName="name" />
          @if (updateForm.controls.name.hasError('required') && updateForm.controls.name.touched) {
            <mat-error>Name is required.</mat-error>
          }
          @if (updateForm.controls.name.hasError('minlength') && updateForm.controls.name.touched) {
            <mat-error>Name must have at least 3 letters.</mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label for="last-name">Last name:</mat-label>
          <input matInput type="text" id="last-name" formControlName="surname" />
          @if (
            updateForm.controls.surname.hasError('required') && updateForm.controls.surname.touched
          ) {
            <mat-error>Surname is required.</mat-error>
          }
          @if (
            updateForm.controls.surname.hasError('minlength') && updateForm.controls.surname.touched
          ) {
            <mat-error>Surname must have at least 3 letters.</mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label for="mail">Email:</mat-label>
          <input matInput type="email" id="mail" formControlName="mail" />
          @if (updateForm.controls.mail.hasError('required') && updateForm.controls.mail.touched) {
            <mat-error>Email is required.</mat-error>
          }
          @if (updateForm.controls.mail.hasError('email') && updateForm.controls.mail.touched) {
            <mat-error>Email must be valid.</mat-error>
          }
          @if (
            updateForm.controls.mail.hasError('emailExists') && updateForm.controls.mail.touched
          ) {
            <mat-error>Email is in use already.</mat-error>
          }
        </mat-form-field>
        <br />
        <button [disabled]="updateForm.invalid" matButton="filled" type="submit" class="primary">
          Update
        </button>
      </form>
    </section>
  `,
  styleUrls: ['./crud-update.scss'],
})
export class CrudUpdate {
  route: ActivatedRoute = inject(ActivatedRoute);
  id: string = '';
  userData: UserData | undefined;
  userService = inject(UserService);
  private router = inject(Router);

  updateForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    mail: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.checkEmailAsync.bind(this)],
      updateOn: 'blur',
    }),
  });
  constructor() {
    this.id = this.route.snapshot.params['id'];
    this.userData = this.userService.getSpecificUser(this.id);
    if (this.userData) {
      this.updateForm.setValue({
        name: this.userData.name,
        surname: this.userData.surname,
        mail: this.userData.mail,
      });
    }
  }

  // checkEmailunique(control: AbstractControl): ValidationErrors | null {
  //   if (!control.value) return null;
  //   return this.userService.findUserMail(this.id, control.value) ? { emailExists: true } : null;
  // }

  checkEmailAsync(control: AbstractControl): Observable<ValidationErrors | null> {
  const email = control.value;
  if (!email) return of(null);

  const exists = this.userService.findUserMail(this.id, email);
  return of(exists ? { emailExists: true } : null);
}
  updateUser() {
    if (this.userService.updateUser(this.id, this.updateForm.value as UserDto)) {
      this.router.navigateByUrl('/');
    }
  }
}
