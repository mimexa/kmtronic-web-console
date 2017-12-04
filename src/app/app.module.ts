import { RelaysService } from './services/relays.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ConsoleComponent } from './components/console/console.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/guard.service';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './services/auth.service';
import { UiSwitchModule } from 'angular2-ui-switch';
import { RestangularModule } from 'ngx-restangular';

const appRoutes: Routes = [
  { path: '', component: ConsoleComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

export function RestangularConfigFactory(RestangularProvider) {
  // RestangularProvider.setBaseUrl('http://vps487474.ovh.net:65000');
  RestangularProvider.setBaseUrl('http://localhost:8080');
  // RestangularProvider.setDefaultHeaders({ 'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1' });
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConsoleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    RouterModule.forRoot(appRoutes),
    UiSwitchModule
  ],
  providers: [AuthenticationService, AuthGuard, RelaysService],
  bootstrap: [AppComponent]
})
export class AppModule { }
