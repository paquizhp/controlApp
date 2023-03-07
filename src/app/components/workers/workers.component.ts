import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../../_services/worker.service';

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
  //selectedWorker;
  public data: any;
  columns = [{ text: 'Nick' }, { text: 'Nombre' }, { text: 'Teléfono' }];

  tableData: any[] = [];
  constructor(private workerService: WorkerService) {}

  ngOnInit(): void {
    this.getAllWorkers();
  }
  onSubmit(): void {
    this.workerService.addWorker(this.form).subscribe(
      (data) => {
        console.log(data.workers);
        this.isSuccessful = true;
        this.isRegisterFailed = false;
        this.tableData.push(this.form);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isRegisterFailed = true;
      }
    );
  }
  getAllWorkers() {
    this.workerService.getWorkers().subscribe(
      (data) => {
        console.log(data);
        this.tableData = data.workers.map((item: any) => {
          return {
            name: item.name,
            nickName: item.nickName,
            telephone: item.telephone,
          };
        });
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
  selectedRow(event: any) {
    //this.selectedWorker= event;
    this.workerService.deleteWorker(event).subscribe(
      ({ data }) => {
        if (data.deletedCount) {
          this.tableData = this.tableData.filter(
            (item) => item.telephone !== event.telephone
          );
        }
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
