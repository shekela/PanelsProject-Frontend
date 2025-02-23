import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decode the token
        if (decodedToken?.role === 'Admin') {
          return true; // Allow access if the role is 'Admin'
        } else {
          this.router.navigate(['/admin/login']); // Redirect if not an admin
          return false;
        }
      } catch (error) {
        console.error('Invalid token:', error);
        this.router.navigate(['/admin/login']); // Redirect if token is invalid
        return false;
      }
    } else {
      this.router.navigate(['/admin/login']); // Redirect if no token found
      return false;
    }
  }
}