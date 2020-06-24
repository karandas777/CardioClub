import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { NotificationsService } from 'angular2-notifications';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import { HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-adminsetup',
  templateUrl: './adminsetup.component.html',
  styleUrls: ['./adminsetup.component.css']
})
export class AdminsetupComponent implements OnInit {

  usersList=[];

  formdata={
    _id:"",
    username:"",
    password:"",
    userType:""
  }

  updatedata={
    _id:"",
    username:"",
    password:"",
    userType:""
  }

  displayedColumns: string[] = ['username', 'userType', 'action'];
  dataSource;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private data:DataService, private noti:NotificationsService, private loader:NgxUiLoaderService) { }

  ngOnInit() {
    this.funGetUsers();
  }

  funGetUsers() {
    const method = "/select-user";
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funGetMethod(method,{headers})
    .then((res) => {
      that.loader.stopBackground();
      if (res["status"] === "OK") {
        that.usersList = res["message"];
        that.dataSource = new MatTableDataSource<TableSchema>(that.usersList);
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

  funInsertUser(){
    const method = '/insert-user';
    const that= this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funPostMethod(method,this.formdata,{headers})
    .then((res)=>{
      that.loader.stopBackground();
      if (res['status']==="OK"){
        that.noti.success("User Added");
      }
      else{
        that.noti.error('Something went wrong');
      }
      that.funGetUsers();
      that.formdata={
        _id:"",
        username:"",
        password:"",
        userType:""
      }
    })
  }

  funDetail(x){
    this.updatedata=x;
  }

  funUpdate(){
    const method = '/update-user';
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funPostMethod(method,this.updatedata,{headers})
    .then((res)=>{
      that.loader.stopBackground();
      if (res['status']=== 'OK'){
        that.noti.success("User Updated");
      }
      else{
        that.noti.error('Something went wrong');
      }
      that.funGetUsers();
    })
  }

  funDelete(x){
    const method = '/delete-user';
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funPostMethod(method,{_id:x},{headers})
    .then((res)=>{
      that.loader.stopBackground();
      if (res['status']=== 'OK'){
        that.noti.success("User Deleted");
      }
      else{
        that.noti.error('Something went wrong');
      }
      that.funGetUsers();
    })
  }

}


export interface TableSchema {
  name: string;
  address: string;
  contact: string;
  gender: string;
  updatedAt: string;
}