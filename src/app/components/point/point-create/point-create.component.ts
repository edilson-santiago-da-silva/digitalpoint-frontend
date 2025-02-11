import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-point-create',
  templateUrl: './point-create.component.html',
  styleUrls: ['./point-create.component.css']
})
export class PointCreateComponent implements OnInit {

  horarios = {
    entrada: '',
    saidaAlmoco: '',
    entradaAlmoco: '',
    saida: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  registrarHorario(tipo: string): void {
    const agora = new Date();
    const horarioFormatado = agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Define o horário e faz o botão sumir
    this.horarios[tipo] = horarioFormatado;
  }
}

