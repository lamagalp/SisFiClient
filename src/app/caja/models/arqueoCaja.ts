export interface ArqueoCaja {
  id?: number;
  idHojaCaja?: number;
  totalFiados: number;
  totalPagosFiados: number;
  totalPagosPremioEfectivo: number;
  totalPagosPremioCartones: number;
  totalGastos: number;
  totalVentasCartones: number;
  totalBilletes: number;
  totalMonedas: number;
  billetera:number;
  fondoReserva: number;
  proximoFF: number;
  fondoFijo: number;
  balance: number;
  idUsuario: number;  
  detalle: string
  
}