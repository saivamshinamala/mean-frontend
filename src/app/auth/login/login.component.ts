import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/posts/post.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedin: boolean = false;
  constructor(private postService: PostService) { }
  

  ngOnInit(): void {
    this.isLoggedin = this.postService.getIsLoggedIn();
  }

  onLogin(formData: NgForm) {
    const email = formData.value.email;
    const password = formData.value.password;
    this.postService.login(email, password);
  }

}
