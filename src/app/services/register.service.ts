import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private app: FirebaseApp) { }

  async register(email: string, password: string) {
    await createUserWithEmailAndPassword(getAuth(this.app), email, password).then(() => {
      alert('Criado com sucesso!');
    }).catch(err => {
      alert('Erro!');
    });
  }
}
