import { Post } from './post.modal';
import { HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { SignupModel } from '../auth/signup/signup-model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ErrormodalComponent } from '../errormodel/error.model.component';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class PostService {

    viewAllPosts: Post[] = [];
    editPost: Post;
    postPerPage: number;
    currentPage: number;
    token = "";
    isAuthenticUser = new Subject<boolean>();
    isLoggedin = false;
    timer: any;
    errorMessage: any;


    constructor(private httpClient: HttpClient, private router: Router, private dialog: MatDialog) {};

    newPostCreated(post: Post){
        return this.httpClient.post(environment.apiUrl + "api/add-post", post);
    }

    getAllPosts(postPerPage: number, currentPage: number) {
        this.postPerPage = postPerPage;
        this.currentPage = currentPage;
        const queryParams = `?pagesize=${ postPerPage}&currentpage=${ currentPage }`;
        return this.httpClient.get<{message: string, posts: Post, maxposts: string }>(environment.apiUrl + "api/posts/" + queryParams);
    }

    postEditedData(post: Post) {
        return this.httpClient.put(environment.apiUrl + "api/update-post/" + post._id, post);
    }

    deletePost(id: string) {
        return this.httpClient.delete(environment.apiUrl + "api/delete-post/" + id);
    }

    signUp(signUp : SignupModel) {
        return this.httpClient.post(environment.apiUrl + "api/signup", signUp);
    }

    getIsAuthenticUser() {
        return this.isAuthenticUser.asObservable();
    }    

    getIsLoggedIn() {
        return this.isLoggedin;
    }

    login(email: string, password: string) {
        const loginModel = {
            email: email,
            password: password
        }
        return this.httpClient.post<{ token: string, id: string, expiresIn: number}>(environment.apiUrl + "api/login", loginModel)
        .subscribe(result => {
            this.token = result.token;
            this.isLoggedin = true;
            this.isAuthenticUser.next(true);
            this.setAuthTimer(result.expiresIn);
            const now = new Date();
            const expiresDate = new Date(now.getTime() + result.expiresIn * 1000);
            this.saveAuthData(this.token, expiresDate);
            this.router.navigateByUrl("/");
          }, error => {
            this.setErrorMessage("Invalid email or password...");
            this.onError();
          });
    }

    onError() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "40%";
        dialogConfig.height = "35%";
        this.dialog.open(ErrormodalComponent, dialogConfig);
      }

    getToken() {
        return this.token;
    }

    private setAuthTimer(duration: number) {
        this.timer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    logout() {
        clearTimeout(this.timer);
        this.token = null;
        this.isLoggedin = false;
        this.isAuthenticUser.next(false);
        this.clearAuthData();
        this.router.navigateByUrl("/login")
    }

    private saveAuthData(token :string, expireDate: Date) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiresDate", expireDate.toISOString());
    }
    private clearAuthData() {
        localStorage.clear();
    }

    getAuthDataFormLocalAutomatically() {
        const authInformation = this.getAuthData();
        if(!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expiresDate.getTime() - now.getTime();
        if(expiresIn > 0) {
            this.token = authInformation.token;
            this.isLoggedin = true;
            this.setAuthTimer(expiresIn / 1000);
            this.isAuthenticUser.next(true);
        }
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expiresDate = localStorage.getItem("expiresDate");

        if(!token && !expiresDate) {
            return;
        }

        return {
            token: token,
            expiresDate: new Date(expiresDate)
        }
    }

    setErrorMessage(err: any) {
        this.errorMessage = err;
    }

    getErrorMessage() {
        return this.errorMessage;
    }
}