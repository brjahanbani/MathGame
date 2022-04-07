import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, delay, filter, scan } from 'rxjs/operators';
import { MathValidations } from '../_validations/math-validations';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  public sub: Subscription | undefined;
  public correct: number = 0;
  public secondPerSolution = 0;

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
    // const startTime = new Date();

    this.sub = this.mathForm.statusChanges
      .pipe(
        // delay(500),
        debounceTime(400), //Digikala search
        filter((response) => response === 'VALID'),
        scan(
          (acc) => {
            return {
              numberSolved: this.correct++,
              startTime: acc.startTime,
            };
          },
          { startTime: new Date() }
        )
      ) //for deleting down if
      .subscribe(({ startTime }) => {
        // this.correct++;
        this.secondPerSolution =
          (new Date().getTime() - startTime.getTime()) / this.correct / 1000;

        // if (response === 'INVALID') {
        //   return;
        // }
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
