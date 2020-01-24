import {Type} from '@angular/core';
import {BigNumberCardComponent} from '../cards/big-number-card/big-number-card.component';
import {BigNumberCard2SpacesComponent} from '../cards/big-number-card-2-spaces/big-number-card-2-spaces.component';

const typeToClass: { [key: string]: Type<any> } = {
  BigNumber: BigNumberCardComponent,
  BigNumber2Spaces: BigNumberCard2SpacesComponent,

};

export class Utils {


  public static stringToCardClass(classType: string): Type<any> {
    return typeToClass[classType];
  }
}

