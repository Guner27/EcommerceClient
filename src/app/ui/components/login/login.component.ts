import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  constructor(
    private userService: UserService,
    spinner: NgxSpinnerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    super(spinner);
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      console.log(user);
      this.showSpinner(SpinnerType.BallScaleMultiple)
      switch (user.provider) {
        case "GOOGLE":
          await userService.googleLogin(user, () => {
            //Eğer giriş başarılıysa AuthService deki IdentityCheck'i tekrar tetikle(ki yönetim panali görünsün) ve spinneri kapat
            authService.identityChack()
            this.hideSpinner(SpinnerType.BallScaleMultiple)
          })
          break;
        case "FACEBOOK":
          await userService.facebookLogin(user, () => {
            authService.identityChack()
            this.hideSpinner(SpinnerType.BallScaleMultiple)
          })
          break;
      }
    })
  }

  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallScaleMultiple)
    this.userService.login(usernameOrEmail, password, () => {
      this.authService.identityChack();
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if (returnUrl)
          this.router.navigate([returnUrl]);
      })

      this.hideSpinner(SpinnerType.BallScaleMultiple);
    });
  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
