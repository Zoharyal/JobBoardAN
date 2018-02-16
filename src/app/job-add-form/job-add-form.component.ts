import { AuthService } from './../service/auth.service';
import { JobService } from './../service/job.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-job-add-form',
  templateUrl: './job-add-form.component.html',
  styleUrls: ['./job-add-form.component.css']
})
export class JobAddFormComponent implements OnInit {

  form: FormGroup;
  userIsLoggedIn = false;

  contractTypes = [
    {id: 1, name: 'Stage', value: 'internship'},
    {id: 2, name: 'Interim', value: 'temp'},
    {id: 3, name: 'CDD', value: 'fixed-term'},
    {id: 4, name: 'CDI', value: 'permanent'},
    {id: 5, name: 'Freelance', value: 'freelance'}
  ];

  currencies = [
    {id: 1, name: 'EUR', value:'EUR', symbol:'€'},
    {id: 2, name: 'GBP', value:'GBP', symbol:'£'},
    {id: 3, name: 'USD', value:'USD', symbol:'$'},
    {id: 4, name: 'Franc CFA', value:'CFA', symbol:'CFA'}
  ];

  statuses = [
    {id: 1, name: 'Cadre', value: 'executive'},
    {id: 1, name: 'Employé', value: 'employee'}
  ];

  experience = [
    { id: 1, name: 'Junior', value: 'junior'},
    { id: 2, name: 'Medior', value: 'medior'},
    { id: 3, name: 'Senior', value: 'senior'}
  ];

  areas = [
    {id: 1, name: 'Aucun déplacements', value: 'none'},
    {id: 2, name: 'Déplacements régionaux', value: 'region'},
    {id: 3, name: 'Déplacements nationaux', value: 'nation'},
    {id: 4, name: 'Déplacements internationaux', value: 'international'}
  ];

  constructor(private fb: FormBuilder, private service: JobService, private authService: AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: -1, 
      title: '',
      company: '',
      city: '',
      zipcode: 35,
      description: '',
      contract: '',
      salary: 0,
      currency: '',
      startdate: new Date(),
      experience: '',
      status: '',
      area: '',
      field: '',
      publishdate: new Date(),
      lastupdate: new Date()
    });
    this.checkIfUserIsLoggedIn();
  }

  createJob(jobData) {
    const token = JSON.parse(localStorage.getItem('jbb-data')).token;
    this.service.addJob(jobData, token).subscribe();
    this.authService.addAuthorizationHeader(token);
    this.form.reset();
  }

  checkIfUserIsLoggedIn() {
    if(this.authService.userIsLogin()) {
      this.userIsLoggedIn = true;
    }
  }

}
