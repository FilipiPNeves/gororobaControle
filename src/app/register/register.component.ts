import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router'; // Importar o Router

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  secretCode = '010203';

  constructor(private registerService: RegisterService, private router: Router) {} // Injetar o Router

  register(form: NgForm) {
    if(form.value.code == this.secretCode){
      this.registerService.register(form.value.email, form.value.password);
      this.router.navigateByUrl('/registros/envio');
    }else{
      alert("Código secreto incorreto!")
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
