import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { IUser } from './pages/users/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  mostartComponent = true
  authUser$: Observable<IUser | null>
  

  

  constructor(private authService: AuthService, private router: Router,) {
    this. authUser$ = this.authService.authUser$

  }

 

  logout(): void {
    this.authService.logout()
    this.router.navigate(['auth'])
  }

  isMobile(): boolean {
    return window.innerWidth <=280
  }

}
