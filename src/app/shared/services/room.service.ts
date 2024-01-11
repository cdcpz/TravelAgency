import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../models/response';
import { IRoom } from '../models/booking.model';
import { environment } from '../../../environments/environment';
import { IFilterFreeRoomRequest, IFilterRoomRequest } from '../models/room.model';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private readonly http: HttpClient) { }

  getFreeRooms(filter: IFilterFreeRoomRequest ): Observable<IApiResponse<IRoom[]>>{
    return this.http.post<IApiResponse<IRoom[]>>(`${environment.apiUrl}room/free`,filter)
  }

  getRooms(filter?:IFilterRoomRequest): Observable<IApiResponse<IRoom[]>>{
    return this.http.post<IApiResponse<IRoom[]>>(`${environment.apiUrl}room/filter`,filter??{})
  }
  getRoomsById(id: string): Observable<IApiResponse<IRoom>>{
    return this.http.get<IApiResponse<IRoom>>(`${environment.apiUrl}room/byid/${id}`)
  }
  

}
