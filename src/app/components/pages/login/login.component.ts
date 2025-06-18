import { Component } from '@angular/core';
import appConfig from '../../../../../config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor() {}

  onSignIn() {
    window.location.href = `${appConfig.baseUrl}/auth/google`;
  }
}
