import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SharedModule } from '../../../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { SaleEffects } from './store/sale.effects';
import {MatIconModule} from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { saleFeature } from './store/sale.reducer';


@NgModule({
  declarations: [
    SalesComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatIconModule,
    StoreModule.forFeature(saleFeature),
    EffectsModule.forFeature([SaleEffects])
  ]
})
export class SalesModule { }
