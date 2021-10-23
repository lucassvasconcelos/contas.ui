import { Component, OnInit } from '@angular/core';
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

  public constructor(private relatorioService: RelatorioService) { }

  public ngOnInit(): void {
    this.init();
  }

  public init(): void {
    this.relatorioService.obterTotalizadores(new TotalizadoresQuery()).subscribe((response) => {
      this.totalizadores = TotalizadoresModel.toModel(response);
    });
  }

}
