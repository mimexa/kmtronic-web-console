import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  returnUrl: string;
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.message = '';
    this.authenticationService.login(this.username, this.password).then(data => {
      this.router.navigate(['/']);
    }).catch(() => {
      this.loading = false;
      this.password = '';
      this.message = 'Connexion failed';
    });
  }
}
