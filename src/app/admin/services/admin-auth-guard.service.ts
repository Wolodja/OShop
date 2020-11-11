import { UserService } from 'shared/services/user.service';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }


  canActivate(): Observable<boolean> {
    return this.auth.appUSer$.pipe(
      map(x => x.isAdmin)
    );
  }
}
