import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faSync } from '@fortawesome/free-solid-svg-icons';

import { BudgetModel } from '../../models/BudgetModel';
import { BudgetService } from './../../services/budget.service';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit {

  // Font awesome icons
  faCheckCircle = faCheckCircle;
  faSync = faSync;

  budgets: BudgetModel[] = [];


  constructor(private budgetSerivce: BudgetService) { }

  // Subscribing to the budget service to get the budgets list updated when a new budget is added
  // whereever the budget service is called (home component in this case)
  ngOnInit(): void {
    this.budgetSerivce.budgetsList.subscribe(budgetsList => this.budgets = budgetsList);

    if (this.attributeToSort) {
      this.sortBudgetListByAttribute();
    }
  }

  nameSearched: string = '';
  attributeToSort: string = '';
  prevSortDirection: number = 1;

  sortBudgetListByAttribute(comparisionDirection: number=1): void {

    this.prevSortDirection = comparisionDirection;
    this.budgets.sort((a: any, b: any) => {
      if (a[this.attributeToSort] < b[this.attributeToSort]) {
        return -comparisionDirection;
      }
      if (a[this.attributeToSort] > b[this.attributeToSort]) {
        return comparisionDirection;
      }
      return 0;
    });
  }

  triggerSort(attribute: string): void {
    // Reseting order to original (insertion order, from older to nweer)
    if (attribute === '') {
      this.attributeToSort = 'creationDate';
      this.sortBudgetListByAttribute(1);
      return;
    }

    let comparisionDirection: number = 1; // 1 for ascending, -1 for descending
    if (this.attributeToSort === attribute && this.prevSortDirection === 1) {
      comparisionDirection = -1
    }

    this.attributeToSort = attribute;
    this.sortBudgetListByAttribute(comparisionDirection);
  }

}
