import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NotificationsService } from 'angular2-notifications';
import { HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username="";
  membersList="0";
  packagesList="0";
  equipmentsList="0";
  usersList="0";

  incomeAmount="0";
  incomelist=[];

  pendingAmount="0";
  pendingList=[];

  constructor(private data:DataService,private noti:NotificationsService,private loader:NgxUiLoaderService) { }

  ngOnInit() {
    this.funGetUserName();
    this.funGetMembers();
    this.funGetPackages();
    this.funGetEquipments();
    this.funGetUsers();
  }

  funGetUserName(){
    this.username=localStorage.getItem('username');
  }

  funGetMembers() {
    const method = "/select-member";
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funGetMethod(method,{headers}).then((res) => {
      that.loader.stopBackground();
      if (res["status"] === "OK") {
        const list = res["message"];
        that.membersList = list.length;

        // getting income

        for(var i=0;i<list.length;i++){
          that.incomelist.push(parseInt(list[i].paid_fees));
        }
        that.incomeAmount=that.incomelist.reduce((total,num)=>{
          return total + num;
        });

        // getting pending

        for(var i=0;i<list.length;i++){
          that.pendingList.push(parseInt(list[i].pending_fees));
        }
        that.pendingAmount=that.pendingList.reduce((total,num)=>{
          return total + num;
        });
        
      }
      else{
        that.noti.error("Something went wrong");
      }
    });
  }

  funGetPackages() {
    const method = "/select-package";
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funGetMethod(method,{headers}).then((res) => {
      that.loader.stopBackground();
      if (res["status"] === "OK") {
        const list = res["message"];
        that.packagesList = list.length;
      }
      else{
        that.noti.error("Something went wrong");
      }
    });
  }

  funGetEquipments() {
    const method = "/select-equipment";
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funGetMethod(method,{headers}).then((res) => {
      that.loader.stopBackground();
      if (res["status"] === "OK") {
        const list = res["message"];
        that.equipmentsList = list.length;
      }
      else{
        that.noti.error("Something went wrong");
      }
    });
  }

  funGetUsers() {
    const method = "/select-user";
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funGetMethod(method,{headers}).then((res) => {
      that.loader.stopBackground();
      if (res["status"] === "OK") {
        const list = res["message"];
        that.usersList = list.length;
      }
      else{
        that.noti.error("Something went wrong");
      }
    });
  }

  reduceFunc(total,num){
    return total + num;
  }

}
