export class CriarCategoriaCommand {
    public usuario: string;
    public nome: string;
    public descricao: string;
    public tipo: number;

    public constructor(
        usuario: string,
        nome: string,
        descricao: string,
        tipo: number
    ) {
        this.usuario = usuario;
        this.nome = nome;
        this.descricao = descricao;
        this.tipo = tipo;
    }
}