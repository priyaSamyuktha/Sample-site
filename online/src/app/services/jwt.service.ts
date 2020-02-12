import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
providedIn: 'root'
})

export class JwtService {
    constructor(private httpClient: HttpClient) { }

    login(user) {
        return this.httpClient.post<{token:  string}>('http://localhost:8080/api/UserLogin/', user).pipe(tap(res => {
        localStorage.setItem('access_token', res.token);
    }))
    }

    register(user) {
        return this.httpClient.post<{access_token: string}>('http://localhost:8080/api/SaveUser/',user).pipe(tap(res => {
        this.login(user)
    }))
    }
    
    logout() {
        localStorage.removeItem('access_token');
      }

    public get loggedIn(): boolean{
        return localStorage.getItem('access_token') !==  null;
      }

}