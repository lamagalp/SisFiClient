import { AutenticacionService } from 'src/app/login/services/autenticacion.service';
import { Component, OnInit } from '@angular/core';
import { HojasCajaService } from '../../../services/hojas-caja.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';

@Component({
  selector: 'app-hoja-caja-list',
  templateUrl: './hoja-caja-list.component.html',
  styleUrls: ['./hoja-caja-list.component.css']
})
export class HojaCajaListComponent implements OnInit {

  usuarioLogueado:any;
  hojas: any[] = [];
  error:any;
  loading = false;

  constructor(private _hojasService: HojasCajaService, private _usuariosService: UsuariosService, private _autenticacionService: AutenticacionService) {
    if(this._autenticacionService.loggedIn()){
      let idUser = this._autenticacionService.getIdUser();
      if(idUser != null){
        this._usuariosService.getUsuario(idUser).subscribe(
          res =>{
            this.usuarioLogueado = res;
          }, err =>{       
            this.error = err.error.text;
          }
        )
      }
    }
  }

  ngOnInit(): void {
    this.obtenerHojas();
  }

  eliminarHoja(id: number){
    this.loading = true;
    this._hojasService.getHojaCaja(id).subscribe(
      resp => {

        if(resp.fiados.length > 0 || resp.ventas.length > 0 || resp.pagosPremio.length > 0 || resp.gastos.length > 0){
          this.error = 'No se puede dar de baja la Hoja porque contiene movimientos.';
          this.loading = false;
        } else {

          resp.baja = new Date();
          resp.idUsuario = this.usuarioLogueado.id;
  
          this._hojasService.updateHojaCaja(id, resp)
          .subscribe({
            next : (respuesta : any) => {
              //console.log(respuesta);
              this.loading = false;
              this.obtenerHojas();
            }, 
            error : (er) => {     
              console.log(er);    
              this.loading = false;    
              this.error = er.error.message;
            }
          });
        }        
      },
      err => {     
        this.error = err.error;
      }
    );
  }


  obtenerHojas(){
    this.loading = true;
    //console.log(this.hojas);
    this._hojasService.getHojasCaja().subscribe({
      next: (res) => { this.hojas = res; },
      error: (err) => { this.error = err.error;},
      complete: () => {this.loading = false;}
    });
  }

  trackByFn(index: number, item: any) {
    return item.id; // unique id corresponding to the item
  }
  
}

