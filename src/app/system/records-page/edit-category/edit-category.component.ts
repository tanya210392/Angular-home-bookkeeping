import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Category } from '../../common/models/category';
import { CategoriesService } from '../../common/services/categories.service';
import { Message } from '../../../common/models/message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  @Input() categories;
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  subs: Subscription;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.onCategoryChange();
    this.message = new Message('success', '');
  }

  onCategoryChange() {
    this.currentCategory = this.categories
      .find(c => c.id === +this.currentCategoryId);
  }

  onSubmit(form) {
    let {capacity, name} = form.value;
    if (capacity < 0) capacity *= -1;

    const category = new Category(name, capacity, +this.currentCategoryId);

    this.subs = this.categoriesService.updateCategory(category)
      .subscribe((category: Category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'Категория изменена';
        window.setTimeout(() => this.message.text = '', 5000);
      });
  }

  ngOnDestroy() {
    if (this.subs) this.subs.unsubscribe();
  }

}
