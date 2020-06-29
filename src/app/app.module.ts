import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'


import { CreatepostComponent } from './posts/createpost/createpost.component';
import { ViewpostComponent } from './posts/viewpost/viewpost.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { PostService } from './posts/post.service';
import { EditmodalComponent } from './posts/editmodal/editmodal.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './posts/home/home.component';
import { AuthInterceptors } from './auth/auth-inteceptor';
import { ErrormodalComponent } from './errormodel/error.model.component';
import { AngularMaterialModule } from './angular.material.module';

@NgModule({
  declarations: [
    AppComponent,
    CreatepostComponent,
    ViewpostComponent,
    HeaderComponent,
    EditmodalComponent,
    ErrormodalComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    AngularMaterialModule
  ],
  providers: [PostService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptors, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [EditmodalComponent, ErrormodalComponent]
})
export class AppModule { }
