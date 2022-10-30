import { AutenticacionService } from './../../../../login/services/autenticacion.service';
import { UsuariosService } from './../../../../usuarios/services/usuarios.service';
import { HojaCaja } from './../../../models/hojaCaja';
import { FiadosService } from './../../../services/fiados.service';
import { ClientesService } from './../../../../clientes/services/clientes.service';
import { Cliente } from './../../../../clientes/models/cliente';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Fiado } from 'src/app/caja/models/fiado';


@Component({
  selector: 'app-fiado-form',
  templateUrl: './fiado-form.component.html',
  styleUrls: ['./fiado-form.component.css']
})
export class FiadoFormComponent implements OnInit {

  @Input() private idHojaCaja: number = 0;
	@Input() private refModal!: NgbModalRef; // guardo una referencia al modal abierto para poder cerrarlo desde el código

  clientes: Cliente[] = [];
  error:any;
  usuarioLogueado:any ;

  public fiado: Fiado ={
    id:0,
    idHojaCaja: 0,
    idUsuario: 0,
    alta: new Date(),
    observaciones: '',
    tipoMovimiento: ''
  };

  id?: number;

  constructor(private _clienteService: ClientesService,private _autenticacionService: AutenticacionService, private _usuariosService: UsuariosService, private _fiadoService: FiadosService) {

     /* this._service.metodo().subscribe({ 
      next: (rta : any) => {}, 
      error: (error) => {}, 
      complete: () => {}
    }); */


     if(this._autenticacionService.loggedIn()){
      let idUser = this._autenticacionService.getIdUser();
      if(idUser != null){
        this._usuariosService.getUsuario(idUser).subscribe({
          next: (res : any) => {
            //console.log(res);
            this.usuarioLogueado = res.id;
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

   obtenerClientes(){   
    this._clienteService.getClientes().subscribe({
      next: (res : any) => {
        this.clientes = res;      
        //console.log(this.clientes);
      }, 
      error: (err) => {
        //console.log(err);
        this.error = err.error;
      },
      complete: () => {}
    });
  }

  agregarFiado(){

    // borro estos campos porque los carga automáticamente mySQL
    delete this.fiado.alta;
    delete this.fiado.id;
    this.fiado.idHojaCaja = this.idHojaCaja;
    this.fiado.idUsuario = this.usuarioLogueado;

    if(this.fiado.tipoMovimiento == 'F' && this.fiado.monto != null){
      this.fiado.monto = - (this.fiado.monto);
    }
    
    /* this._service.metodo().subscribe({ 
      next: (rta : any) => {}, 
      error: (error) => {}, 
      complete: () => {}
    }); */

    this._fiadoService.addFiado(this.fiado)
    .subscribe({
      next: (resp : any) => {
        //console.log(resp);
        this.cerrarModal();
      },
      error: (err) => {
        console.error(err);
        this.error = err.error;
      }
    })
  }
	cerrarModal() {
		this.refModal.close();
	}
}
