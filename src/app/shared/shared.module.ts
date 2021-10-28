import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { LocalStorageService } from './services/local-storage.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserRoutingModule } from '@app/user/user-routing.module';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
   UserRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NgxSpinnerModule,UserRoutingModule
  ],
  providers: [
    ApiService,
    LocalStorageService,
  ],
})
export class SharedModule { }
