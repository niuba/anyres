import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import * as MOCKDATA from '../../_mock';
import { DelonMockModule } from '@delon/mock';
import { TestAngularHttpClientAdapter } from './app.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DelonMockModule.forRoot({ data: MOCKDATA })
  ],
  providers: [
    TestAngularHttpClientAdapter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
