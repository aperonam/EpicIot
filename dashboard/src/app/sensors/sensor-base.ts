import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IGenericPolingSensorResponse} from './interfaces/interfaces';


export abstract class SensorBase {

  constructor() {
  }

  abstract Start(): Observable<IGenericPolingSensorResponse>;

  abstract Stop();

}
