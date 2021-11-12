import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BudgetModel } from '../../models/BudgetModel';
import { BudgetService } from './../../services/budget.service';
import { TotalEventModel } from '../../models/EventsModel';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.refreshBugdet();
    // Setting to 0 the total price each time component is charged to avoid keep 
    // previous amount when navigation between routes.
    this.totalPrice = 0;
  }

  ngAfterViewInit(): void {
    this.productsForm.get('web')!.valueChanges.subscribe(checked => {
      this.viewWebDetails = checked;
      this.budgetService.computeSubTotalPrice(checked, 500);
      this.refreshBugdet();
    });
    this.productsForm.get('seo')!.valueChanges.subscribe(checked => {
      this.budgetService.computeSubTotalPrice(checked, 300);
      this.refreshBugdet();
    });
    this.productsForm.get('sem')!.valueChanges.subscribe(checked => {
      this.budgetService.computeSubTotalPrice(checked, 200);
      this.refreshBugdet();
    });
  } 

  // Font Awesome Icons
  faArrowLeft = faArrowLeft;

  totalPrice: number = 0;
  subTotalPrice: number = 0;
  viewWebDetails: boolean = false;
  pagesNumber: number = 0;
  languagesNumber: number = 0;

  productsForm: FormGroup = new FormGroup({
    web: new FormControl(),
    seo: new FormControl(),
    sem: new FormControl(),
    budgetName: new FormControl('', Validators.required),
    clientName: new FormControl('', Validators.required)
  });

  setTotal(totalObject: TotalEventModel): void {
    this.budgetService.setTotal(totalObject.total);
    this.pagesNumber = totalObject.pagesNumber;
    this.languagesNumber = totalObject.languagesNumber;
    this.refreshBugdet();
  }

  refreshBugdet(): void {
    this.totalPrice = this.budgetService.totalPrice;
    this.subTotalPrice = this.budgetService.subTotalPrice;
  }

  saveBudget(): void {
    const budgetObject: BudgetModel = {
      name: this.productsForm.value.budgetName,
      client: this.productsForm.value.clientName,
      total: this.totalPrice,
      creationDate: new Date(),
      options: {
        web: {
          selected: this.productsForm.value.web,
          pagesNumber: this.pagesNumber,
          languagesNumber: this.languagesNumber
          },
        seo: this.productsForm.value.seo,
        sem: this.productsForm.value.sem
      }
    };

    this.budgetService.addBudget(budgetObject);

  }
}
