import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageTitleService } from '../../services/page-title.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss'
})
export class PageTitleComponent {

  constructor(
    private readonly _router: Router,
    private readonly _pageTitle: PageTitleService
  ) {
    
  }

  get title() {
    return this._pageTitle.title
  }

  goBack() {
    console.log(this._pageTitle.backpath)
    this._router.navigateByUrl(this._pageTitle.backpath)
  }
}
