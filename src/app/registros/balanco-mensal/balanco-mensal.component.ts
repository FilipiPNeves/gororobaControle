import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-balanco-mensal',
  templateUrl: './balanco-mensal.component.html',
  styleUrls: ['./balanco-mensal.component.css']
})
export class BalancoMensalComponent implements OnInit {

  constructor(private service: LoginServiceService) {}

  entradas: any[] = [];
  saidas: any[] = [];
  resultadoSemanal: number[] = [];
  resultadoMensal = 0;

  ngOnInit(): void {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Converte as datas para o formato ISO 8601
    const startDate = firstDayOfMonth.toISOString();
    const endDate = lastDayOfMonth.toISOString();

    // Chama as funções do LoginService para obter as entradas e saídas do mês atual
    this.service.puxaEntradasService(startDate, endDate).then(entradas => {
      this.entradas = entradas;
      this.renderizarGraficoEntradas(); // Renderiza o gráfico após receber as entradas
      this.calcularResultadoSemanal();
      this.calcularResultadoMensal();
    });

    this.service.puxaSaidasService(startDate, endDate).then(saidas => {
      this.saidas = saidas;
      this.renderizarGraficoSaidas(); // Renderiza o gráfico após receber as saídas
      this.calcularResultadoSemanal();
      this.calcularResultadoMensal();
    });
  }

  renderizarGraficoEntradas() {
    const dias = this.obterDiasDoMes();
    const valores = this.entradas.reduce((arr, entrada) => {
      const dia = entrada.horario.toDate().getDate();
      const valor = parseFloat(entrada.valorEntrada.replace(',', '.'));

      // Soma o valor atual ao valor existente no índice do dia
      arr[dia - 1] += valor;
      return arr;
    }, new Array(dias.length).fill(0));

    new Chart('graficoEntradas', {
      type: 'line',
      data: {
        labels: dias,
        datasets: [
          {
            label: 'Entradas por dia',
            data: valores,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderizarGraficoSaidas() {
    const dias = this.obterDiasDoMes();
    const valores = this.saidas.reduce((arr, saida) => {
      const dia = saida.horario.toDate().getDate();
      const valor = parseFloat(saida.valorSaida.replace(',', '.'));

      // Soma o valor atual ao valor existente no índice do dia
      arr[dia - 1] += valor;
      return arr;
    }, new Array(dias.length).fill(0));

    new Chart('graficoSaidas', {
      type: 'line',
      data: {
        labels: dias,
        datasets: [
          {
            label: 'Saídas por dia',
            data: valores,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  obterDiasDoMes(): string[] {
    const currentDate = new Date();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    return Array.from({ length: lastDayOfMonth }, (_, i) => (i + 1).toString());
  }

  calcularResultadoSemanal() {
    const semanas = this.obterSemanasDoMes();
    this.resultadoSemanal = semanas.map(semana => {
      const primeiraData = semana[0];
      const ultimaData = semana[semana.length - 1];
      const entradasSemana = this.entradas.filter(entrada => {
        const horario = entrada.horario.toDate();
        return horario >= primeiraData && horario <= ultimaData;
      });
      const saidasSemana = this.saidas.filter(saida => {
        const horario = saida.horario.toDate();
        return horario >= primeiraData && horario <= ultimaData;
      });
      const totalEntradas = entradasSemana.reduce((total, entrada) => {
        const valor = parseFloat(entrada.valorEntrada.replace(',', '.'));
        return total + valor;
      }, 0);
      const totalSaidas = saidasSemana.reduce((total, saida) => {
        const valor = parseFloat(saida.valorSaida.replace(',', '.'));
        return total + valor;
      }, 0);
      return totalEntradas - totalSaidas;
    });
  }

  calcularResultadoMensal() {
    const totalEntradas = this.entradas.reduce((total, entrada) => {
      const valor = parseFloat(entrada.valorEntrada.replace(',', '.'));
      return total + valor;
    }, 0);
    const totalSaidas = this.saidas.reduce((total, saida) => {
      const valor = parseFloat(saida.valorSaida.replace(',', '.'));
      return total + valor;
    }, 0);
    this.resultadoMensal = totalEntradas - totalSaidas;
  }
  
  obterSemanasDoMes(): Date[][] {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const semanas: Date[][] = [];
    let startDate = new Date(firstDayOfMonth);
    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    while (startDate.getMonth() === currentDate.getMonth()) {
      semanas.push([new Date(startDate), new Date(endDate)]);
      startDate.setDate(endDate.getDate() + 1);
      endDate.setDate(startDate.getDate() + 6);
      if (endDate > lastDayOfMonth) {
        endDate = lastDayOfMonth;
      }
    }

    return semanas.slice(0, 4); // Retorna apenas as 4 primeiras semanas
  }

  formatarValor(valor: number): string {
    const valorFormatado = valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    return valorFormatado;
  }
}
