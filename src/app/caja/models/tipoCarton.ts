import { Cliente } from "../../clientes/models/cliente";

export interface TipoCarton {
  id?: number;
  abreviatura: string;
  nombre: string;
  monto: number;
  alta?: Date;
  baja?: Date,
  modificacion?: Date,
  idUsuario: number;
  sumaCaja: string;

}
