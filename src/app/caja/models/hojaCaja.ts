import { Usuario } from "../../usuarios/models/usuario";
import { ArqueoCaja } from "./arqueoCaja";

export interface HojaCaja {
  id?: number;
  fondoFijo: number;
  alta?: Date;
  usuario: Usuario;
  baja?:Date;
  ventasOnline: number;
  pagosOnline: number;
  billetera?:number;
  billetes?:number;
  monedas?:number
  pagosPremio?: any;
  ventas?: any;
  fiados?: any;
  gastos?: any;
  arqueo?: ArqueoCaja;
  modificable: boolean;
}
