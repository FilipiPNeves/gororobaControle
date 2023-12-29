import { FirebaseApp } from '@angular/fire/app';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private router: Router, private app: FirebaseApp, private route: Router) {}

  async canActivate(): Promise<boolean> {
    const auth = getAuth(this.app);

    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(true);
        } else {
          this.route.navigate(['login']);
          resolve(false);
        }
      });
    });
  }

}
