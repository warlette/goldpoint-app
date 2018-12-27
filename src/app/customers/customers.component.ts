import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../shared/const/environment';
import { common } from './../../shared/services/common';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  Customers: any = [];
  term: any;
  searchee: any;
  sortBy: any = "dateadded";
  reverse: boolean = false;
  
  constructor(
    private http: HttpClient
  ) {
    this.http.get(environment.baseUrl + '/customers/-1')
    .subscribe((result: any) => {
      result.forEach(post => {
        this.Customers.push({
          dateadded: post.dateadded,
          customerid: post.id,
          firstname: post.firstname,
          middlename: post.middlename,
          lastname: post.lastname,
          address: post.address,
          contact: post.contact
        });
      });
    });
   }

  ngOnInit() {
  }

  print = common.printTable;
}
