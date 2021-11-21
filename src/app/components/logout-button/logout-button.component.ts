import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent implements OnInit {
  constructor(private auth: AuthService) { } 

  ngOnInit(): void {
  }

  logout():void{
    this.auth.logout();
  }
}
