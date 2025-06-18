import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl:  './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  user = { displayName: '', email: '', photo: '' };
  pictureUrl!: Observable<string>;

  constructor(private route: ActivatedRoute, private router: Router, private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      console.log("token: " + token);
      
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

    this.dashboardService.getPicture().subscribe((res) => {
      this.pictureUrl = res.picture
    })
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
