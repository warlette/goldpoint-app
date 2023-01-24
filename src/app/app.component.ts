import { Component, OnInit } from '@angular/core';
import { NgProgressModule, NgProgress } from '@ngx-progressbar/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(
    public progress: NgProgress,
    private cookieService: CookieService
  ) {
    this.startLoading();
    

  }

  startLoading() {
   // this.progress.start();
  }

  completeLoading() {
   // this.progress.complete();
  }

  changeProgressColor() {
   // this.progress.setConfig({ color: 'green' });
  }

  ngOnInit() {
    const self = this;
    this.startLoading();

    setTimeout(function() {
      self.completeLoading();
    }, 1000);
    this.cookieService.set('userId', "1"); 
  }

}
