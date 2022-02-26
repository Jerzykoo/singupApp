import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import { Store } from '@ngrx/store';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private router: Router, private store: Store<fromRoot.State>) { }

  initAuthListener(){
    console.log('wywoluje sie');

    this.afAuth.authState.subscribe(user => {
      if(user){
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/workers-list']);
      }else{
        // this.trainingService.cancelSubscription();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  isAuth(){
    return this.isAuthenticated;
  }

  registerUser(user: any){
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
        .then((result: any) => {
          this.store.dispatch(new UI.StopLoading());
          this.authChange.next(true);
          this.router.navigate(['/learning']);
        })
        .catch((error: any) => {
          this.store.dispatch(new UI.StopLoading());
          this.authChange.next(false);
        })
  }

  loginUser(user: any){
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.signInWithEmailAndPassword(user.email,user.password)
      .then((result: any) => {
        this.store.dispatch(new UI.StopLoading());
        this.authChange.next(true);
        this.isAuthenticated = true;
        this.router.navigate(['/learning']);
      })
      .catch((error: any) => {
        this.store.dispatch(new UI.StopLoading());
        this.authChange.next(false);
        this.isAuthenticated = false;
      });
  }

  logout(){
    this.afAuth.signOut();
  }
}
