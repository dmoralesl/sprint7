import { Component, OnInit } from '@angular/core';

import { BudgetModel } from '../../models/BudgetModel';
import { BudgetService } from './../../services/budget.service';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit {

  // Font awesome icons
  faCheckCircle = faCheckCircle;

  budgets: BudgetModel[] = [];


  constructor(private budgetSerivce: BudgetService) { }

  // Subscribing to the budget service to get the budgets list updated when a new budget is added
  // whereever the budget service is called (home component in this case)
  ngOnInit(): void {
    this.budgetSerivce.budgetsList.subscribe(budgetsList => this.budgets = budgetsList);
  }
  
}
