import { FormControl } from "@angular/forms";
import { IClases } from "../../cursos/models";
import { IUser } from "../../users/models";

export interface IInscripciones {
    id: number;
    curso?: IClases;
    user?: IUser;
    userId: number
    cursoId: string
   
}

export interface IInscripcionesForm {
   
    user: FormControl<IUser | null>;
    curso: FormControl<IClases | null>;

}

export interface ICreateInscripcionData {
    curso?: IClases | null;
    user?: IUser | null;
  

}