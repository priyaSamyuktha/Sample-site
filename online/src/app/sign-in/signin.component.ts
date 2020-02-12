import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {CommonService} from '../services/common.service'
import {JwtService} from '../services/jwt.service'


@Component({
  selector: 'sign-in',
  templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit {
 

    constructor(
        private newService: CommonService,
        private tokenService: JwtService
    ) {
        /* redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }*/
    }

    ngOnInit() {
     
    }

   

    onSubmit = function(user,isValid: boolean) {  
  alert(JSON.stringify(user));
        user.mode= this.valbutton;  
         this.tokenService.register(user)  
         .subscribe(data =>  {  alert(data.data);  
              
         }   
         , error => this.errorMessage = "error" )  
           
       }
}
