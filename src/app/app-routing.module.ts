import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ContasComponent } from './pages/contas/contas.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';

const routes: Routes = [
  { path: '', redirectTo: 'relatorios', pathMatch: 'full' },
  { path: 'relatorios', component: RelatoriosComponent },
  { path: 'contas', component: ContasComponent },
  { path: 'categorias', component: CategoriasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'ignore', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
