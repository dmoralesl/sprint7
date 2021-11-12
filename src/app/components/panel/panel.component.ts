import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BudgetService } from './../../services/budget.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, AfterViewInit {

  @Input() subTotal: number = 0; 
  @Output() newTotalEvent = new EventEmitter<number>();
  
  constructor(private budgetService: BudgetService) { }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.webDetailsForm.get('numberPages')!.valueChanges.subscribe(pagesNumber =>  {
      const languagesNumber = this.webDetailsForm.get('numberLanguages')!.value;
      this.newTotalEvent.emit(this.budgetService.calculateTotal(this.subTotal, pagesNumber, languagesNumber))
    });
    this.webDetailsForm.get('numberLanguages')!.valueChanges.subscribe( languagesNumber =>  {
      const pagesNumber = this.webDetailsForm.get('numberPages')!.value;
      this.newTotalEvent.emit(this.budgetService.calculateTotal(this.subTotal, pagesNumber, languagesNumber))
    });
  }

  webDetailsForm: FormGroup = new FormGroup({
    numberPages: new FormControl(1, [Validators.required, Validators.min(1)]),
    numberLanguages: new FormControl(1, [Validators.required, Validators.min(1)])
  });


}
