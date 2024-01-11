import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { loginGuard } from '../guards/login.guard';
import { LocalDbPersist } from './db.service';
import { DB_FLAGS } from '../models/db.model';
import { ILoginResponse } from '../../pages/landing/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private readonly router:Router) { }

  Login = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    var credential = LocalDbPersist<ILoginResponse>().get(DB_FLAGS.CREDENTIAL)
    if(!credential) {
      this.router.navigateByUrl('404')
      return false
    }
    return true
  }
}
