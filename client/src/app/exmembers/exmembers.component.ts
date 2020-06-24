import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataService } from '../data.service';
import { NotificationsService } from 'angular2-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-exmembers',
  templateUrl: './exmembers.component.html',
  styleUrls: ['./exmembers.component.css']
})
export class ExmembersComponent implements OnInit {

  packagesList = [];

  formdata = {
    _id:"",
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
    end_date: ""
  };

  membersList = [];
  displayedColumns: string[] = [
    "name",
    "address",
    "contact",
    "gender",
    "end_date",
    "action"
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource;

  constructor(private data: DataService,private noti:NotificationsService,private loader:NgxUiLoaderService) {}

  ngOnInit() {
    this.funGetMembers();
    this.funGetPackages();
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
        const members = res['message'];
        var date2=Date.now();
        for(var x=0; x<members.length; x++){
          var date1 = new Date(members[x].end_date); 
          var diff = date1.valueOf() - date2.valueOf();
          var diffDays = Math.ceil(diff / (1000 * 60 *60 * 24)); 
          if(diffDays < 0 ){
            that.membersList.push(members[x]); 
          }
        }
        that.dataSource = new MatTableDataSource<TableSchema>(that.membersList);
        that.dataSource.paginator = that.paginator;
        that.dataSource.sort = that.sort;
      }
      else{
        that.noti.error("Something went wrong");
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  funDetail(x){
    this.formdata=x;
  }

  funUpdate(){
    const method = '/update-member';
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funPostMethod(method,this.formdata,{headers})
    .then((res)=>{
      that.loader.stopBackground();
      if (res['status']=== 'OK'){
        that.noti.success("Member Updated");
      }
      else{
        that.noti.error('Something went wrong');
      }
      that.funGetMembers();
    })
  }

  funDelete(x){
    const method = '/delete-member';
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funPostMethod(method,{_id:x},{headers})
    .then((res)=>{
      that.loader.stopBackground();
      if (res['status']=== 'OK'){
        that.noti.success("Member Deleted");
      }
      else{
        that.noti.error('Something went wrong');
      }
      that.funGetMembers();
    })
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


export interface TableSchema {
  name: string;
  address: string;
  contact: string;
  gender: string;
  end_date: string;
}


