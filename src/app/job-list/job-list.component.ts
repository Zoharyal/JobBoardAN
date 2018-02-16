import { JobService } from './../service/job.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})

export class JobListComponent implements OnInit {
  jobs= [];
  error = '';
  constructor(private service:JobService) { }

  ngOnInit() {
    this.service.getJobs()
      .subscribe(
          data => this.jobs = data,
          error => {
            console.log(error);
            this.error = error;
          }
       );
    this.service.jobsSubject.subscribe(
        data => {
          console.log(data);
          this.jobs = [data, ...this.jobs];
        }
    )
  }
}
