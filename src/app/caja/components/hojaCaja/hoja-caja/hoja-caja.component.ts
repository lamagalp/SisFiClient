import { HojaCaja } from './../../../models/hojaCaja';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';
import { HojasCajaService } from '../../../services/hojas-caja.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { ITabla } from 'src/app/caja/models/tabla';


@Component({
  selector: 'app-hoja-caja',
  templateUrl: './hoja-caja.component.html',
  styleUrls: ['./hoja-caja.component.css']
})
export class HojaCajaComponent implements OnInit {

  error:any;
  usuarioLogueado:any;
  hojaCaja:any;
  tablas: Map<string,ElementRef<HTMLTableElement>> = new Map();


  constructor(private _hojasCajaService: HojasCajaService, private _autenticacionService: AutenticacionService,
    private _usuariosService: UsuariosService, private _activatedRoute: ActivatedRoute) {

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

  updateTablas(tabla: ITabla){
    this.tablas.set(tabla.nombre, tabla.tabla);
    console.log(this.tablas);
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
        console.log(resp);
      },
      error : (err) => {
        //console.error(err);
        this.error = err.error;
      }
    });
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
  }  */ 

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

    //TODO recorrer el objeto tablas y levantarlas dinamicamente: nombre + tabla
    let aux = this.tablas.get('tablaFiados');
    if( aux != null) 
      tFiados = aux.nativeElement.innerHTML.replace(/\$/g, '');    
   
      
    let tVentas = '';
    aux = this.tablas.get('tablaVentas');
    if (aux != null)
      tVentas = aux.nativeElement.innerHTML.replace(/\$/g, '');
    
          
    let tPremios = '';
    aux = this.tablas.get('tablaPremios');
    if (aux != null)
      tPremios = aux.nativeElement.innerHTML.replace(/\$/g, '');

    let tGastos = '';
    aux = this.tablas.get('tablaGastos');
    if ( aux != null)
      tGastos = aux.nativeElement.innerHTML.replace(/\$/g, '');

    let strFecha = new Date(this.hojaCaja.alta).toDateString().replace(/ /g, '_');
    //console.log(strFecha);
    let ctx = {worksheet: 'Hoja de Caja ' + this.hojaCaja.id , tablaFiados: tFiados, tablaVentas: tVentas, tablaPremios: tPremios ,tablaGastos: tGastos , fecha: fecha.toLocaleString()};
     
    var link = document.createElement("a");
    link.download = 'HojaCaja_' + strFecha+ '.xls';
    link.href = uri + this.base64(this.format(template, ctx));
    link.click();
  }

  updateHojaCaja(hoja: HojaCaja){

    if(hoja.id != null){
      const idHoja = hoja.id;
      this._hojasCajaService.updateHojaCaja(idHoja, hoja).subscribe({
        next : (resp : any) => {          
          this.getHojaCaja(idHoja);
        },
        error : (err) => {
          this.error = err.error;
        }
      });
    }
    
  }
}
