import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IApiResponse } from '../models/response';
import { IBookingReponse, IBookingRequest } from '../models/booking.model';
import { Observable } from 'rxjs';
import { IEnabledRequest } from '../models/request';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private readonly http:HttpClient) { }

  post(booking: IBookingRequest): Observable<IApiResponse<unknown>> {
    return this.http.post<IApiResponse<unknown>>(`${environment.apiUrl}booking`, booking)
  }

  getByTraveler(credentialId:string):Observable<IApiResponse<IBookingReponse[]>> {
    return this.http.get<IApiResponse<IBookingReponse[]>>(`${environment.apiUrl}/booking/traveler/${credentialId}`)
  }

  get():Observable<IApiResponse<IBookingReponse[]>> {
    return this.http.post<IApiResponse<IBookingReponse[]>>(`${environment.apiUrl}booking/filter`, {})
  }
  getBookingById(id: string):Observable<IApiResponse<IBookingReponse>> {
    return this.http.get<IApiResponse<IBookingReponse>>(`${environment.apiUrl}/booking/byid/${id}`)
  }
  putEnabled(request: IEnabledRequest): Observable<IApiResponse<IEnabledRequest>>{
    return this.http.put<IApiResponse<IEnabledRequest>>(`${environment.apiUrl}booking/`,request)
  }
}
