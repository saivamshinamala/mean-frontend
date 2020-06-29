import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../post.service';
import { Post } from '../post.modal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editmodal',
  templateUrl: './editmodal.component.html',
  styleUrls: ['./editmodal.component.css']
})
export class EditmodalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditmodalComponent>, private postService: PostService) { }

  editPost: Post;
  isEditedSuccessfully = false;
  ngOnInit(): void {
    this.editPost = this.postService.editPost;
  }

  onClose() {
    this.dialogRef.close();
  }

  onSavePost(formData: NgForm) {
    const editedPost = {
      _id: this.editPost._id,
      title: formData.value.title,
      content: formData.value.content
    }
    this.postService.postEditedData(editedPost)
    .subscribe((res) => {
      this.isEditedSuccessfully = true;
      setTimeout(() => {
        this.onClose();
      }, 1500);
    });
  }

}
