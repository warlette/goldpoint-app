import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../shared/const/environment';
import { common } from './../../shared/services/common';

@Component({
  selector: 'app-repossessed',
  templateUrl: './repossessed.component.html',
  styleUrls: ['./repossessed.component.css']
})
export class RepossessedComponent implements OnInit {

  Pledges: any = [];
  term: any;
  searchee: any;
  sortBy: any = "dateadded";
  reverse: boolean = false;
  
  constructor(
    private http: HttpClient
  ) {
    this.http.get(environment.baseUrl + '/pledges/4')
    .subscribe((result: any) => {
      result.forEach(post => {
        this.Pledges.push({
          dateadded: post.dateadded,
          customerid: post.customerid,
          firstname: post.firstname,
          middlename: post.middlename,
          lastname: post.lastname,
          pawnticket: post.pawnticket,
          description: post.description,
          principal: post.principal,
          netproceed: post.netproceed,
          penalty: post.penalty,
          totalredeem: post.totalredeem,
          partial: post.partial,
          totalrenew: post.totalrenew,
          soldto: post.soldto,
          totalsold: post.totalsold
        });
      });
    });
  }
  ngOnInit() {
  }

  print = common.print;

}
