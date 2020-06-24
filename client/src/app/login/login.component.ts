import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DataService } from '../data.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata={
    username:"",
    password:"",
    userType:""
  }

  constructor(private data:DataService,private router:Router,private noti:NotificationsService) { }

  ngOnInit() {
  }

  funSubmit(){
    const method ="/verify-user";
    const that = this;

    var header = new HttpHeaders;
    header = header.set('content-type','application/json');

    this.data.funPostMethod(method,this.formdata,{header})
    .then((res)=>{
      if(res['status']==="OK"){
        localStorage.setItem('userType',that.formdata.userType);
        localStorage.setItem('username',that.formdata.username);
        localStorage.setItem('token',res['xtoken']);
        console.log(localStorage.getItem('token'));
        that.router.navigateByUrl('/home/dashboard');
        that.noti.success('Hello '+that.formdata.username);
      }
      else{
        that.noti.error('User not found');
      }
    })
  }

}
