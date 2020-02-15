import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../entities/product.entity';
import { Item } from '../entities/item.entity';
import { ProductService } from '../services/product.service';
import {CommonService} from '../services/common.service'

@Component({
	templateUrl: 'cart.component.html'
})

export class CartComponent implements OnInit {

	private cartList : any;
	private quantity : any;
	private products : any;
	private userDetail : any;
	private id : any;
	private flag = 0;
	private total = 0;
	private cart: any = [];
	private mailid : any;

	constructor(
		private activatedRoute: ActivatedRoute,
		private productService: ProductService,
		private newService: CommonService
	) { }

	async ngOnInit() {

 		
		this.activatedRoute.params.subscribe(params => {
			this.id = params['id'];
			
		});
		 
		this.mailid = localStorage.getItem('mailid');
			
		if(this.mailid)	
		{
			
				this.newService.GetCart()  
					.subscribe(
						data =>  { 
							this.cartList = data; 
							
					if (this.id) {

						
						

								this.userDetail = { 
									"mailid": this.mailid,     
									"prodID" : this.id,        
									"quantity" : 1	    
								 };
				
							for(let i=0;i<this.cartList.length;i++)
							{
								if(this.cartList[i].prodID == this.id)
								{
									//set flag product is already in the cart
									this.flag = 1;
								}
							}
							//alert(this.flag);
							if(this.flag == 0) //Only if product is not in cart add to Cart
							{
								this.newService.saveProdToCart(this.userDetail)  
								.subscribe(data =>  {  
									alert(data.data); 
									this.loadCart(); 
									
								}) 
							}
							else{
								this.loadCart(); 
							}
							
					}
					else{
						this.loadCart();
					}
		
				}   
				 )
		}
			 
		
	}

	loadCart(): void {
		

		this.newService.GetCart()  
			.subscribe(
			data =>  { 
						this.cartList = data; 
						if(this.cartList)
						{	
							this.newService.GetProducts()  
								.subscribe(data =>  {  
								  this.products = data;  
								  this.cart = [];
			  						if(this.products)
			  						{
				 					 for(let i=0;i<this.cartList.length;i++)
				 					 {
										 for(let j=0;j<this.products.length;j++)
					 					{ 
						  
											 if(this.cartList[i].prodID == this.products[j].prodID) 
											 { 	
							 
												 this.cart.push(this.products[j]);
							 					 this.quantity = this.cartList[i].quantity;
							 					 this.total += this.products[j].price * this.quantity;
												 break;
						 					}
					 					}
				  					}
			  						}
							}   
		 					)}
					})
		 
		
		//console.log(JSON.stringify(this.cart))

		

		/*this.total = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
			this.total += item.product.price * item.quantity;
		}*/
	}

	remove(prodID: any): void {
		
		let params : any;
		params = {"prodID":prodID};
		alert(params);
		this.newService.deleteProductFromCart(params)
		.subscribe(data =>
			 {
				 alert(JSON.stringify(data));
			 }

		)
		
		this.loadCart();
	}


}