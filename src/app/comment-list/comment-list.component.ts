import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PostService } from '../shared/post/post.service'

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  comments: any = [];

  text: string;

  @Input() post;

  sub: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private postService: PostService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.postService.getComments(id).subscribe((comments: any) => {
          if (comments) {
            this.comments = comments;
          } else {
            console.log(`Post with id '${id}' not found, returning to list`);
            this.gotoList(id);
          }
        });
      }
    });
  }

  gotoList(id) {
    this.router.navigate(['/post-detail',id]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save(form: NgForm) {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.postService.saveComment(form, id).subscribe(result => {
        this.comments.push(result);
        this.text = '';
        this.gotoList(id);
      }, error => console.error(error));
    });
  }
}
