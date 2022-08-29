import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  // checks whether the current player has permission to access the current route
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // get player data from localStorage
    // if there exist player data in localStorage, the current player can access the current route
    if (this._authService.get('player')) {
      return true;
    }

    // navigate to the login page as default action
    this._router.navigate(['login']);

    // current player does not have permission to access the current route as default
    return false;
  }
}