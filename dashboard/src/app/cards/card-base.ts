import {Input, Type} from '@angular/core';
import {SensorBase} from '../sensors/sensor-base';
import {ISensorConfig} from '../sensors/interfaces/interfaces';

export interface ICardData {
  title: string;
  content: any;
  extraData: any;
}

export interface ICardComponentConfig {
  type: Type<any>;
  colspan: number;
  data: ICardData;
  dataSource?: SensorBase;
}

export interface ICardConfig {
  type: string;
  data: ICardData;
  colspan: number;
  dataSource?: ISensorConfig;
}

export abstract class CardBase {
  @Input() data: ICardData;
  @Input() dataSource?: SensorBase;

  public onCardClicked() {
    console.log('cardClicked');
  }
}
