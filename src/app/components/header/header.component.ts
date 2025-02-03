import { Component, OnInit, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: string | null = null;

  @Input() drawer!: MatDrawer;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentuser.subscribe((username) =>{
      this.user = username;
    });
  }

}
