import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { NgProgressModule, NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public isTrans: boolean;
  public isLists: boolean;
  public isCollection: boolean;
  public trans: number;

  constructor(
    public progress: NgProgress,
    private hostElement: ElementRef,
    private router: Router
  ) {
    this.isTrans = this.isLists = this.isCollection = true;
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        const url = event.url;

        if (url == '/home') {
          this.trans = 0;
        } else if (url == '/newcustomer') {
          this.trans = 11;
        } else if (url == '/pledge') {
          this.trans = 12;
        } else if (url == '/redeem') {
          this.trans = 13;
        } else if (url == '/renew') {
          this.trans = 14;
        } else if (url == '/sell') {
          this.trans = 15;
        } else if (url == '/customers') {
          this.trans = 21;
        } else if (url == '/pledges') {
          this.trans = 22;
        } else if (url == '/redeemed') {
          this.trans = 23;
        } else if (url == '/renewed') {
          this.trans = 24;
        } else if (url == '/repossessed') {
          this.trans = 25;
        } else if (url == '/sold') {
          this.trans = 26;
        } else if (url == '/funds') {
          this.trans = 27;
        } else if (url == '/addfund') {
          this.trans = 31;
        } else if (url == '/withdrawfund') {
          this.trans = 32;
        }
      
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });

  }

  startLoading() {
   // this.progress.start();
  }

  completeLoading() {
   // this.progress.complete();
  }

  changeProgressColor() {
  //  this.progress.setConfig({ color: 'green' });
  }

  ngOnInit() {
    const self = this;
    this.startLoading();

    setTimeout(function() {
      self.completeLoading();
    }, 1000);
  }

  public setClass(index) {
    this.trans = index;
  }

}
