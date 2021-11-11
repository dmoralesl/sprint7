import { BehaviorSubject, Observable } from 'rxjs';

import { BudgetModel } from '../models/BudgetModel';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor() { }

  subTotalPrice: number = 0;
  totalPrice: number = this.subTotalPrice;

  // Using a BehaviorSubject to share data between components that are not directly related 
  // and keep them up to date when the data changes
  initialBudgetList: BudgetModel[] = [];
  private budgetListSource = new BehaviorSubject(this.initialBudgetList);
  budgetsList: Observable<BudgetModel[]> = this.budgetListSource.asObservable();

  computeSubTotalPrice(checked: boolean, price: number) {
    if (checked) {
      this.subTotalPrice += price;
      this.totalPrice += price
    } else {
      this.subTotalPrice -= price;
      this.totalPrice -= price
    }
  }

  setTotal(total: number) {
    this.totalPrice = total;
  }

  addBudget(budget: BudgetModel) {
    const newBudgetsList: BudgetModel[] = [...this.budgetListSource.value, budget];
    this.budgetListSource.next(newBudgetsList);
  }

  calculateTotal(subTotal: number, pagesNumber: number, languagesNumber: number, price: number=30): number {
    
    // If pages and languages are 1 we must return only subTotal price because the basic price includes one page and one language
    if (pagesNumber <= 1 && languagesNumber <= 1) {
      return subTotal;
    }
    
    // First page and language is included in basic price so we have to reduce in 1 the number to calculate the total
    pagesNumber = pagesNumber <= 1 ? 1 : pagesNumber -1;
    languagesNumber = languagesNumber <= 1 ? 1 : languagesNumber -1;
    
    return (subTotal + ( pagesNumber * languagesNumber * price ));
  }
}
