import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[] = [];
  error:any;
  constructor(private _clienteService: ClientesService) {
  }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  eliminarCliente(id: number){
    //console.log(id);
    this._clienteService.deleteCliente(id)
    .subscribe(
      resp => {
       // console.log(resp);
        this.obtenerClientes();
      }, err => {
        console.error(err);
        this.error = err;
      });
  }

  obtenerClientes(){
    //console.log(this.clientes);
    this._clienteService.getClientes().subscribe(
      res => {
        this.clientes = res;
        //console.log(this.clientes);
      },
      err => {
       // console.log(err);
        this.error = err
      });
  }

  trackByFn(index: number, item: any) {
    return item.id; // unique id corresponding to the item
  }

}
