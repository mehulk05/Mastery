import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { ArticleListingComponent } from './components/article-listing/article-listing.component';
import { FormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HttpClientModule } from '@angular/common/http';
import { UserWrappperComponent } from './components/user-wrappper/user-wrappper.component';
import { SharedModule } from '@app/shared/shared.module';
import { UserAuthGuard } from '@app/shared/services/userauth-gaurd.service';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { UserHeaderComponent } from './components/user-header/user-header.component';


@NgModule({
  declarations: [
    UserAuthComponent,
    ArticleListingComponent,
    VerifyEmailComponent,
    ForgetPasswordComponent,
    UserWrappperComponent,
    ArticleDetailComponent,
    UserHeaderComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    HttpClientModule,SharedModule
  ],
  providers:[UserAuthGuard]
})
export class UserModule { }
