import { Directive, ElementRef, OnInit } from '@angular/core';
import { InsuranceService } from '@core/services';

@Directive({
  selector: '[insurance-owner]'
})
export class InsuranceOwnerDirective implements OnInit {

  constructor(
    private element: ElementRef,
    private insuranceService: InsuranceService
  ) { }

  async ngOnInit() {
    const isOwnerConnected = await this.insuranceService.isContractOwner();

    if (!isOwnerConnected) {
      this.element.nativeElement.style.display = 'none';  
    }
  }
}
