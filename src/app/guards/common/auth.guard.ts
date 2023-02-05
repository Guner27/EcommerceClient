import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private jwtHelper: JwtHelperService, 
    private router: Router,
    private toastrService : CustomToastrService,
    private spinner: NgxSpinnerService
    ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //Nereden geldiğini tutan route parametresi, Nereye gideceğini tutan da state parametresi

    this.spinner.show(SpinnerType.BallScaleMultiple);
    const token: string = localStorage.getItem("accessToken");

    // const decodeToken = this.jwtHelper.decodeToken(token);                     //Token'i çöz
    // const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token); //Token'in son kullanma tarihi nedir?
    // const expidet: boolean = this.jwtHelper.isTokenExpired(token);             //Token'in süresi dolmuş mu?
    let expired:boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      expired = true;
    }

    //Eğer token yoksa veya expire edilmişse Login sayfasına yönlendir.
    if(!token|| expired){
      //state:gitmek istenen component yolu, state.url: gitmek istenen componentin Url'i
      this.router.navigate(["login"],{queryParams:{returnUrl:state.url}});
      this.toastrService.message("Oturum açmanız gerekiyor!", "Yetkisiz Erişim!", {
        messageType:ToastrMessageType.Warning,
        position:ToastrPosition.TopCenter 
      })
    }

    this.spinner.hide(SpinnerType.BallScaleMultiple);
    return true;
  }

}
