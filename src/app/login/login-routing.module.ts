import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//componentes
import { SignInComponent } from './components/signin/signin.component';
import { SignOutComponent } from './components/signout/signout.component';

import { AuthGuard } from '../guards/auth.guard';

// Se concatenan a la ruta evaluada en el AppRotingModule: "login"
const routes: Routes = [
  { path:'signin', component:SignInComponent},
  { path:'signout', component:SignOutComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)], // .forRoot se usa solo en el AppRoutingModule, porque ese método instancia el servicio de ruteo
  exports: [RouterModule]
})
export class LoginRoutingModule { }

