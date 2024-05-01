import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { 
    const token = this.getToken();
    if(token){
      this.updateToken(true);
    }
  }

  setToken(token: string){
    this.updateToken(true);
    localStorage.setItem(constants.CURRENT_TOKEN, token)
  }

  getToken(){
    return localStorage.getItem(constants.CURRENT_TOKEN)
  }

  updateToken(status: boolean){
    this.isAuthenticated.next(status)
  }
  removeToken(){
    this.updateToken(false);
    return localStorage.removeItem(constants.CURRENT_TOKEN);
  }

}
