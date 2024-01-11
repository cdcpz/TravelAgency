import { Injectable } from '@angular/core';
import { IPageTitle } from '../models/page-title-model';
import { LocalDbPersist } from './db.service';
import { DB_FLAGS } from '../models/db.model';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  title: string = "Initial"
  backpath: string = "/"

  constructor() { }

  setPageTitle(pageTitle: IPageTitle) {
    LocalDbPersist().save(DB_FLAGS.PAGE_TITLE, pageTitle)
    this.title = pageTitle.title
    this.backpath = pageTitle.backpath
  }
}
