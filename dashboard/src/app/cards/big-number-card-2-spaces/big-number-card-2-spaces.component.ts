import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SensorBase} from '../../sensors/sensor-base';
import {CardBase, ICardData} from '../card-base';

@Component({
  selector: 'app-big-number-card-2',
  templateUrl: './big-number-card-2-spaces.component.html',
  styleUrls: ['./big-number-card-2-spaces.component.scss', '../card-base.scss']
})

export class BigNumberCard2SpacesComponent extends CardBase implements OnInit {
  @Input() data: ICardData;
  @Input() dataSource: SensorBase;
  public values: string[];
  private dataObservable: Observable<any>;

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

  public onCardClicked() {

  }
}
