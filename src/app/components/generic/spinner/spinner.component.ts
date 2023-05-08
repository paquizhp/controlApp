import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from '../../../_services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  loading$: Observable<boolean> | undefined;
  constructor(private spinnerSvc: SpinnerService) {}

  ngOnInit(): void {
    this.loading$ = this.spinnerSvc.spinnerState;
  }
}
