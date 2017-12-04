import { Restangular } from 'ngx-restangular';
import { Injectable } from '@angular/core';

@Injectable()
export class RelaysService {

  constructor(private restangular: Restangular) { }

  put(relay) {
    return this.restangular.one('relays').put(relay).toPromise();
  }

  getAll() {
    return this.restangular.one('relays').get().toPromise();
  }

}
