import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Fiado } from '../../models/fiado';
import { Gasto } from '../../models/gasto';
import { HojaCaja } from '../../models/hojaCaja';
import { PagoPremio } from '../../models/pagoPremio';
import { Venta } from '../../models/venta';

@Component({
  selector: 'app-arqueo-caja',
  templateUrl: './arqueo-caja.component.html',
  styleUrls: ['./arqueo-caja.component.css']
})
export class ArqueoCajaComponent implements OnInit, OnChanges{


  @Input() hojaCaja: any;
  totalFiados = 0;
  totalPagosFiados = 0;
  totalPagosPremioEfectivo = 0;
  totalPagosPremioCartones = 0;
  totalGastos = 0;
  totalVentasCartones = 0;

  resultadoUpdate: string = '';

  billetes = [
    { nombre: 'Billetes $1000', cantidad: 0 },{ nombre: 'Billetes $500', cantidad: 0 },{ nombre: 'Billetes $200', cantidad: 0 },{ nombre: 'Billetes $', cantidad: 0 },
    { nombre: 'Billetes $50', cantidad: 0 },{ nombre: 'Billetes $20', cantidad: 0 },{ nombre: 'Billetes $10', cantidad: 0 }];
  monedas = [
      { nombre: 'Moneda $5', cantidad: 0 },{ nombre: 'Moneda $2', cantidad: 0 },
      { nombre: 'Moneda $2', cantidad: 0 },{ nombre: 'Moneda $1', cantidad: 0 },{ nombre: 'Moneda 50 centavos', cantidad: 0 },{ nombre: 'Moneda 25 centavos', cantidad: 0 },{ nombre: 'Moneda 10 centavos', cantidad: 0 }];
  
  constructor() { }


  ngOnInit(): void {

    let hoja: HojaCaja = this.hojaCaja;

    //procesar entradas y salidas de dinero

  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        if (propName == 'hojaCaja'){
          this.totalFiados = this.getTotalFiados();
          this.totalPagosFiados = this.getTotalPagosFiados();
          this.totalPagosPremioEfectivo = this.getTotalPagosPremioEfectivo();
          this.totalPagosPremioCartones = this.getTotalPagosPremioCartones();
          this.totalGastos = this.getTotalGastos();
          this.totalVentasCartones = this.getTotalVentasCartones();
        }
      }
    }
  }

  getTotalFiados():number{

    let sumaF:number = 0;
    if(this.hojaCaja.fiados != null){
      this.hojaCaja.fiados.forEach((fiado : Fiado )=> {
        if(fiado.tipoMovimiento == 'F' && fiado.monto != null)
          sumaF -= fiado.monto;
      });
    }
    return sumaF;
  }

  getTotalPagosFiados():number{

    let sumaP: number = 0;
    if(this.hojaCaja.fiados != null){
      this.hojaCaja.fiados.forEach((fiado : Fiado )=> {
        if(fiado.tipoMovimiento == 'P' && fiado.monto != null)
          sumaP += fiado.monto;
      });
    }   
    return sumaP;
  }

  getTotalPagosPremioEfectivo():number{

    let sumaE: number = 0;
    if(this.hojaCaja.pagosPremio != null){
      this.hojaCaja.pagosPremio.forEach((pago : PagoPremio )=> {
        if(pago.monto != null && pago.monto > 0)
          sumaE -= pago.monto;
      });
    }    
    return sumaE;
  }


  getTotalPagosPremioCartones(){
    let sumaC: number = 0;
    if(this.hojaCaja.pagosPremio != null){
      this.hojaCaja.pagosPremio.forEach((pago : PagoPremio )=> {
        if(pago.cantidadCartones != null && pago.cantidadCartones > 0 && pago.montoCarton != null && pago.montoCarton > 0 )
          sumaC -= ( pago.cantidadCartones * pago.montoCarton);
      });
    }    
    return sumaC;
  }

  getTotalGastos(){
    let sumaG: number = 0;
    if(this.hojaCaja.gastos != null){
      this.hojaCaja.gastos.forEach((gasto : Gasto )=> {
        if(gasto.monto != null && gasto.monto > 0)
          sumaG -= gasto.monto;
      });
    }
    return sumaG;
  }

  getTotalVentasCartones(){
    let sumaV: number = 0;
    if(this.hojaCaja.ventas != null){
      this.hojaCaja.ventas.forEach((venta : Venta )=> {
        if(venta.cantidad != null && venta.cantidad > 0 && venta.montoCarton != null && venta.montoCarton > 0 )
          sumaV += ( venta.cantidad * venta.montoCarton);
      });
    }     
    return sumaV;
  }

  getTotalIngresos(): number{
    return (this.totalPagosFiados + this.totalVentasCartones + this.hojaCaja.ventasOnline);
  }

  getTotalEgresos(): number {
    return (this.totalFiados + this.totalGastos + this.totalPagosPremioCartones + this.totalPagosPremioEfectivo + this.hojaCaja.pagosOnline);
  }

  guardarArqueo(idHoja: number){

  }

}
