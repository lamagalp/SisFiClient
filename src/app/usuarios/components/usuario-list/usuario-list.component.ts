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
  loading = false;

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
    this.loading = true;
    this._usuarioService.getUsuarios().subscribe({
        next: (res) => {this.usuarios = res;},
        error: (err)=> { this.error = err.error; },
        complete: ()=>{ this.loading = false;}     
      });
  }

  trackByFn(index: number, item: any) {
    return item.id; // unique id corresponding to the item
  }

}
