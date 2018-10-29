import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpLoginService } from './http-login.service';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    ...MaterialModule.imports,
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  providers: [
    { provide: LoginService, useClass: HttpLoginService}
  ]
})
export class LoginModule { }
