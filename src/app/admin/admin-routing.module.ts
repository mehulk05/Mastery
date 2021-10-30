import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/shared/services/auth-guard.service';
import { AddEditArticleComponent } from './components/add-edit-article/add-edit-article.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { AdminAuthComponent } from './components/admin-auth/admin-auth.component';
import { AdminWrapperComponent } from './components/admin-wrapper/admin-wrapper.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ForgetPasswordComponent } from './components/reusable/forget-password/forget-password.component';
import { UserListComponent } from './components/user-list/user-list.component';
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
        path: 'article-list',
        component: ArticleListComponent,
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
