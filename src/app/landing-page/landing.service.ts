import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  private url= "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  findUrls(mail:String){
    let getUrl = this.url+"urls/"+mail
    return this.http.get(getUrl)
  }

  createUrl(url:String, mail:String){
    console.log(url)
    console.log(mail)
    let postUrl = this.url+"urls"
    return this.http.post(postUrl,{
      "direccionUrl":url,
      "idUsuario":mail
    })
  }

  getHistory(idUrl:String){
    let getUrl = this.url+"historial/"+idUrl
    return this.http.get(getUrl)
  }
    
  

}
