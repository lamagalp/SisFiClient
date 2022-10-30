import { HojaCaja } from './../../../models/hojaCaja';
import { PagoPremioFormComponent } from './../../pagosPremio/pago-premio-form/pago-premio-form.component';
import { VentaFormComponent } from './../../ventas/venta-form/venta-form.component';
import { FiadoFormComponent } from './../../fiados/fiado-form/fiado-form.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';
import { HojasCajaService } from '../../../services/hojas-caja.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FiadosService } from 'src/app/caja/services/fiados.service';
import { PagosPremioService } from 'src/app/caja/services/pagos-premio.service';
import { VentasService } from 'src/app/caja/services/ventas.service';
import { GastoFormComponent } from '../../gastos/gasto-form/gasto-form.component';
import { GastosService } from 'src/app/caja/services/gastos-service.service';

@Component({
  selector: 'app-hoja-caja',
  templateUrl: './hoja-caja.component.html',
  styleUrls: ['./hoja-caja.component.css']
})
export class HojaCajaComponent implements OnInit {

  error:any;
  usuarioLogueado:any;
  hojaCaja:any;
  resultadoUpdate = '';
  //tablas para armar el excel
  @ViewChild('tablaFiados') tablaFiados: ElementRef<HTMLTableElement>;
  @ViewChild('tablaVentas') tablaVentas: ElementRef<HTMLTableElement>;
  @ViewChild('tablaPremios') tablaPremios: ElementRef<HTMLTableElement>;
  @ViewChild('tablaGastos') tablaGastos: ElementRef<HTMLTableElement>;

  constructor(private _hojasCajaService: HojasCajaService, private _autenticacionService: AutenticacionService,
    private _usuariosService: UsuariosService, private _activatedRoute: ActivatedRoute, private _route:Router, private modalService: NgbModal,
    private _fiadoService: FiadosService, private _ventasService: VentasService, private _pagosPremioService: PagosPremioService, private _gastosService: GastosService) {

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

    const params = this._activatedRoute.snapshot.params;
    if(params?.id){
      this.getHojaCaja(params.id);
    }
    if(params?.hoy){
      this.getHojaCajaHoy();
    }
  }

  getHojaCaja(id: number){
    this._hojasCajaService.getHojaCaja(id).subscribe({
      next : (resp: any) => {
        this.hojaCaja = resp;
        console.log(resp);
        //console.log(this.hojaCaja.ventasOnline);
        //console.log(this.hojaCaja.pagosOnline);
      },
      error : (err) => {
        //console.error(err);
        this.error = err.error;
      }
    });
  }
  getHojaCajaHoy(){ 
    this._hojasCajaService.getHojaCajaHoy().subscribe({
      next: (resp : any) => {
        this.hojaCaja = resp;  
      },
      error : (err) => {
        //console.error(err);
        this.error = err.error;
      }
    });
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

  eliminarFiado(idHoja: number, idFiado: number){

    this._fiadoService.getFiado(idFiado).subscribe({
      next : (resp : any) => {
        //console.log(resp);
        resp.baja = new Date();
        resp.idUsuario = this.usuarioLogueado.id;
        this._fiadoService.updateFiado(idFiado, resp)
        .subscribe({
          next: (r : any) =>{
            //console.log(respuesta);
            this.getHojaCaja(idHoja);
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
      this.getHojaCaja(this.hojaCaja.id);
    }, (reason) => {
      this.error = reason.error;
    });
  }

  eliminarVenta(idHoja: number, idVenta: number){
    this._ventasService.getVenta(idVenta).subscribe({

      next: (resp :any) => {
        //console.log(resp);
        resp.baja = new Date();
        resp.idUsuario = this.usuarioLogueado.id;

        this._ventasService.updateVenta(idVenta, resp)
        .subscribe({
          next:(respuesta : any) => {
            //console.log(respuesta);
            this.getHojaCaja(idHoja);
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
      this.getHojaCaja(this.hojaCaja.id);
    }, (reason) => {
      this.error = reason.error;
    });
  }

  eliminarPagoPremio(idHoja: number, idPago: number){
    this._pagosPremioService.getPagoPremio(idPago).subscribe({
      next : (resp : any) => {
        //console.log(resp);
        resp.baja = new Date();
        resp.idUsuario = this.usuarioLogueado.id;

        this._pagosPremioService.updatePagoPremio(idPago, resp)
        .subscribe({
          next:(respuesta : any) => {
            //console.log(respuesta);
            this.getHojaCaja(idHoja);
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
      this.getHojaCaja(this.hojaCaja.id);
    }, (reason) => {
      this.error = reason.error;
    });
  }

  guardarValoresOnline(id: number){
    this.resultadoUpdate = '';
    this.hojaCaja.pagosOnline = - (this.hojaCaja.pagosOnline);
    this._hojasCajaService.updateHojaCaja(id, this.hojaCaja).subscribe({
      next : (resp : any) => {
        this.resultadoUpdate = resp.text;
        this.getHojaCaja(id);
      },
      error : (err) => {
        this.error = err.error;
      }
    });
  }

  eliminarGasto(idHoja: number, idGasto: number){

    this._gastosService.getGasto(idGasto).subscribe({
      next : (resp : any) => {
        //console.log(resp);
        resp.baja = new Date();
        resp.idUsuario = this.usuarioLogueado.id;
        this._gastosService.updateGasto(idGasto, resp)
        .subscribe({
          next:(respuesta : any) => {
            //console.log(respuesta);
            this.getHojaCaja(idHoja);
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
      this.getHojaCaja(this.hojaCaja.id);
    }, (reason) => {
      this.error = reason.error;
    });
  }

  trackByFn(index: number, item: any) {
    return item.id; // unique id corresponding to the item
  }

  base64(s: any) { 
    return window.btoa(unescape(encodeURIComponent(s))) 
  }
  format (s:any, c: any) { 
    return s.replace(/{(\w+)}/g, function(m: any, p:any) { return c[p]; }) 
  }

  exportToExcel () {
   
    let uri = 'data:application/vnd.ms-excel;base64,';
    let template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
    template += '<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>';
    template += '<style>table, th, td {border: 1px solid black;} body {  margin-left: auto;   margin-right: auto; }</style></head>';
    template += '<body><h3>Fecha y hora: {fecha}</h3><h3>Fiados/Pagos</h3><table>{tablaFiados}</table><h3>Ventas</h3><table>{tablaVentas}</table>';
    template += '<h3>Premios</h3><table>{tablaPremios}</table><h3>Gastos</h3><table>{tablaGastos}</table></body></html>';
    
    let fecha = new Date();    
    let tFiados = '';
    if(this.tablaFiados) 
      tFiados = this.tablaFiados.nativeElement.innerHTML.replace(/\$/g, '');
    
    let tVentas = '';
    if (this.tablaVentas)
      tVentas = this.tablaVentas.nativeElement.innerHTML.replace(/\$/g, '');
    
    let tPremios = '';
    if (this.tablaPremios)
      tPremios = this.tablaPremios.nativeElement.innerHTML.replace(/\$/g, '');

    let tGastos = '';
    if (this.tablaGastos)
      tGastos = this.tablaGastos.nativeElement.innerHTML.replace(/\$/g, '');
    let strFecha = new Date(this.hojaCaja.alta).toDateString().replace(/ /g, '_');
    //console.log(strFecha);
    let ctx = {worksheet: 'Hoja de Caja ' + this.hojaCaja.id , tablaFiados: tFiados, tablaVentas: tVentas, tablaPremios: tPremios ,tablaGastos: tGastos , fecha: fecha.toLocaleString()};
    
    var link = document.createElement("a");
    link.download = 'HojaCaja_' + strFecha+ '.xls';
    link.href = uri + this.base64(this.format(template, ctx));
    link.click();
  }
}
