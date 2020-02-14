import { Input, Component, OnInit } from '@angular/core';
import {JwtService} from './services/jwt.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private loggedIn : any;

  ngOnInit()
  {
    this.loggedIn = this.tokenService.loggedIn() ;
    //alert(this.loggedIn);
  }

  constructor(
    private tokenService: JwtService,private router: Router
) {
    /* redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }*/
}
  loginCheck = function() 
  {
    
    if(!this.loggedIn)
    {
      this.router.navigateByUrl('/login');
    }
    else
    {
      alert("You have already logged in!")
    }

  }

  logout = function()
  {
    this.tokenService.logout();
    this.loggedIn = this.tokenService.loggedIn() ;
    this.router.navigateByUrl('/home');
  }
  
}