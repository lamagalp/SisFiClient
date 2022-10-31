import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HojaCaja } from 'src/app/caja/models/hojaCaja';
import { ITabla } from 'src/app/caja/models/tabla';
import { PagosPremioService } from 'src/app/caja/services/pagos-premio.service';
import { PagoPremioFormComponent } from '../pago-premio-form/pago-premio-form.component';

@Component({
  selector: 'app-pagos-premio',
  templateUrl: './pagos-premio.component.html',
  styleUrls: ['./pagos-premio.component.css']
})
export class PagosPremioComponent implements AfterViewInit {

  @ViewChild('tablaPremios') tablaPremios: ElementRef<HTMLTableElement>;
  @Input() hojaCaja: HojaCaja;
  @Input() usuarioLogueado: any;
  @Output() getHojaCaja: EventEmitter<number> = new EventEmitter();
  @Output() updateTablas: EventEmitter<ITabla> = new EventEmitter();

  tabla: ITabla;
  error:any;


  constructor(private modalService: NgbModal,
     private _pagosPremioService: PagosPremioService) {

  }

  ngAfterViewInit(): void {     
    this.tabla = {nombre:'tablaPremios', tabla: this.tablaPremios};
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
  } */

  eliminarPagoPremio(idPago: number){
    this._pagosPremioService.getPagoPremio(idPago).subscribe({
      next : (resp : any) => {
        //console.log(resp);
        resp.baja = new Date();
        resp.idUsuario = this.usuarioLogueado.id;

        this._pagosPremioService.updatePagoPremio(idPago, resp)
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
      error : (err) => {
        //console.error(err);
        this.error = err.error;
      }
    });
  }

  addPagoPremio(){
    let m = this.modalService.open(PagoPremioFormComponent, {
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
