import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  identityChack() {
    const token: string = localStorage.getItem("accessToken");

    // const decodeToken = this.jwtHelper.decodeToken(token);                     //Token'i çöz
    // const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token); //Token'in son kullanma tarihi nedir?
    // const expidet: boolean = this.jwtHelper.isTokenExpired(token);             //Token'in süresi dolmuş mu?
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      expired = true;
    }

    _isAuthenticated = token != null && !expired;
  }
  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;