import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/login/services/autenticacion.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignOutComponent implements OnInit {

  constructor(private _autenticacionService: AutenticacionService, private _router: Router) { }

  ngOnInit(): void {
    this._autenticacionService.logOut();
    this._router.navigate(['/login/signin']);
  }

}
