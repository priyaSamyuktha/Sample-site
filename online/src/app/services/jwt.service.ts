import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
providedIn: 'root'
})

export class JwtService {
    constructor(private httpClient: HttpClient) { }

    login(user) {
        return this.httpClient.post<{token:  string , user:any}>('http://localhost:8080/api/UserLogin/', user).pipe(tap(res => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('mailid', res.user.mailid);
    }))
    }

    register(user) {
        return this.httpClient.post<{access_token: string}>('http://localhost:8080/api/SaveUser/',user).pipe(tap(res => {
        
    }))
    }
    
    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('mailid');
      }

    public loggedIn(): boolean{
        return localStorage.getItem('access_token') !==  null;
      }

}