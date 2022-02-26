import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading!: Observable<boolean>;
  loginFG!: FormGroup
  
  constructor(private readonly fb: FormBuilder,private router: Router,
    private authService: AuthService, private store: Store<fromRoot.State>) { }

  maxDate: any;

  ngOnInit(): void {
    this.isLoading = this.store.select(fromRoot.getIsLoading);
    this.createFormGroup();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  createFormGroup(){
    this.loginFG = this.fb.group({
      email: ['', Validators.minLength(2)],
      password: ['', Validators.minLength(6)],
      date: [''],
    })
  }

  onSubmit(e: any){
    e.preventDefault();
    let user = {
      email: this.loginFG.value.email,
      password: this.loginFG.value.password,
      date: this.loginFG.value.date.getFullYear(),
    }
     this.authService.registerUser(user);

    // this.router.navigate(['/welcome']);
  }

}
