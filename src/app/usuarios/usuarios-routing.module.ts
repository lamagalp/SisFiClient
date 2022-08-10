import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';

import { AuthGuard } from '../auth.guard';

// Se concatenan a la ruta evaluada en el AppRotingModule: "usuarios"
const routes: Routes = [
  { path:'', component:UsuarioListComponent, canActivate: [AuthGuard]},
  { path:'add', component:UsuarioFormComponent, canActivate: [AuthGuard]},
  { path:'update/:id', component:UsuarioFormComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // .forRoot se usa solo en el AppRoutingModule, porque ese método instancia el servicio de ruteo
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
