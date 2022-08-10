
export interface Venta {
  id?: number;
  idHojaCaja: number;
  idUsuario: number;
  idTipoCarton?: number;
  montoCarton?:number;
  idCliente?: number;
  alta?: Date;
  baja?: Date;
  cantidad: number;
}
