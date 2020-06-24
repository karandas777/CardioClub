import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddmemberComponent } from './addmember/addmember.component';
import { ListmemberComponent } from './listmember/listmember.component';
import { AdminsetupComponent } from './adminsetup/adminsetup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PackagesComponent } from './packages/packages.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxUiLoaderModule, NgxUiLoaderConfig } from  'ngx-ui-loader';
import { ExmembersComponent } from './exmembers/exmembers.component';
import { ActivemembersComponent } from './activemembers/activemembers.component';
import { AlertboardComponent } from './alertboard/alertboard.component';
import { AbouttoexComponent } from './abouttoex/abouttoex.component';
import { PendingfeesComponent } from './pendingfees/pendingfees.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "red",
  "bgsOpacity": 0.7,
  "bgsPosition": "bottom-right",
  "bgsSize": 50,
  "bgsType": "three-bounce",
  "blur": 5,
  "delay": 0,
  "fgsColor": "red",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "ball-spin-clockwise",
  "gap": 25,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "#257aff",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 500
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    AddmemberComponent,
    ListmemberComponent,
    AdminsetupComponent,
    DashboardComponent,
    PackagesComponent,
    EquipmentsComponent,
    ExmembersComponent,
    ActivemembersComponent,
    AlertboardComponent,
    AbouttoexComponent,
    PendingfeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    SimpleNotificationsModule.forRoot({
      position: ["bottom", "left"],
      timeOut: 3000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true,
      clickIconToClose: true,
      maxStack:1,
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
