import { Component, OnInit, Injectable } from '@angular/core';
import { DatePipe, formatNumber } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Customer } from './../shared/classes/customer';
import { Pledge } from './../shared/classes/pledge';
import { common } from './../shared/services/common';
import { environment } from './../shared/const/environment';
import { CookieService } from 'ngx-cookie-service';
import { SearchFilterPipe  } from './../shared/pipes/searchFilter';
import { printsetting } from './../shared/classes/printsetting';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  Pledge = new Pledge(null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  Customer = new Customer(null,null,null,null,null,null,null,null,null,null,null);
  printsettings: any = [];
  
  constructor(
    public datepipe: DatePipe,
    public searchpipe: SearchFilterPipe,
    private http: HttpClient,
    private cookieService: CookieService
  ) { 
    this.http.get(environment.baseUrl + '/printsettings/pledge')
    .subscribe((result: any) => {
      result.forEach(post => {
        this.printsettings.push(new printsetting(
          parseInt(post.id),
          post.printfor,
          post.fieldname,
          post.position,
          post.width,
          post.height,
          post.positionx,
          post.positiony,
          post.fontname,
          post.fontsize,
          post.fontweight,
          post.fontstyle,
          post.textalign,
          post.textdecoration,
          post.texttransform,
          post.color
        ));
      });
    });
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
    if (!common.hasValue(this.Customer.firstname)
      || !common.hasValue(this.Customer.lastname)
      || !common.hasValue(this.Customer.address)
      || !common.hasValue(this.Customer.birthdate)
      || !common.hasValue(this.Customer.idpresented)
      || !common.hasValue(this.Customer.contact)
      || !common.hasValue(this.Pledge.isgold)
      || !common.hasValue(this.Pledge.pawnticket)
      || !common.hasValue(this.Pledge.description)
      || !common.hasValue(this.Pledge.amount)
      || !common.hasValue(this.Pledge.interest)
      || !common.hasValue(this.Pledge.frequency)
      || !common.hasValue(this.Pledge.servicecharge)
      ) {
      alert("Please enter the required field!");
      return;
    }

    var bdate = {year: null, month: null, day: null};
    bdate = JSON.parse(JSON.stringify(this.Customer.birthdate)) || {};

    var birthdate = bdate.year + "-" + bdate.month + "-" + bdate.day;

    var body = new HttpParams()
      .set('customerid', "-1")
      .set('firstname', this.Customer.firstname)
      .set('middlename', this.Customer.middlename)
      .set('lastname', this.Customer.lastname)
      .set('birthdate', birthdate)
      .set('contact', this.Customer.contact)
      .set('address', this.Customer.address)
      .set('idpresented', this.Customer.idpresented)
      .set('emailaddress', this.Customer.emailaddress)
      .set('remarks', this.Customer.remarks)
      .set('addedby', this.cookieService.get('userId'));

    this.http.post(environment.baseUrl + '/customer/add', 
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
    .subscribe(post => {      
      if (post[0].customer > 0) {
        alert("Customer info has been posted!");
        
        var body2 = new HttpParams()
          .set('customerid', post[0].customer)
          .set('isgold', this.Pledge.isgold.toString())
          .set('pawnticket', this.Pledge.pawnticket)
          .set('amount', this.Pledge.amount.toString())
          .set('interest', this.Pledge.interest.toString())
          .set('frequency', this.Pledge.frequency.toString())
          .set('description', this.Pledge.description)
          .set('servicecharge', this.Pledge.servicecharge.toString())
          .set('remarks', this.Pledge.remarks)
          .set('pledgedby', this.cookieService.get('userId'));
    
        this.http.post(environment.baseUrl + '/pledge', 
          body2.toString(),
          {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')
          }
        )
        .subscribe(post => {      
          if (post[0].pledge > 0) {
            alert("Pledge has been posted!");
            window.location.href = "/#/home";
          }
        });
      }
    });
     
  }
  
  print() {
    var $html = '';
    $html += '<img src="http://localhost:8585/images/pt2.jpg" style="position: fixed; top:0;left:0;width: 1063px"/>';
    $html += this.setHTML('pawnticket', this.Pledge.pawnticket); //pawnticket
    $html += this.setHTML('dategranted', this.datepipe.transform(this.Pledge.dateadded, "MMM. dd, yyyy"));  //Date Granted
    $html += this.setHTML('datemature', this.datepipe.transform(this.Pledge.datemature, "MMM. dd, yyyy")); //Date Mature
    $html += this.setHTML('dateexpire', this.datepipe.transform(this.Pledge.dateexpire, "MMM. dd, yyyy")); //Date Mature
    $html += this.setHTML('name', this.Customer.firstname + " " + this.Customer.lastname); //Name
    $html += this.setHTML('address', this.Customer.address); //Address
    $html += this.setHTML('cashinwords', 'cash in words'); //Cash in words
    $html += this.setHTML('cashinnumber', this.Pledge.amount); //Cash in number
    $html += this.setHTML('interestwords', 'interest in words'); //Interest in words
    $html += this.setHTML('interest', this.Pledge.interest); //Interest in numbers
    $html += this.setHTML('frequency', this.Pledge.frequency); //Frequency
    $html += this.setHTML('frequencytype', 'frequencytype'); //Frequency Type
    $html += this.setHTML('description', this.Pledge.description); //Description
    $html += this.setHTML('principal', this.Pledge.amount); //Principal
    $html += this.setHTML('interestrate', this.Pledge.amount * (this.Pledge.interest / 100.00)); //Interest rate
    $html += this.setHTML('servicecharge', this.Pledge.servicecharge); //Service Charge
    $html += this.setHTML('netproceed', this.Pledge.amount - this.Pledge.amount * (this.Pledge.interest / 100.00) - this.Pledge.servicecharge); //Net proceed
    $html += this.setHTML('idpresented', this.Customer.id); //Id Presented
    $html += this.setHTML('contact', this.Customer.contact); //Contact

    
    var newWin = window.open("");
    var css1 = document.createElement("link");
    css1.setAttribute("rel", "stylesheet");
    css1.setAttribute("type", "text/css");
    css1.setAttribute("href", "http://" + window.location.host + "/assets/css/yeti_bootstrap.min.css");
    newWin.document.write($html);
    newWin.document.getElementsByTagName("head")[0].appendChild(css1);
  }

  setHTML(fieldname, value) {
    var $html = '';
    $html += '<div style="position:' + this.searchpipe.transform(this.printsettings, 'fieldname', fieldname)[0].position + ';';
    $html += 'left:' + this.searchpipe.transform(this.printsettings, 'fieldname', fieldname)[0].positionx + ';';
    $html += 'top:' + this.searchpipe.transform(this.printsettings, 'fieldname', fieldname)[0].positiony + ';';
    $html += 'width:' + this.searchpipe.transform(this.printsettings, 'fieldname', fieldname)[0].width + ';';
    $html += 'height:' + this.searchpipe.transform(this.printsettings, 'fieldname', fieldname)[0].height + ';';
    $html += 'font-family:' + this.searchpipe.transform(this.printsettings, 'fieldname', fieldname)[0].fontname + ';';
    $html += 'font-size:' + this.searchpipe.transform(this.printsettings, 'fieldname', fieldname)[0].fontsize + ';';
    $html += 'font-weight:' + this.searchpipe.transform(this.printsettings, 'fieldname', fieldname)[0].fontweight + ';';
    $html += 'font-style:' + this.searchpipe.transform(this.printsettings, 'fieldname', fieldname)[0].fontstyle + ';';
    $html += 'text-align:' + this.searchpipe.transform(this.printsettings, 'fieldname', fieldname)[0].textalign + ';';
    $html += 'text-decoration:' + this.searchpipe.transform(this.printsettings, 'fieldname', fieldname)[0].textdecoration + ';';
    $html += 'text-transform:' + this.searchpipe.transform(this.printsettings, 'fieldname', fieldname)[0].texttransform + ';';
    $html += 'color:' + this.searchpipe.transform(this.printsettings, 'fieldname', fieldname)[0].color + ';';
    $html += '">' + value + '</div>';

    return $html;
  }

  search() {
  
  }

  clear() {
    
  }
  
  cancel() {
    
  }

}
