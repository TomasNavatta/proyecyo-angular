import { Injectable } from '@angular/core';
import { ICreateClassPayload, IClases } from './models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<IClases[]> {
    return this.httpClient.get<IClases[]>(
      environment.baseAPIURL + '/products'
    );
  }

  createProduct(payload: ICreateClassPayload): Observable<IClases> {
    return this.httpClient.post<IClases>(environment.baseAPIURL + '/products', payload )
  }

  deleteProductById(id: number): Observable<IClases> {
    return this.httpClient.delete<IClases>(environment.baseAPIURL + '/products' + id )
  }
}
