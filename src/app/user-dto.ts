import { Departament } from "./departament";

export interface UserDto {
  name: string;
  surname: string;
  mail: string;
  departament: Departament;
  birthdate: Date;
}
