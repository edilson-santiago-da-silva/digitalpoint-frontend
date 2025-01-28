import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from 'src/app/models/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credentials = {
    user: '',
    password: ''
  }

    user = new FormControl(null, Validators.minLength(3));
    password =  new FormControl(null, Validators.minLength(3))

  constructor(private toast: ToastrService) { }

  ngOnInit(): void {

  }

  login(){
    this.toast.error('Usuário e/ou senha inválidos!','Login');
  }

  validFields(): boolean{
    if(this.user.valid && this.password.valid){
      return true;
    } else {
      return false;
    }
  }

}
