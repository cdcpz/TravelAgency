import { Component, Input, OnInit } from '@angular/core';
import { IStatisticItemCards } from '../../models/card-state.model';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-card-statistics',
  standalone: true,
  imports: [NgFor],
  templateUrl: './card-statistics.component.html',
  styleUrl: './card-statistics.component.scss'
})

export class CardStatisticsComponent  implements OnInit{
@Input () title: string = '';
@Input () items: IStatisticItemCards[] = [];


/**
 *
 */
constructor() {}
  ngOnInit(): void {
  }

}
