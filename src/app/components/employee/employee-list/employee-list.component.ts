import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  ELEMENT_DATA: Employee[] = [
    {
      id: 1,
      name: 'Edilson Santiago',
      pasword: '3427',
      profile: ['0']
    }
  ]

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.ELEMENT_DATA;
  clickedRows = new Set<Employee>();

  constructor() { }

  ngOnInit(): void {
  }

}
