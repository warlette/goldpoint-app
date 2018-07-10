import { Component, OnInit, Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../shared/const/environment';
import { Dashboard } from './../shared/classes/dashboard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable()
export class HomeComponent implements OnInit {
  
  Dashboard = new Dashboard(null, null, null);

  constructor(
    private http: HttpClient
  ) {
    this.http.get(environment.baseUrl + '/dashboard')
    .subscribe((result: any) => {
      result.forEach(post => {
        this.Dashboard = new Dashboard(
          post.addedfunds,
          post.withdrawnfunds,
          post.currentfunds
        );
      });
    });
   }

  ngOnInit() {
    
  }

}
