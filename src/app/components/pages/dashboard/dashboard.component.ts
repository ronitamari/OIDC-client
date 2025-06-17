import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl:  './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  user = { displayName: '', email: '', photo: '' };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        localStorage.setItem('jwt_token', token);

        const payload = this.parseJwt(token);
        console.log(payload);
        
        if (payload) {
          this.user = {
            displayName: payload.displayName,
            email: payload.email,
            photo: payload.photo
          };
        }
        
        this.router.navigate([], {
          queryParams: {},
          replaceUrl: true
        });
      }
    });
  }

  parseJwt(token: string): any | null {
    try {
      const base64Payload = token.split('.')[1];
      const payload = atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodeURIComponent(escape(payload)));
    } catch (e) {
      console.error('Invalid JWT:', e);
      return null;
    }
  }
}
