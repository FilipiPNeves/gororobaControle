import { Component, HostListener, ElementRef   } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {

  constructor(private loginService: LoginServiceService, private elementRef: ElementRef) {}

  //Fecha a divSobreposta com tipos de entrada

  @HostListener('document:mousedown', ['$event'])
  onDocumentMouseDown(event: MouseEvent) {
    if (this.mostrarDivCliqueNaEntrada) {
      const divCliqueNaEntrada = this.elementRef.nativeElement.querySelector('.divCliqueNaEntrada');
      const clickedElement = event.target as HTMLElement;

      if (!divCliqueNaEntrada.contains(clickedElement)) {
        this.mostrarDivCliqueNaEntrada = false;
      }
    }

    if (this.mostrarconfirmandoExclusao) {
      const divConfirmandoExclusao = this.elementRef.nativeElement.querySelector('.divConfirmandoExclusao');
      const clickedElement = event.target as HTMLElement;

      if (!divConfirmandoExclusao.contains(clickedElement)) {
        this.mostrarconfirmandoExclusao = false;
      }
    }

    if (this.mostrarDivEditandoEntrada) {
      const divEditandoEntrada = this.elementRef.nativeElement.querySelector('.divEditandoEntrada');
      const clickedElement = event.target as HTMLElement;

      if (!divEditandoEntrada.contains(clickedElement)) {
        this.mostrarDivEditandoEntrada = false;
      }
    }

    if (this.mostrarDivSobrepostaEntrada) {
      const divSobrepostaEntrada = this.elementRef.nativeElement.querySelector('.div-sobreposta-entrada');
      const clickedElement = event.target as HTMLElement;

      if (!divSobrepostaEntrada.contains(clickedElement)) {
        this.mostrarDivSobrepostaEntrada = false;
      }
    }

    if (this.mostrarDivSobrepostaSaida) {
      const divSobrepostaSaida = this.elementRef.nativeElement.querySelector('.div-sobreposta-saida');
      const clickedElement = event.target as HTMLElement;

      if (!divSobrepostaSaida.contains(clickedElement)) {
        this.mostrarDivSobrepostaSaida = false;
      }
    }

    if (this.mostrarDivSobrepostaTipoSaida) {
      const divSobrepostaTipoSaida = this.elementRef.nativeElement.querySelector('.div-sobreposta-tipo-saida');
      const clickedElement = event.target as HTMLElement;

      if (!divSobrepostaTipoSaida.contains(clickedElement)) {
        this.mostrarDivSobrepostaTipoSaida = false;
      }
    }

    if (this.mostrarDivCliqueNaSaida) {
      const divCliqueNaSaida = this.elementRef.nativeElement.querySelector('.divCliqueNaSaida');
      const clickedElement = event.target as HTMLElement;

      if (!divCliqueNaSaida.contains(clickedElement)) {
        this.mostrarDivCliqueNaSaida = false;
      }
    }

    if (this.mostrarDivConfirmandoExclusao) {
      const divConfirmandoExclusao = this.elementRef.nativeElement.querySelector('.divConfirmandoExclusao');
      const clickedElement = event.target as HTMLElement;

      if (!divConfirmandoExclusao.contains(clickedElement)) {
        this.mostrarDivConfirmandoExclusao = false;
      }
    }
  }



  displayedColumns01: string[] = ['horario', 'tipoEntrada', 'valorEntrada', 'nome'];
  dataSource01: any[] = [];
  dataSource01Prov: any[] = [];
  todosTiposEntradasDoPeriodo: any[] = [];

  todosTiposSaidaDoPeriodo: any[] = [];
  todosTiposSaidasFixaDoPeriodo: any[] = [];
  todosTiposSaidasVariavelDoPeriodo: any[] = [];
  dataSource02Prov: any[] = [];
  dataSource02: any[] = [];
  displayedColumns02: string[] = ['horario', 'tipoSaida', 'tipoSaida02', 'valorSaida', 'nome'];

  tipoDeSaida: any[] = [];

  data01?: Date;
  data02?: Date;

  mostrarDivSobrepostaEntrada = false;
  mostrarDivSobrepostaSaida = false;
  mostrarDivSobrepostaTipoSaida = false;

  mostrarDivCliqueNaEntrada: boolean = false;




  mostrarconfirmandoExclusao: boolean = false;


  mostrarDivEditandoEntrada: boolean = false;


  tipoEntradaSelecionado: string = '';
  valorEntradaEditado: string = '';

  calcularTotalEntrada(dataSource: any[]): string {
    let total = dataSource.reduce((total, element) => total + parseFloat(element.valorEntrada.replace(',', '.')), 0);
    return total.toFixed(2).replace('.', ',');
  }

  calcularTotalSaida(dataSource: any[]): string {
    let total = dataSource.reduce((total, element) => total + parseFloat(element.valorSaida.replace(',', '.')), 0);
    return total.toFixed(2).replace('.', ',');
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString();
  }

  puxarEntradas(data01: string, data02: string) {
  this.loginService.puxaEntradasService(data01, data02).then((entradas) => {
    this.dataSource01 = entradas;
    this.dataSource01Prov = entradas;

    this.todosTiposEntradasDoPeriodo = [...new Set(this.dataSource01.map(entrada => entrada.tipoEntrada))];
  });
  }

  puxarSaidas(data01: string, data02: string) {
    this.loginService.puxaSaidasService(data01, data02).then(saidas => {
      this.dataSource02 = saidas;
      this.dataSource02Prov = saidas;

      this.todosTiposSaidaDoPeriodo = this.dataSource02Prov.reduce((tiposSaida: string[], saida: any) => {
        if (saida.tipoSaidaFixa && !tiposSaida.includes(saida.tipoSaidaFixa)) {
          tiposSaida.push(saida.tipoSaidaFixa);
        }
        if (saida.tipoSaidaVariavel && !tiposSaida.includes(saida.tipoSaidaVariavel)) {
          tiposSaida.push(saida.tipoSaidaVariavel);
        }
        return tiposSaida;
      }, []);
      this.tipoDeSaida = this.todosTiposSaidaDoPeriodo;
    });
  }


  enviar() {
    let data01: string = this.data01!.toISOString();
    let data02: string = this.data02!.toISOString();

    this.puxarEntradas(data01, data02);
    this.puxarSaidas(data01, data02);
  }

  abrirDivSobrepostaEntrada() {
    this.mostrarDivSobrepostaEntrada = true;
  }

  abrirDivSobrepostaSaida() {
    this.mostrarDivSobrepostaSaida = true;
  }

  formatarValorEntradaeSaida(valor: string): string {
    const numero = parseFloat(valor.replace(',', '.'));
    const valorFormatado = numero.toFixed(2).replace('.', ',');
    return `R$ ${valorFormatado}`;
  }


  selecionarTipoEntrada(tipoEntrada: string) {
    this.dataSource01 = this.dataSource01Prov.filter(entrada => entrada.tipoEntrada === tipoEntrada);
    this.mostrarDivSobrepostaEntrada = false;
  }

  todosPedidos() {
    this.dataSource01 = this.dataSource01Prov ;
    this.mostrarDivSobrepostaEntrada = false;
  }

  //

  fixa: boolean = true;
  variavel: boolean = true;


  todasSaidasFixas() {
    this.dataSource02 = this.dataSource02Prov.filter(saida => saida.tipoSaida === 'fixas');
    this.mostrarDivSobrepostaSaida = false;

    this.todosTiposSaidasFixaDoPeriodo = [...new Set(this.dataSource02Prov
      .filter(saida => saida.tipoSaidaFixa) // Filtrar objetos com a propriedade "tipoSaidaFixa"
      .map(saida => saida.tipoSaidaFixa)
    )];
    this.tipoDeSaida = this.todosTiposSaidasFixaDoPeriodo;
    this.fixa = true;
    this.variavel = false;

  }


  todasSaidasVariaveis() {
    this.dataSource02 = this.dataSource02Prov.filter(saida => saida.tipoSaida === 'variáveis');
    this.mostrarDivSobrepostaSaida = false;

    this.todosTiposSaidasVariavelDoPeriodo = [...new Set(this.dataSource02Prov
      .filter(saida => saida.tipoSaidaVariavel) // Filtrar objetos com a propriedade "tipoSaidaVariavel"
      .map(saida => saida.tipoSaidaVariavel)
    )];
    this.tipoDeSaida = this.todosTiposSaidasVariavelDoPeriodo;
    this.variavel = true;
    this.fixa = false;

  }


  todasSaidas() {
    this.dataSource02 = this.dataSource02Prov;
    this.mostrarDivSobrepostaSaida = false;

    this.tipoDeSaida = this.todosTiposSaidaDoPeriodo;

    this.variavel = true;
    this.fixa = true;
  }


  abrirDivSobrepostaTipoSaida() {
    this.mostrarDivSobrepostaTipoSaida = true;
  }

  selecionarTipoTipoSaida(tipoSaida: string) {
    this.dataSource02 = this.dataSource02Prov.filter(saida => {
      return (
        (saida.tipoSaidaVariavel === tipoSaida && saida.tipoSaida === 'variáveis') ||
        (saida.tipoSaidaFixa === tipoSaida && saida.tipoSaida === 'fixas')
      );
    });
    this.mostrarDivSobrepostaTipoSaida = false;
  }

  todosTiposSaidas() {
    if (this.fixa === true && this.variavel === false) {
      this.dataSource02 = this.dataSource02Prov.filter(saida => saida.tipoSaida === 'fixas');
    } else if (this.fixa === false && this.variavel === true) {
      this.dataSource02 = this.dataSource02Prov.filter(saida => saida.tipoSaida === 'variáveis');
    } else if (this.fixa === true && this.variavel === true) {
      this.dataSource02 = this.dataSource02Prov;
    }
    this.mostrarDivSobrepostaTipoSaida = false;
  }



  //

  idEntradaClicada: string = '';
  tipoEntradaEntradaClicada: string = '';
  valorEntradaClicada: string = '';
  dataEntradaClicada: any;





  cliqueNaEntrada(entrada: any) {
    this.mostrarDivCliqueNaEntrada = true;

    this.idEntradaClicada = entrada.id;
    this.tipoEntradaEntradaClicada = entrada.tipoEntrada;
    this.valorEntradaClicada = entrada.valorEntrada;
    this.dataEntradaClicada = entrada.horario.toDate();

  }

  dataFormatada2(data: any): string {
    if (data instanceof Date) {
      return data.toLocaleDateString();
    } else {
      const date = new Date(data.toDate());

      const dia = date.getDate().toString().padStart(2, '0');
      const mes = (date.getMonth() + 1).toString().padStart(2, '0');
      const ano = date.getFullYear().toString();

      return `${dia}/${mes}/${ano}`;
    }
  }



  excluirEntrada() {
    this.mostrarconfirmandoExclusao = true;
    this.mostrarDivCliqueNaEntrada = false;
  }

  confirmarExclusaoEntrada() {
    this.loginService.excluirEntrada(this.idEntradaClicada);
    this.mostrarconfirmandoExclusao = false;
    this.enviar();
  }

  editarEntrada() {
    this.mostrarDivEditandoEntrada = true;
  }



  tipoSaidaSaidaClicada: string = '';
  tipoSaidaVariavelClicada: string = '';
  tipoSaidaFixaClicada: string = '';
  valorSaidaClicada: string = '';
  dataSaidaClicada: any;
  mostrarDivCliqueNaSaida: boolean = false;
  mostrarDivConfirmandoExclusao: boolean = false;
  idSaidaClicada: string = '';

  cliqueNaSaida(saidaClidada: any) {
    console.log(saidaClidada);

    this.mostrarDivCliqueNaSaida = true;

    this.idSaidaClicada = saidaClidada.id;
    this.tipoSaidaSaidaClicada = saidaClidada.tipoSaida;
    this.valorSaidaClicada = saidaClidada.valorSaida;
    this.dataSaidaClicada = saidaClidada.horario.toDate();

    this.tipoSaidaFixaClicada = saidaClidada.tipoSaidaVariavel;
    this.tipoSaidaVariavelClicada = saidaClidada.tipoSaidaFixa;
  }

  abrirDivconfirmarExclusaoSaida() {
    this.mostrarDivCliqueNaSaida = false;
    this.mostrarDivConfirmandoExclusao = true;
  }

  confirmarExclusaoSaida() {
    this.loginService.excluirSaida(this.idSaidaClicada);
    this.mostrarDivConfirmandoExclusao = false;

    this.enviar();
  }
}
