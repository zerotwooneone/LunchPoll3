import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NominationsComponent } from './nominations/nominations.component';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'nominations/:urlParam', component: NominationsComponent },
    { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);