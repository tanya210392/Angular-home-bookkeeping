import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Category } from '../../common/models/category';
import { BEvent } from '../../common/models/event';
import { EventsService } from '../../common/services/events.service';
import { BillService } from '../../common/services/bill.service';
import { Bill } from '../../common/models/bill';
import { mergeMap } from 'rxjs/operators';
import { Message } from '../../../common/models/message';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];

  types = [
    {'type': 'income', 'label': 'Доход'},
    {'type': 'outcome', 'label': 'Расход'}
  ];
  message: Message;

  subs1: Subscription;
  subs2: Subscription;

  constructor(private eventsService: EventsService,
              private billService: BillService) { }

  ngOnInit() {
    this.message = new Message('success', '');
  }

  onSubmit(form) {
    let {category, type, amount, description} = form.value;
    if (amount < 0) amount *= -1;

    const event = new BEvent(
      type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description
    );

    this.subs1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;
        if (type === 'outcome') {
          if (bill.value < amount) {
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }
        this.subs2 = this.billService.updateBill({value, currency: bill.currency}).pipe (
          mergeMap(() => this.eventsService.AddEvent(event)))
            .subscribe(() => {
              form.reset();
              form.form.patchValue({
                category: 1, type: 'outcome', amount: 100, description: ''
              });
              this.message.text = 'Событие успешно добавлено';
              window.setTimeout(() => this.message.text = '', 5000);
            });
      });
  }

  ngOnDestroy() {
    if (this.subs1) this.subs1.unsubscribe();
    if (this.subs2) this.subs2.unsubscribe();
  }

}
