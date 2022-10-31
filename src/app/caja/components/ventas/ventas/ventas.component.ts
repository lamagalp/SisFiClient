import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HojaCaja } from 'src/app/caja/models/hojaCaja';
import { ITabla } from 'src/app/caja/models/tabla';
import { VentasService } from 'src/app/caja/services/ventas.service';
import { VentaFormComponent } from '../venta-form/venta-form.component';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements AfterViewInit {

  @ViewChild('tablaVentas') tablaVentas: ElementRef<HTMLTableElement>;
  @Input() hojaCaja: HojaCaja;
  @Input() usuarioLogueado: any;
  @Output() getHojaCaja: EventEmitter<number> = new EventEmitter();
  @Output() updateTablas: EventEmitter<ITabla> = new EventEmitter();
  
  tabla: ITabla;
  error:any;

  constructor(private modalService: NgbModal,
    private _ventasService: VentasService) {

  }

   ngAfterViewInit(): void {
    this.tabla = {nombre:'tablaVentas', tabla: this.tablaVentas};
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
  eliminarVenta(idVenta: number){
    this._ventasService.getVenta(idVenta).subscribe({

      next: (resp :any) => {
        //console.log(resp);
        resp.baja = new Date();
        resp.idUsuario = this.usuarioLogueado.id;

        this._ventasService.updateVenta(idVenta, resp)
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

  addVenta(){
    let m = this.modalService.open(VentaFormComponent, {
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
