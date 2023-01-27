import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import 'hammerjs';
import { TimelineModule } from 'primeng/timeline';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { HospitalComponent } from './hospital/hospital.component';
import { HttpService } from './services/http.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import { NetworkAwarePreloadingStrategyService2Service } from './services/network-aware-preloading-strategy.service';

@NgModule({
  declarations: [AppComponent, HospitalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TimelineModule,
    ButtonModule,
    TableModule,
    HttpClientModule,
    DialogModule,
    ToastModule,
    InputTextModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    HttpService,
    AuthService,
    NetworkAwarePreloadingStrategyService2Service,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
