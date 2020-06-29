import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostService } from '../posts/post.service';

@Injectable()
export class AuthInterceptors implements HttpInterceptor {
    constructor(private postService: PostService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.postService.getToken();
        const authReq = req.clone({
            headers: req.headers.set('Authorization', "Bearer " + authToken)
        });
        return next.handle(authReq);
    }
}