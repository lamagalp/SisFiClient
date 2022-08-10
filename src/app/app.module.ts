import { AuthGuard } from './auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UsuarioLogueadoComponent } from './components/usuario-logueado/usuario-logueado.component';
import { CompartidoModule } from './compartido/compartido.module';
import { CommonModule } from '@angular/common';
import { TokenInterceptorService } from './login/services/token-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UsuarioLogueadoComponent,
    
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule, // sólo se importa en el AppModule
    HttpClientModule,
    CompartidoModule,
    NgbModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,  //para interceptar las peticiones HTTP y agregarle el Token que tenemos en el sessionStorage
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
