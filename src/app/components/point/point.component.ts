import { Component, OnInit } from '@angular/core';
import { Point } from 'src/app/models/point';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.css']
})
export class PointComponent implements OnInit {

  // Definir as colunas a serem exibidas
  displayedColumns: string[] = ['dataAtual', 'horarioEntrada', 'horarioSaidaAlmoco', 'horarioEntradaAlmoco', 'horarioSaida', 'minutosExtras'];
  
  // Dados fictícios
  dataSource = [
    {
      dataAtual: new Date().toLocaleDateString(),
      horarioEntrada: '',
      horarioSaidaAlmoco: '',
      horarioEntradaAlmoco: '',
      horarioSaida: '',
      minutosExtras: 0
    },
    // Adicione mais dados aqui conforme necessário
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Função para registrar o horário
  registrarHorario(tipo: string, element: any): void {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Atribuir o horário correspondente baseado no tipo
    switch (tipo) {
      case 'entrada':
        element.horarioEntrada = formattedTime;
        break;
      case 'saidaAlmoco':
        element.horarioSaidaAlmoco = formattedTime;
        break;
      case 'entradaAlmoco':
        element.horarioEntradaAlmoco = formattedTime;
        break;
      case 'saida':
        element.horarioSaida = formattedTime;
        break;
    }
  }

  isButtonAvailable(tipo: string, element: any): boolean {
      switch (tipo) {
        case 'entrada':
          return !element.horarioEntrada;
        case 'saidaAlmoco':
          return element.horarioEntrada && !element.horarioSaidaAlmoco;
        case 'entradaAlmoco':
          return element.horarioSaidaAlmoco && !element.horarioEntradaAlmoco;
        case 'saida':
          return element.horarioEntradaAlmoco && !element.horarioSaida;
        default:
          return false;
      }
  }
}