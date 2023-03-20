import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from './table.component';

NgModule({
  declarations: [TableComponent],
  imports: [CdkTableModule, MatIconModule],
  providers: [],
  exports: [TableComponent],
});
export class TableModule {}
