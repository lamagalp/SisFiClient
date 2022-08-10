
export interface Gasto {
  id?: number;
  idHojaCaja: number;
  idUsuario: number;
  monto?: number;
  alta?: Date;
  baja?: Date,
  observaciones: string;
  idTipoGasto?: number;
}
