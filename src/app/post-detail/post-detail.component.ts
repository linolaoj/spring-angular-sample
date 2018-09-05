import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PostService } from '../shared/post/post.service'

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private postService: PostService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.postService.get(id).subscribe((post: any) => {
          if (post) {
            this.post = post;
            this.post.href = post._links.self.href;
          } else {
            console.log(`Post with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  gotoList() {
    this.router.navigate(['/post-list']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

 

}
