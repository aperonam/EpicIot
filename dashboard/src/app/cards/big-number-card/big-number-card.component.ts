import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SensorBase} from '../../sensors/sensor-base';
import {CardBase, ICardData} from '../card-base';

@Component({
  selector: 'app-big-number-card',
  templateUrl: './big-number-card.component.html',
  styleUrls: ['./big-number-card.component.scss', '../card-base.scss']
})

export class BigNumberCardComponent extends  CardBase implements OnInit  {
  @Input() data: ICardData;
  @Input() dataSource: SensorBase;
  private dataObservable: Observable<any>;
  public values: string[];

  constructor() {
    super();
  }

  ngOnInit() {
    this.dataObservable = this.dataSource.Start();
    this.values = ['23º', '43%'];
    this.dataObservable.subscribe((response: any) => {
      this.values = response.values;
    });
  }
}
