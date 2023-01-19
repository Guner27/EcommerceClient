import { Injectable } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpCliendService: HttpClientService) { }
  create(product: Create_Product, successCallBack?: any) {
    this.httpCliendService.post({
      controller: "products"
    }, product)
      .subscribe(result => {
        successCallBack();
      })
  }
}
