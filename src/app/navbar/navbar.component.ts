import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProgressModule, NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) {
    //console.log(this.route.parent.url.value[0].path)
   }

  ngOnInit() {
  }

}
