import { Component, OnInit } from '@angular/core';
import { HojaCaja } from '../../../models/hojaCaja';
import { HojasCajaService } from '../../../services/hojas-caja.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';

@Component({
  selector: 'app-hoja-caja-form',
  templateUrl: './hoja-caja-form.component.html',
  styleUrls: ['./hoja-caja-form.component.css']
})
export class HojaCajaFormComponent implements OnInit {

  public editar = false;
  error:any;
  usuarioLogueado:any ;
  ultimaHojaCaja: any = null;

  hojaCaja: HojaCaja ={
    id:0,
    fondoFijo:0 ,
    alta: new Date(),
    usuario: {
      id: 0,
      usuario: '',
      nombre: '',
      apellido: '',
      clave: '',
      idRol: 0
    },
    ventasOnline: 0,
    pagosOnline: 0,
    modificable: true

  };

  constructor(private _hojasCajaService: HojasCajaService, private _autenticacionService: AutenticacionService, private _usuariosService: UsuariosService, private _activatedRoute: ActivatedRoute, private _route:Router) {

    if(this._autenticacionService.loggedIn()){
      let idUser = this._autenticacionService.getIdUser();
      if(idUser != null){
        this._usuariosService.getUsuario(idUser).subscribe(
          res =>{
            //console.log(res);
            this.usuarioLogueado = res;
          }, err =>{
            console.error(err);
            this.error = err.error;
          }
        )
      }
    }
  }

  ngOnInit(): void {

    const params = this._activatedRoute.snapshot.params;
    if(params?.id){
      this._hojasCajaService.getHojaCaja(params.id).subscribe(
        resp => {
          this.editar = true;
          this.hojaCaja = resp;
        }, err => {
          //console.error(err);
          this.error = err.error;
        }
      )
    } else {

      this._hojasCajaService.getUltimaHojaCaja().subscribe({
        next: (resp : any) => {
          console.log(resp);
          this.ultimaHojaCaja = resp;
          this.hojaCaja.fondoFijo = this.ultimaHojaCaja.arqueo?.proximoFF || 0;
        },
        error : (err: any) => {
          this.hojaCaja.fondoFijo = 0;
          console.log(err);
          this.error = null;
        }
      });

    }

  }

  agregarHojaCaja(){

    // borro estos campos porque los carga automáticamente mySQL
    delete this.hojaCaja.alta;
    delete this.hojaCaja.id;

    this.hojaCaja.ventasOnline = 0.00;
    this.hojaCaja.pagosOnline = 0.00;

    if (this.usuarioLogueado){

      this.hojaCaja.usuario.id = this.usuarioLogueado.id;
      //console.log(this.hojaCaja);
      this._hojasCajaService.addHojaCaja(this.hojaCaja)
      .subscribe({
        next : (resp : any)=> {
          //console.log(resp);
          this._route.navigate(['/hojasCaja']);
        },
        error: (err) => {
          //console.error(err);
          this.error = err.error;
        }
      });
    }
  }

  guardarHojaCaja(idHojaCaja: number){

    //console.log(this.hojaCaja);

    this.hojaCaja.usuario = {
      id: this.usuarioLogueado.id,
      usuario: '',
      nombre: '',
      apellido: '',
      clave: '',
      idRol: 0
    }
    this._hojasCajaService.updateHojaCaja(idHojaCaja , this.hojaCaja)
    .subscribe(
      resp => {
        //console.log(resp);
        this._route.navigate(['/hojasCaja']);
      }, err => {
        //console.error(err);
        this.error = err.error;
      }
    )
  }

  getUsuario(idUsuario:number): any{
    this._usuariosService.getUsuario(idUsuario).subscribe(
      res =>{
        //console.log(res);
        return res.apellido + ', ' + res.nombre;
      }, err =>{
        this.error = err.error;
        return null;
      }
    )
  }


}
