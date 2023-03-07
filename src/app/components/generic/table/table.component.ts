import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() columns: any;
  @Input() tableData: any;
  @Input() actions: boolean | undefined;

  @Output()
  ouputData = new EventEmitter<any>();
  objectKeys = Object.keys;
  constructor() {}

  ngOnInit(): void {}

  onSelect(row: any) {
    this.ouputData.emit(row);
  }
}
