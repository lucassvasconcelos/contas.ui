import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  private mesSelecionado: number = 0;
  private anoSelecionado: number = 0;

  public constructor(
    private formBuilder: FormBuilder,
    private relatorioService: RelatorioService
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

  public init(mes: number, ano: number): void {
    this.relatorioService.obterTotalizadores(new TotalizadoresQuery(mes, ano)).subscribe((response) => {
      this.totalizadores = TotalizadoresModel.toModel(response);
    });
  }

  public atualizarRelatorios(): void {
    const formValue = this.relatorioForm.value;
    this.init(formValue.data.mes, formValue.data.ano);
  }

}
