import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Product } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpCliendService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errosMessage: string) => void) {
    this.httpCliendService.post({
      controller: "products"
    }, product)
      .subscribe(result => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);

      })
  }

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void):
    Promise<{ totalCount: number; products: List_Product[] }> {
    const promisDate: Promise<{ totalCount: number; products: List_Product[] }> = this.httpCliendService.get<{ totalCount: number; products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promisDate.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promisDate;
  }


  async delete(id:string){
    const deleteObservable: Observable<any> = this.httpCliendService.delete({
      controller:"products"
    },id);
    await firstValueFrom(deleteObservable);   //Read'da kullanılan Promise yerine bu fonksiyon kullanılabilir.
  }
}
