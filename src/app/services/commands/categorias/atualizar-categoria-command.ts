export class AtualizarCategoriaCommand {
    public id: string;
    public usuario: string;
    public nome: string;
    public descricao: string;
    public tipo: number;

    public constructor(
        id: string,
        usuario: string,
        nome: string,
        descricao: string,
        tipo: number
    ) {
        this.id = id;
        this.usuario = usuario;
        this.nome = nome;
        this.descricao = descricao;
        this.tipo = tipo;
    }
}