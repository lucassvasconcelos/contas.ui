export class CategoriaModel {
    public id: string;
    public dataCriacao: Date;
    public dataUltimaAtualizacao: Date;
    public usuario: string;
    public nome: string;
    public descricao: string;
    public tipo: number;

    public constructor(
        id: string,
        dataCriacao: Date,
        dataUltimaAtualizacao: Date,
        usuario: string,
        nome: string,
        descricao: string,
        tipo: number
    ) {
        this.id = id;
        this.dataCriacao = dataCriacao;
        this.dataUltimaAtualizacao = dataUltimaAtualizacao;
        this.usuario = usuario;
        this.nome = nome;
        this.descricao = descricao;
        this.tipo = tipo;
    }

    public static toModel(categoria: any): CategoriaModel {
        return new CategoriaModel(
            categoria.id,
            categoria.dataCriacao,
            categoria.dataUltimaAtualizacao,
            categoria.usuario,
            categoria.nome,
            categoria.descricao,
            categoria.tipo
        );
    }
}