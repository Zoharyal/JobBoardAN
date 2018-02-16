import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class JobService {

  initialJobs = [];
  jobs = [];
  jobsSubject = new Subject();
  searchResultSubject = new Subject();

  BASE_URL = 'http://localhost:4201/api/';

  constructor(private http:Http, private authService:AuthService) { }

  getJobs() {
    return this.http.get(this.BASE_URL + 'jobs')
                    .map(response => response.json());
  }

  getJobsByUsermail(usermail) {
    return this.http.get(this.BASE_URL + 'jobs/' +  usermail )
                    .map(response => response.json());
  }

  addJob(jobData, token) {
    jobData.id = Date.now();
    
    const requestOptions = this.authService.addAuthorizationHeader(token);
    return this.http.post(this.BASE_URL + 'jobs' , jobData, requestOptions)
                    .map(res => {
                        console.log(res);
                        this.jobsSubject.next(jobData);
                    });                
  }

  getJob(id) {
    return this.http.get(this.BASE_URL + 'jobs/' + id)
                    .map(res => res.json());
  }

  searchJob(criteria) {
    return this.http.get(this.BASE_URL + 'search/' + criteria.term + '/' + criteria.place)
                    .map(res => res.json())
                    .do(res => this.searchResultSubject.next(res));
  }

}
