import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { iFund } from './../shared/classes/fund';
import { environment } from './../shared/const/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-fund',
  templateUrl: './add-fund.component.html',
  styleUrls: ['./add-fund.component.css']
})
export class AddFundComponent implements OnInit {
  
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

  public clear() {
    this.iFund = new iFund(null, null, null);
  }

  public cancel() {
    window.location.href = "/#/home";
  }

}
