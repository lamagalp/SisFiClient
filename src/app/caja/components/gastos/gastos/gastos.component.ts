import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HojaCaja } from 'src/app/caja/models/hojaCaja';
import { ITabla } from 'src/app/caja/models/tabla';
import { GastosService } from 'src/app/caja/services/gastos-service.service';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { GastoFormComponent } from '../gasto-form/gasto-form.component';


@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements AfterViewInit {

  @ViewChild('tablaGastos') tablaGastos: ElementRef<HTMLTableElement>;
  @Input() hojaCaja: HojaCaja;
  @Output() getHojaCaja: EventEmitter<number> = new EventEmitter();
  @Output() updateTablas: EventEmitter<ITabla> = new EventEmitter();
  
  tabla: ITabla;
  error:any;
  usuarioLogueado:any;

  constructor(private _autenticacionService: AutenticacionService, private _usuariosService: UsuariosService, private modalService: NgbModal, private _gastosService: GastosService) {

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

  ngAfterViewInit(): void {
    this.tabla = {nombre:'tablaGastos', tabla: this.tablaGastos};
    this.updateTablas.emit(this.tabla);
  }

  getUsuario(idUsuario:number): any{
    this._usuariosService.getUsuario(idUsuario).subscribe({
        next: (res : any) => {
          //console.log(res);
          return res.apellido + ', ' + res.nombre;
        },
        error : (err) => {
          this.error = err.error;
          return null;
        }
      });
  }

  eliminarGasto(idGasto: number){

    this._gastosService.getGasto(idGasto).subscribe({
      next : (resp : any) => {
        //console.log(resp);
        resp.baja = new Date();
        resp.idUsuario = this.usuarioLogueado.id;
        this._gastosService.updateGasto(idGasto, resp)
        .subscribe({
          next:(respuesta : any) => {
            //console.log(respuesta);
            this.getHojaCaja.emit(this.hojaCaja.id);
            this.updateTablas.emit(this.tabla);
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


  addGasto() {

		let m = this.modalService.open(GastoFormComponent, {
			windowClass: 'modal',
      animation: false,
			size: 'lg',
			centered: true
		});
		m.componentInstance.idHojaCaja = this.hojaCaja.id;
		m.componentInstance.refModal = m;
    m.result.then((result) => {
      //console.log(result);
      this.getHojaCaja.emit(this.hojaCaja.id);
      this.updateTablas.emit(this.tabla);
    }, (reason) => {
      this.error = reason.error;
    });
  }


  trackByFn(index: number, item: any) {
    return item.id; // unique id corresponding to the item
  }
}
