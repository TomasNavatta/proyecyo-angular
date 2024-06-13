import { Component, Inject, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { IClases } from './models';
import { API_URL, RANDOM_NUMBER, PRODUCTS } from './products.module';
import { AlertsService } from '../../../../core/services/alerts.service';
import { Store } from '@ngrx/store';
import { ProductActions } from './store/product.actions';
import { selectIsLoading, selectProducts, selectProductsError } from './store/product.selectors';
import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ClaseDialogComponent } from './components/clase-dialog/clase-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  displayedColumns = ['id', 'clase', 'horario', 'actions'];
  clases$: Observable<IClases[]>
  isLoading$: Observable<boolean>
  error$: Observable<Error>
  clases: IClases[] = []

  constructor(private productsService: ProductsService,private store: Store, private matDialog: MatDialog) {
    
    this.isLoading$ = this.store.select(selectIsLoading)
    this.clases$ = this.store.select(selectProducts)
    this.error$ = this.store.select(selectProductsError).pipe(map((err) => err as Error))
  
  }
  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  deleteProductById(id: number): void {
    this.store.dispatch(ProductActions.deleteProductById({id}))
  }

  createProduct(): void {
    this.store.dispatch(ProductActions.createProduct({ payload: {
      clase: 'Random product',
      horario: '10:00'
    }}))

  }


  openDialog(editingClase?: IClases): void {
    this.matDialog.open(ClaseDialogComponent, {
      data: editingClase,
    })
    .afterClosed()
    .subscribe({
      next: (result) => {
        if (result) {
          if(editingClase) {
            //actualizar el usuario en el array
            this.clases = this.clases.map((u) => u.id === editingClase.id ? {...u, ...result} : u)
          } else{
                      //logica de crear el usuario

            result.createdAt = new Date()

            this.productsService.createProduct(result).subscribe({
              next: (usuarioCreado) => {
                this.clases = [...this.clases, usuarioCreado]
              }
            })


          }

        }
      

      },
    })
  }
 

}
