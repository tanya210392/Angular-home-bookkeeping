import { Component, OnDestroy, OnInit } from '@angular/core';
import { BillService } from '../common/services/bill.service';
import { CategoriesService } from '../common/services/categories.service';
import { EventsService } from '../common/services/events.service';
import { combineLatest } from 'rxjs';
import { Bill } from '../common/models/bill';
import { Category } from '../common/models/category';
import { BEvent } from '../common/models/event';


@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {
  bill: Bill;
  categories: Category[] = [];
  events: BEvent[] = [];
  isLoaded = false;

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private eventsService: EventsService) {}

  ngOnInit() {
    combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Bill, Category[], BEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    });
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(
      e => cat.id === e.category && e.type === 'outcome'
    );
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    // if (this.subs) this.subs.unsubscribe();
  }

}
