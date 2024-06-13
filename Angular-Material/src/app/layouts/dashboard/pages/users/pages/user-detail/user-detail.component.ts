import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../users.service';
import { Observable, finalize } from 'rxjs';
import { IUser } from '../../models';
import { SalesService } from '../../../sales/sales.service';
import { ISale } from '../../../sales/models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  user$: Observable<IUser | undefined>

  loading = false

  compras$: Observable<ISale[]>
  constructor(private activatedRoute: ActivatedRoute,
     private router: Router, 
     private usersService: UsersService,
     private salesService: SalesService

  ) {
    this.loading = true
    this.compras$ = this.salesService.getSalesByUserId(this.activatedRoute.snapshot.params['id'])


    this.user$ = this.usersService.getUserById(this.activatedRoute.snapshot.params['id'])
      .pipe(
        finalize(() => {
        this.loading = false

    }))
  
   console.log(this.activatedRoute.snapshot.params['id']) 

  }
 

}