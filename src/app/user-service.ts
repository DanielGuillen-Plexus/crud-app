import { Injectable } from '@angular/core';
import { UserData } from './user-data';
import { UserDto } from './user-dto';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = "http://localhost:3000/users";
  // protected userDataList: UserData[] = [
  //   { id: crypto.randomUUID(), name: 'Pedro', surname: 'Pérez', mail: 'edroerez@example.com' },
  //   { id: crypto.randomUUID(), name: 'Laura', surname: 'Pérez', mail: 'laura@example.com' },
  //   { id: crypto.randomUUID(), name: 'Marcos', surname: 'López', mail: 'marcos@example.com' },
  //   { id: crypto.randomUUID(), name: 'Iria', surname: 'Varela', mail: 'iria@example.com' },
  //   { id: crypto.randomUUID(), name: 'Noa', surname: 'Santos', mail: 'noa@example.com' },];

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserData[]> {
    // const data = await fetch(this.url); 
    // return await data.json() ?? [];
    // return this.userDataList;
    return this.http.get<UserData[]>(this.url);
  }

  getSpecificUser(id: string): Observable<UserData | undefined> {
    // const data = await fetch(`${this.url}/${id}`);
    // return await data.json() ?? {};
    // return this.userDataList.find(user => user.id === id);
    return this.http.get<UserData>(`${this.url}/${id}`);
  }

  saveUser(user: UserDto): Observable<UserData> {
    if (user.name.length < 3 || user.name === undefined) {
      return throwError(() => Error("El nombre del usuario debe tener por lo menos 3 caracteres."));
    }
    else if (user.surname.length < 3 || user.surname === undefined) {
      return throwError(() => Error("El apellido del usuario debe tener por lo menos 3 caracteres."));
    }
    else if (!user.mail.includes('@') || user.mail === undefined) {
      return throwError(() => Error("El correo electrónico debe ser válido."));
    }
    let data: UserData = user as UserData;
    data.id = crypto.randomUUID();
    // this.userDataList.push(data);
    // return true;
    return this.http.post<UserData>(this.url, data);
  }

  deleteUser(uuid: string): Observable<void> | void {
    if (confirm("Desea borrar el usuario?")) {
      return this.http.delete<void>(`${this.url}/${uuid}`);
      // const indice = this.userDataList.findIndex(ind => ind.id === uuid);
      // if (indice !== -1) {
      // this.userDataList.splice(indice,1);}
    }
  }

  updateUser(uuid: string, user: UserDto): Observable<UserData> | boolean {
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
        // const indice = this.userDataList.findIndex(ind => ind.id === uuid);
        // if(indice !== -1){
        data.id = uuid;
        return this.http.put<UserData>(`${this.url}/${uuid}`, user);
        // this.userDataList[indice] = data;}
        // return true;
      }
    } catch (error) {
      alert(error);
    }
    return false;
  }
}
