import {Component, OnDestroy, OnInit} from '@angular/core';
import { BillService } from '../common/services/bill.service';
import { Bill } from '../common/models/bill';
import { combineLatest, Subscription } from 'rxjs';



@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  subs1: Subscription;
  subs2: Subscription;

  currency: any;
  bill: Bill;

  isLoaded = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.subs1 = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
      ).subscribe((data: [Bill, any]) => {
        this.bill = data[0];
        this.currency = data[1];
        this.isLoaded = true;
    });
  }

  onRefresh() {
    this.isLoaded = false;
    this.subs2 = this.billService.getCurrency()
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    this.subs1.unsubscribe();
    if (this.subs2) {
      this.subs2.unsubscribe();
    }
  }

}
