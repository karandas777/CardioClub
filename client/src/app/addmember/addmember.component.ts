import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: "app-addmember",
  templateUrl: "./addmember.component.html",
  styleUrls: ["./addmember.component.css"]
})
export class AddmemberComponent implements OnInit {
  formdata = {
    name: "",
    address: "",
    contact: "",
    gender: "",
    package: "",
    duration: "",
    monthly_fees: "",
    total_fees: "",
    paid_fees: "",
    pending_fees: "",
    start_date: "",
    end_date: "",
  };

  packagesList = [];

  constructor(
    private data: DataService,
    private router: Router,
    private noti: NotificationsService,
    private loader:NgxUiLoaderService
  ) {}

  ngOnInit() {
    this.funGetPackages();
  }

  funSubmit() {
    const method = "/insert-member";
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funPostMethod(method, this.formdata,{headers}).then(res => {
      that.loader.stopBackground();
      if (res["status"] === "OK") {
        that.router.navigateByUrl("/home/members-list");
        that.noti.success("Member Added");
      } else {
        that.noti.error('Something went wrong');
      }
    });
  }

  calcTotalFees() {
    var fees = parseInt(this.formdata.monthly_fees);
    var time = parseInt(this.formdata.duration);

    if(time === 3){
      var product = (fees * time);
      var discount = product*5/100; 
      var total = product - discount;
      this.formdata.total_fees = total.toString();
    }
    else if(time === 6){
      var product = (fees * time);
      var discount = product*10/100; 
      var total = product - discount; 
      this.formdata.total_fees = total.toString()
    }
    else if(time === 12){
      var product = (fees * time);
      var discount = product*15/100; 
      var total = product - discount; 
      this.formdata.total_fees = total.toString()
    }
    else{
      var product = (fees * time);
      this.formdata.total_fees = product.toString();
    }


  }

  calcPending() {
    var total = parseInt(this.formdata.total_fees);
    var paid = parseInt(this.formdata.paid_fees);
    var pending = total - paid;
    this.formdata.pending_fees = pending.toString();
  }

  funGetPackages(){
    const method = '/select-package';
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funGetMethod(method,{headers})
    .then((res)=>{
      that.loader.stopBackground();
      if(res['status'] === 'OK'){
        that.packagesList = res['message'];
      }
      else{
        that.noti.error('Something went wrong');
      }
    })
  }

  funPackageDetails(){
    const method = '/sort-package';
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funPostMethod(method,{package_name:this.formdata.package},{headers})
    .then((res)=>{
      that.loader.stopBackground();
      if(res['status'] === "OK"){
        that.formdata.monthly_fees = res['message'].monthly_price;
      }
      else{
        that.noti.error('Something went wrong')
      }
    })
  }

}
