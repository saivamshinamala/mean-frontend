import { Component, Input, OnInit } from '@angular/core';

import { Post } from './posts/post.modal';
import { PostService } from './posts/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getAuthDataFormLocalAutomatically();
  }
  storedPosts: Post[] = [];
  isLogin: Boolean = false;

  onPostCreated(event: any) {
    this.storedPosts.push(event);
  }

  loginCheck(event: any) {
    this.isLogin = true;
    console.log("yes")
  }

}
