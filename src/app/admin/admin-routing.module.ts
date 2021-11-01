import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/shared/services/auth-guard.service';
import { AddEditArticleComponent } from './components/add-edit-article/add-edit-article.component';
import { AddEditBookComponent } from './components/add-edit-book/add-edit-book.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { AddEditVideosComponent } from './components/add-edit-videos/add-edit-videos.component';
import { AdminAuthComponent } from './components/admin-auth/admin-auth.component';
import { AdminWrapperComponent } from './components/admin-wrapper/admin-wrapper.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { ForgetPasswordComponent } from './components/reusable/forget-password/forget-password.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { ViewArticleComponent } from './components/view-article/view-article.component';

const routes: Routes = [
  {
    path: '',
    component: AdminWrapperComponent,
    children: [
      { path: '', redirectTo: 'article-list', pathMatch: 'full' },
      {
        path:"auth",
        component:AdminAuthComponent,

      },
      {
        path: 'add-user',
        component: AddEditUserComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'user-list',
        component: UserListComponent,
        canActivate:[AuthGuard]
      },

      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
      },
      {
        path: 'edit-user/:id',
        component: AddEditUserComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'add-article',
        component: AddEditArticleComponent,
        canActivate:[AuthGuard]
        
      },
      
      {
        path: 'add-book',
        component: AddEditBookComponent,
        canActivate:[AuthGuard]
        
      },
      {
        path: 'edit-book/:id',
        component: AddEditBookComponent,
        canActivate:[AuthGuard]
        
      },
      {
        path: 'add-video',
        component: AddEditVideosComponent,
        canActivate:[AuthGuard]
        
      },
      {
        path: 'edit-video/:id',
        component: AddEditVideosComponent,
        canActivate:[AuthGuard]
        
      },
      {
        path: 'article-list',
        component: ArticleListComponent,
        canActivate:[AuthGuard]
      },

      {
        path: 'book-list',
        component: BookListComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'video-list',
        component: VideoListComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'edit-article/:id',
        component: AddEditArticleComponent,
        canActivate:[AuthGuard]
      },

      {
        path: 'view-article/:id',
        component: ViewArticleComponent,
        canActivate:[AuthGuard]
      },

      {
        path: 'forget-password',
        component: ViewArticleComponent,
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
