import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, ISelectOption } from '../../../../../shared/models/response';
import { IRoom } from '../../../../../shared/models/booking.model';
import { environment } from '../../../../../../environments/environment';
import { IManageRoomRequest } from '../../../../../shared/models/room.model';
import { IEnabledRequest } from '../../../../../shared/models/request';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private readonly http: HttpClient) { }

  getBooking():Observable<IApiResponse<IRoom[]>> {
    return this.http.post<IApiResponse<IRoom[]>>(`${environment.apiUrl}room/filter`, {})
  }
  getDocumentType(): Observable<IApiResponse<any>>{
    return this.http.get<IApiResponse<any>>(`${environment.apiUrl}Type/signup`)
  }
  getRoomType(): Observable<IApiResponse<Record<string, ISelectOption[]>>>{
    return this.http.get<IApiResponse<Record<string, ISelectOption[]>>>(`${environment.apiUrl}type/room`)
  }
  postRoom(request: IManageRoomRequest): Observable<IApiResponse<IManageRoomRequest>>{
    return this.http.post<IApiResponse<IManageRoomRequest>>(`${environment.apiUrl}Room`, request)
  }
  getRooms(): Observable<IApiResponse<IRoom[]>>{
    return this.http.post<IApiResponse<IRoom[]>>(`${environment.apiUrl}room/filter`,{})
  }
  getRoomById(id: string): Observable<IApiResponse<IRoom>>{
    return this.http.get<IApiResponse<IRoom>>(`${environment.apiUrl}room/ById/${id}`)
  }
  putEnabled(request: IEnabledRequest): Observable<IApiResponse<IEnabledRequest>>{
    return this.http.put<IApiResponse<IEnabledRequest>>(`${environment.apiUrl}room/`,request)
  }
}
