import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[insurance-owner]'
})
export class InsuranceOwnerDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.display = 'none';
  }

}
