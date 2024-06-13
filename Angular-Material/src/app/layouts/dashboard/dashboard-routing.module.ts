import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';
import { unsavedChangesGuard } from '../../core/guards/unsaved-changes.guard';

const routes: Routes = [
    
  {
    path: 'home',
    loadChildren: () =>import('./pages/home/home.module').then((m) => m.HomeModule)
  },
   {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
   },
   {
    path: 'users',
    canActivate: [adminGuard],
    loadChildren: () =>import('./pages/users/users.module').then((m) => m.UsersModule)
   },
   {
    path: 'cursos',
    loadChildren: () =>import('./pages/cursos/cursos.module').then((m) => m.CursosModule)
   },
   {
    path: 'inscripciones',
    canDeactivate: [unsavedChangesGuard],
    loadChildren: () =>import('./pages/sales/sales.module').then((m) => m.SalesModule)

   }
    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
