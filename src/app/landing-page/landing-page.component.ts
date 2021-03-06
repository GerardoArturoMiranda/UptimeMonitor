import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { LandingService } from './landing.service';
import { NgForm } from '@angular/forms';
import { User,Historial } from './models/tupla.model';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  profile: string = "";
  public url: string ="";
  public correo: string =""
  public direcciones : User[] = []
  public historial : Historial[] = []

  constructor(public auth: AuthService, private landService: LandingService) {
    this.auth.user$.subscribe((profile) => (this.profile = JSON.stringify(profile?.email, null, 2)))
   }


  createUrl(url:string,correo:string){
    this.url = url.toString()
    console.log(correo)
    this.correo = correo.toString()
    this.landService.createUrl(this.url,this.correo).subscribe(res => alert("Creado"))
    
  }

  getUrls(correo:string){
    this.correo = correo.toString()
    this.landService.findUrls(this.correo).subscribe(res => this.direcciones = res.response)
  }
 
  getHistory(url:string){
    this.landService.getHistory(url).subscribe(res => this.historial = res.response)
  }

  ngOnInit(): void {
    
  }

}
