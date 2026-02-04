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
import { map, Observable, of } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Departament } from '../departament';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatDatepickerModule,
    MatSelect,
    MatOption,
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
        <mat-form-field appearance="outline">
          <mat-label>Departament</mat-label>
          <mat-select id="departament" formControlName="departament">
            @for (dep of departamentos; track dep) {
              <mat-option [value]="dep">{{ dep }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Birthdate:</mat-label>
          <input
            matInput
            [matDatepicker]="datepicker"
            [max]="date"
            id="birthdate"
            formControlName="birthdate"
          />
          @if (
            createForm.controls.birthdate.hasError('matDatepickerFilter') &&
            createForm.controls.birthdate.touched
          ) {
            <mat-error>Birthdate is not valid</mat-error>
          }
          @if (
            createForm.controls.birthdate.hasError('required') &&
            createForm.controls.birthdate.touched
          ) {
            <mat-error>Birthdate is required.</mat-error>
          }
          @if (
            createForm.controls.birthdate.hasError('matDatepickerMax') &&
            createForm.controls.birthdate.touched
          ) {
            <mat-error>Birthdate cannot be future</mat-error>
          }
          <mat-datepicker-toggle matIconSuffix [for]="datepicker"></mat-datepicker-toggle>
          <mat-datepicker #datepicker></mat-datepicker>
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
  private route: ActivatedRoute = inject(ActivatedRoute);
  private userService = inject(UserService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  date = new Date();

  departamentos = Object.values(Departament);

  createForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    mail: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.checkEmailAsync.bind(this)],
      updateOn: 'blur',
    }),
    birthdate: new FormControl<Date>(new Date(), [Validators.required]),
    departament: new FormControl<Departament>(Departament.IT),
  });
  
  constructor() {}

  // checkDateFutureAsync(control: AbstractControl): ValidationErrors | null {
  //   const date = control.value;
  //   if (!date) return of(null);
  //   return date.getTime() > new Date() ? { isFuture: true } : null;
  // }

  checkEmailAsync(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    if (!email) return of(null);

    return this.userService
      .findNewUserMail(email)
      .pipe(map((exists) => (exists ? { emailExists: true } : null)));
    // .pipe(map((exists) => (exists ? { emailExists: true } : null),catchError(() => of(null))));
  }

  submitUser() {
    const dto = this.createForm.value as UserDto;
    this.userService.saveUser(dto).subscribe({
      next: () => {
        this.snackBar.open('User created successfully', 'Close', { duration: 5000 });
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }
}
