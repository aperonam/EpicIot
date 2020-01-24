import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IGenericPolingSensorResponse, ISensorConfig} from './interfaces/interfaces';
import {SensorBase} from './sensor-base';

export interface IPollingSensorConfig extends ISensorConfig {
  pollingFrequencymS: number;
  endpoint: string;
}

export class PollingSensorComponent implements SensorBase {
  private pollingFrequency: number;
  private endpoint: string;
  private interval: number;

  constructor(sensorConfig: IPollingSensorConfig, private http: HttpClient) {
    this.pollingFrequency = sensorConfig.pollingFrequencymS;
    this.endpoint = sensorConfig.endpoint;
  }


  public Start(): Observable<IGenericPolingSensorResponse> {
    if (this.interval) {
      return;
    }
    return new Observable<IGenericPolingSensorResponse>(observer => {
      this.interval = setInterval(async () => {
        const response = await this.http.get<IGenericPolingSensorResponse>(this.endpoint).toPromise();
        observer.next(response);
      }, this.pollingFrequency);
    });
  }

  public Stop() {
    clearInterval(this.interval);
  }
}
