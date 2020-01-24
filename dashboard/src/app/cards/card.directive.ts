import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appCardHost]',
})
export class CardDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
