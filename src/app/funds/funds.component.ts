import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../shared/const/environment';
import { Fund } from './../../shared/classes/fund';
import { common } from './../../shared/services/common';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {

  Funds: any = [];
  term: any;
  searchee: any;
  sortBy: any = "dateadded";
  reverse: boolean = false;

  constructor(
    private http: HttpClient
  ) {
    this.http.get(environment.baseUrl + '/funds/history')
    .subscribe((result: any) => {
      result.forEach(post => {
        this.Funds.push(new Fund(
          parseInt(post.id),
          parseFloat(post.amount),
          post.remarks,
          post.type,
          post.dateadded,
          post.pawnticket
        ));
      });
    });
   }

  ngOnInit() {
  }

  public isNumber(val) { 
    if (parseFloat(val) > 0) {
      return true;
    }
    return false;
  }
  
  print = common.print;

}
