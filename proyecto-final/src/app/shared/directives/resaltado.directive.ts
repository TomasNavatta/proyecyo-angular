import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective implements OnChanges{
  @Input()
  bgColor = 'yellow'


  constructor( private elementRef: ElementRef) { 
    this.elementRef.nativeElement.style.fontWeight = 500
    this.elementRef.nativeElement.style.backgroundColor = this.bgColor

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes['bgColor']) {
      this.elementRef.nativeElement.style.backgroundColor = changes['bgColor'].currentValue ||'yellow'


    }
  }


}
