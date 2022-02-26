import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { WorkerModel } from 'src/app/models/worker.model';
import { WorkersService } from '../workers.service';

@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['name', 'salary', 'button '];
  workers!: WorkerModel[];
  workersSubs!: Subscription;

  constructor(private workersService: WorkersService) { }

  ngOnInit(): void {

    // this.workersObs = this.workersService.getWorkers();
    this.workersSubs = this.workersService.getWorkers().subscribe(result => {
      this.dataSource.data = result;
      this.workers = result;
    })
  }

}
