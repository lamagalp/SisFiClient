import { TiposCartonService } from 'src/app/caja/services/tipos-carton.service';
import { ClientesService } from './../../../../clientes/services/clientes.service';
import { Cliente } from 'src/app/clientes/models/cliente';
import { TipoCarton } from 'src/app/caja/models/tipoCarton';
import { PagoPremio } from './../../../models/pagoPremio';
import { UsuariosService } from './../../../../usuarios/services/usuarios.service';
import { AutenticacionService } from './../../../../login/services/autenticacion.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { PagosPremioService } from 'src/app/caja/services/pagos-premio.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pago-premio-form',
  templateUrl: './pago-premio-form.component.html',
  styleUrls: ['./pago-premio-form.component.css']
})
export class PagoPremioFormComponent implements OnInit {


  @Input() private idHojaCaja: number = 0;
	@Input() private refModal!: NgbModalRef; // guardo una referencia al modal abierto para poder cerrarlo desde el código


  error:any;
  usuarioLogueado:any;
  tiposCarton: TipoCarton[] = [];
  clientes: Cliente[] = [];

  public pagoPremio: PagoPremio ={
    id:0,
    idHojaCaja: 0,
    idUsuario: 0,
    alta: new Date(),     
    observaciones:''
  };

  id?: number;

  constructor(private _clienteService: ClientesService, private _tiposCartonService: TiposCartonService, private _autenticacionService: AutenticacionService, private _usuariosService: UsuariosService, private _pagosPremioService: PagosPremioService, private _route:Router) {

    if(this._autenticacionService.loggedIn()){
     let idUser = this._autenticacionService.getIdUser();
     if(idUser != null){
       this._usuariosService.getUsuario(idUser).subscribe(
         res =>{
           console.log(res);
           this.usuarioLogueado = res.id;
         }, err =>{
           console.error(err);
           this.error = err;
         }
       )
     }
   }

 }

 ngOnInit(): void {
  this.obtenerClientes();
  this.obtenerTiposCarton();
}

 obtenerClientes(){
  this._clienteService.getClientes().subscribe(
    res => {
      this.clientes = res;
      console.log(this.clientes);
    },
    err => {
      console.log(err);
      this.error = err
    });
}

obtenerTiposCarton(){
  this._tiposCartonService.getTiposCarton().subscribe(
    resultado => {
      this.tiposCarton = resultado.filter((c : TipoCarton) => c.baja == null);
      console.log(this.tiposCarton);
    },
    error => {
      console.log(error);
      this.error = error
    });
}

  agregarPagoPremio(){
  // borro estos campos porque los carga automáticamente mySQL
  delete this.pagoPremio.alta;
  delete this.pagoPremio.id;
  this.pagoPremio.idHojaCaja = this.idHojaCaja;
  this.pagoPremio.idUsuario = this.usuarioLogueado;

  if(this.pagoPremio.cantidadCartones != null && this.pagoPremio.cantidadCartones > 0 && this.pagoPremio.idTipoCarton != null && this.tiposCarton)
    this.pagoPremio.montoCarton = this.tiposCarton.filter(c => c.id == this.pagoPremio.idTipoCarton)[0].monto;

  console.log(this.pagoPremio);

  this._pagosPremioService.addPagoPremio(this.pagoPremio)
  .subscribe(
    resp => {
      console.log(resp);
      this.cerrarModal();
    }, err => {
      console.error(err);
      this.error = err;
    }
  )}


	cerrarModal() {
		this.refModal.close();
	}


  formInvalido(monto?: number, cantidadCartones?: number, idTipoCarton?: number): boolean{

    console.log(monto);
    return (monto == 0 && (idTipoCarton == null || cantidadCartones == 0));
  }
}

