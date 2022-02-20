import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insurance-management',
  templateUrl: './insurance-management.component.html',
  styleUrls: ['./insurance-management.component.scss']
})
export class InsuranceManagementComponent implements OnInit {
  contractBalance = 100;
  contractAddress = '0x26287D7ff0A24DB1B54b6Bb04c8558b197297e85';
  constructor() { }

  ngOnInit(): void {
  }

  copyContractAddress() {
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(this.contractAddress).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
}
