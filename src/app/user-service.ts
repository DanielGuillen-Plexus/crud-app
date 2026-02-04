import { Injectable } from '@angular/core';
import { UserData } from './user-data';
import { UserDto } from './user-dto';
import { HttpClient } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { formatDate } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  /**
   * Returns an observable with the user list.
   * @returns 
   */
  getAllUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.url);
  }

/**
 * returns a specific used based on the id
 * @param id id of the user
 * @returns 
 */
  getSpecificUser(id: string): Observable<UserData | undefined> {
    return this.http.get<UserData>(`${this.url}/${id}`);
  }

  /**
   * Searchs the database for the email, returns true if it is found and the user's id is not the one sent.
   * @param id user's id
   * @param mail Email to search
   * @returns Observable with a boolean
   */
  findUserMail(id: string, mail: string): Observable<boolean> {
    return this.http.get<UserData[]>(this.url).pipe(
      map((users) => {
        const exists = users.some(
          (user) => user.mail.toLowerCase() === mail.toLowerCase() && user.id !== id,
        );
        return exists;
      }),
    );
  }

  /**
   * Search the database
   * @param mail Emails to search in the database
   * @returns Observable with a boolean
   */
  findNewUserMail(mail: string): Observable<boolean> {
    return this.http.get<UserData[]>(this.url).pipe(
      map((users) => {
        const exists = users.some((user) => user.mail.toLowerCase() === mail.toLowerCase());
        return exists;
      }),
    );
  }

  /**
   * Saves user in the "database", checks if there are errors and throws errors if true.
   * @param user DTO with userdata
   * @returns Observable to subscribe
   */
  saveUser(user: UserDto): Observable<UserData> {
    if (user.name.length < 3 || user.name === undefined) {
      return throwError(() => Error('El nombre del usuario debe tener por lo menos 3 caracteres.'));
    } else if (user.surname.length < 3 || user.surname === undefined) {
      return throwError(() =>
        Error('El apellido del usuario debe tener por lo menos 3 caracteres.'),
      );
    } else if (!user.mail.includes('@') || user.mail === undefined) {
      return throwError(() => Error('El correo electrónico debe ser válido.'));
    }
    let data: UserData = user as UserData;
    data.id = crypto.randomUUID();
    // data.birthdate = formatDate(data.birthdate, "yyyy/mm/dd", 'es-ES');
    return this.http.post<UserData>(this.url, data);
  }

  /**
   * Returns a Observable to delete the user based on their id
   * @param uuid Id of the user
   * @returns 
   */
  deleteUser(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${uuid}`);
  }

  /**
   * Updates the user, checks if there are errors and throws errors if true.
   * @param uuid Id of the user
   * @param user UserData DTO with the user's data
   * @returns Observable to subscribe
   */
  updateUser(uuid: string, user: UserDto): Observable<UserData> {
    if (user.name.length < 3 || user.name === undefined) {
      return throwError(() => Error('El nombre del usuario debe tener por lo menos 3 caracteres.'));
    } else if (user.surname.length < 3 || user.surname === undefined) {
      return throwError(() =>
        Error('El apellido del usuario debe tener por lo menos 3 caracteres.'),
      );
    } else if (!user.mail.includes('@') || user.mail === undefined) {
      return throwError(() => Error('El correo electrónico debe ser válido.'));
    } else {
      let data: UserData = user as UserData;
      data.id = uuid;
      return this.http.put<UserData>(`${this.url}/${uuid}`, data);
    }
  }
}
