import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IHotel } from '../../pages/layout/pages/hotel/hotel-modal';
import { Observable } from 'rxjs';
import { IApiResponse } from '../models/response';
import { IEnabledRequest } from '../models/request';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private readonly http: HttpClient) { }

  postHotel(request: IHotel): Observable<IApiResponse<IHotel>>{
    return this.http.post<IApiResponse<IHotel>>(`${environment.apiUrl}hotel`, request)
  }
  getHotel(filter: any): Observable<IApiResponse<IHotel[]>>{
    return this.http.post<IApiResponse<IHotel[]>>(`${environment.apiUrl}hotel/filter`,filter)
  }
  getHotelById(id: string): Observable<IApiResponse<IHotel[]>>{
    return this.http.get<IApiResponse<IHotel[]>>(`${environment.apiUrl}hotel/ById/${id}`)
  }
  putEnabled(request: IEnabledRequest): Observable<IApiResponse<IEnabledRequest>>{
    return this.http.put<IApiResponse<IEnabledRequest>>(`${environment.apiUrl}hotel/`,request)
  }


}
