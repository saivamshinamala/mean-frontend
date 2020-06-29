import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../post.modal';
import { PostService } from '../post.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditmodalComponent } from '../editmodal/editmodal.component';
import { stringify } from 'querystring';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {

  constructor(private postService: PostService, private dialog: MatDialog) { }

  viewAllPosts: Post;
  reversePosts: Post;
  currentpage = 1;
  totalPosts: number;
  postsPerPage = 3;
  pageSizeOptions = [1, 3, 6, 10];
  creator: string;
  isLoading = false;

  ngOnInit(): void { 
    this.postService.getAllPosts(this.postsPerPage, 1)
    .subscribe((res) => {
      this.isLoading = true;
      this.viewAllPosts = res.posts;
      this.totalPosts = +res.maxposts;
  });
  }

  onDelete(_id: string) {
    this.postService.deletePost(_id)
    .subscribe(() => {

    });
    this.postService.getAllPosts(this.postsPerPage, this.currentpage)
    .subscribe((res) => {
      this.viewAllPosts = res.posts;
  });
  }

  onEdit(editPost: Post) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = "50%";
    this.postService.editPost = editPost;
    this.dialog.open(EditmodalComponent, dialogConfig);
  }

  onPageChange(event: PageEvent) {
    this.currentpage = event.pageIndex + 1;
    this.postsPerPage = event.pageSize;
    this.postService.getAllPosts(this.postsPerPage, this.currentpage)
    .subscribe((res) => {
      this.viewAllPosts = res.posts;
  });
  }

}
