import { Component, OnInit } from '@angular/core';
import { common } from './../shared/services/common';

@Component({
  selector: 'app-pledges',
  templateUrl: './pledges.component.html',
  styleUrls: ['./pledges.component.css']
})
export class PledgesComponent implements OnInit {

  Funds: any = [];
  term: any;
  searchee: any;
  sortBy: any = "dateadded";
  reverse: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  pay() {
    
  }

  print = common.print;
}
