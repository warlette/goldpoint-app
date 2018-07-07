import { Component, OnInit, Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Customer } from './../shared/classes/customer';
import { Pledge } from './../shared/classes/pledge';
import { common } from './../shared/services/common';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  Pledge = new Pledge(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
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

}
