import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class DataService {

  env=environment;

  constructor(private http:HttpClient) { }

  funGetMethod(method,headers){
    return this.http.get(this.env.apiurl+method,headers)
    .toPromise()
    .then((res)=>{
      return res;
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  funPostMethod(method,formdata,headers){
    return this.http.post(this.env.apiurl+method,formdata,headers)
    .toPromise()
    .then((res)=>{
      return res;
    })
    .catch((err)=>{
      console.log(err);
    })
  }


}
