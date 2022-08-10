import { LoginRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';
import { SignInComponent } from './components/signin/signin.component';
import { SignOutComponent } from './components/signout/signout.component';
import { AutenticacionService } from './services/autenticacion.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { CompartidoModule } from '../compartido/compartido.module';



@NgModule({
  declarations: [
    SignInComponent,
    SignOutComponent
  ],
  imports: [
    HttpClientModule,
    CompartidoModule,
    LoginRoutingModule
  ],
  providers:[
    AutenticacionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,  //para interceptar las peticiones HTTP y agregarle el Token que tenemos en el sessionStorage
      multi: true
    }
  ],
  exports:[
    SignInComponent,
    SignOutComponent
  ]
})
export class LoginModule { }
