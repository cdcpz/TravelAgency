import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IApiResponse } from '../../../shared/models/response';
import { ILoginRequest, ILoginResponse } from '../models/login.model';
import { environment } from '../../../../environments/environment';
import { LocalDbPersist } from '../../../shared/services/db.service';
import { DB_FLAGS } from '../../../shared/models/db.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) { }

  authentication(request: ILoginRequest): Observable<IApiResponse<ILoginResponse>>{
    return this.http.post<IApiResponse<ILoginResponse>>(
      `${environment.apiUrl}security/authentication`, request
    ).pipe(
      tap(resp => {
        LocalDbPersist<ILoginResponse>().save(DB_FLAGS.CREDENTIAL, resp.data)
      })
    )
  }



}
