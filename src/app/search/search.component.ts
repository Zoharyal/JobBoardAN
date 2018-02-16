import { JobService } from './../service/job.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  jobs = [];
  error = null;

  constructor(private service:JobService) { }

  ngOnInit() {
  }

  searchJobs(searchData) {
    console.log('searchdata', searchData);
    this.service.searchJob(searchData)
                .subscribe(
                  data => {
                    this.jobs = data;
                  },
                  error => {
                    console.log(error);
                  }
                )
  }
}
