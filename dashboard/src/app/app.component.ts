import {
  Component,
  ComponentFactoryResolver,
  OnInit,
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IPollingSensorConfig, PollingSensorComponent} from './sensors/polling-sensor';
import {Utils} from './utils/utils';
import {ICardComponentConfig, ICardConfig} from './cards/card-base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private cardsConfig: ICardComponentConfig[] = [];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.getCards();
  }

  private saveCard(card: ICardComponentConfig) {
    this.cardsConfig.push(card);
    // TODO: Push all cards to DB

  }

  private async getCards() {   // TODO: Move all this to service
    this.httpClient.get<ICardConfig[]>('http://localhost:3030/getCards-simple').subscribe(response => {
      console.log(response);
      response.map(card => {
        const tempSensor = new PollingSensorComponent(card.dataSource as IPollingSensorConfig, this.httpClient);
        this.cardsConfig.push({
          data: card.data, type: Utils.stringToCardClass(card.type), colspan: card.colspan || 1,
          dataSource: tempSensor
        });
      });
    });
    console.log(this.cardsConfig);
  }

  public drop(event) {
    if (event.item.data !== undefined && event.container.data !== undefined) {
      this.moveCard(event.item.data, event.container.data);
    }
  }

  private moveCard(from: number, to: number) {
    const aux = this.cardsConfig[from];
    this.cardsConfig[from] = this.cardsConfig[to];
    this.cardsConfig[to] = aux;
  }
}


// private addPollingTempHumSensorCard(): void {
//   const cardConfig: ICardConfig = {
//   data: {
//     title: this.cardsConfig.length + 1 + '',
//     content: '',
//     extraData: {assetName: 'thermometer-lines.png'}
//   },
//   type: 'BigNumber',
//   dataSource: {
//     endpoint: 'http://localhost:3030/getData2',
//     pollingFrequencymS: 10000
//   }
// };
// const tempSensor = new PollingSensorComponent(cardConfig.dataSource as IPollingSensorConfig, this.httpClient);
// this.saveCard({
//   type: BigNumberCardComponent,
//   data: cardConfig.data,
//   dataSource: tempSensor
// });
// }


