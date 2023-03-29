import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface TableColumn {
  id: number;
  field: string;
  value: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  displayedColumns: Array<String> = [];
  selectedRow: any = [];
  selectedRowDblclick: any = [];
  @Input() columns: Array<TableColumn> = [];
  @Input() tableData: any;
  @Input() actions: boolean = false;

  @Output() ouputData = new EventEmitter<Array<any>>();
  private lastTouchTime: number = 0;
  private touchDelay: number = 200;
  constructor() {}

  ngOnInit(): void {
    this.setDisplayedColumns();
  }
  private setDisplayedColumns() {
    this.displayedColumns = this.columns.map((item) => item.field);
    //this.displayedColumns = [...this.displayedColumns, 'actions'];
  }

  onClick(row: any) {
    if (!this.isSelected(row)) {
      this.selectedRow = row;
    }
  }
  isSelected(row: any) {
    return JSON.stringify(this.selectedRow) === JSON.stringify(row);
  }
  onTouchStart() {
    const currentTime = new Date().getTime();
    const timeSinceLastTouch = currentTime - this.lastTouchTime;

    if (timeSinceLastTouch < this.touchDelay) {
      // Double tap detected
      this.onDblClick(this.selectedRow);
    } else {
      // Single tap detected
      this.lastTouchTime = currentTime;
    }
  }
  onDblClick(row: any) {
    console.log('table', row);
    this.ouputData.emit(row);
  }
  edit(row: any) {}
  delete(row: any) {}
}
