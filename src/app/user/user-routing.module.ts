import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from '@app/shared/services/userauth-gaurd.service';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ArticleListingComponent } from './components/article-listing/article-listing.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { UserWrappperComponent } from './components/user-wrappper/user-wrappper.component';

const routes: Routes = [
  {
    path: '',
    component: UserWrappperComponent,
    children: [
      { path: '', redirectTo: 'user-auth', pathMatch: 'full' },
      {
        path:"user-auth",
        component:UserAuthComponent,
        
      },
      {
        path: 'article-detail/:id',
        component: ArticleDetailComponent,
      //  canActivate:[UserAuthGuard]
      },
      {
        path: 'article-list',
        component: ArticleListingComponent,
       // canActivate:[UserAuthGuard]
      },
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
