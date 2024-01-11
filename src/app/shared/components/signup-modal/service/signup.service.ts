import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IApiResponse, ISelectOption } from '../../../models/response';
import { ISignup } from '../../../models/signup-modal';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private readonly http: HttpClient) { }

  post(request: ISignup): Observable<IApiResponse<unknown>>{
    return this.http.post<IApiResponse<unknown>>(`${environment.apiUrl}security/signup`, request)
  }

  getTypes(): Observable<IApiResponse<Record<string, ISelectOption[]>>>{
    return this.http.get<IApiResponse<Record<string, ISelectOption[]>>>(`${environment.apiUrl}type/signup`)
  }
}
