import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from '@app/admin/components/book-list/book-list.component';
import { VideoListComponent } from '@app/admin/components/video-list/video-list.component';
import { UserAuthGuard } from '@app/shared/services/userauth-gaurd.service';
import { AboutComponent } from './components/about/about.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ArticleListingComponent } from './components/article-listing/article-listing.component';
import { BookListingComponent } from './components/book-listing/book-listing.component';
import { LiveEventsComponent } from './components/live-events/live-events.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { UserWrappperComponent } from './components/user-wrappper/user-wrappper.component';
import { VideoListingComponent } from './components/video-listing/video-listing.component';

const routes: Routes = [
  {
    path: '',
    component: UserWrappperComponent,
    children: [
      { path: '', redirectTo: 'article-list', pathMatch: 'full' },
      {
        path:"about",
        component:AboutComponent,
        
      },
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
      {
        path: 'video-list',
        component: VideoListingComponent,
       // canActivate:[UserAuthGuard]
      },

      {
        path: 'book-list',
        component: BookListingComponent,
       // canActivate:[UserAuthGuard]
      },
      {
        path: 'live-shows',
        component: LiveEventsComponent,
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
