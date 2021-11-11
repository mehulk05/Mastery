import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { LocalStorageService } from './services/local-storage.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { EncrDecrService } from './services/EncrDecrService.service';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NgxSpinnerModule,
  ],
  providers: [
    ApiService,
    LocalStorageService,
    EncrDecrService
  ],
})
export class SharedModule { }
