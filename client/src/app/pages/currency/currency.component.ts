import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class СurrencyComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello currency');
  }

}
