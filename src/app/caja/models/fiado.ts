import { Cliente } from "../../clientes/models/cliente";

export interface Fiado {
  id?: number;
  idHojaCaja: number;
  idUsuario: number;
  monto?: number;
  alta?: Date;
  baja?: Date,
  idCliente?: number;
  observaciones: string;
  tipoMovimiento: string;
}
