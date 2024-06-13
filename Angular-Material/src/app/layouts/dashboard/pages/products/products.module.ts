import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from '../../../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from './products.service';
import { ProductsMockService } from './products-mock.service';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/product.effects';
import { StoreModule } from '@ngrx/store';
import { productFeature } from './store/product.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClaseDialogComponent } from './components/clase-dialog/clase-dialog.component';

export const API_URL = new InjectionToken('API_URL')
export const PRODUCTS = new InjectionToken('PRODUCTS')
export const RANDOM_NUMBER = new InjectionToken('RANDOM_NUMBER')
@NgModule({
  declarations: [
    ProductsComponent,
    ClaseDialogComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    ReactiveFormsModule,
    StoreModule.forFeature(productFeature),
    EffectsModule.forFeature([ProductEffects]),
  ],
  exports: [
    ProductsComponent
  ],
  providers:[
    //ProductsService
    {
      provide: ProductsService,
      useClass: ProductsService
    },
    {
      provide: API_URL,
      useValue: "http://localhost:5001/api"
    },
    {
      provide: RANDOM_NUMBER,
     useFactory: () => {
      return Math.random()
     }
    },
    {
      provide: PRODUCTS,
      useFactory: (productsService: ProductsService) => {
        return  productsService.getProducts()
      },
      deps:[ProductsService]
    }
  ]
})
export class ProductsModule { }
