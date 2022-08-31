import { ClientesService } from './../../../../clientes/services/clientes.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { Venta } from 'src/app/caja/models/venta';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { VentasService } from 'src/app/caja/services/ventas.service';
import { Cliente } from 'src/app/clientes/models/cliente';
import { TipoCarton } from 'src/app/caja/models/tipoCarton';
import { TiposCartonService } from 'src/app/caja/services/tipos-carton.service';

@Component({
  selector: 'app-venta-form',
  templateUrl: './venta-form.component.html',
  styleUrls: ['./venta-form.component.css']
})
export class VentaFormComponent implements OnInit {

  @Input() private idHojaCaja = 0;
	@Input() private refModal!: NgbModalRef; // guardo una referencia al modal abierto para poder cerrarlo desde el código

  error:any;
  usuarioLogueado:any ;
  tiposCarton: TipoCarton[] = [];
  clientes: Cliente[] = [];


  public venta: Venta ={
    id:0,
    idHojaCaja: 0,
    idUsuario: 0,
    alta: new Date(),
    cantidad: 1
  };

  id?: number;

  constructor(private _autenticacionService: AutenticacionService, private _usuariosService: UsuariosService, private _ventasService: VentasService, private _clienteService: ClientesService, private _tiposCartonService: TiposCartonService) {

    if(this._autenticacionService.loggedIn()){
     let idUser = this._autenticacionService.getIdUser();
     if(idUser != null){
       this._usuariosService.getUsuario(idUser).subscribe(
         res =>{
           //console.log(res);
           this.usuarioLogueado = res.id;
         }, err =>{
           //console.error(err);
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
      //console.log(this.clientes);
    },
    err => {
      //console.log(err);
      this.error = err
    });
  }


obtenerTiposCarton(){
  this._tiposCartonService.getTiposCarton().subscribe(
    resultado => {
      this.tiposCarton = resultado.filter((c : TipoCarton) => c.baja == null);
      //console.log(this.tiposCarton);
    },
    error => {
      //console.log(error);
      this.error = error
    });
}


  agregarVenta(){

    // borro estos campos porque los carga automáticamente mySQL
    delete this.venta.alta;
    delete this.venta.id;
    this.venta.idHojaCaja = this.idHojaCaja;
    this.venta.idUsuario = this.usuarioLogueado;
    this.venta.montoCarton = this.tiposCarton.filter(c => c.id == this.venta.idTipoCarton)[0].monto;
    //console.log(this.venta);

    this._ventasService.addVenta(this.venta)
    .subscribe(
      resp => {
        //console.log(resp);
        this.cerrarModal();
      }, err => {
       // console.error(err);
        this.error = err;
      }
    )
  }

	cerrarModal() {
		this.refModal.close();
	}
}

