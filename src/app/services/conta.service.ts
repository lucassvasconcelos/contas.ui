import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { ContaModel } from "../models/conta-model";
import { AtualizarContaCommand } from "./commands/contas/atualizar-conta-command";
import { CriarContaCommand } from "./commands/contas/criar-conta-command";
import { DeletarContaCommand } from "./commands/contas/deletar-conta-command";
import { ContaPorIdQuery } from "./queries/contas/conta-query";
import { ContasQuery } from "./queries/contas/contas-query";

@Injectable({ providedIn: 'root' })
export class ContaService {
    public constructor(private http: HttpClient) { }

    public criar(cmd: CriarContaCommand): Observable<ContaModel> {
        return this.http.post<ContaModel>(`${environment.serviceUrl}/contas`, cmd);
    };

    public atualizar(cmd: AtualizarContaCommand): Observable<ContaModel> {
        return this.http.put<ContaModel>(`${environment.serviceUrl}/contas`, cmd);
    };

    public deletar(cmd: DeletarContaCommand): Observable<any> {
        return this.http.delete(`${environment.serviceUrl}/contas/${cmd.id}`);
    };

    public obterPorId(qry: ContaPorIdQuery): Observable<ContaModel> {
        return this.http.get<ContaModel>(`${environment.serviceUrl}/contas/${qry.id}`);
    };

    public obterTodas(qry: ContasQuery): Observable<ContaModel[]> {
        return this.http.get<ContaModel[]>(`${environment.serviceUrl}/contas`);
    };
}