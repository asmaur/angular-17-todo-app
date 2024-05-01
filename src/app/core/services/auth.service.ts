import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { ILogin, ILoginResponse } from '../models/auth.model';
import { apiEndpoint } from '../constants/constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  onLogin(data: ILogin){
    return this.httpClient.post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.login}`, data).pipe(
      map((response) => {
        if(response){
          this.tokenService.setToken(response.token);
        }
        return response;
      })
    )
  }

  onLogout(){
    this.httpClient.post(`${apiEndpoint.AuthEndpoint.logout}`, '').subscribe({
      next: (response) => {
        this.tokenService.removeToken();
      }
    })
  }

}
