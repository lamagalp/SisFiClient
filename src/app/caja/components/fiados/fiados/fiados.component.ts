import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HojaCaja } from 'src/app/caja/models/hojaCaja';
import { ITabla } from 'src/app/caja/models/tabla';
import { FiadosService } from 'src/app/caja/services/fiados.service';
import { FiadoFormComponent } from '../fiado-form/fiado-form.component';

@Component({
  selector: 'app-fiados',
  templateUrl: './fiados.component.html',
  styleUrls: ['./fiados.component.css']
})

export class FiadosComponent implements AfterViewInit {

  @ViewChild('tablaFiados') tablaFiados: ElementRef<HTMLTableElement>;
  @Input() hojaCaja: HojaCaja;
  @Input() usuarioLogueado: any;
  @Output() getHojaCaja: EventEmitter<number> = new EventEmitter();
  @Output() updateTablas: EventEmitter<ITabla> = new EventEmitter();
  
  error:any;
  tabla : ITabla;

  constructor(private modalService: NgbModal, private _fiadoService: FiadosService) {
   
  }

  ngAfterViewInit(): void {

    this.tabla = {nombre:'tablaFiados', tabla: this.tablaFiados};
    this.updateTablas.emit(this.tabla);
  }

/*   getUsuario(idUsuario:number): any{
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
 */
  eliminarFiado(idFiado: number){

    this._fiadoService.getFiado(idFiado).subscribe({
      next : (resp : any) => {
        //console.log(resp);
        resp.baja = new Date();
        resp.idUsuario = this.usuarioLogueado.id;
        this._fiadoService.updateFiado(idFiado, resp)
        .subscribe({
          next: (r : any) =>{
            //console.log(respuesta);
            this.getHojaCaja.emit(this.hojaCaja.id);
            this.updateTablas.emit(this.tabla);
          },
          error : (e) => {
            //console.error(er);
            this.error = e.error;
          }
        });
      },
      error: (err) => {
        console.error(err);
        this.error = err.error;
      }
    });
  }


  addFiado() {

		let m = this.modalService.open(FiadoFormComponent, {
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
