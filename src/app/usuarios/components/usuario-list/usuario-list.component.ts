import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuarios/models/usuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[] = [];
  error:any;
  constructor(private _usuarioService: UsuariosService) {
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  eliminarUsuario(id: number){
    //console.log(id);
    this._usuarioService.deleteUsuario(id)
    .subscribe(
      resp => {
        //console.log(resp);
        this.obtenerUsuarios();
      }, err => {
       // console.error(err);
        this.error = err.error;
      });
  }

  obtenerUsuarios(){
  //  console.log(this.usuarios);
    this._usuarioService.getUsuarios().subscribe(
      res => {
        this.usuarios = res;
      //  console.log(this.usuarios);
      },
      err => {
       // console.log(err);
        this.error = err.error;
      });
  }

  trackByFn(index: number, item: any) {
    return item.id; // unique id corresponding to the item
  }

}
