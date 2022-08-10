import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule),
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
  },
  {
    path: 'hojasCaja',
    loadChildren: () => import('./caja/caja.module').then(m => m.CajaModule),
  },
  { path: 'login',
  loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  { path:'', redirectTo: '/', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
