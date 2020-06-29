import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/posts/post.service';
import { SignupModel } from './signup-model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ErrormodalComponent } from 'src/app/errormodel/error.model.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoggedin: boolean = false;

  constructor(private postService: PostService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedin = this.postService.getIsLoggedIn();
  }

  onSignup(ngForm: NgForm) {
    const signUp: SignupModel = {
      username: ngForm.value.username,
      email: ngForm.value.email,
      password: ngForm.value.password
    };
    this.postService.signUp(signUp)
    .subscribe(() => {
      this.router.navigate(['/login']);
    }, error => {
      this.postService.setErrorMessage("Email already taken...");
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

}
