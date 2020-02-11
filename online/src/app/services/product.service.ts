import { Injectable, OnInit } from '@angular/core';
import  *  as  data  from  './sareeCollection.json';
import { Product } from '../entities/product.entity';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable()
export class ProductService implements OnInit {

    private products: Product[];

    ngOnInit()
    {
     

    }

    constructor() {
        this.products = (data as any).default;
    }

    findAll(): Product[] {
        return this.products;
    }

    find(id: string): Product {
        return this.products[this.getSelectedIndex(id)];
    }

    private getSelectedIndex(id: string) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id) {
                return i;
            }
        }
        return -1;
    }

}