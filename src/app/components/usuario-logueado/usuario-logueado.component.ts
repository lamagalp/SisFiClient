import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';

@Component({
  selector: 'app-usuario-logueado',
  templateUrl: './usuario-logueado.component.html',
  styleUrls: ['./usuario-logueado.component.css']
})
export class UsuarioLogueadoComponent implements OnInit {

  @Output() setEsAdmin: EventEmitter<boolean>= new EventEmitter<boolean>();
  usuario:any = null
  error:any;

  constructor(private _autenticacionService: AutenticacionService, private _usuariosService: UsuariosService) { }

  ngOnInit(): void {
    if(this._autenticacionService.loggedIn()){
      let idUser = this._autenticacionService.getIdUser();
      if(idUser != null){
        this._usuariosService.getUsuario(idUser).subscribe(
          res =>{
            //console.log(res);
            this.usuario = res;
            this.setEsAdmin.emit(this.usuario.idRol == 1);
          }, err =>{
            //console.error(err);
            this.error = err;
          }
        )
      }
    }
  }

}
