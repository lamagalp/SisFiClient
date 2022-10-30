import { Cliente } from '../../models/cliente';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service'
import { Router, ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
  providers:[CurrencyPipe]
})
export class ClienteFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  public editar = false;
  error:any;

  public cliente: Cliente ={
    id:0,
    apellido:'',
    nombre:'',
    saldo:0,
    direccion:'',
    imagen:'',
    modificado: new Date()
  };

  constructor(private _clientesService: ClientesService, private _activatedRoute: ActivatedRoute, private _route:Router) { }

  ngOnInit(): void {

    const params = this._activatedRoute.snapshot.params;
    if(params?.id){
      this._clientesService.getCliente(params.id).subscribe(
        resp => {
          this.editar = true;
          this.cliente = resp;
        }, err => {
          console.error(err);
          this.error = err.error;
        }
      )
    }

  }

  agregarCliente(){

    // borro estos campos porque los carga automáticamente mySQL
    delete this.cliente.modificado;
    delete this.cliente.id;

    //console.log(this.cliente);
    this._clientesService.addCliente(this.cliente)
    .subscribe(
      resp => {
        //console.log(resp);
        this._route.navigate(['/clientes']);

      }, err => {
       // console.error(err);
        this.error = err.error;
      }
    )

  }

  guardarCliente(idCliente: number){

    //console.log(this.cliente);
    this._clientesService.updateCliente(idCliente , this.cliente)
    .subscribe(
      resp => {
      //  console.log(resp);
        this._route.navigate(['/clientes']);
      }, err => {
       // console.error(err);
        this.error = err.error;
      }
    )
  }


}
