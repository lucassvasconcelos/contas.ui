import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { CategoriaModel } from "../models/categoria-model";
import { CriarCategoriaCommand } from "./commands/categorias/criar-categoria-command";
import { AtualizarCategoriaCommand } from "./commands/categorias/atualizar-categoria-command";
import { DeletarCategoriaCommand } from "./commands/categorias/deletar-categoria-command";
import { CategoriaPorIdQuery } from "./queries/categorias/categoria-query";
import { CategoriasQuery } from "./queries/categorias/categorias-query";

@Injectable({ providedIn: 'root' })
export class CategoriaService {
    public constructor(private http: HttpClient) { }

    public criar(cmd: CriarCategoriaCommand): Observable<CategoriaModel> {
        return this.http.post<CategoriaModel>(`${environment.serviceUrl}/categorias`, cmd);
    };

    public atualizar(cmd: AtualizarCategoriaCommand): Observable<CategoriaModel> {
        return this.http.put<CategoriaModel>(`${environment.serviceUrl}/categorias`, cmd);
    };

    public deletar(cmd: DeletarCategoriaCommand): Observable<any> {
        return this.http.delete(`${environment.serviceUrl}/categorias/${cmd.id}`);
    };

    public obterPorId(qry: CategoriaPorIdQuery): Observable<CategoriaModel> {
        return this.http.get<CategoriaModel>(`${environment.serviceUrl}/categorias/${qry.id}`);
    };

    public obterTodas(qry: CategoriasQuery): Observable<CategoriaModel[]> {
        return this.http.get<CategoriaModel[]>(`${environment.serviceUrl}/categorias`);
    };
}