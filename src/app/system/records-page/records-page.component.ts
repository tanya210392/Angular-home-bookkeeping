import { Component, OnDestroy, OnInit } from '@angular/core';

import { Category } from '../common/models/category';
import { CategoriesService } from '../common/services/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  isLoaded = false;

  subs: Subscription;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.subs = this.categoriesService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  newCategoryAdded(category: Category) {
    this.categories.push(category);
  }

  categoryWasEdited(category: Category) {
    const idx = this.categories.findIndex(c => c.id === category.id);
    this.categories[idx] = category;
  }

  ngOnDestroy() {
    if (this.subs) this.subs.unsubscribe();
  }

}
