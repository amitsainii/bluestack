import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http'; 
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations:[
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  exports:[
    MatDatepickerModule,
    MatFormFieldModule,
    TranslateModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatSnackBarModule
  ],
  providers:[]
})
export class SharedModule { }

//Shared module is a great place to export commonly used stuff so that you dont need to import them in every module. Instead you can just import shared module
