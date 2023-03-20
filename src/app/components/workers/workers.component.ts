import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkerService } from '../../_services/worker.service';
import { COLUMNS } from './models/worker.data';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css'],
})
export class WorkersComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isRegisterFailed = false;
  errorMessage = '';

  showModal: boolean = false;
  selectedWorker: any;
  public data: any;
  columns = COLUMNS;

  tableData: any[] = [];
  constructor(private workerService: WorkerService, private router: Router) {}

  ngOnInit(): void {
    this.getAllWorkers();
    console.log(this.form);
  }
  onSubmit(): void {
    this.workerService.addWorker(this.form).subscribe(
      (data) => {
        console.log(data.workers);
        this.isSuccessful = true;
        this.isRegisterFailed = false;
        this.tableData.push(this.form); //por lo pronto
        this.form = {};
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isRegisterFailed = true;
      }
    );
  }
  getAllWorkers() {
    this.workerService.getWorkers().subscribe({
      next: (data: any) => {
        this.tableData = data.workers;
      },
      error: (e) => console.error(e),
    });
  }
  selectedRow(row: any) {
    console.log('ss', row);
    const params = { id: row._id, name: row.name, telephone: row.telephone };
    this.router.navigate([
      '/admin/workers/detail',
      row._id,
      row.name,
      row.telephone,
    ]);
  }
}
