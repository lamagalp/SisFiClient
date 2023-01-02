import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { ArqueoCaja } from '../../models/arqueoCaja';
import { Fiado } from '../../models/fiado';
import { Gasto } from '../../models/gasto';
import { HojaCaja } from '../../models/hojaCaja';
import { PagoPremio } from '../../models/pagoPremio';
import { Venta } from '../../models/venta';
import { ArqueosCajasService } from '../../services/arqueos-cajas.service';

@Component({
  selector: 'app-arqueo-caja',
  templateUrl: './arqueo-caja.component.html',
  styleUrls: ['./arqueo-caja.component.css']
})
export class ArqueoCajaComponent implements OnInit, OnChanges{


  @Input() hojaCaja: HojaCaja;
  @Output() updateHojaCaja: EventEmitter<HojaCaja> = new EventEmitter();

  caja : ArqueoCaja;

  hizoCalculo = false;
  resultadoUpdate: string = '';

  billetes : Array<any>;
  monedas : Array<any>;
  mostrarDetalle :boolean = false;

  error:any;
  usuarioLogueado:any ;

  constructor(private _autenticacionService: AutenticacionService, private _usuariosService: UsuariosService, private _arqueosService: ArqueosCajasService) {

    if(this._autenticacionService.loggedIn()){
      let idUser = this._autenticacionService.getIdUser();
      if(idUser != null){
        this._usuariosService.getUsuario(idUser).subscribe({
          next: (res : any) => {
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

      this.billetes = new Array();
      this.monedas = new Array();

      if(this.hojaCaja.arqueo != null && this.hojaCaja.arqueo.detalle != null){

        this.caja = this.hojaCaja.arqueo;

        let lista = JSON.parse(this.hojaCaja.arqueo.detalle);

        lista.billetes.forEach((b : any) => {
          this.billetes.push({nombre: 'Billete $' + b.valor , valor: b.valor , cantidad: b.cantidad});
        });
        lista.monedas.forEach((m : any) => {
          this.monedas.push({nombre: 'Moneda $' + m.valor , valor: m.valor , cantidad: m.cantidad});
        });

      } else {

        this.caja = {
          id: 0,
          idHojaCaja: 0,
          totalFiados: 0,
          totalPagosFiados: 0,
          totalPagosPremioEfectivo: 0,
          totalPagosPremioCartones: 0,
          totalGastos: 0,
          totalVentasCartones: 0,
          totalBilletes: 0,
          totalMonedas: 0,
          billetera: 0,
          fondoReserva: 0,
          proximoFF: 0,
          fondoFijo: 0,
          balance: 0,
          idUsuario : 0,
          detalle: ''
        }

        this.billetes.push({ nombre: 'Billete $1000', valor: 1000 ,cantidad: 0 }),
        this.billetes.push({ nombre: 'Billete $500', valor: 500 ,cantidad: 0 }),
        this.billetes.push({ nombre: 'Billete $200', valor: 200 ,cantidad: 0 }),
        this.billetes.push({ nombre: 'Billete $100', valor: 100 ,cantidad: 0 }),
        this.billetes.push({ nombre: 'Billete $50', valor: 50 ,cantidad: 0 }),
        this.billetes.push({ nombre: 'Billete $20', valor: 20, cantidad: 0 }),
        this.billetes.push({ nombre: 'Billete $10', valor: 10 ,cantidad: 0 });

        this.monedas.push({ nombre: 'Moneda $20', valor: 20 ,cantidad: 0 }),
        this.monedas.push({ nombre: 'Moneda $10', valor: 10 ,cantidad: 0 }),
        this.monedas.push({ nombre: 'Moneda $5', valor: 5 ,cantidad: 0 }),
        this.monedas.push({ nombre: 'Moneda $2',valor: 2 ,cantidad: 0 }),
        this.monedas.push({ nombre: 'Moneda $1', valor: 1 ,cantidad: 0 }),
        this.monedas.push({ nombre: 'Moneda $0.50', valor: 0.5 ,cantidad: 0 });

      }
      this.mostrarDetalle = true;
      this.calcularTotales();
  }

  calcularTotales(){

    this.caja.totalFiados = this.getTotalFiados();
    this.caja.totalPagosFiados = this.getTotalPagosFiados();
    this.caja.totalPagosPremioEfectivo = this.getTotalPagosPremioEfectivo();
    this.caja.totalPagosPremioCartones = this.getTotalPagosPremioCartones();
    this.caja.totalGastos = this.getTotalGastos();
    this.caja.totalVentasCartones = this.getTotalVentasCartones();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getTotalFiados():number{

    let sumaF:number = 0;
    if(this.hojaCaja.fiados != null){
      this.hojaCaja.fiados.forEach((fiado : Fiado )=> {
        if(fiado.baja === null && fiado.tipoMovimiento == 'F' && fiado.monto != null)
          sumaF += Math.abs(fiado.monto);
      });
    }
    //console.error('- TotalFiados ' + sumaF);
    return (-1)*(sumaF);
  }

  getTotalPagosFiados():number{

    let sumaP: number = 0;
    if(this.hojaCaja.fiados != null){
      this.hojaCaja.fiados.forEach((fiado : Fiado )=> {
        if(fiado.baja === null && fiado.tipoMovimiento == 'P' && fiado.monto != null)
          sumaP += fiado.monto;
      });
    }
    //console.info('+ TotalPagosFiados ' + sumaP);
    return sumaP;
  }

  getTotalPagosPremioEfectivo():number{

    let sumaE: number = 0;
    if(this.hojaCaja.pagosPremio != null){
      this.hojaCaja.pagosPremio.forEach((pago : PagoPremio )=> {
        if(pago.baja === null && pago.monto != null && pago.monto > 0)
          sumaE -= pago.monto;
      });
    }
    //console.error('- TotalPagosPremioEfectivo ' + sumaE);
    return sumaE;
  }

  updateTotalBilletes():void{
    let sumaB : number = 0;
    this.billetes.forEach((b : any) =>{
      sumaB += (b.valor * b.cantidad);
    });
    this.caja.totalBilletes = sumaB;
  }

  updateTotalMonedas():void{
    let sumaM : number = 0;
    this.monedas.forEach((b : any) =>{
      sumaM += (b.valor * b.cantidad);
    });
    this.caja.totalMonedas = sumaM;
  }

  getJSONDetalle(): string {

    let json:string = '{"billetes":[';
    this.billetes.forEach((b : any) =>{
       json += `{"valor":${b.valor},"cantidad":${b.cantidad}},`;
    });
    if(this.billetes.length > 0)
      json = json.substring(0, json.length-1); // quito la última coma

    json += '],"monedas":['
    this.monedas.forEach((m : any) =>{
      json += `{"valor":${m.valor},"cantidad":${m.cantidad}},`;
    });
    if(this.monedas.length > 0)
      json = json.substring(0, json.length-1); // quito la última coma
    json += ']}'
    return json;
  }

  getTotalPagosPremioCartones(){
    let sumaC: number = 0;
    if(this.hojaCaja.pagosPremio != null){
      this.hojaCaja.pagosPremio.forEach((pago : PagoPremio )=> {
        if(pago.baja === null && pago.cantidadCartones != null && pago.cantidadCartones > 0 && pago.montoCarton != null && pago.montoCarton > 0 )
          sumaC -= ( pago.cantidadCartones * pago.montoCarton);
      });
    }
    //console.info('* TotalPagosPremioCartones ' + sumaC);
    return sumaC;
  }

  getTotalGastos(){
    let sumaG: number = 0;
    if(this.hojaCaja.gastos != null){
      this.hojaCaja.gastos.forEach((gasto : Gasto )=> {
        if(gasto.baja === null && gasto.monto != null && gasto.monto > 0)
          sumaG -= gasto.monto;
      });
    }
    //console.error('- TotalGastos ' + sumaG);
    return sumaG;
  }

  getTotalVentasCartones(){
    let sumaV: number = 0;
    if(this.hojaCaja.ventas != null){
      this.hojaCaja.ventas.forEach((venta : Venta )=> {
        if(venta.baja === null && venta.cantidad != null && venta.cantidad > 0 && venta.montoCarton != null && venta.montoCarton > 0 )
          sumaV += ( venta.cantidad * venta.montoCarton);
      });
    }
    //console.log('+ TotalVentasCartones ' + sumaV);
    return sumaV;
  }

  getTotalIngresos(): number{
    let suma = Math.abs(this.caja.totalPagosFiados) + Math.abs(this.caja.totalVentasCartones) + Math.abs(this.hojaCaja.ventasOnline);
    console.log('---total ingresos ');
    console.log(suma);
    return (suma);
  }

  getTotalEgresos(): number {
    let suma = Math.abs(this.caja.totalFiados) + Math.abs(this.caja.totalGastos) + Math.abs(this.caja.totalPagosPremioCartones) + Math.abs(this.caja.totalPagosPremioEfectivo) + Math.abs(this.hojaCaja.pagosOnline);
    return ((-1)*(suma));
  }

  //ALTER TABLE `arqueoscaja` ADD `detalle` JSON NOT NULL AFTER `idUsuario`;
  guardarArqueo(){
    this.resultadoUpdate = '';
    this.caja.idUsuario = this.usuarioLogueado.id;
    this.caja.idHojaCaja = this.hojaCaja.id;
    this.caja.fondoFijo = this.hojaCaja.fondoFijo;
    this.caja.detalle = this.getJSONDetalle();

    if(this.caja.id != 0) { //update
      this._arqueosService.updateArqueoCaja(this.caja.id, this.caja)
      .subscribe({
        next: (resp : any) => {
          this.resultadoUpdate = resp.message;
          this.guardarValoresOnline();
        },
        error: (err) => {
          console.error(err);
          this.error = err.error;
        }
      });
    } else {
      delete this.caja.id;
      this._arqueosService.addArqueoCaja(this.caja)
      .subscribe({
        next: (resp : any) => {
          this.resultadoUpdate = resp.message;
          this.guardarValoresOnline();
        },
        error: (err) => {
          console.error(err);
          this.error = err.error;
        }
      });
    }
  }
  calcularCaja(){
    let egresos = Math.abs(this.caja.totalFiados) + Math.abs(this.caja.totalGastos) + Math.abs(this.caja.totalPagosPremioEfectivo) + Math.abs(this.hojaCaja.pagosOnline);
    let ingresos = Math.abs(this.hojaCaja.fondoFijo) + this.getTotalIngresos();

    let efectivo = Math.abs(this.caja.totalBilletes) + Math.abs(this.caja.totalMonedas) + Math.abs(this.caja.billetera) + Math.abs(this.caja.fondoReserva);
    let movimientos = ingresos - egresos;
    console.info('| fondo fijo: ' + this.hojaCaja.fondoFijo);
    // console.info('| ingresos + fondo fijo : ' + ingresos);
    console.info('| egresos: ' + egresos);
    console.info( '| billetes + monedas + billetera: ' + efectivo);
    console.info('| ingresos - egresos: ' + movimientos);
    this.caja.proximoFF = Math.abs(this.caja.totalBilletes) + Math.abs(this.caja.totalMonedas) + Math.abs(this.caja.billetera);

    this.caja.balance = efectivo - movimientos;
    this.hizoCalculo = true;
  }

  guardarValoresOnline(){
    this.hojaCaja.pagosOnline = - (this.hojaCaja.pagosOnline);
    this.updateHojaCaja.emit(this.hojaCaja);
  }
}
