import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../models/cliente';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[] = [];
  error:any;
  usuarioLogueado: any;

  constructor(private _clienteService: ClientesService, private _usuariosService: UsuariosService, private _autenticacionService: AutenticacionService) {

    if(this._autenticacionService.loggedIn()){
      let idUser = this._autenticacionService.getIdUser();
      if(idUser != null){
        this._usuariosService.getUsuario(idUser).subscribe({
          next: (res: any) => {
            //console.log(res);
            this.usuarioLogueado = res;
          },
          error: (err) => {
            //console.error(err);
            this.error = err.error;
          }
        });         
      }
    }
  }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  eliminarCliente(id: number){

    this._clienteService.getCliente(id).subscribe({
      next : (resp : any) => {
        //console.log(resp);
        resp.baja = new Date();
        resp.idUsuario = this.usuarioLogueado.id;
        this._clienteService.updateCliente(id, resp)
        .subscribe({
          next:(respuesta : any) => {
            //console.log(respuesta);
            this.obtenerClientes();
          },
          error: (e) => {
            //console.error(e);
            this.error = e.error;
          }          
        });   
      }, 
      error: (err) => {
        //console.error(err);
        this.error = err.error;
      }
    });
  }

  obtenerClientes(){
    //console.log(this.clientes);
    this._clienteService.getClientes().subscribe(
      res => {
        this.clientes = res;
        //console.log(this.clientes);
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
