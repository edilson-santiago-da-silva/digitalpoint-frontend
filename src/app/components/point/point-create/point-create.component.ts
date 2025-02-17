import { Component, OnInit } from '@angular/core';
import { Point } from 'src/app/models/point';
import { PointService } from 'src/app/services/point.service';

@Component({
  selector: 'app-point-create',
  templateUrl: './point-create.component.html',
  styleUrls: ['./point-create.component.css']
})
export class PointCreateComponent implements OnInit {

  userId = 1; // Pegue do login
  userName = 'Bianca Santos'; // Pegue do login
  workDay = new Date().toLocaleDateString(); // Data atual
  horarios: any = { entrada: '', saidaAlmoco: '', entradaAlmoco: '', saida: '' };
  pointId: number | null = null; // ID do ponto para atualização

  constructor(private pointService: PointService) {}

  ngOnInit(): void {
    this.buscarPontoDoDia();
  }

  buscarPontoDoDia() {
    this.pointService.getTodayPoint(this.userId, this.workDay).subscribe(response => {
      if (response) {
        this.pointId = response.id;
        this.horarios = {
          entrada: response.entry,
          saidaAlmoco: response.exitLaunch,
          entradaAlmoco: response.entryLaunch,
          saida: response.exit
        };
      }
    });
  }

  registrarHorario(tipo: string) {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Atualiza apenas o horário específico
    this.horarios[tipo] = formattedTime;

    const point: Partial<Point> = {
      userId: this.userId,
      userName: this.userName,
      workDay: this.workDay,
      entry: this.horarios.entrada || '',
      exitLaunch: this.horarios.saidaAlmoco || '',
      entryLaunch: this.horarios.entradaAlmoco || '',
      exit: this.horarios.saida || ''
    };

    if (this.pointId) {
      // Se já existe um ponto, apenas atualiza o campo alterado
      this.pointService.updatePoint(this.pointId, {
        [tipo]: formattedTime,
        userId: undefined,
        userName: '',
        workDay: '',
        entry: '',
        exitLaunch: '',
        entryLaunch: '',
        exit: ''
      }).subscribe(response => {
        console.log('Ponto atualizado:', response);
      });
    } else if (tipo === 'entrada') {
      // Se for a primeira entrada, cria o ponto
      this.pointService.createPoint(point as Point).subscribe(response => {
        this.pointId = response.id;
        console.log('Ponto criado:', response);
      });
    }
  }
}