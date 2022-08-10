import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { HojaCajaListComponent } from './components/hojaCaja/hoja-caja-list/hoja-caja-list.component';
import { HojaCajaFormComponent } from './components/hojaCaja/hoja-caja-form/hoja-caja-form.component';
import { HojaCajaComponent } from './components/hojaCaja/hoja-caja/hoja-caja.component';

import { AuthGuard } from '../auth.guard';

// Se concatenan a la ruta evaluada en el AppRotingModule: "hojasCaja"
const routes: Routes = [
  { path:'', component:HojaCajaListComponent, canActivate: [AuthGuard]},
  { path:'add', component:HojaCajaFormComponent, canActivate: [AuthGuard]},
  { path:'get/:hoy', component:HojaCajaComponent, canActivate: [AuthGuard]},
  { path:'update/:id', component:HojaCajaFormComponent, canActivate: [AuthGuard]},
  { path:':id', component:HojaCajaComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // .forRoot se usa solo en el AppRoutingModule, porque ese método instancia el servicio de ruteo
  exports: [RouterModule]
})
export class CajaRoutingModule { }
