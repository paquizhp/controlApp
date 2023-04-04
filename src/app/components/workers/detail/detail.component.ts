import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { endOfWeek, getISOWeek, startOfWeek } from 'date-fns';
import { PayService } from '../../../_services/pay.service';
import { JOBS } from '../models/worker.data';

const PRICE_PATTERN = /^[1-9]\d{0,}(\.\d{0,2})*(\,\d{0,2})?$/;
const DATE_PATTERN = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  _id: string = '';
  name: string = '';
  submitted = false;
  errorMessage = '';
  isPayOk = false;
  isPayFailed = false;
  isPaySuccess = false;

  jobs: Array<any> = JOBS;
  public form: FormGroup = new FormGroup({});
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private payService: PayService
  ) {}
  ngOnInit(): void {
    this.iniForm();
    this.route.params.subscribe((params) => {
      this._id = params['id'];
      this.name = params['name'];
      this.form.get('employee')?.setValue(this.name);
      this.form.get('id')?.setValue(this._id);
      this.onCurrentWeek(this._id);
    });

    // Filtrar los datos para mostrar solo los de la semana actual

    const currentWeek = getISOWeek(new Date());
    console.log(currentWeek);

    /*
    const filteredData = this.data.filter((item) => {
      const itemDate = new Date(item.name);
      return getISOWeek(itemDate) === currentWeek && itemDate;
    });
    
    console.log(filteredData);
    */
  }
  iniForm() {
    this.form = this.fb.group({
      date: [
        this.dateFormat(new Date()),
        [Validators.required, Validators.pattern(DATE_PATTERN)],
      ],
      job: ['', [Validators.required]],
      price: ['', [Validators.required, this.validatePrice]],
      employee: [{ value: this.name, disabled: true }, [Validators.required]],
      id: [this._id, [Validators.required]],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.payService.pay(this.form.value).subscribe({
        next: (data: any) => {
          this.isPaySuccess = true;
          this.errorMessage = data.message;
          this.isPayFailed = false;
        },
        error: (e) => {
          this.errorMessage = e.error.message;
          this.isPayFailed = true;
          this.isPaySuccess = false;
        },
      });
    }
  }

  onCurrentWeek(id: String) {
    const firstDayOfWeek = this.dateFormat(startOfWeek(new Date()));
    const lastDayOfWeek = this.dateFormat(endOfWeek(new Date()));
    console.log(firstDayOfWeek);
    console.log(lastDayOfWeek);
    this.payService
      .getCurrentWeek(id, firstDayOfWeek, lastDayOfWeek)
      .subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (e) => {},
      });
  }

  private dateFormat(date: Date) {
    //const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  private validatePrice(control: FormControl) {
    const value = control.value;
    if (value === '0' || value === '0,0' || value === '0,00') {
      return { invalid: true };
    }
    if (PRICE_PATTERN.test(value)) {
      return null;
    }
    return { invalid: true };
  }
}
