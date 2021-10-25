import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { GraficosModel } from "../models/relatorios/graficos-model";
import { TotalizadoresModel } from "../models/relatorios/totalizadores-model";

import { TotalizadoresQuery } from "./queries/relatorios/totalizadores-query";
import { ValorTotalPorCategoriaQuery } from "./queries/relatorios/valor-total-por-categoria-query";

@Injectable({ providedIn: 'root' })
export class RelatorioService {
    public constructor(private http: HttpClient) { }

    public obterTotalizadores(qry: TotalizadoresQuery): Observable<TotalizadoresModel> {
        return this.http.get<TotalizadoresModel>(`${environment.serviceUrl}/relatorios/totalizadores?mes=${qry.mes}&ano=${qry.ano}`);
    };

    public obterValorTotalPorCategoria(qry: ValorTotalPorCategoriaQuery): Observable<GraficosModel[]> {
        return this.http.get<GraficosModel[]>(`${environment.serviceUrl}/relatorios/valor-total-por-categoria?mes=${qry.mes}&ano=${qry.ano}`);
    };
}