import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostService {
  public API = '//localhost:8080';
  public POST_API = this.API + '/posts';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/post-list');
  }

  getComments(id: string) {
    return this.http.get(this.POST_API + '/' + id + '/comments');
  }

  get(id: string) {
    return this.http.get(this.POST_API + '/' + id);
  }

  save(post: any): Observable<any> {
    let result: Observable<Object>;
    if (post['href']) {
      result = this.http.put(post.href, post);
    } else {
      result = this.http.post(this.POST_API, post);
    }
    return result;
  }

  saveComment(comment: any, postId: string): Observable<any> {
    let result: Observable<Object>;
    if (comment['href']) {
      result = this.http.put(comment.href, comment);
    } else {
      result = this.http.post(this.POST_API + '/' + postId + '/comments', comment);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
