import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl(''),
  });
  constructor() {}
  public get a() {
    return this.mathForm.get('a')?.value;
  }
  public get b() {
    return this.mathForm.get('a')?.value;
  }
  ngOnInit(): void {}

  randomNumber() {
    return Math.floor(Math.random() * 50);
  }
}
