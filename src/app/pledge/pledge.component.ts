import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Customer } from './../../shared/classes/customer';
import { Pledge } from './../../shared/classes/pledge';
import { common } from './../../shared/services/common';
import { environment } from './../../shared/const/environment';

@Component({
  selector: 'app-app-pledge',
  templateUrl: './pledge.component.html',
  styleUrls: ['./pledge.component.css']
})
export class PledgeComponent implements OnInit {

  Pledge = new Pledge(null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  Customer = new Customer(null,null,null,null,null,null,null,null,null,null,null);

  constructor(
    public datepipe: DatePipe,
    private http: HttpClient
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

  save() {
     
  }

  search() {
    this.http.get(environment.baseUrl + '/customers/' + this.Customer.id)
    .subscribe((result: any) => {
      if (result.length > 0) {
        this.Customer = result[0];
      }
        
      console.log(result)
    });
  }

  clear() {
    
  }
  
  cancel() {
    
  }


}
