import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { TotalizadoresModel } from "../models/relatorios/totalizadores-model";
import { TotalizadoresQuery } from "./queries/relatorios/totalizadores-query";

@Injectable({ providedIn: 'root' })
export class RelatorioService {
    public constructor(private http: HttpClient) { }

    public obterTotalizadores(qry: TotalizadoresQuery): Observable<TotalizadoresModel> {
        return this.http.get<TotalizadoresModel>(`${environment.serviceUrl}/relatorios/totalizadores?mes=${qry.mes}&ano=${qry.ano}`);
    };
}