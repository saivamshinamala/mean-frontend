import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts/post.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private postService: PostService) { }
  isUserLoggedIn = false;

  ngOnInit(): void {
    this.isUserLoggedIn = this.postService.getIsLoggedIn();
    this.postService.getIsAuthenticUser()
    .subscribe(res => {
      this.isUserLoggedIn = res;
    });
  }


  onLogout() {
    this.postService.logout();
  }

}
