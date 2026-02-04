import { Departament } from "./departament"

export interface UserData {
    id: string,
    name: string,
    surname: string,
    mail: string,
    departament: Departament,
    birthdate: Date
}
