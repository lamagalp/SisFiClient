import { AutenticacionService } from './../../../../login/services/autenticacion.service';
import { UsuariosService } from './../../../../usuarios/services/usuarios.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Gasto } from 'src/app/caja/models/gasto';
import { GastosService } from 'src/app/caja/services/gastos-service.service';

@Component({
  selector: 'app-gasto-form',
  templateUrl: './gasto-form.component.html',
  styleUrls: ['./gasto-form.component.css']
})
export class GastoFormComponent implements OnInit {

  @Input() private idHojaCaja: number = 0;
	@Input() private refModal!: NgbModalRef; // guardo una referencia al modal abierto para poder cerrarlo desde el código

  error:any;
  usuarioLogueado:any ;
  tiposGastos: any;

  public gasto: Gasto = {
    id:0,
    idHojaCaja: 0,
    idUsuario: 0,
    alta: new Date(),
    observaciones: ''
  };

  id?: number;

  constructor(private _autenticacionService: AutenticacionService, private _usuariosService: UsuariosService, private _gastosService: GastosService) {

     if(this._autenticacionService.loggedIn()){
      let idUser = this._autenticacionService.getIdUser();
      if(idUser != null){
        this._usuariosService.getUsuario(idUser).subscribe({
          next : (res : any) => {
            //console.log(res);
            this.usuarioLogueado = res.id;
          },
          error: (err) => {
            console.error(err.error);
            this.error = err.error;
          }
        });
      }
     }
  }

  ngOnInit(): void {
    this._gastosService.getTiposGastos().subscribe({
      next : (resp : any) => {
        this.tiposGastos = resp;
      }, 
      error: (err : any) => {        
        this.error = err.error;
      }
    });
  }
   
  getTiposGastos() {
    return this.tiposGastos;
  }

  agregarGasto(){

    // borro estos campos porque los carga automáticamente mySQL
    delete this.gasto.alta;
    delete this.gasto.id;
    this.gasto.idHojaCaja = this.idHojaCaja;
    this.gasto.idUsuario = this.usuarioLogueado;
    //console.log(this.gasto);

    this._gastosService.addGasto(this.gasto)
    .subscribe({
      next : (resp : any) => {
        //console.log(resp);
        this.cerrarModal();
      },
      error : (err) => {
        console.error(err);
        this.error = err.error;
      }
    });    
  }
	cerrarModal() {
		this.refModal.close();
	}
}
