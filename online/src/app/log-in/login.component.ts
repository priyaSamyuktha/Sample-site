import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {CommonService} from '../services/common.service'
import {JwtService} from '../services/jwt.service'


@Component({
  selector: 'log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 

    constructor(
        private newService: CommonService,
        private tokenService: JwtService,
        private router: Router
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

         this.tokenService.login(user)  
         .subscribe(data =>  {  alert(data.data);  
               
               this.router.navigateByUrl('/home');
         }   
         , error => alert("Incorrect credential.."))  
           
       }
}
