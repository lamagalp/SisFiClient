export interface PagoPremio {
  id?: number;
  idHojaCaja: number;
  idUsuario: number;
  monto?: number;
  alta?: Date;
  baja?: Date;
  idTipoCarton?: number;
  montoCarton?:number;
  cantidadCartones?: number;
  idCliente?: number;
  observaciones: string;
}

