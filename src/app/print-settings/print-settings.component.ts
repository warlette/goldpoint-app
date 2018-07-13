import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../shared/const/environment';
import { printsetting } from './../shared/classes/printsetting';
import { common } from './../shared/services/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-print-settings',
  templateUrl: './print-settings.component.html',
  styleUrls: ['./print-settings.component.css']
})
export class PrintSettingsComponent implements OnInit {

  printsettings: any = [];

  constructor(
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
  }

  save() {
    this.printsettings.forEach(row => {
        this.set(row);
    });
    
    alert("Print Settings successfully saved!");
  }

  set(r) {
    var body = new HttpParams()
    .set('id', r.id.toString())
    .set('printfor',r.printfor)
    .set('fieldname', r.fieldname)
    .set('position', r.position)
    .set('width',r.width)
    .set('height', r.height)
    .set('positionx', r.positionx)
    .set('positiony',r.positiony)
    .set('fontname', r.fontname)
    .set('fontsize', r.fontsize)
    .set('fontweight', r.fontweight)
    .set('fontstyle',r.fontstyle)
    .set('textalign', r.textalign)
    .set('textdecoration', r.textdecoration)
    .set('texttransform',r.texttransform)
    .set('color', r.color)
    .set('modifiedby', this.cookieService.get('userId'));

    this.http.post(environment.baseUrl + '/printsettings', 
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
    .subscribe(post => {
      
    });
  }

}
