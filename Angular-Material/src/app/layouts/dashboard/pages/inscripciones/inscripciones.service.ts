import { Injectable } from "@angular/core";
import { Observable, delay, of } from "rxjs";
import { ICreateInscripcionData, IInscripciones } from "./models";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";




@Injectable({providedIn: 'root'})
export class InscricionesService {
    constructor(private http: HttpClient) {}
    getInscripciones(): Observable<IInscripciones[]> {
      
       return this.http.get<IInscripciones[]>(environment.baseAPIURL + '/inscripciones')
      // return this.http.get<ISale[]>(`${environment.baseAPIURL}/sales?_embed=user&_embed=product`)
    }

    getInscripcionesByUserId(uid: string): Observable<IInscripciones[]> {
        return this.http.get<IInscripciones[]>(`${environment.baseAPIURL}/inscripciones?userId=${uid}`)
        //return this.http.get<ISale[]>(`${environment.baseAPIURL}/sales?userId=${uid}$_embed=product`)
    }

    createInscripciones(data: ICreateInscripcionData) {
        return this.http.post<IInscripciones>(`${environment.baseAPIURL}/inscripciones`, data)

        
    }




    deleteInscripcion(id: number) {
        return of([])
    }


    upsateInscripcion(id: number, data: IInscripciones) {
     //   return of (SALES_DB.map((sale)=> sale.id === id ? {...sale, ...data} : sale))
    }
}