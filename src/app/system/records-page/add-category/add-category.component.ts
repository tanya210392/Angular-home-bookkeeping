import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { Category } from '../../common/models/category';
import { CategoriesService } from '../../common/services/categories.service';
import { Message } from '../../../common/models/message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  @Output() onCategoryAdd = new EventEmitter<Category>();

  message: Message;

  subs: Subscription;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '');
  }

  onSubmit(form) {
    let {name, capacity} = form.value;
    if (capacity < 0) capacity *= -1;

    const category = new Category(name, capacity);

    this.subs = this.categoriesService.addCategory(category)
      .subscribe((category: Category) => {
        form.reset();
        form.form.patchValue({name: '', capacity: 100});
        this.onCategoryAdd.emit(category);
        this.message.text = 'Добавлена новая категория';
        window.setTimeout(() => this.message.text = '', 5000);
      });
  }

  ngOnDestroy() {
    if (this.subs) this.subs.unsubscribe();
  }

}
