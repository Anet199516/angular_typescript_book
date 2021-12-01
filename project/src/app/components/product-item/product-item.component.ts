import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../services/product-service.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  // @ts-ignore
  @Input() product: Product = {};

  constructor() { }

  ngOnInit(): void {
  }

}
