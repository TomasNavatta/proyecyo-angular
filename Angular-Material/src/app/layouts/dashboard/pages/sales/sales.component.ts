import { Component, OnDestroy, OnInit } from '@angular/core';
import { SalesService } from './sales.service';
import { ISale, ISaleForm } from './models';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from '../products/products.service';
import { IClases } from '../products/models';
import { Store } from '@ngrx/store';
import { selectSaleList, selectLoadingSales, selectSalesError } from './store/sale.selectors';
import { SaleActions } from './store/sale.actions';
import { Observable, Subscription, first } from 'rxjs';
import { IUser } from '../users/models';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent implements OnInit {


  clases: IClases [] = []
  users: IUser[] = [];


  existUnsavedChanges = false

  saleForm = new FormGroup<ISaleForm>({
    quantity: new FormControl(1),
    user: new FormControl(null),
    curso: new FormControl(null)

  })

  loadingSales$: Observable<boolean>
  error$: Observable<unknown>
  sales$: Observable<ISale[]>


  displayedColumns: string[] = ['id', 'curso', 'alumno', 'actions'];




  
  constructor(
    private salesService: SalesService,
    private productsService: ProductsService, 
    private usersService: UsersService,
    private store: Store) {
      this.loadingSales$ = this.store.select(selectLoadingSales)
      this.sales$ = this.store.select(selectSaleList)
      this.error$ = this.store.select(selectSalesError)

  }

  ngOnInit(): void {
   this.loadSales()
   this.loadproducts()
   this.loadUsers()
   this.suscribeToSaleFormChanges()
  }

 

  suscribeToSaleFormChanges(): void {
    this.saleForm.valueChanges.subscribe({
      next: (v) => {
        console.log(v)
        this.existUnsavedChanges = true
      }
    })
  }

  createSale() {
    this.salesService.createSales(this.saleForm.value).subscribe({
      next: (sales) => {},
      error: () => {},
      complete: () => {}
    })
  }

  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users
      }
    })
  }

  loadproducts() {
    this.productsService.getProducts().subscribe({
      next: (v) => (this.clases = v)
    })
  }

  loadSales() {
    this.store.dispatch(SaleActions.loadSales())
   }

}
