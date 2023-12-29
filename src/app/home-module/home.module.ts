import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RegistrosComponent } from '../registros/registros.component';
import { EnvioComponent } from '../registros/envio/envio.component';
import { ConsultaComponent } from '../registros/consulta/consulta.component';
import { BalancoMensalComponent } from '../registros/balanco-mensal/balanco-mensal.component';


import { HomeRoutingModule } from './home-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  declarations: [
    RegistrosComponent,
    EnvioComponent,
    ConsultaComponent,
    BalancoMensalComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatTableModule,
    MatDividerModule,
    MatDatepickerModule
  ]
})
export class HomeModule { }
