import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient,HttpClientModule} from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { User } from './user';
import { API } from './constant';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
   
  form: any;
   constructor(private _http: HttpClient) {}
   
 getUsersFromData():User[]{
  var ldata:any=localStorage.getItem('userdetails');
  return (ldata==null)?[]:JSON.parse(ldata) ;
}
populateForm( d:any){
  this.form.setValue(d);
}
}
