import { Component, OnInit, Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Customer } from './../shared/classes/customer';
import { Pledge } from './../shared/classes/pledge';
import { common } from './../shared/services/common';

@Component({
  selector: 'app-app-pledge',
  templateUrl: './pledge.component.html',
  styleUrls: ['./pledge.component.css']
})
export class PledgeComponent implements OnInit {

  Pledge = new Pledge(null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  Customer = new Customer(null,null,null,null,null,null,null,null,null,null,null);

  constructor(
    public datepipe: DatePipe
  ) { 

  }

  ngOnInit() {
    var dateadded = new Date(),
        datemature = new Date(),
        dateexpire = new Date();
    this.Pledge.dateadded = this.datepipe.transform(dateadded, 'yyyy-MM-dd');
    this.Pledge.datemature = this.datepipe.transform(common.setMonth(datemature, 1), 'yyyy-MM-dd');
    this.Pledge.dateexpire = this.datepipe.transform(common.setMonth(dateexpire, 4), 'yyyy-MM-dd');
  }

  public save(isValid: boolean, f: Pledge) {
    console.log(f);
}


}
