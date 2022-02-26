import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading!: Observable<boolean>;
  loginFG!: FormGroup;
  constructor(private readonly fb: FormBuilder,private router: Router, private authService: AuthService, private store: Store<fromRoot.State> ) { }

  ngOnInit(): void {
    this.isLoading = this.store.select(fromRoot.getIsLoading);
    this.createFormGroup();

  }

  createFormGroup(){
    this.loginFG = this.fb.group({
      email: ['', Validators.minLength(2)],
      password: ['', Validators.minLength(2)],
    })
  }

  onSubmit(e: any){
    e.preventDefault();
    let user = {
      email: this.loginFG.value.email,
      password: this.loginFG.value.password,
    }
    this.authService.loginUser(user);
    // this.router.navigate(['/welcome']);
  }

}
