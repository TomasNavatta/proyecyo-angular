import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepetir]'
})
export class RepetirDirective {

  constructor( private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
    for (let index = 0; index < 10; index++) {
  this.viewContainerRef.createEmbeddedView(this.templateRef)
      
    }
   }

}
