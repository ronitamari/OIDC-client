import { Component } from '@angular/core';
import { Router } from '@angular/router';
import appConfig from '../../../../config';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent {
  [x: string]: any;
  constructor(private router: Router) {}

  onLogout() {
    localStorage.removeItem("jwt_token");
        window.location.href = `${appConfig.baseUrl}/auth/logout`;
  }
}
