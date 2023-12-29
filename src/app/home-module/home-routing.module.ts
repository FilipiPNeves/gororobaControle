import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrosComponent } from '../registros/registros.component';
import { EnvioComponent } from '../registros/envio/envio.component';
import { ConsultaComponent } from '../registros/consulta/consulta.component';
import { BalancoMensalComponent } from '../registros/balanco-mensal/balanco-mensal.component';


const routes: Routes = [
  { path: '', component: RegistrosComponent, children: [
    { path: '', redirectTo: 'envio', pathMatch: 'full' },
    { path: 'envio', component: EnvioComponent},
    { path: 'consulta', component: ConsultaComponent},
    { path: 'balancoMensal', component: BalancoMensalComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
