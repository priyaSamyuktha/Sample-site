import { Input, Component, OnInit  } from '@angular/core';
import {CommonService} from '../services/common.service'

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private newService: CommonService) { }  

  ngOnInit()
  {
   /* let servProd: any;
    this.newService.GetProducts()  
    .subscribe(data =>  {  //alert(JSON.stringify(data));  
      servProd = data;
      alert(JSON.stringify(servProd));
    }   
     )  */
   
  }
}