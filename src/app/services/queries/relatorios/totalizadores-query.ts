export class TotalizadoresQuery {
    public mes: number;
    public ano: number;

    public constructor(
        mes: number,
        ano: number
    ) {
        this.mes = mes;
        this.ano = ano;
    }
}