import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { PostService } from './shared/post/post.service';
import { PostListComponent } from './post-list/post-list.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CommentListComponent } from './comment-list/comment-list.component'

const appRoutes: Routes = [
  { path: '', redirectTo: '/post-list', pathMatch: 'full' },
  {
    path: 'post-list',
    component: PostListComponent
  },
  {
    path: 'post-add',
    component: PostEditComponent
  },
  {
    path: 'post-edit/:id',
    component: PostEditComponent
  },
  {
    path: 'post-detail/:id',
    component: PostDetailComponent
  },
  {
    path: 'post-add-comment/:id',
    component: PostDetailComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostEditComponent,
    PostDetailComponent,
    CommentListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
