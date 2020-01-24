import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {CardDirective} from './card.directive';
import {CardBase, ICardComponentConfig} from './card-base';

@Component({
  selector: 'app-card-factory',
  template: '<ng-template appCardHost></ng-template>',

})
export class CardFactoryComponent implements OnInit {
  @ViewChild(CardDirective, {static: true}) appCardHost: CardDirective;
  @Input() config: ICardComponentConfig;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.config.type);
    const viewContainerRef = this.appCardHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);

    (componentRef.instance as CardBase).data = this.config.data;
    (componentRef.instance as CardBase).dataSource = this.config.dataSource;

  }

}
