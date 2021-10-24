import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { LocalStorageService } from './services/local-storage.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NgxSpinnerModule
  ],
  providers: [
    ApiService,
    LocalStorageService,
  ],
})
export class SharedModule { }
