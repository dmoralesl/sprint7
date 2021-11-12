import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {

  // Font Awesome icons
  faPlus = faPlus;
  faMinus = faMinus;
  // Global value of the input (to sent to parent component)
  _inputValue: number = 0;

  writeValue(value: any) {
    if (value !== undefined) {
      this.inputValue = value;
    }
  }
  propagateChange = (_: any) => {};

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  get inputValue() {
    return this._inputValue;
  }

  set inputValue(val) {
    this._inputValue = val;
    this.propagateChange(this._inputValue);
  }

  registerOnTouched(): void {}

  increment(): void {
    this.inputValue++;
  }

  decrement(): void {
    if (this.inputValue < 2) { return; }

    this.inputValue--;
  }

} 
