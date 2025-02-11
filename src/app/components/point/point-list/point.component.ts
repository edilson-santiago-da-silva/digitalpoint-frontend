import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Point } from 'src/app/models/point';
import { PointService } from 'src/app/services/point.service';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.css']
})
export class PointComponent implements OnInit {

  ELEMENT_DATA: Point[] = []

  // Definir as colunas a serem exibidas
  displayedColumns: string[] =  ['workDay', 'entry', 'exitLaunch', 'entryLaunch', 'exit', 'minExtra'];
  // Dados fictícios
  dataSource = new MatTableDataSource<Point> (this.ELEMENT_DATA);


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: PointService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe(Response => {
      console.log('Dados recebidos:', Response); 
      this.ELEMENT_DATA = Response
      this.dataSource = new MatTableDataSource<Point>(Response);
      this.dataSource.paginator = this.paginator;
    })
  }
    applyFilter(event: Event): void{
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

  // Função para registrar o horário
  // registrarHorario(tipo: string, element: any): void {
  //   const now = new Date();
  //   const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Atribuir o horário correspondente baseado no tipo
//     switch (tipo) {
//       case 'entrada':
//         element.horarioEntrada = formattedTime;
//         break;
//       case 'saidaAlmoco':
//         element.horarioSaidaAlmoco = formattedTime;
//         break;
//       case 'entradaAlmoco':
//         element.horarioEntradaAlmoco = formattedTime;
//         break;
//       case 'saida':
//         element.horarioSaida = formattedTime;
//         break;
//     }
//   }

//   isButtonAvailable(tipo: string, element: any): boolean {
//       switch (tipo) {
//         case 'entrada':
//           return !element.horarioEntrada;
//         case 'saidaAlmoco':
//           return element.horarioEntrada && !element.horarioSaidaAlmoco;
//         case 'entradaAlmoco':
//           return element.horarioSaidaAlmoco && !element.horarioEntradaAlmoco;
//         case 'saida':
//           return element.horarioEntradaAlmoco && !element.horarioSaida;
//         default:
//           return false;
