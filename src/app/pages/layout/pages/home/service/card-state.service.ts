import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../../../shared/models/response';
import { environment } from '../../../../../../environments/environment';
import { IStatisticCards } from '../../../../../shared/models/card-state.model';

@Injectable({
  providedIn: 'root'
})
export class CardStateService {

  constructor(private http: HttpClient) {}
  
  getStadistic(): Observable<IApiResponse<IStatisticCards[]>>{
    return this.http.get<IApiResponse<IStatisticCards[]>>(`${environment.apiUrl}stadistic/home`)
  }
}
