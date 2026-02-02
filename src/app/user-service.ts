import { Injectable } from '@angular/core';
import { UserData } from './user-data';
import { UserDto } from './user-dto';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected userDataList: UserData[] = [
    { id: crypto.randomUUID(), name: 'Pedro', surname: 'Pérez', mail: 'pedroerez@example.com' },
    { id: crypto.randomUUID(), name: 'Laura', surname: 'Pérez', mail: 'laura@example.com' },
    { id: crypto.randomUUID(), name: 'Marcos', surname: 'López', mail: 'marcos@example.com' },
    { id: crypto.randomUUID(), name: 'Iria', surname: 'Varela', mail: 'iria@example.com' },
    { id: crypto.randomUUID(), name: 'Noa', surname: 'Santos', mail: 'noa@example.com' },

    { id: crypto.randomUUID(), name: 'Lucía', surname: 'González', mail: 'lucia@example.com' },
    { id: crypto.randomUUID(), name: 'Miguel', surname: 'Martínez', mail: 'miguel@example.com' },
    { id: crypto.randomUUID(), name: 'Sofía', surname: 'Ramírez', mail: 'sofia@example.com' },
    { id: crypto.randomUUID(), name: 'Javier', surname: 'Torres', mail: 'javier@example.com' },
    { id: crypto.randomUUID(), name: 'Elena', surname: 'Castro', mail: 'elena@example.com' },

    { id: crypto.randomUUID(), name: 'Diego', surname: 'Núñez', mail: 'diego@example.com' },
    { id: crypto.randomUUID(), name: 'Alicia', surname: 'Rey', mail: 'alicia@example.com' },
    { id: crypto.randomUUID(), name: 'Carlos', surname: 'Fernández', mail: 'carlos@example.com' },
    { id: crypto.randomUUID(), name: 'Patricia', surname: 'Suárez', mail: 'patricia@example.com' },
    { id: crypto.randomUUID(), name: 'Hugo', surname: 'Domínguez', mail: 'hugo@example.com' },

    { id: crypto.randomUUID(), name: 'Adriana', surname: 'Lorenzo', mail: 'adriana@example.com' },
    { id: crypto.randomUUID(), name: 'Raúl', surname: 'Méndez', mail: 'raul@example.com' },
    { id: crypto.randomUUID(), name: 'Claudia', surname: 'Iglesias', mail: 'claudia@example.com' },
    { id: crypto.randomUUID(), name: 'Daniel', surname: 'Ortega', mail: 'daniel@example.com' },
    { id: crypto.randomUUID(), name: 'Isabel', surname: 'Vega', mail: 'isabel@example.com' },

    { id: crypto.randomUUID(), name: 'Rubén', surname: 'Calvo', mail: 'ruben@example.com' },
    { id: crypto.randomUUID(), name: 'Marta', surname: 'Serrano', mail: 'marta@example.com' },
    { id: crypto.randomUUID(), name: 'Alejandro', surname: 'Pardo', mail: 'alejandro@example.com' },
    { id: crypto.randomUUID(), name: 'Natalia', surname: 'Lago', mail: 'natalia@example.com' },
    { id: crypto.randomUUID(), name: 'Iván', surname: 'Soto', mail: 'ivan@example.com' },

    { id: crypto.randomUUID(), name: 'Beatriz', surname: 'Rubio', mail: 'beatriz@example.com' },
    { id: crypto.randomUUID(), name: 'Óscar', surname: 'Campos', mail: 'oscar@example.com' },
    { id: crypto.randomUUID(), name: 'Eva', surname: 'Fuentes', mail: 'eva@example.com' },
    { id: crypto.randomUUID(), name: 'Sergio', surname: 'Vidal', mail: 'sergio@example.com' },
    { id: crypto.randomUUID(), name: 'Paula', surname: 'Rivas', mail: 'paula@example.com' },
  ];

  constructor() {}

  getAllUsers(): UserData[] {
    return this.userDataList;
  }

  getSpecificUser(id: string): UserData | undefined {
    return this.userDataList.find((user) => user.id === id);
  }

  findUserMail(id: string, mail: string) {
    const data: UserData | undefined = this.userDataList.find((user) => user.mail.toLowerCase() === mail.toLowerCase());
    if (data !== undefined && data.id !== id) {
      return true;
    } else {
      return false;
    }
  }
    findNewUserMail( mail: string) {
    const data: UserData | undefined = this.userDataList.find((user) => user.mail.toLowerCase() === mail.toLowerCase());
    if (data !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  saveUser(user: UserDto) {
    try {
      if (user.name.length < 3 || user.name === undefined) {
        throw new Error('El nombre del usuario debe tener por lo menos 3 caracteres.');
      } else if (user.surname.length < 3 || user.surname === undefined) {
        throw new Error('El apellido del usuario debe tener por lo menos 3 caracteres.');
      } else if (!user.mail.includes('@') || user.mail === undefined) {
        throw new Error('El correo electrónico debe ser válido.');
      } else {
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
    if (confirm('Desea borrar el usuario?')) {
      const indice = this.userDataList.findIndex((ind) => ind.id === uuid);
      if (indice !== -1) {
        this.userDataList.splice(indice, 1);
      }
    }
  }

  updateUser(uuid: string, user: UserDto) {
    try {
      if (user.name.length < 3 || user.name === undefined) {
        throw new Error('El nombre del usuario debe tener por lo menos 3 caracteres.');
      } else if (user.surname.length < 3 || user.surname === undefined) {
        throw new Error('El apellido del usuario debe tener por lo menos 3 caracteres.');
      } else if (!user.mail.includes('@') || user.mail === undefined) {
        throw new Error('El correo electrónico debe ser válido.');
      } else {
        let data: UserData = user as UserData;
        const indice = this.userDataList.findIndex((ind) => ind.id === uuid);
        if (indice !== -1) {
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
