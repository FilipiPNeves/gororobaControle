import { Component } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent {

  nome: string = '';

  constructor(private loginService: LoginServiceService) {
    this.getNome();
  }

  getNome() {
    this.loginService.getEmail().subscribe((email: any) => {
      this.nome = email.charAt(0).toUpperCase() + email.slice(1).split(/@/)[0];
    })
  }


  logout() {
    this.loginService.logoutService();
  }
}
