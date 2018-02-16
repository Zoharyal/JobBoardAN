
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service:AuthService, private router:Router) { }

  ngOnInit() {
  }

  register(formData) {
    this.service.register(formData)
                 .subscribe(
                   data => this.handleRegisterSuccess(data),
                   error => this.handleErrorRegister(error)
                 );
  }

  handleRegisterSuccess(data) {
    localStorage.setItem('jb-data-register', JSON.stringify(data));
    this.router.navigate(['/']);
  }

  handleErrorRegister(error) {
    console.log(error);
  }
}
