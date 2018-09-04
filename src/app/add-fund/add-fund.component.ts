import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Fund } from './../../shared/classes/fund';
import { environment } from './../../shared/const/environment';
import { common } from './../../shared/services/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-fund',
  templateUrl: './add-fund.component.html',
  styleUrls: ['./add-fund.component.css']
})
export class AddFundComponent implements OnInit {
  
  Fund = new Fund(null, null, null, null, null, null);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }

  save() {
    if (!common.hasValue(this.Fund.amount)) {
      alert("Please input amount!");
      return;
    }
    var body = new HttpParams()
      .set('amount', this.Fund.amount.toString())
      .set('remarks', this.Fund.remarks)
      .set('userid', this.cookieService.get('userId'));

    this.http.post(environment.baseUrl + '/fund/add', 
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
    .subscribe(post => {      
      if (post[0].addedfund > 0) {
        alert("Fund has been posted!");
        window.location.href = "/#/home"
      }
    });
  }

  clear() {
    this.Fund = new Fund(null, null, null, null, null, null);
  }

  cancel() {
    window.location.href = "/#/home";
  }

}
