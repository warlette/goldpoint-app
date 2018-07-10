import { Component, OnInit } from '@angular/core';
import { Customer } from './../shared/classes/customer';
import { Pledge } from './../shared/classes/pledge';
import { common } from './../shared/services/common';

@Component({
  selector: 'app-renew',
  templateUrl: './renew.component.html',
  styleUrls: ['./renew.component.css']
})
export class RenewComponent implements OnInit {

  Pledge = new Pledge(null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  Customer = new Customer(null,null,null,null,null,null,null,null,null,null,null);

  constructor() {
  }

  ngOnInit() {

  }

  public save() {
  }

  public clear() {
   
  }

}
