import { Component, OnInit, EventEmitter, Output, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { Customer } from './../../shared/classes/customer';
import { Pledge } from './../../shared/classes/pledge';
import { common } from './../../shared/services/common';
import { environment } from './../../shared/const/environment';
import { printsetting } from './../../shared/classes/printsetting';
import { SearchFilterPipe  } from './../../shared/pipes/searchFilter';

@Component({
  selector: 'app-renew',
  templateUrl: './renew.component.html',
  styleUrls: ['./renew.component.css']
})
export class RenewComponent implements OnInit {

  Pledge = new Pledge(null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  Customer = new Customer(null,null,null,null,null,null,null,null,null,null,null);
  printsettings: any = [];
  dateTo = this.datepipe.transform(new Date('6/20/17'), 'shortDate');
  id: string;

  constructor(
    public datepipe: DatePipe,
    public searchpipe: SearchFilterPipe,
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
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
    
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      if (this.id !== undefined) {
        this.Pledge.pawnticket = this.id;
        this.search();
      }
    });

  }

  ngOnInit() {
    
  }

  save() {
    
    if ((document.activeElement instanceof HTMLElement) && (document.activeElement.id === "pawnticket")) {
      return;
    }

    if ((document.activeElement instanceof HTMLElement) && (document.activeElement.id === "amountprepaid")) {
      return;
    }

    if (!common.hasValue(this.Customer.id)) {
      alert("Please select customer!");
      return;
    }
    
    if (!common.hasValue(this.Pledge.pawnticketnew)) {
      alert("Please input new pawn ticket number!");
      return;
    }

    if (!common.hasValue(this.Pledge.pawnticket)) {
      alert("Please input pawn ticket number!");
      return;
    }
    
    if (!common.hasValue(this.Pledge.amount)) {
      alert("Please input amount!");
      return;
    }

    if (!common.hasValue(this.Pledge.interest)) {
      alert("Please input interest!");
      return;
    }

    if (!common.hasValue(this.Pledge.description)) {
      alert("Please input description!");
      return;
    }
    this.Pledge.isgold = this.Pledge.isgold ? this.Pledge.isgold : false;
    this.Pledge.nocollateral = this.Pledge.nocollateral ? this.Pledge.nocollateral : false;
    this.Pledge.customerid = this.Customer.id;

    var body = new HttpParams()
      .set('pawnticket', this.Pledge.pawnticket.toString())
      .set('pawnticketnew', this.Pledge.pawnticketnew.toString())
      .set('amount', this.Pledge.amount.toString())
      .set('amountprepaid', this.Pledge.amountprepaid.toString())
      .set('penalty', this.Pledge.penalty.toString())
      .set('remarks', this.Pledge.remarksrenewed.toString())
      .set('renewedby', this.cookieService.get('userId'));

    this.http.post(environment.baseUrl + '/renew', 
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
    .subscribe(post => { 
      if (post[0].renew > 0) {
        alert("Pledge has been renewed!");
        this.print();
        window.location.href = "/#/home"
      }
    });
  }

  search() {
    var netproceed,
      total,
      penalty;
    this.http.get(environment.baseUrl + '/pledge/' + this.Pledge.pawnticket)
    .subscribe((result: any) => {
      if (result.length > 0) {

        if (!(result[0].type === 1)) {
          alert("Ticket has been [redeemed | renewed | repossessed | sold] already!");
          this.clear();
          return;
        }

        this.Customer = new Customer(
          result[0].clientid,
          result[0].firstname,
          result[0].middlename,
          result[0].lastname,
          this.datepipe.transform(result[0].birthdate, 'longDate'),
          result[0].contact,
          result[0].address,
          result[0].idpresented,
          result[0].email,
          result[0].remarks,
          null
        );

        netproceed = result[0].amount
        this.Pledge = new Pledge(
          result[0].pledgeid,
          result[0].clientid,
          result[0].isgold,
          result[0].nocollateral,
          result[0].pawnticket,
          null,
          parseFloat(result[0].amount),
          null,
          parseFloat(result[0].interest),
          result[0].frequency,
          null,
          null,
          null,
          null,
          null,
          null,
          result[0].description,
          parseFloat(result[0].servicecharge),
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          this.datepipe.transform(new Date(result[0].dateadded), 'longDate'),
          this.datepipe.transform(common.setMonth(new Date(result[0].dateadded), 1), 'longDate'),
          this.datepipe.transform(common.setMonth(new Date(result[0].dateadded), 4), 'longDate')
        );

        this.compute();

      }
    });
  }

  compute() {
    var computedPenalty = common.compute(this.Pledge, this.dateTo);

    this.Pledge.amountprepaid = this.Pledge.amountprepaid || 0;

    if (!common.hasValue(this.Pledge.servicecharge) || 
      !common.hasValue(this.Pledge.amount)
    ) {
      return;
    }

    if (computedPenalty) {
      this.Pledge.penalty = parseFloat(computedPenalty.penalty.toString());

      if (common.hasValue(this.Pledge.amountprepaid) && (this.Pledge.amountprepaid < this.Pledge.amount)) {
        this.Pledge.amounttotal = this.Pledge.penalty + 
          parseFloat(this.Pledge.amountprepaid.toString()) + 
          ((this.Pledge.interest / 100) * (this.Pledge.amount - parseFloat(this.Pledge.amountprepaid.toString())));
        this.Pledge.amounttotal += this.Pledge.servicecharge;
      } else {
        this.Pledge.amounttotal = this.Pledge.penalty + this.Pledge.servicecharge;
      }
    }

  }

  clear() {
    this.Pledge = new Pledge(null,null,null,null,null,null,null,null,null,null,
      null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    this.Customer = new Customer(null,null,null,null,null,null,null,null,null,null,null);
  }
  
  cancel() {
    window.location.href = "/#/home"
  }

  print() {
    var $html = '';
    $html += '<img src="http://localhost:8000/images/pt2.jpg" style="position: fixed; top:0;left:0;width: 1063px"/>';
    //pawnticket
    $html += this.setHTML('pawnticket', this.Pledge.pawnticketnew);
    //Date Granted
    $html += this.setHTML('dategranted', this.datepipe.transform(this.Pledge.dateadded, "MMM. dd, yyyy"));
    //Date Mature
    $html += this.setHTML('datemature', this.datepipe.transform(this.Pledge.datemature, "MMM. dd, yyyy"));
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
console.log($html)
    common.print($html);
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
  

}
