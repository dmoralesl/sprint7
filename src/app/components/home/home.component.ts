import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.productsForm.get('web')!.valueChanges.subscribe(checked => {
      this.viewWebDetails = checked;
      this.computeSubTotalPrice(checked, 500)}
    );
    this.productsForm.get('seo')!.valueChanges.subscribe(checked => this.computeSubTotalPrice(checked, 300));
    this.productsForm.get('sem')!.valueChanges.subscribe(checked => this.computeSubTotalPrice(checked, 200));
  } 

  subTotalPrice: number = 0;
  totalPrice: number = this.subTotalPrice;
  viewWebDetails: boolean = false;

  productsForm: FormGroup = new FormGroup({
    web: new FormControl(),
    seo: new FormControl(),
    sem: new FormControl(),
  });

  setTotal(total: number) {
    this.totalPrice = total;
  }

  computeSubTotalPrice(checked: boolean, price: number) {
    if (checked) {
      this.subTotalPrice += price;
      this.totalPrice += price
    } else {
      this.subTotalPrice -= price;
      this.totalPrice -= price
    }
  }

}
