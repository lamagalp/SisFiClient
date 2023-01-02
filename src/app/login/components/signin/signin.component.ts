import { AutenticacionService } from '../../services/autenticacion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {

  user = {
    usuario: '',
    clave: ''
  };
  error:any;
  loading = false;

  constructor(private _autenticacionService: AutenticacionService, private _router: Router) { }

  ngOnInit(): void {
    // si el usuario está logueado, redirijo al home
    if (this._autenticacionService.loggedIn())
      this._router.navigate(['/hojasCaja/get/hoy']);
  }

  ingresar(){
    this.loading = true;
    this._autenticacionService.signIn(this.user)
    .subscribe(
      res =>{
        console.log(res);
        sessionStorage.setItem('token', res.token);  //guardo el token en el almacenamiento local
        sessionStorage.setItem('idUser', res.idUser);
        this.loading = false;
        this._router.navigate(['/hojasCaja/get/hoy']);

      }, err =>{
        console.log(err);
        this.loading = false;
        this.error = err.error;
      }
    )
  }
}
