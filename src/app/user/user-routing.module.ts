import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListingComponent } from './components/article-listing/article-listing.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';

const routes: Routes = [
  {
    path: '',
    component: UserAuthComponent
  },
  {
    path: 'article',
    component: ArticleListingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
