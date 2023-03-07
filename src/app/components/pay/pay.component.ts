import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css'],
})
export class PayComponent implements OnInit {
  isSuccessful: boolean = false;
  workers: any[] = [];
  form: any = {};
  constructor() {}

  ngOnInit(): void {}
  onSubmit(): void {}
}
