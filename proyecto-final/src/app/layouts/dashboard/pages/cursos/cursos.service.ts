import { Injectable } from '@angular/core';
import { ICreateClassPayload, IClases } from './models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class CursosService {

  constructor(private httpClient: HttpClient) { }

  getCursos(): Observable<IClases[]> {
    return this.httpClient.get<IClases[]>(
      environment.baseAPIURL + '/cursos'
    );
  }

  createCurso(payload: ICreateClassPayload): Observable<IClases> {
    return this.httpClient.post<IClases>(environment.baseAPIURL + '/cursos', payload )
  }

  deleteCursoById(id: string): Observable<IClases> {
    return this.httpClient.delete<IClases>(environment.baseAPIURL + '/cursos/' + id )
  }

  updateCurso(payload: IClases): Observable<IClases> {
    return this.httpClient.put<IClases>(`${environment.baseAPIURL}/cursos/${payload.id}`, payload);
  }
  
  
}
