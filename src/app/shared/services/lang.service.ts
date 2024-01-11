import { Injectable } from '@angular/core';
import { ILang } from '../langs/lang';
import { esCO } from '../langs/esCO';

@Injectable({
  providedIn: 'root'
})
export class LangService {
    current: ILang = esCO
  constructor() { }
}
