import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../user-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserDto } from '../user-dto';
import { UserData } from '../user-data';

@Component({
  selector: 'app-crud-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <section>
      <h4>Actualizar usuario:</h4><br>
    <form [formGroup]="updateForm" (ngSubmit)="updateUser()">
      <label for="first-name">First name:</label>
        <input type="text" id="first-name" formControlName="name">
        <label for="last-name">Last name:</label>
        <input type="text" id="last-name" formControlName="surname">
        <label for="mail">Email:</label>
        <input type="email" id="mail" formControlName="mail">
      <br>
        <button type="submit" class="primary">Update</button>
      </form>
  </section>
  `,
  styleUrls: ['./crud-update.css'],
})
export class CrudUpdate {
  route: ActivatedRoute = inject(ActivatedRoute);
  id: string = '';
  userData: UserData | undefined;
  userService = inject(UserService);
  private router = inject(Router);

  updateForm = new FormGroup({
    name: new FormControl<string>(''),
    surname: new FormControl<string>(''),
    mail: new FormControl<string>('')
  });
  constructor() {
    this.id = this.route.snapshot.params["id"];
    this.userData = this.userService.getSpecificUser(this.id);
    if (this.userData) {
      this.updateForm.setValue({
        name: this.userData.name,
        surname: this.userData.surname,
        mail: this.userData.mail
      });
    }
  }

  updateUser() {
    if(this.userService.updateUser(this.id, this.updateForm.value as UserDto)){
      this.router.navigateByUrl('/');
    }
  }
}
