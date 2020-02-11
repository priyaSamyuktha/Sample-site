import { Input, OnInit, Component } from '@angular/core';


import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import {CommonService} from '../services/common.service';

@Component({
  selector: 'sarees-section',
  templateUrl: './sarees.component.html',
  styleUrls: ['./sarees.component.css']
})
export class SareesComponent implements OnInit {

    private products: any[];
    
    constructor(
		private productService: ProductService,private newService: CommonService 
    ) { }
        
    ngOnInit(){
      let product: any;
      this.newService.GetProducts()  
      .subscribe(data =>  {  //alert(JSON.stringify(data));  
        this.products = data; 
      }   
       )  
      // alert(JSON.stringify(products));
      //this.products = this.productService.findAll();
    }
}