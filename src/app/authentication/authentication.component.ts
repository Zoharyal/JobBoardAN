import { AuthService } from './../service/auth.service';

import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  jbData = null;
  isAuthenticated = false;
  welcomeMessage = '';

  constructor(private service:AuthService) { }

  ngOnInit() {
    if(this.service.userIsLogin()) {
      this.refreshFlags();
    }
  }

  refreshFlags() {
    this.isAuthenticated = true;
    this.welcomeMessage = "Bienvenue sur le Jobboard du turfu!!";
  }

  login(formData) {
    this.service.login(formData)
                .subscribe(
                  data => this.handleLoginSuccess(data),
                  error => this.handleLoginFailer(error)
                );
  }

  handleLoginSuccess(data) {
    this.jbData = data;
    this.refreshFlags();
    localStorage.setItem('jbb-data', JSON.stringify(data));
  }

  handleLoginFailer(error) {
    console.log('error', error);
  }

}
