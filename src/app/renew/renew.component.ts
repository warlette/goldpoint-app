import { Component, OnInit } from '@angular/core';
import { iRenew } from './../shared/classes/renew';

@Component({
  selector: 'app-renew',
  templateUrl: './renew.component.html',
  styleUrls: ['./renew.component.css']
})
export class RenewComponent implements OnInit {

  DateGranted = new Date();
  // DateMaturity = this.DateGranted.addMonths(1);
  // DateExpiry = this.DateGranted.addMonths(3);

  iRenew = new iRenew(1, new Date().toLocaleDateString(), new Date().toLocaleDateString(),
  new Date().toLocaleDateString(), null, null, null, null, null, null, null, 0, 0, 5, 0, 0, 0, 0);

  constructor() {
  }

  ngOnInit() {

  }

  public save(isValid: boolean, f: iRenew) {
    console.log(f);
  }

  public clear() {
    this.iRenew = new iRenew(null, new Date().toLocaleDateString(), new Date().toLocaleDateString(),
    new Date().toLocaleDateString(), null, null, null, null, null, null, null, 0, 0, 5, 0, 0, 0, 0);
  }

}
