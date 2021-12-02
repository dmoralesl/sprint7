import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BudgetService } from './../../services/budget.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TotalEventModel } from './../../models/EventsModel';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, AfterViewInit {

  @Input() subTotal: number = 0; 
  @Input() pagesNumber: number = 1;
  @Input() languagesNumber: number = 1;
  @Output() newTotalEvent = new EventEmitter<TotalEventModel>();
  
  constructor(
    private budgetService: BudgetService,
    private modal: NgbModal) { }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.webDetailsForm.get('numberPages')!.valueChanges.subscribe(pagesNumber =>  {
      const languagesNumber = this.webDetailsForm.get('numberLanguages')!.value;
      this.newTotalEvent.emit({
        total: this.budgetService.calculateTotal(this.subTotal, pagesNumber, languagesNumber),
        pagesNumber,
        languagesNumber
      });
    });
    this.webDetailsForm.get('numberLanguages')!.valueChanges.subscribe( languagesNumber =>  {
      const pagesNumber = this.webDetailsForm.get('numberPages')!.value;
      this.newTotalEvent.emit({
        total: this.budgetService.calculateTotal(this.subTotal, pagesNumber, languagesNumber),
        pagesNumber,
        languagesNumber
      });
    });
    this.webDetailsForm.get('numberPages')?.patchValue(this.pagesNumber);
    this.webDetailsForm.get('numberLanguages')?.patchValue(this.languagesNumber);
  }

  // Font Awesome Icons
  faInfoCircle = faInfoCircle;

  modalText: string = "";

  webDetailsForm: FormGroup = new FormGroup({
    numberPages: new FormControl(this.pagesNumber, [Validators.required, Validators.min(1)]),
    numberLanguages: new FormControl(this.languagesNumber, [Validators.required, Validators.min(1)])
  });

  openModal(targetModal: TemplateRef<any>) {
    this.modal.open(targetModal, { windowClass: 'bottom-modal' });
  }

  fillModal(targetModal: TemplateRef<any>, text: string) {
    this.modalText = text;
    this.openModal(targetModal);
  }
}
