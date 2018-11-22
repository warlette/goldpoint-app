import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Fund } from './../../shared/classes/fund';
import { environment } from './../../shared/const/environment';
import { common } from './../../shared/services/common';

@Component({
  selector: 'app-withdraw-fund',
  templateUrl: './withdraw-fund.component.html',
  styleUrls: ['./withdraw-fund.component.css']
})
export class WithdrawFundComponent implements OnInit {
  
  Fund = new Fund(null, null, null, null, null, null);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }

  public save() {
    if (!common.hasValue(this.Fund.amount)) {
      alert("Please input amount!");
      return;
    }
    var body = new HttpParams()
      .set('amount', this.Fund.amount.toString())
      .set('remarks', this.Fund.remarks)
      .set('userid', this.cookieService.get('userId'));

    this.http.post(environment.baseUrl + '/fund/withdraw', 
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
    .subscribe(post => {      
      if (post[0].withdrawnfund > 0) {
        alert("Withdrawn fund has been posted!");
        window.location.href = "/#/home"
      }
    });
  }

  public clear() {
    this.Fund = new Fund(null, null, null, null, null, null);
  }

  public cancel() {
    window.location.href = "/#/home";
  }

}
