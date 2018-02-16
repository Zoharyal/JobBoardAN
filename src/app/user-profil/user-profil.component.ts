import { JobService } from './../service/job.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  decodedToken = null;
  isAdmin = false;
  usermail = '';
  jobs = [];
  adsTitle = '';
  

  constructor(private service:AuthService, private jobService: JobService) { }

  ngOnInit() {
    if(this.service.userIsLogin) {
      const jbToken = JSON.parse(localStorage.getItem('jbb-data'));
      console.log(jbToken);
      this.decodedToken = this.service.decodeToken(jbToken.token);
      
      if(this.decodedToken && this.decodedToken.role === 'admin') {
        this.isAdmin = true;
      }
      this.usermail = this.decodedToken.email;
      if(this.isAdmin) {
        this.loadAllJobsAdmin();
      } else {
        this.loadJobs(this.usermail);
      }
      
    }


  }

  loadAllJobsAdmin() {
    this.jobService.getJobs()
                   .subscribe(
                     data => this.displayAds(data),
                     error => this.handleJobError(error)
                   )
  }
  loadJobs(usermail) {
    this.jobService.getJobsByUsermail(usermail)
                    .subscribe(
                      data => this.displayAds(data.jobs),
                      error => this.handleJobError(error)
                    )
  }

  handleJobData(data) {
    console.log(data);
  }

  handleJobError(error) {
    
  }

  displayAds(data) {
   this.jobs = data;
   switch(this.jobs.length) {
     case 0 : 
      this.adsTitle = 'Aucune annonce postée à ce jour';
      return;
     case 1 : 
      this.adsTitle = 'Une annonce postée';
      return;
     default:
      this.adsTitle = this.jobs.length + 'annonce postées';
      return;
   }

  }

}
