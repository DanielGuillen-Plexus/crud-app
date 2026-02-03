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

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserData[]> {

    return this.http.get<UserData[]>(this.url);
  }

  getSpecificUser(id: string): Observable<UserData | undefined> {
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
    return this.http.post<UserData>(this.url, data);
  }

deleteUser(uuid: string): Observable<void> {
  return this.http.delete<void>(`${this.url}/${uuid}`);
}

  updateUser(uuid: string, user: UserDto): Observable<UserData> {
    if (user.name.length < 3 || user.name === undefined) {
      return throwError(() => Error("El nombre del usuario debe tener por lo menos 3 caracteres."));
    }
    else if (user.surname.length < 3 || user.surname === undefined) {
      return throwError(() => Error("El apellido del usuario debe tener por lo menos 3 caracteres."));
    }
    else if (!user.mail.includes('@') || user.mail === undefined) {
      return throwError(() => Error("El correo electrónico debe ser válido."));
    }
      else {
        let data: UserData = user as UserData;
        data.id = uuid;
        return this.http.put<UserData>(`${this.url}/${uuid}`, data);
      }
  }
}
