import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import appConfig from '../../../config';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getPicture = () => {
    console.log(typeof localStorage.getItem('jwt_token'));
    
     return this.http.get<any>('http://localhost:3000/api/get-picture', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
      }
    })
  }
}
