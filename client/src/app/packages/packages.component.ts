import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { NotificationsService } from 'angular2-notifications';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import { HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

packagesList=[];

formdata={
  package_name:"",
  package_desc:"",
  monthly_price:""
};

updatedata={
  _id:"",
  package_name:"",
  package_desc:"",
  monthly_price:""
};


displayedColumns: string[] = ['package_name','package_desc','monthly_price','action'];
dataSource;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private data:DataService, private noti:NotificationsService,private loader:NgxUiLoaderService) { }

  ngOnInit() {
    this.funGetPackages();
  }

  funGetPackages() {
    const method = "/select-package";
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funGetMethod(method,{headers})
    .then((res) => {
      that.loader.stopBackground();
      if (res["status"] === "OK") {
        that.packagesList = res["message"];
        that.dataSource = new MatTableDataSource<TableSchema>(that.packagesList);
        that.dataSource.paginator = that.paginator;
        that.dataSource.sort = that.sort;
      }
      else{
        that.noti.error('Something went wrong')
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  funInsert(){
    const method = "/insert-package";
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funPostMethod(method,this.formdata,{headers})
    .then((res)=>{
      that.loader.stopBackground();
      if (res['status']==="OK"){
        that.noti.success("Package Inserted");
      }
      else{
        that.noti.error('Something went wrong');
      }
      that.funGetPackages();
      that.formdata={
        package_name:"",
        package_desc:"",
        monthly_price:""
      }
    })
  };


  funDetail(x){
    this.updatedata=x;
  }

  funUpdate(){
    const method = "/update-package";
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funPostMethod(method,this.updatedata,{headers})
    .then((res)=>{
      that.loader.stopBackground();
      if (res['status']=== 'OK'){
        that.noti.success("Package Updated");
      }
      else{
        that.noti.error('Something went wrong');
      }
      that.funGetPackages();
    })
  }

  funDelete(x){
    const method = "/delete-package";
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funPostMethod(method,{_id:x},{headers})
    .then((res)=>{
      that.loader.stopBackground();
      if (res['status'] === 'OK'){
        that.noti.success("Package Deleted");
      }
      else{
        that.noti.error('Something went wrong');
      }
      that.funGetPackages();
    })
  }


}

export interface TableSchema {
  package_name:string,
  package_desc:string,
  monthly_price:string
}