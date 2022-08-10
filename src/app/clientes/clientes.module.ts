import { ClientesRoutingModule } from './clientes-routing.module';
import { NgModule } from '@angular/core';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ClientesService } from './services/clientes.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CompartidoModule } from '../compartido/compartido.module';
import { TokenInterceptorService } from '../login/services/token-interceptor.service';




@NgModule({
  declarations: [
    ClienteFormComponent,
    ClienteListComponent
  ],
  imports: [
    HttpClientModule,
    CompartidoModule,
    ClientesRoutingModule
  ],
  providers: [
    ClientesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,  //para interceptar las peticiones HTTP y agregarle el Token que tenemos en el sessionStorage
      multi: true
    }
  ],
  exports: [
    ClienteFormComponent,
    ClienteListComponent
  ]
})
export class ClientesModule { }
