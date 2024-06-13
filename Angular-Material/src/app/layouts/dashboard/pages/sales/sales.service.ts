import { Injectable } from "@angular/core";
import { Observable, delay, of } from "rxjs";
import { ICreateSaleData, ISale } from "./models";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";




@Injectable({providedIn: 'root'})
export class SalesService {
    constructor(private http: HttpClient) {}
    getSales(): Observable<ISale[]> {
      
       return this.http.get<ISale[]>(environment.baseAPIURL + '/sales')
      // return this.http.get<ISale[]>(`${environment.baseAPIURL}/sales?_embed=user&_embed=product`)
    }

    getSalesByUserId(uid: string): Observable<ISale[]> {
        return this.http.get<ISale[]>(`${environment.baseAPIURL}/sales?userId=${uid}`)
        //return this.http.get<ISale[]>(`${environment.baseAPIURL}/sales?userId=${uid}$_embed=product`)
    }

    createSales(data: ICreateSaleData) {
        return this.http.post<ISale>(`${environment.baseAPIURL}/sales`, data)

        
    }




    deleteSale(id: number) {
        return of([])
    }


    upsateSale(id: number, data: ISale) {
     //   return of (SALES_DB.map((sale)=> sale.id === id ? {...sale, ...data} : sale))
    }
}