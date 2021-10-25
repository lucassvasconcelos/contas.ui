export class GraficosModel {
    public name: string;
    public value: number;

    public constructor(
        name: string,
        value: number
    ) {
        this.name = name;
        this.value = value;
    }

    public static toModel(grafico: any): GraficosModel {
        return new GraficosModel(
            grafico.name,
            grafico.value
        );
    }
}