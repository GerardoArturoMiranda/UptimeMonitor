import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env} from 'src/environments/environment';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginButtonComponent,
    LogoutButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({...env.auth})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
