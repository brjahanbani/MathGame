import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MathValidations } from '../_validations/math-validations';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  public sub: Subscription | undefined;
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
  ngOnInit(): void {
    this.sub = this.mathForm.statusChanges.subscribe((response) => {
      if (response === 'INVALID') {
        return;
      }
      this.mathForm.setValue({
        a: this.randomNumber(),
        b: this.randomNumber(),
        answer: '',
      });
    });
  }

  randomNumber() {
    return Math.floor(Math.random() * 50);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe(); //for eliminating adding excess subs to RAM
  }
}
