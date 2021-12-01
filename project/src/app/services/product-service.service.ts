import { Injectable } from '@angular/core';

export interface Product { // move to models
  price: string;
  title: string | number;
  description: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProduct(): Product[] {
    const products: Product[] = [
      {title: 'Test', price: '77', rating: 9, description: 'Lorem....'},
      {title: 'Test', price: '77', rating: 9, description: 'Lorem....'},
      {title: 'Test', price: '77', rating: 9, description: 'Lorem....'},
    ];

    return products;
  }
}
