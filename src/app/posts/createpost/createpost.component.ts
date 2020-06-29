import {
  Component,
  OnInit
} from '@angular/core';

import {
  Post
} from '../post.modal';
import {
  NgForm
} from '@angular/forms';
import {
  PostService
} from '../post.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  inputTitle = "";
  inputContent = "";
  isAdded = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {}

  onSavePost(formData: NgForm) {
    if (!formData.valid)
      return;
    const userData: Post = {
      _id: "",
      title: formData.value.title,
      content: formData.value.content
    };
    this.postService.newPostCreated(userData)
      .subscribe(res => {
        this.isAdded = true;
        window.location.reload();
      });
    formData.resetForm();
  }

}
