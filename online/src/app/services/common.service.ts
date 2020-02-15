import { Injectable } from '@angular/core';   
import {Http,Response,Headers, RequestOptions } from '@angular/http';  
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

import { map } from 'rxjs/operators';

  
@Injectable()  
export class CommonService {  
  
  constructor(private http: Http) { }  

  private access_token :any;
  
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
    this.access_token = localStorage.getItem('access_token'); 
    const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8', 'x-access-token': this.access_token});
    const options = new RequestOptions({ headers: headers });

    return this.http.get('http://localhost:8080/api/getCart/', options)  
            .pipe(map((response: Response) => response.json()))              
  }   
  GetProducts(){
    return this.http.get('http://localhost:8080/api/getProducts/')
            .pipe(map((response: Response) => response.json()))
  }

 deleteProductFromCart(params){ 
  this.access_token = localStorage.getItem('access_token'); 
  const headers = new Headers({'x-access-token': this.access_token});
  const options = new RequestOptions({ headers: headers });
    
    return this.http.post('http://localhost:8080/api/DeleteProductFromCart/',params,options)  
            .pipe(map((response: Response) =>response.json()))               
  }  

   

  
}  

