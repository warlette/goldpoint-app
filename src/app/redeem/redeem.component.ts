import { Component, OnInit } from '@angular/core';
import { iRedeem } from './../shared/classes/redeem';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.css']
})
export class RedeemComponent implements OnInit {
  DateGranted = new Date();
  // DateMaturity = this.DateGranted.addMonths(1);
  // DateExpiry = this.DateGranted.addMonths(3);

  iRedeem = new iRedeem(1, new Date().toLocaleDateString(), new Date().toLocaleDateString(),
  new Date().toLocaleDateString(), null, null, null, null, null, null, null, 0, 0, 5, 0);

  constructor() {
  }

  ngOnInit() {

  }

  public save(isValid: boolean, f: iRedeem) {
    console.log(f);
  }

  public clear() {
    this.iRedeem = new iRedeem(null, new Date().toLocaleDateString(), new Date().toLocaleDateString(),
    new Date().toLocaleDateString(), null, null, null, null, null, null, null, 0, 0, 5, 0);
  }

}
