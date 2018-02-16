import { JobService } from './../service/job.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  jobs = [];

  constructor(private service:JobService) { }

  ngOnInit() {
    this.service.searchResultSubject.subscribe(
      data => this.handleSearchResult(data),
      error => console.log(error)
    )
  }

  handleSearchResult(data) {
    this.jobs = data.jobs;
  }
}
