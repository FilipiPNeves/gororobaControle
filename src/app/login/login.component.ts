import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService: LoginServiceService, private router: Router) {}

  ngOnInit() {
    this.loginService.loginAuto();
  }

  login(objLogin: NgForm) {
    this.loginService.loginService(objLogin);
  }

  register() {
    this.router.navigate(['/register']);
  }

}
