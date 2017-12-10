import { Restangular } from 'ngx-restangular';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

    public userId: string;
    public token: string;

    constructor(private restangular: Restangular) { }

    login(username: string, password: string) {
        return this.restangular.all('login').post(
            {
                userName: username,
                password: password
            }
        ).toPromise().then(token => {
            this.userId = username;
            this.token = token.token;
        });
    }

    logout() {
        this.userId = null;
    }
}