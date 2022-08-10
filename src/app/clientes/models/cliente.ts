export interface Cliente {
  id?: number;
  apellido: string;
  nombre: string;
  imagen?: string;
  saldo: number;
  limite?: number;
  telefono?: string;
  direccion?: string;
  modificado?: Date;
}
