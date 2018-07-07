import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {

  iPledge: any;

  constructor(public ngxSmartModalService: NgxSmartModalService) { }

  ngAfterViewInit() {
    const obj: Object = {
      prop1: 'test',
      prop2: true,
      prop3: [{a: 'a', b: 'b'}, {c: 'c', d: 'd'}],
      prop4: 327652175423
    };

    this.ngxSmartModalService.setModalData(obj, 'myModal');
  }
  public log(msg: string) {
    console.log(msg);
  }
}
