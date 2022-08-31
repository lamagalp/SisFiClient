import { VentasService } from './services/ventas.service';
import { PagosPremioService } from './services/pagos-premio.service';
import { FiadosService } from './services/fiados.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CompartidoModule } from './../compartido/compartido.module';

import { NgModule } from '@angular/core';
import { HojaCajaComponent } from './components/hojaCaja/hoja-caja/hoja-caja.component';
import { HojaCajaListComponent } from './components/hojaCaja/hoja-caja-list/hoja-caja-list.component';
import { HojaCajaFormComponent } from './components/hojaCaja/hoja-caja-form/hoja-caja-form.component';
import { HojasCajaService } from './services/hojas-caja.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../login/services/token-interceptor.service';
import { CajaRoutingModule } from './caja-routing.module';
import { FiadoFormComponent } from './components/fiados/fiado-form/fiado-form.component';
import { VentaFormComponent } from './components/ventas/venta-form/venta-form.component';
import { PagoPremioFormComponent } from './components/pagosPremio/pago-premio-form/pago-premio-form.component';
import { GastoFormComponent } from './components/gastos/gasto-form/gasto-form.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ArqueoCajaComponent } from './components/arqueo-caja/arqueo-caja.component';


@NgModule({
  declarations: [
    HojaCajaFormComponent,
    HojaCajaListComponent,
    HojaCajaComponent,
    FiadoFormComponent,
    VentaFormComponent,
    PagoPremioFormComponent,
    GastoFormComponent,
    ArqueoCajaComponent
  ],
  imports: [
    HttpClientModule,
    CompartidoModule,
    CajaRoutingModule,
    NgbModalModule,
    NgSelectModule 
  ],
  providers: [
    HojasCajaService,
    FiadosService,
    PagosPremioService,
    VentasService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,  //para interceptar las peticiones HTTP y agregarle el Token que tenemos en el sessionStorage
      multi: true
    }
  ],
  exports: [
    HojaCajaFormComponent,
    HojaCajaListComponent,
    HojaCajaComponent
  ]
})
export class CajaModule { }
