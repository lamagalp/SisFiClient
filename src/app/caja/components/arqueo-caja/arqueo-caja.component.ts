import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { Fiado } from '../../models/fiado';
import { Gasto } from '../../models/gasto';
import { PagoPremio } from '../../models/pagoPremio';
import { Venta } from '../../models/venta';
import { ArqueosCajasService } from '../../services/arqueos-cajas.service';

@Component({
  selector: 'app-arqueo-caja',
  templateUrl: './arqueo-caja.component.html',
  styleUrls: ['./arqueo-caja.component.css']
})
export class ArqueoCajaComponent implements OnInit, OnChanges{


  @Input() hojaCaja: any;
   

  caja = {
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
    idUsuario : 0
  }
  
  hizoCalculo = false;
  resultadoUpdate: string = '';

  billetes = [
    { nombre: 'Billetes $1000', valor: 1000 ,cantidad: 0 },
    { nombre: 'Billetes $500', valor: 500 ,cantidad: 0 },
    { nombre: 'Billetes $200', valor: 200 ,cantidad: 0 },
    { nombre: 'Billetes $100', valor: 100 ,cantidad: 0 },
    { nombre: 'Billetes $50', valor: 50 ,cantidad: 0 },
    { nombre: 'Billetes $20', valor: 20, cantidad: 0 },
    { nombre: 'Billetes $10', valor: 10 ,cantidad: 0 }];
  monedas = [
      { nombre: 'Moneda $20', valor: 20 ,cantidad: 0 },
      { nombre: 'Moneda $10', valor: 10 ,cantidad: 0 },
      { nombre: 'Moneda $5', valor: 5 ,cantidad: 0 },
      { nombre: 'Moneda $2',valor: 2 ,cantidad: 0 },
      { nombre: 'Moneda $1', valor: 1 ,cantidad: 0 },
      { nombre: 'Moneda $0,50', valor: 0.5 ,cantidad: 0 }];
  
      error:any;
      usuarioLogueado:any ;

  constructor(private _autenticacionService: AutenticacionService, private _usuariosService: UsuariosService, private _arqueosService: ArqueosCajasService) { 

    if(this._autenticacionService.loggedIn()){
      let idUser = this._autenticacionService.getIdUser();
      if(idUser != null){
        this._usuariosService.getUsuario(idUser).subscribe({
          next: (res : any) => {
            console.log(res);
            this.usuarioLogueado = res.id;
          },
          error: (err) => {
            console.error(err);
            this.error = err;
          }
        });
      }
    }

  }

  ngOnInit(): void {    

    this._arqueosService.getArqueoCaja(this.hojaCaja.id).subscribe({
      next: (resp : any) => {
        console.log(resp);
        this.caja = resp;
      },
      error : (err) => {
        console.log(err);
      }
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        if (propName == 'hojaCaja'){
          this.caja.totalFiados = this.getTotalFiados();
          this.caja.totalPagosFiados = this.getTotalPagosFiados();
          this.caja.totalPagosPremioEfectivo = this.getTotalPagosPremioEfectivo();
          this.caja.totalPagosPremioCartones = this.getTotalPagosPremioCartones();
          this.caja.totalGastos = this.getTotalGastos();
          this.caja.totalVentasCartones = this.getTotalVentasCartones();
        }
      }
    }
  }

  getTotalFiados():number{

    let sumaF:number = 0;
    if(this.hojaCaja.fiados != null){
      this.hojaCaja.fiados.forEach((fiado : Fiado )=> {
        if(fiado.baja === null && fiado.tipoMovimiento == 'F' && fiado.monto != null)
          sumaF -= fiado.monto;
      });
    }
    console.error('- TotalFiados ' + sumaF);
    return sumaF;
  }

  getTotalPagosFiados():number{

    let sumaP: number = 0;
    if(this.hojaCaja.fiados != null){
      this.hojaCaja.fiados.forEach((fiado : Fiado )=> {
        if(fiado.baja === null && fiado.tipoMovimiento == 'P' && fiado.monto != null)
          sumaP += fiado.monto;
      });
    }   
    console.info('+ TotalPagosFiados ' + sumaP);
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
    console.error('- TotalPagosPremioEfectivo ' + sumaE);
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

  getTotalPagosPremioCartones(){
    let sumaC: number = 0;
    if(this.hojaCaja.pagosPremio != null){
      this.hojaCaja.pagosPremio.forEach((pago : PagoPremio )=> {
        if(pago.baja === null && pago.cantidadCartones != null && pago.cantidadCartones > 0 && pago.montoCarton != null && pago.montoCarton > 0 )
          sumaC -= ( pago.cantidadCartones * pago.montoCarton);
      });
    }    
    console.info('* TotalPagosPremioCartones ' + sumaC);
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
    console.error('- TotalGastos ' + sumaG);
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
    console.log('+ TotalVentasCartones ' + sumaV);        
    return sumaV;
  }

  getTotalIngresos(): number{
    let suma = this.caja.totalPagosFiados + this.caja.totalVentasCartones + this.hojaCaja.ventasOnline;
    return (suma);
  }

  getTotalEgresos(): number {
    let suma = this.caja.totalFiados + this.caja.totalGastos + this.caja.totalPagosPremioCartones + this.caja.totalPagosPremioEfectivo + this.hojaCaja.pagosOnline;  
    return (suma);
  }

  guardarArqueo(){
    this.resultadoUpdate = '';
    this.caja.idUsuario = this.usuarioLogueado.id;
    this.caja.idHojaCaja = this.hojaCaja.id;
    this.caja.fondoFijo = this.hojaCaja.fondoFijo;

    if(this.caja.id != 0) { //alta
      this._arqueosService.updateArqueoCaja(this.caja.id, this.caja)
      .subscribe({
        next: (resp : any) => {       
          this.resultadoUpdate = resp.message;        
        },
        error: (err) => {
          console.error(err);
          this.error = err;
        }
      });
    } else {
      this._arqueosService.addArqueoCaja(this.caja)
      .subscribe({
        next: (resp : any) => {       
          this.resultadoUpdate = resp.message;        
        },
        error: (err) => {
          console.error(err);
          this.error = err;
        }
      });
    }  
  }
  calcularCaja(){
    let egresos = Math.abs(this.caja.totalFiados) + Math.abs(this.caja.totalGastos) + Math.abs(this.caja.totalPagosPremioEfectivo) + Math.abs(this.hojaCaja.pagosOnline);    
    let ingresos = this.hojaCaja.fondoFijo + this.getTotalIngresos();
    
    let efectivo = this.caja.totalBilletes + this.caja.totalMonedas + this.caja.billetera + this.caja.fondoReserva;
    let movimientos = ingresos - egresos;
    console.info('| fondo fijo: ' + this.hojaCaja.fondoFijo);
    console.info('| ingresos + fondo fijo : ' + ingresos);
    console.info('| egresos: ' + egresos);
    console.info( '| billetes + monedas + billetera: ' + efectivo);
    console.info('| ingresos - egresos: ' + movimientos);
    this.caja.proximoFF = this.caja.totalBilletes + this.caja.totalMonedas + this.caja.billetera;

    this.caja.balance = efectivo - movimientos;
    this.hizoCalculo = true;
  }

  
}
