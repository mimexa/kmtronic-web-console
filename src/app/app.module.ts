import { RelaysService } from './services/relays.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ConsoleComponent } from './components/console/console.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/auth.service';
import { UiSwitchModule } from 'angular2-ui-switch';
import { RestangularModule, Restangular, } from 'ngx-restangular';

const appRoutes: Routes = [
  { path: '', component: ConsoleComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

export function RestangularConfigFactory(RestangularProvider) {
  RestangularProvider.setBaseUrl('https://vps487474.ovh.net:65443');
  RestangularProvider.addResponseInterceptor((data, operation, what, url, response) => {
    if (what === 'login' && response.status == 200) {
      let bearerToken = response.headers.get('authorization');
      RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
        return {
          headers: Object.assign({}, headers, { Authorization: `Bearer ${bearerToken}` })
        };
      });
      return { token: bearerToken };
    }
    return data;
  });
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
    ReactiveFormsModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    RouterModule.forRoot(appRoutes),
    UiSwitchModule
  ],
  providers: [AuthenticationService, AuthGuard, RelaysService],
  bootstrap: [AppComponent]
})
export class AppModule { }
