import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  id: string = '';
  constructor(private rutaWork: ActivatedRoute) {}

  ngOnInit(): void {
    this.rutaWork.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
}
