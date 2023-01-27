import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) // private snackBar: MatSnackBar,
  // private _location: Location
  {}

  canActivate() {
    if (this.authService.isLoggedIn()) {
      // this.snackBar.open('Already Logged in', '', {
      //   duration: 5000,
      //   panelClass: 'error',
      //   horizontalPosition: 'center',
      //   verticalPosition: 'top',
      // });
      this.router.navigate(['/dashboard']);
      // this._location.back();
    }
    return !this.authService.isLoggedIn();
  }
}
