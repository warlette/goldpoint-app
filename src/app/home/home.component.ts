import { Component, OnInit, Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable()
export class HomeComponent implements OnInit {
  users:  any;

  constructor(
    private http: HttpClient
  ) {
    //this.http.get('https://jsonplaceholder.typicode.com/posts/1')
    // this.http.get('http://localhost:3000/users')
    // .subscribe(post => this.users = post);
   }

  ngOnInit() {
    console.log(this.users);
  }

}
