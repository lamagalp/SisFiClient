import { UsuariosRoutingModule } from './usuarios-routing.module';
import { NgModule } from '@angular/core';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { UsuariosService } from './services/usuarios.service';
import { CompartidoModule } from '../compartido/compartido.module';
import { TokenInterceptorService } from '../login/services/token-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [
    UsuarioFormComponent,
    UsuarioListComponent
  ],
  imports: [
    HttpClientModule,
    CompartidoModule,
    UsuariosRoutingModule
  ],
  providers: [
    UsuariosService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,  //para interceptar las peticiones HTTP y agregarle el Token que tenemos en el sessionStorage
      multi: true
    }
  ],
  exports: [
    UsuarioFormComponent,
    UsuarioListComponent
  ]
})
export class UsuariosModule { }
