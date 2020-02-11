import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {CommonService} from '../services/common.service'


@Component({
  selector: 'log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 

    constructor(
        private newService: CommonService,
        
    ) {
        /* redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }*/
    }

    ngOnInit() {
       
    }

   

    onSubmit = function(user,isValid: boolean) {  
  
        user.mode= this.valbutton;  
        //alert(JSON.stringify(user));

         this.newService.userLogin(user)  
         .subscribe(data =>  {  alert(data.data);  
               sessionStorage.setItem('mailid', user.mailid);
         }   
         , error => this.errorMessage = "error" )  
           
       }
}
