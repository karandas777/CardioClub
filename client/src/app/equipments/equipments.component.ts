import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { NotificationsService } from 'angular2-notifications';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import { HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {

equipmentsList=[];

formdata={
  equipment_name:"",
  equipment_desc:"",
  quantity:"",
  condition:"excellent"
}

updatedata={
  _id:"",
  equipment_name:"",
  equipment_desc:"",
  quantity:"",
  condition:""
}

displayedColumns: string[] = ['equipment_name','equipment_desc','quantity','condition','action'];
dataSource;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(private data:DataService, private noti:NotificationsService,private loader:NgxUiLoaderService) { }

  ngOnInit() {
    this.funGetEquipments();
  }

  funGetEquipments() {
    const method = "/select-equipment";
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funGetMethod(method,{headers})
    .then((res) => {
      that.loader.stopBackground();
      if (res["status"] === "OK") {
        that.equipmentsList = res["message"];
        that.dataSource = new MatTableDataSource<TableSchema>(that.equipmentsList);
        that.dataSource.paginator = that.paginator;
        that.dataSource.sort = that.sort;
        console.log(that.equipmentsList);
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
    const method = "/insert-equipment";
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funPostMethod(method,this.formdata,{headers})
    .then((res)=>{
      that.loader.stopBackground();
      if (res['status']==="OK"){
        that.noti.success("Equipment Added");
      }
      else{
        that.noti.error('Something went wrong');
      }
      that.funGetEquipments();
      that.formdata={
        equipment_name:"",
        equipment_desc:"",
        quantity:"",
        condition:"excellent"
      }
    })
  };


  funDetail(x){
    this.updatedata=x;
  }

  funUpdate(){
    const method = "/update-equipment";
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funPostMethod(method,this.updatedata,{headers})
    .then((res)=>{
      that.loader.stopBackground();
      if (res['status']=== 'OK'){
        that.noti.success("Equipment Updated");
      }
      else{
        that.noti.error('Something went wrong');
      }
      that.funGetEquipments();
    })
  }

  funDelete(x){
    const method = "/delete-equipment";
    const that = this;

    var headers = new HttpHeaders;
    headers = headers.set('content-type','application/json');
    headers = headers.set('xtoken',localStorage.getItem('token'));

    this.loader.startBackground();
    this.data.funPostMethod(method,{_id:x},{headers})
    .then((res)=>{
      that.loader.stopBackground();
      if (res['status'] === 'OK'){
        that.noti.success("Equipment Deleted");
      }
      else{
        that.noti.error('Something went wrong');
      }
      that.funGetEquipments();
    })
  }

}

export interface TableSchema {
  equipment_name:string,
  equipment_desc:string,
  quantity:string,
  condition:string
}