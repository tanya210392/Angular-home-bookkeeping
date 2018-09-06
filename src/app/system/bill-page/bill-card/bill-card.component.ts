import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '../../common/models/bill';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {
  @Input() bill: Bill;
  @Input() currency: any;

  dollar: number;

  constructor() { }

  ngOnInit() {
    const {rates} = this.currency;
    this.dollar = rates['USD'] * this.bill.value;
  }

}
