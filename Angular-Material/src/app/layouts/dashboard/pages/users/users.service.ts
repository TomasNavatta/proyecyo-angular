import { Injectable } from "@angular/core";
import { CreateuserPayload, IUser } from "./models";
import { Observable, catchError, delay, first, of, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";


@Injectable ({ providedIn: 'root'})

export class UsersService {
    constructor(private httpClient: HttpClient) {}


    getUsers(): Observable<IUser[]> {
        return this.httpClient.get<IUser[]>(environment.baseAPIURL + '/users')
        
    }

    getUserById(id: string): Observable<IUser | undefined> {
        return this.httpClient.get<IUser>(`${environment.baseAPIURL}/users/${id}`)
    }


    createUser(payload: CreateuserPayload): Observable<IUser> {
        return this.httpClient.post<IUser>(`${environment.baseAPIURL}/users`, payload);
    }

    

}