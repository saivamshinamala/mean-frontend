import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../posts/post.service';

@Component({
  selector: 'app-errormodal',
  templateUrl: './error.model.component.html',
  styleUrls: ['./error.model.component.css']
})
export class ErrormodalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ErrormodalComponent>, private postService: PostService) { }
  errMessage: string;

  ngOnInit(): void {
    this.errMessage = this.postService.getErrorMessage();
  }

  onClose() {
    this.dialogRef.close();
  }


}
