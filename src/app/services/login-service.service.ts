import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Firestore, addDoc, collection, getDocs, query, where, Timestamp, DocumentReference, doc, deleteDoc } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from '@angular/fire/auth';
import { Router } from '@angular/router';



import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private firestore: Firestore, private app: FirebaseApp, private route: Router) { }


  // CONSULTA COMPONENTS
  async puxaEntradasService(data01: string, data02: string) {
    const collectionInstance = collection(this.firestore, 'entradas');

    // Converte as datas ISO 8601 para Timestamps do Firebase
    const startDate = Timestamp.fromDate(new Date(data01));
    const endDate = Timestamp.fromDate(new Date(data02));

    // Cria a query para buscar documentos cujo campo 'horario' está entre 'startDate' e 'endDate'
    const q = query(
      collectionInstance,
      where('horario', '>=', startDate),
      where('horario', '<=', endDate)
    );

    const querySnapshot = await getDocs(q);
    // Continue o processamento do 'querySnapshot' conforme necessário

    const documentos = querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    });


    return documentos;
  }

  async puxaSaidasService(data01: string, data02: string) {
    const collectionInstance = collection(this.firestore, 'saidas');

    // Converte as datas ISO 8601 para Timestamps do Firebase
    const startDate = Timestamp.fromDate(new Date(data01));
    const endDate = Timestamp.fromDate(new Date(data02));

    // Cria a query para buscar documentos cujo campo 'horario' está entre 'startDate' e 'endDate'
    const q = query(
      collectionInstance,
      where('horario', '>=', startDate),
      where('horario', '<=', endDate)
    );

    const querySnapshot = await getDocs(q);
    // Continue o processamento do 'querySnapshot' conforme necessário

    const documentos = querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    });
    return documentos;
  }

  excluirEntrada(idEntrada: string) {
    const collectionInstance = collection(this.firestore, 'entradas');
    const docReference = doc(collectionInstance, idEntrada);

    deleteDoc(docReference);
  }

  excluirSaida(idSaida: string) {
    const collectionInstance = collection(this.firestore, 'saidas');
    const docReference = doc(collectionInstance, idSaida);

    deleteDoc(docReference);
  }


  //

  async envio(objEnvio: any): Promise<DocumentReference<any>> {
    let nome;
    await this.getEmail().subscribe((email: any) => {
      nome = email.charAt(0).toUpperCase() + email.slice(1).split(/@/)[0];
      objEnvio.nome = nome;
    });
    if(objEnvio.tipoEntrada) {
      return addDoc(collection(this.firestore, 'entradas'), objEnvio);
    } else if(objEnvio.tipoSaida) {
      return addDoc(collection(this.firestore, 'saidas'), objEnvio);
    }
    throw new Error("Tipo de envio não especificado");
  }




  getEmail(): Observable<any> {
    return new Observable((observer) => {
      const auth = getAuth();
      auth.onAuthStateChanged((user) => {
        if (user) {
          const email = user.email;
          observer.next(email);
          observer.complete();
        }
      });
    });
  }

  loginService(objLogin: NgForm) {
    const auth = getAuth(this.app);
    signInWithEmailAndPassword(auth, objLogin.value.email, objLogin.value.password).then(() => {
      this.route.navigate(['registros']);
    }). catch((err) => {
      alert('E-mail ou senha inválidos');
    })
  }

  logoutService() {
    const auth = getAuth(this.app);
    signOut(auth).then(() => {
      alert('Logout Success');
      this.route.navigate(['login']);
    }).catch((err) => {
      alert('Logout NOT Success');
    })
  }

  loginAuto() {
    const auth = getAuth(this.app);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.route.navigate(['registros']);
      }
    });
  }


}
