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
            console.log(res);
            this.usuarioLogueado = res;
          }, err =>{
            console.error(err);
            this.error = err;
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
        console.log(resp);
        resp.baja = new Date();
        resp.idUsuario = this.usuarioLogueado.id;

        this._hojasService.updateHojaCaja(id, resp)
        .subscribe(
          respuesta => {
            //console.log(respuesta);
            this.obtenerHojas();
          }, er => {
            console.error(er);
            this.error = er;
          });
      },
      err => {
        console.error(err);
        this.error = err;
      }
    );
  }


  obtenerHojas(){
    console.log(this.hojas);
    this._hojasService.getHojasCaja().subscribe(
      res => {
        this.hojas = res;
      },
      err => {
        console.log(err);
        this.error = err
      });
  }

  trackByFn(index: number, item: any) {
    return item.id; // unique id corresponding to the item
  }
}
