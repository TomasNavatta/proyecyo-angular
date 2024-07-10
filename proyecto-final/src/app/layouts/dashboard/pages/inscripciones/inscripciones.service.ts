import { Injectable } from "@angular/core";
import { Observable, delay, of } from "rxjs";
import { ICreateInscripcionData, IInscripciones } from "./models";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";




@Injectable({providedIn: 'root'})
export class InscricpionesService {
    constructor(private http: HttpClient) {}
    getInscripciones(): Observable<IInscripciones[]> {
      
       return this.http.get<IInscripciones[]>(`${environment.baseAPIURL}/inscripciones?_embed=user&_embed=curso`)
      // return this.http.get<ISale[]>(`${environment.baseAPIURL}/sales?_embed=user&_embed=product`)
    }

    getInscripcionesByUserId(uid: string): Observable<IInscripciones[]> {
        //return this.http.get<IInscripciones[]>(`${environment.baseAPIURL}/inscripciones?userId=${uid}`)
        return this.http.get<IInscripciones[]>(`${environment.baseAPIURL}/inscripciones?userId=${uid}$_embed=curso`)
    }

    createInscripciones(data: ICreateInscripcionData) {
        return this.http.post<IInscripciones>(`${environment.baseAPIURL}/inscripciones`, data)

        
    }

    

    deleteInscripcionById(id: string): Observable<IInscripciones> {
        return this.http.delete<IInscripciones>(environment.baseAPIURL + '/inscripciones/' + id )
      }
    


      updateInscripcion(payload: IInscripciones): Observable<IInscripciones> {
        return this.http.put<IInscripciones>(`${environment.baseAPIURL}/inscripciones/${payload.id}`, payload);
      }
      
}