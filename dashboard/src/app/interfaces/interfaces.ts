export enum CardType {
  BigNumber2Spaces,
  BigNumber,
  Graph2Spaces
}



interface ICardContent {
  extraData: object;
}

export interface ITempHumContent extends ICardContent {
  temperature: number;
  humidity: number;
}

export interface ICard {
  type: CardType;
  cardTitle: string;
  cardContent: ICardContent;
}
