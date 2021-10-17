export class AtualizarContaCommand {
    public id: string;
    public usuario: string;
    public nome: string;
    public data: Date;
    public valor: number;
    public parcelado: boolean;
    public numeroParcelas: number;
    public observacao: string;
    public categoria: string;

    public constructor(
        id: string,
        usuario: string,
        nome: string,
        data: Date,
        valor: number,
        parcelado: boolean,
        numeroParcelas: number,
        observacao: string,
        categoria: string
    ) {
        this.id = id;
        this.usuario = usuario;
        this.nome = nome;
        this.data = data;
        this.valor = valor;
        this.parcelado = parcelado;
        this.numeroParcelas = numeroParcelas;
        this.observacao = observacao;
        this.categoria = categoria;
    }
}