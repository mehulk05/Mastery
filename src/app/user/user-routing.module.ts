import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/shared/services/auth-guard.service';
import { ArticleListingComponent } from './components/article-listing/article-listing.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleListingComponent,
    canActivate:[AuthGuard]
  
  },
  {
    path: 'auth',
    component: UserAuthComponent
  },
  
  {
    path: 'article',
    component: ArticleListingComponent,
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
