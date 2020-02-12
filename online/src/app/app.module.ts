import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';  
import { HttpClientModule  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './log-in/login.component';
import {SigninComponent} from './sign-in/signin.component';
import {SareesComponent} from './saree-collection/sarees.component';
import {CartComponent} from './cart/cart.component'
import {CommonService} from './services/common.service';
import {ProductService} from './services/product.service'
import { FormsModule }   from '@angular/forms';

import { JwtModule } from '@auth0/angular-jwt';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'cart', component: CartComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,HomeComponent,LoginComponent,SigninComponent,SareesComponent,CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,FormsModule,  HttpModule, HttpClientModule , 
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('access_token');},
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    })
  ],
  providers: [CommonService,ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
