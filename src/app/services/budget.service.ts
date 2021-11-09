import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor() { }

  calculateTotal(subTotal: number, pagesNumber: number, languagesNumber: number, price: number=30): number {

    // If pages and languages are 1 we must return only subTotal price because the basic price includes one page and one language
    if (pagesNumber === 1 && languagesNumber === 1) {
      return subTotal;
    }

    // First page and language is included in basic price so we have to reduce in 1 the number to calculate the total
    pagesNumber = pagesNumber === 1 ? pagesNumber : pagesNumber -1;
    languagesNumber = languagesNumber === 1 ? languagesNumber : languagesNumber -1;
    
    return (subTotal + ( pagesNumber * languagesNumber * price ));
  }
}
