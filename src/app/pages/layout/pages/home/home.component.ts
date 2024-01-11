import { Component } from '@angular/core';
import { CardStatisticsComponent } from '../../../../shared/components/card-statistics/card-statistics.component';
import { PageTitleService } from '../../../../shared/services/page-title.service';
import { NgFor } from '@angular/common';
import { CardStateService } from './service/card-state.service';
import { IStatisticCards, IStatisticItemCards } from '../../../../shared/models/card-state.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardStatisticsComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  /**
   *
   */
  cards: IStatisticCards[] = []

  constructor(
    private readonly _pageTitle: PageTitleService,
    private readonly _cardStadistic: CardStateService
  ) {
    this._pageTitle.setPageTitle({
      title: 'Inicio',
      backpath: '/layout'
    })


    this._cardStadistic.getStadistic().subscribe(resp => {
      this.cards = resp.data
    })
  }
}
