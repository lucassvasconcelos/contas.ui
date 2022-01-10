import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxCurrencyModule } from 'ngx-currency';

import { AppComponent } from './app.component';
import { NgbDateCustomAdapter } from './common/ngb-date-custom-adapter';
import { NgbDateCustomDateParserFormatter } from './common/ngb-date-custom-formatter';
import { MonthDatePickerComponent } from './components/month-datepicker/month-datepicker.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ContasComponent } from './pages/contas/contas.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';
import { CriacaoContaComponent } from './components/conta/conta.component';
import { DelecaoContaComponent } from './components/delecao-conta/delecao-conta.component';
import { CriacaoCategoriaComponent } from './components/categoria/categoria.component';
import { DelecaoCategoriaComponent } from './components/delecao-categoria/delecao-categoria.component';
import { ObservacaoContaComponent } from './components/observacao-conta/observacao-conta.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    SideNavComponent,
    ContasComponent,
    CategoriasComponent,
    RelatoriosComponent,
    CriacaoContaComponent,
    DelecaoContaComponent,
    CriacaoCategoriaComponent,
    DelecaoCategoriaComponent,
    MonthDatePickerComponent,
    ObservacaoContaComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxChartsModule,
    NgxSpinnerModule,
    NgxCurrencyModule
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateCustomAdapter },
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomDateParserFormatter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
