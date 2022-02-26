import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LearningComponent } from './learning/learning.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WorkersListComponent } from './workers/workers-list/workers-list.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent, canActivate: [AuthGuard]
   },
  {
    path: 'login',
    component: LoginComponent
   },
  {
    path: 'signup',
    component: SignupComponent
   },
  {
    path: 'welcome',
    component: WelcomeComponent, canActivate: [AuthGuard]
   },
  {
    path: 'learning',
    component: LearningComponent, canActivate: [AuthGuard]
   },
  {
    path: 'workers-list',
    component: WorkersListComponent, canActivate: [AuthGuard]
   },
  {
    path: '**',
    component: LoginComponent
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]

})
export class AppRoutingModule { }
