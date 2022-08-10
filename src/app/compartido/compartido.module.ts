import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmacionMessageComponent } from './components/confirmacion-message/confirmacion-message.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ErrorMessageComponent,
    ConfirmacionMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ErrorMessageComponent,
    ConfirmacionMessageComponent,
    CommonModule, // así queda disponible para todos los módulos que importen el módulo compartido
    FormsModule  // así queda disponible para todos los módulos que importen el módulo compartido
  ]
})
export class CompartidoModule { }
