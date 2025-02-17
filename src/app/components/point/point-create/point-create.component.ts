import { Component, OnInit } from '@angular/core';
import { Point } from 'src/app/models/point';

@Component({
  selector: 'app-point-create',
  templateUrl: './point-create.component.html',
  styleUrls: ['./point-create.component.css']
})
export class PointCreateComponent implements OnInit {

  newPoint: Point = {
    id: null,
    userId: 1,
    userName: 'Bianca Santos TESTE-CREATE',
    workDay: '02/10/2024',
    entry: '08:00',
    exitLaunch: '12:00',
    entryLaunch: '12:00',
    exit: '16:00'
  };
  
  constructor() { }

  ngOnInit(): void {
  }

  registrarHorario(tipo: string): void {
    const agora = new Date();
    const horarioFormatado = agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Define o horário e faz o botão sumir
    this.newPoint[tipo] = horarioFormatado;
  }
}

