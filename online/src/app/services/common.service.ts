import { Injectable } from '@angular/core';   
import {Http,Response } from '@angular/http';   

import { map } from 'rxjs/operators';

  
@Injectable()  
export class CommonService {  
  
  constructor(private http: Http) { }  
  
  saveUser(user){      
    return this.http.post('http://localhost:8080/api/SaveUser/', user)  
            .pipe(map((response: Response) =>response.json()))              
  }  
  userLogin(user){       
    return this.http.post('http://localhost:8080/api/UserLogin/',user)  
            .pipe(map((response: Response) => response.json()))              
  } 
  saveProdToCart(prod){
    return this.http.post('http://localhost:8080/api/SaveProductsToCart/',prod)  
            .pipe(map((response: Response) => response.json()))      
  }
  loadProduct(id){       
    return this.http.post('http://localhost:8080/api/LoadProduct/',id)  
            .pipe(map((response: Response) => response.json()))              
  }
  GetUser(){       
    return this.http.get('http://localhost:8080/api/getUser/')  
            .pipe(map((response: Response) => response.json()))              
  }
  GetCart(){       
    return this.http.get('http://localhost:8080/api/getCart/')  
            .pipe(map((response: Response) => response.json()))              
  }   
  GetProducts(){
    return this.http.get('http://localhost:8080/api/getProducts/')
            .pipe(map((response: Response) => response.json()))
  }

 deleteUser(id){   
    return this.http.post('http://localhost:8080/api/deleteUser/',{'id': id})  
            .pipe(map((response: Response) =>response.json()))               
  }  
  
}  

