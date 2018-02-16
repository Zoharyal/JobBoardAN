import { JobService } from './../service/job.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  jobDetails = null;
  error = null;
  errorMessage= '';

  constructor(private service:JobService, private actiRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.actiRoute.snapshot.params.id;

    this.service.getJob(id)
                .subscribe(
                  data => {
                    this.handleServerResponse(data);
                  },
                  error => {
                    this.handleError(error);
                  }
                )
  }

  handleServerResponse(response) {
    if(response.success) {
      this.jobDetails = response.job;
    } else {
      this.errorMessage = response.message;
    }
  }

  handleError(error) {
    console.log('handleError', error.statusText);
    this.error = error;
  }
}
