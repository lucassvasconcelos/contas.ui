import { CategoriaModel } from './categoria-model';

export class ContaModel {
    public id: string;
    public dataCriacao: Date;
    public dataUltimaAtualizacao: Date;
    public usuario: string;
    public nome: string;
    public data: Date;
    public valor: number;
    public parcelado: boolean;
    public numeroParcelas: number;
    public observacao: string;
    public idCategoria: string;
    public categoria?: CategoriaModel;

    public constructor(
        id: string,
        dataCriacao: Date,
        dataUltimaAtualizacao: Date,
        usuario: string,
        nome: string,
        data: Date,
        valor: number,
        parcelado: boolean,
        numeroParcelas: number,
        observacao: string,
        idCategoria: string,
        categoria?: CategoriaModel
    ) {
        this.id = id;
        this.dataCriacao = dataCriacao;
        this.dataUltimaAtualizacao = dataUltimaAtualizacao;
        this.usuario = usuario;
        this.nome = nome;
        this.data = data;
        this.valor = valor;
        this.parcelado = parcelado;
        this.numeroParcelas = numeroParcelas;
        this.observacao = observacao;
        this.idCategoria = idCategoria;
        this.categoria = categoria ?? categoria;
    }

    public static atribuirCategoria(conta: ContaModel, categorias: CategoriaModel[]): ContaModel {
        const [categoria] = categorias.filter((categoria) => categoria.id === conta.idCategoria);
        conta.categoria = categoria;
        return conta;
    }

    public static toModel(conta: any): ContaModel {
        return new ContaModel(
            conta.id,
            conta.dataCriacao,
            conta.dataUltimaAtualizacao,
            conta.usuario,
            conta.nome,
            conta.data,
            conta.valor,
            conta.parcelado,
            conta.numeroParcelas,
            conta.observacao,
            conta.idCategoria
        );
    }
}