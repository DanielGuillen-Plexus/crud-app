import { Injectable } from '@angular/core';
import { UserData } from './user-data';
import { UserDto } from './user-dto';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected userDataList: UserData[] = [

    { id: crypto.randomUUID(), name: 'Pedro', surname: 'Pérez', mail: 'edroerez@example.com' },
    { id: crypto.randomUUID(), name: 'Laura', surname: 'Pérez', mail: 'laura@example.com' },
    { id: crypto.randomUUID(), name: 'Marcos', surname: 'López', mail: 'marcos@example.com' },
    { id: crypto.randomUUID(), name: 'Iria', surname: 'Varela', mail: 'iria@example.com' },
    { id: crypto.randomUUID(), name: 'Noa', surname: 'Santos', mail: 'noa@example.com' },
  ];

  constructor() { }

  getAllUsers(): UserData[] {
    return this.userDataList;
  }

  getSpecificUser(id: string): UserData | undefined {
    return this.userDataList.find(user => user.id === id);
  }

  saveUser(user: UserDto) {
    try {
      if (user.name.length < 3 || user.name === undefined) {
        throw new Error("El nombre del usuario debe tener por lo menos 3 caracteres.")
      }
      else if (user.surname.length < 3 || user.surname === undefined) {
        throw new Error("El apellido del usuario debe tener por lo menos 3 caracteres.")
      }
      else if (!user.mail.includes('@') || user.mail === undefined) {
        throw new Error("El correo electrónico debe ser válido.")
      }
      else {
        let data: UserData = user as UserData;
        data.id = crypto.randomUUID();
        this.userDataList.push(data);
        return true;
      }
    } catch (error) {
      alert(error);
    }
    return false;
  }

  deleteUser(uuid: string) {
    if (confirm("Desea borrar el usuario?")) {
      const indice = this.userDataList.findIndex(ind => ind.id === uuid);
      if (indice !== -1) {
        this.userDataList.splice(indice,1);
      }
    }
  }

  updateUser(uuid: string, user: UserDto){
    try {
      if (user.name.length < 3 || user.name === undefined) {
        throw new Error("El nombre del usuario debe tener por lo menos 3 caracteres.")
      }
      else if (user.surname.length < 3 || user.surname === undefined) {
        throw new Error("El apellido del usuario debe tener por lo menos 3 caracteres.")
      }
      else if (!user.mail.includes('@') || user.mail === undefined) {
        throw new Error("El correo electrónico debe ser válido.")
      }
      else {
        let data: UserData = user as UserData;
        const indice = this.userDataList.findIndex(ind => ind.id === uuid);
        if(indice !== -1){
          data.id = uuid;
          this.userDataList[indice] = data;
        }
        return true;
      }
    } catch (error) {
      alert(error);
    }
    return false;
  }
}
