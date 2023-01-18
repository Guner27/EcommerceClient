import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallCircus);
    this.httpClientService.get<Product[]>({
      controller: "products"
    }).subscribe(data => console.log(data));

    /*
    this.httpClientService.post({
      controller: "products"
    }, {
      name:"Kalem",
      stock:100,
      price:15
    }).subscribe();
    

    this.httpClientService.put({
      controller:"products"
    }, {
      id: "258121dc-68ee-43a5-8aa6-379b6398bd68",
      name: "Renkli Kalem",
      stock: 1500,
      price:5.5
    }).subscribe();
    
    this.httpClientService.delete({
      controller: "products"
    }, "2b470ca4-266a-4c48-b38f-8790f262c825").subscribe();
    */
    /*
     this.httpClientService.get({
      fullEndPoint:"https://jsonplaceholder.typicode.com/posts"
     }).subscribe(data=>console.log(data));
     */


  }

}
