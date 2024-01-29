import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HeaderComponent } from './navigationbar/header/header.component';
import { FooterComponent } from './navigationbar/footer/footer.component';
import { BodyComponent } from './authentication/body/body.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './authentication/order/order.component';
import { InvoiceComponent } from './authentication/invoice/invoice.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';






@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    OrderComponent,
    InvoiceComponent


  ],
  imports: [
    BrowserModule ,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
  




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
