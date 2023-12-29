import { Firestore, Timestamp } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';

interface EntradaOuSaida {
  tipo: string;
}

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.css']
})
export class EnvioComponent {

  constructor(private loginService: LoginServiceService, private firebase: Firestore) {}




  entradas: EntradaOuSaida[] = [
    {tipo: 'Débito'},
    {tipo: 'Crédito'},
    {tipo: 'Dinheiro'},
    {tipo: 'Pix'},
    {tipo: 'Voucher'},
    {tipo: 'Outros'}
  ];

  saidas: EntradaOuSaida[] = [
    {tipo: 'Variáveis'},
    {tipo: 'Fixas'}
  ];

  variaveis: EntradaOuSaida[] = [
    {tipo: 'Mercado'},
    {tipo: 'Bebida Alcool'},
    {tipo: 'Bebida SEM Alcool'},
    {tipo: 'Outros'}
  ];

  fixas: EntradaOuSaida[] = [
    {tipo: 'Aluguel'},
    {tipo: 'Energia'},
    {tipo: 'Água'},
    {tipo: 'Internet'},
    {tipo: 'Salário'},
  ];

  selectedOption?: string;
  selectedEntrada?: string;
  selectedSaida?: string;
  outrosEntrada?: string;
  valorEntrada?: number;
  tipoSaida?: string;
  outrosSaida?: string;
  valorSaida?: number;
  fixasSaidas?: string;
  selectedDate?: Date;

  tipoDeSaidaSelecionado?: string;

  variaveisOuFixos?: string;

  showMessage = false;
  message = '';
  status = '';


  enviar(objetoEnviado: any) {
    let objEnvio = {};
    console.log(objetoEnviado.value.selectedDate);

    let timestamp = Timestamp.fromDate(objetoEnviado.value.selectedDate);

    console.log(timestamp);


    if(objetoEnviado.value.radioOptions === 'option1') {
      if(objetoEnviado.value.selectedEntrada === 'Outros') {
        objEnvio = {
          horario: timestamp,
          tipoEntrada: objetoEnviado.value.outrosEntrada.toLowerCase(),
          valorEntrada: objetoEnviado.value.valorEntrada
        }
      }else {
        objEnvio = {
          horario: timestamp,
          tipoEntrada: objetoEnviado.value.selectedEntrada.toLowerCase(),
          valorEntrada: objetoEnviado.value.valorEntrada
        }
      }
    } else if(objetoEnviado.value.radioOptions === 'option2') {
      if(objetoEnviado.value.selectedSaida === 'Variáveis') {
        if(objetoEnviado.value.tipoSaida === 'Outros') {
          objEnvio = {
            horario: timestamp,
            tipoSaida: objetoEnviado.value.selectedSaida.toLowerCase(),
            tipoSaidaVariavel: objetoEnviado.value.outrosSaida.toLowerCase(),
            valorSaida: objetoEnviado.value.valorSaida
          }
        } else {
          objEnvio = {
            horario: timestamp,
            tipoSaida: objetoEnviado.value.selectedSaida.toLowerCase(),
            tipoSaidaVariavel: objetoEnviado.value.tipoSaida.toLowerCase(),
            valorSaida: objetoEnviado.value.valorSaida
          }
        }
      } else if(objetoEnviado.value.selectedSaida === 'Fixas') {
        objEnvio = {
          horario: timestamp,
          tipoSaida: objetoEnviado.value.selectedSaida.toLowerCase(),
          tipoSaidaFixa: objetoEnviado.value.fixasSaidas.toLowerCase(),
          valorSaida: objetoEnviado.value.valorSaida
        }
      }
    }
    this.loginService.envio(objEnvio).then((docRef) => {
      // O código aqui será executado se a entrada for enviada com sucesso
      this.message = 'Entrada enviada!';
      this.status = 'success'; // define status como success
      this.showMessage = true;
      setTimeout(() => this.showMessage = false, 1000);
      this.limparFormulario();
    }).catch((error) => {
      // O código aqui será executado se houver um erro ao enviar a entrada
      this.message = 'Erro ao enviar a entrada!';
      this.status = 'error'; // define status como error
      this.showMessage = true;
      setTimeout(() => this.showMessage = false, 1000);
    });

    this.limparFormulario();
  }


  limparFormulario() {
    this.selectedOption = undefined;
    this.selectedEntrada = undefined;
    this.selectedSaida = undefined;
    this.outrosEntrada = undefined;
    this.valorEntrada = undefined;
    this.tipoSaida = undefined;
    this.outrosSaida = undefined;
    this.valorSaida = undefined;
    this.fixasSaidas = undefined;
    this.selectedDate = undefined;
    this.tipoDeSaidaSelecionado = undefined;
  }
}

