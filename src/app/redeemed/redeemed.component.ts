import { Component, OnInit } from '@angular/core';
import { common } from './../../shared/services/common';

@Component({
  selector: 'app-redeemed',
  templateUrl: './redeemed.component.html',
  styleUrls: ['./redeemed.component.css']
})
export class RedeemedComponent implements OnInit {

  Funds: any = [];
  term: any;
  searchee: any;
  sortBy: any = "dateadded";
  reverse: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  print = common.print;
}
