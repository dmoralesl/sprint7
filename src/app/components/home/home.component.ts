import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faShareAlt } from '@fortawesome/free-solid-svg-icons';

import { BudgetModel } from '../../models/BudgetModel';
import { BudgetService } from './../../services/budget.service';
import { TotalEventModel } from '../../models/EventsModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private urlSerializer: UrlSerializer,
    private budgetService: BudgetService) {
      // Adding listeners to update budget when option is selected
      this.productsForm.get('web')!.valueChanges.subscribe(checked => {
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



  ngOnInit(): void {

    // Level 3: fetching data from the query params in the URL
    this.route.queryParams.subscribe(params => {
      // Since the two mandatory values when creating a new budget are the name and the client name,
      // we only check that them both exists, the rest can be null
      if(!Object.keys(params).includes('name') || !Object.keys(params).includes('client')) {
        // Setting to 0 the total price each time component is charged to avoid keep 
        // previous amount when navigation between routes.
        this.totalPrice = 0;
        return;
      }
      this.budgetUrlContet = {
        name: params['name'],
        client: params['client'],
        total: 0,
        creationDate: new Date(params['creationDate']) || null,
        options: {
          web: {
            selected: params['web'].toLowerCase() === 'true' || false,
            pagesNumber: params['pagesNumber'] || null,
            languagesNumber: params['languagesNumber'] || null
          },
          seo: params['seo']?.toLowerCase() === 'true' || false,
          sem: params['sem']?.toLowerCase() === 'true' || false
        }
      }
      if (this.budgetUrlContet.options.web.selected) {
        this.productsForm.get('web')?.patchValue(this.budgetUrlContet.options.web.selected);
      }
      if (this.budgetUrlContet.options.seo) {
        this.productsForm.get('seo')?.patchValue(this.budgetUrlContet.options.seo);
      }
      if (this.budgetUrlContet.options.sem) {
        this.productsForm.get('sem')?.patchValue(this.budgetUrlContet.options.sem);
      }
      this.productsForm.get('budgetName')?.patchValue(this.budgetUrlContet.name);
      this.productsForm.get('clientName')?.patchValue(this.budgetUrlContet.client);
      this.pagesNumber = this.budgetUrlContet.options.web.pagesNumber || 1;
      this.languagesNumber = this.budgetUrlContet.options.web.languagesNumber || 1;
    });
  }



  // Font Awesome Icons
  faArrowLeft = faArrowLeft;
  faShareAlt = faShareAlt;
  
  totalPrice: number = 0;
  subTotalPrice: number = 0;
  pagesNumber: number = 0;
  languagesNumber: number = 0;

  budgetUrlContet: BudgetModel = {
    name: '',
    client: '',
    total: 0,
    creationDate: new Date(),
    options: {
      web: {
        selected: false,
        pagesNumber: 0,
        languagesNumber: 0
      },
      seo: false,
      sem: false

    }
  };

  productsForm: FormGroup =  new FormGroup({
    web: new FormControl(),
    seo: new FormControl(),
    sem: new FormControl(),
    budgetName: new FormControl('', Validators.required),
    clientName: new FormControl('', Validators.required)
  });

  setTotal(totalObject: TotalEventModel, setDetails: boolean=true): void {
    this.budgetService.setTotal(totalObject.total);
    
    if(setDetails) {
      this.pagesNumber = totalObject.pagesNumber;
      this.languagesNumber = totalObject.languagesNumber;
    }

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

  copyBudgetToClipboard(): void {
    
    const url = this.urlSerializer.serialize(this.router.createUrlTree([], {
      queryParams: {
        name: this.productsForm.value.budgetName,
        client: this.productsForm.value.clientName,
        creationDate: new Date().toISOString(),
        web: this.productsForm.value.web,
        seo: this.productsForm.value.seo,
        sem: this.productsForm.value.sem,
        pagesNumber: this.pagesNumber,
        languagesNumber: this.languagesNumber
      }
    }));

    const textArea = document.createElement('textarea');
    textArea.value = window.location.origin +  url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert('Shared link copied to clipboard!')
  }
}
