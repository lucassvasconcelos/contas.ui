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

  public constructor(
    private formBuilder: FormBuilder,
    private relatorioService: RelatorioService
  ) { }

  public ngOnInit(): void {
    this.init();

    const dataAtual = new Date();

    this.relatorioForm = this.formBuilder.group({
      data: { ano: dataAtual.getFullYear(), mes: (dataAtual.getMonth() + 1) }
    });
  }

  public init(): void {
    this.relatorioService.obterTotalizadores(new TotalizadoresQuery()).subscribe((response) => {
      this.totalizadores = TotalizadoresModel.toModel(response);
    });
  }

}
