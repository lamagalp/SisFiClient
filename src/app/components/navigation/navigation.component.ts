import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  constructor(private _authService: AutenticacionService) { }

  ngOnInit(): void {

  }

  loggedIn():boolean{
    return this._authService.loggedIn();
  }
}
