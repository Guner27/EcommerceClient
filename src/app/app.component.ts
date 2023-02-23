import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EcommerceClient';
  constructor(public authService: AuthService, private toastrService: CustomToastrService, private router: Router) {
    authService.identityChack();
  }
  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityChack();
    this.router.navigate([""]); //Anasayfaya Yönlendir.
    this.toastrService.message("Oturum kapatılmıştır!", "Oturum Kapatıldı", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopCenter
    })
  }

}


