import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    userId: string;
    token: string;

    constructor(private restangular: Restangular) { }

    login(username: string, password: string) {
        return this.restangular.all('user').post({ username: username, password: password }).toPromise().then((user: any) => {
            if (user && user.token && user.userId) {
                this.userId = user.userId;
                this.token = user.token
            }
        });
    }

    logout() {
        this.userId = null;
        this.token = null;
    }
}