import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { DetailComponent } from './features/detail/detail.component';
import { LibraryComponent } from './features/library/library.component';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
    //{ path: '', component: HomeComponent },
    { path: 'detail/:id', loadComponent: () => import('./features/detail/detail.component').then(m => m.DetailComponent) },
    { path: 'library', loadComponent: () => import('./features/library/library.component').then(m => m.LibraryComponent) },
    { path: '**', redirectTo: '' }
];
