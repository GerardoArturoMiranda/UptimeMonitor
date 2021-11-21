import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  profile: string = "";
  constructor(public auth: AuthService) {
    this.auth.user$.subscribe((profile) => (this.profile = JSON.stringify(profile, null, 2)))
   }
 

  ngOnInit(): void {
   
  }

}
