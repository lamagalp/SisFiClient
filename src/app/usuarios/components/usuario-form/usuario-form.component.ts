import { Usuario } from '../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  public editar = false;
  error:any;

  usuario: Usuario = {
    id: 0,
    apellido: '',
    nombre: '',
    telefono: '',
    legajo: '',
    usuario: '',
    clave: ''
  };

  constructor(private _usuarioService: UsuariosService, private _autenticacionService: AutenticacionService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    const params = this._activatedRoute.snapshot.params;
     if(params?.id){
      this._usuarioService.getUsuario(params.id).subscribe(
        resp => {
          console.log(resp);
          this.editar = true;
          this.usuario = resp;
        }, err => {
          console.error(err);
          this.error = err;
        }
      )
    }
  }


  agregarUsuario(){
    console.log(this.usuario);
    this._usuarioService.addUsuario(this.usuario)
    .subscribe(
      res =>{
        console.log(res);
        this._router.navigate(['/usuarios']);

      }, err =>{
        console.error(err);
        this.error = err;
      }
    )
  }

  guardarUsuario(idUsuario: number){
    console.log(this.usuario);
    this._usuarioService.updateUsuario(idUsuario, this.usuario)
    .subscribe(
      res =>{
        console.log(res);
        this._router.navigate(['/usuarios']);

      }, err =>{
        console.error(err);
        this.error = err;
      }
    )
  }

}
