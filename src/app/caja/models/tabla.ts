import { ElementRef } from "@angular/core";

export interface ITabla {
    nombre: string;
    tabla: ElementRef<HTMLTableElement>;
}