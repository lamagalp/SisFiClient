import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';

import { AuthGuard } from '../auth.guard';

// Se concatenan a la ruta evaluada en el AppRotingModule: "clientes"
const routes: Routes = [
  { path:'', component:ClienteListComponent, canActivate: [AuthGuard]},
  { path:'add', component:ClienteFormComponent, canActivate: [AuthGuard]},
  { path:'update/:id', component:ClienteFormComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // .forRoot se usa solo en el AppRoutingModule, porque ese método instancia el servicio de ruteo
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
