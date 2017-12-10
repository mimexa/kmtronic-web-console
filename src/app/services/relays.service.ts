import { AuthenticationService } from './auth.service';
import { Restangular } from 'ngx-restangular';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class RelaysService {

  constructor(private restangular: Restangular, private authenticationService: AuthenticationService) { }

  postDescription(relay) {
    return this.restangular.all('relays/' + relay.id + '/description').post({ value: relay.descriptionInput }).toPromise();
  }


  postIsOn(relay) {
    return this.restangular.all('relays/' + relay.id + '/isOn').post({ value: !relay.isOn }).toPromise();
  }

  getAll() {
    return this.restangular.one('relays').get().toPromise();
  }

  getSettings() {
    return this.restangular.one('settings').get().toPromise();
  }


}
