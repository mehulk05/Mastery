import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminAuthComponent } from './components/admin-auth/admin-auth.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { AddEditArticleComponent } from './components/add-edit-article/add-edit-article.component';
import { AdminHeaderComponent } from './components/reusable/admin-header/admin-header.component';
import { AdminFooterComponent } from './components/reusable/admin-footer/admin-footer.component';
import { AdminWrapperComponent } from './components/admin-wrapper/admin-wrapper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { AuthGuard } from '@app/shared/services/auth-guard.service';
import { ViewArticleComponent } from './components/view-article/view-article.component';
import { ForgetPasswordComponent } from './components/reusable/forget-password/forget-password.component';
import { AddEditBookComponent } from './components/add-edit-book/add-edit-book.component';
import { AddEditVideosComponent } from './components/add-edit-videos/add-edit-videos.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { VideoListComponent } from './components/video-list/video-list.component';


@NgModule({
  declarations: [
    AdminAuthComponent,
    AddEditUserComponent,
    AddEditArticleComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminWrapperComponent,
    ArticleListComponent,
    UserListComponent,
    ViewArticleComponent,
    ForgetPasswordComponent,
    AddEditBookComponent,
    AddEditVideosComponent,
    BookListComponent,
    VideoListComponent
  ],
  imports: [
    
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
    
  ],
  providers:[AuthGuard]
})
export class AdminModule { }
