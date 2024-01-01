import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toasterService: CustomToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toasterService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır!", "Yetkisiz İşlem!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopCenter
          })
          break;
        case HttpStatusCode.InternalServerError:
          this.toasterService.message("Sunucuya erişilmiyor!", "Sunucu hatası!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopCenter
          })
          break;
        case HttpStatusCode.BadRequest:
          this.toasterService.message("Geçersiz istek yapıldı!", "Geçersiz İşlem!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopCenter
          })
          break;
        case HttpStatusCode.NotFound:
          this.toasterService.message("Sayfa bulunamadı!", "Sayfa bulunamadı!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopCenter
          })
          break;
        default:
          this.toasterService.message("Beklenmeyen bir hata meydana geldi!", "Hata!", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopCenter
          })
          break;
      }
      return of(error);
    }));
  }
}
