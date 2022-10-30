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

  constructor(private _hojasService: HojasCajaService, private _usuariosService: UsuariosService, private _autenticacionService: AutenticacionService) {
    if(this._autenticacionService.loggedIn()){
      let idUser = this._autenticacionService.getIdUser();
      if(idUser != null){
        this._usuariosService.getUsuario(idUser).subscribe(
          res =>{
            this.usuarioLogueado = res;
          }, err =>{       
            this.error = err.error;
          }
        )
      }
    }
  }

  ngOnInit(): void {
    this.obtenerHojas();
  }

  eliminarHoja(id: number){
    
    this._hojasService.getHojaCaja(id).subscribe(
      resp => {

        if(resp.fiados.length > 0 || resp.ventas.length > 0 || resp.pagosPremio.length > 0 || resp.gastos.length > 0){
          this.error = {text: 'No se puede dar de baja la Hoja porque contiene movimientos.'};
         
        } else {

          resp.baja = new Date();
          resp.idUsuario = this.usuarioLogueado.id;
  
          this._hojasService.updateHojaCaja(id, resp)
          .subscribe({
            next : (respuesta : any) => {
              //console.log(respuesta);
              this.obtenerHojas();
            }, 
            error : (er) => {             
              this.error = er.error;
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
    //console.log(this.hojas);
    this._hojasService.getHojasCaja().subscribe(
      res => {
        this.hojas = res;
      },
      err => {        
        this.error = err.error;
      });
  }

  trackByFn(index: number, item: any) {
    return item.id; // unique id corresponding to the item
  }
}
