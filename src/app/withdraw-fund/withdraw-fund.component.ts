import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../shared/const/environment';
import { CookieService } from 'ngx-cookie-service';
import { iFund } from './../shared/classes/fund';

@Component({
  selector: 'app-withdraw-fund',
  templateUrl: './withdraw-fund.component.html',
  styleUrls: ['./withdraw-fund.component.css']
})
export class WithdrawFundComponent implements OnInit {
  
  iFund = new iFund(null, null, null);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }

  public save() {
    if ((this.iFund.Amount === null) || (this.iFund.Amount === 0) || (this.iFund.Amount === undefined)) {
      alert("Please input amount!");
      return;
    }
    var body = new HttpParams()
      .set('amount', this.iFund.Amount.toString())
      .set('remarks', this.iFund.Remarks)
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
    this.iFund = new iFund(null, null, null);
  }

  public cancel() {
    window.location.href = "/#/home";
  }

}
