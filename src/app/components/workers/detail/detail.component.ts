import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JOBS } from '../models/worker.data';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  id: string = '';
  name: string = '';
  submitted = false;

  jobs: Array<any> = JOBS;
  public form: FormGroup = new FormGroup({});
  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.iniForm();
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.name = params['name'];
      this.form.get('employee')?.setValue(this.name);
    });
  }
  iniForm() {
    this.form = this.fb.group({
      date: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      job: ['', [Validators.required]],
      price: ['00.0', [Validators.required]],
      employee: [this.name, [Validators.required]],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
  }
}
