import { UserService } from './user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    localStorage.setItem('returnUrl', returnUrl || '/');

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUSer$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => this.userService.get(user.uid))
    );
  }
}
