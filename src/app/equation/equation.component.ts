import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MathValidations } from '../_validations/math-validations';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [MathValidations.additional('answer', 'a', 'b')]
  );
  constructor() {}
  public get a() {
    return this.mathForm.get('a')?.value;
  }
  public get b() {
    return this.mathForm.get('b')?.value;
  }
  ngOnInit(): void {}

  randomNumber() {
    return Math.floor(Math.random() * 50);
  }
}
