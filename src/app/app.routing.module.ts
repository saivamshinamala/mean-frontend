import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router'
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './posts/home/home.component';
import { AuthGuard } from './posts/auth-gaurd';

const route: Route[] = [
    { path: "", component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(route)
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }