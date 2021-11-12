import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { BudgetService } from './../../services/budget.service';
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

  productsForm: FormGroup = new FormGroup({
    web: new FormControl(),
    seo: new FormControl(),
    sem: new FormControl(),
  });

  setTotal(value: number): void {
    this.budgetService.setTotal(value);
    this.refreshBugdet();
  }

  refreshBugdet(): void {
    this.totalPrice = this.budgetService.totalPrice;
    this.subTotalPrice = this.budgetService.subTotalPrice;
  }
}
