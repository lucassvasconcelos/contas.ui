import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LegendPosition } from '@swimlane/ngx-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { GraficosModel } from 'src/app/models/relatorios/graficos-model';
import { TotalizadoresModel } from 'src/app/models/relatorios/totalizadores-model';
import { TotalizadoresQuery } from 'src/app/services/queries/relatorios/totalizadores-query';
import { RelatorioService } from 'src/app/services/relatorio.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {
  public totalizadores!: TotalizadoresModel;
  public relatorioForm!: FormGroup;

  public dadosValorTotalPorCategoria: GraficosModel[] = [];
  public legendPosition = LegendPosition;

  private mesSelecionado: number = 0;
  private anoSelecionado: number = 0;

  public constructor(
    private formBuilder: FormBuilder,
    private relatorioService: RelatorioService,
    private spinner: NgxSpinnerService
  ) { }

  public ngOnInit(): void {
    const dataAtual = new Date();
    this.mesSelecionado = dataAtual.getMonth() + 1;
    this.anoSelecionado = dataAtual.getFullYear();

    this.relatorioForm = this.formBuilder.group({
      data: { ano: this.anoSelecionado, mes: this.mesSelecionado }
    });

    this.init(this.mesSelecionado, this.anoSelecionado);
  }

  private async init(mes: number, ano: number): Promise<void> {
    this.spinner.show();

    await this.obterDados(mes, ano).then(() => {
      this.spinner.hide();
    });
  }

  private async obterDados(mes: number, ano: number): Promise<any> {
    return Promise.all([
      this.relatorioService.obterTotalizadores(new TotalizadoresQuery(mes, ano)).toPromise()
        .then((response) => {
          this.totalizadores = TotalizadoresModel.toModel(response);
        }),
      this.relatorioService.obterValorTotalPorCategoria(new TotalizadoresQuery(mes, ano)).toPromise()
        .then((response) => {
          this.dadosValorTotalPorCategoria = response;
        })
    ]);
  }

  public atualizarRelatorios(): void {
    const formValue = this.relatorioForm.value;
    this.init(formValue.data.mes, formValue.data.ano);
  }

}
