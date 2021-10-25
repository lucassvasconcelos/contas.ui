export class TotalizadoresModel {
    public totalReceitas: number;
    public totalDespesas: number;
    public total: number;

    public constructor(
        totalReceitas: number,
        totalDespesas: number
    ) {
        this.totalReceitas = totalReceitas;
        this.totalDespesas = totalDespesas;
        this.total = this.totalReceitas - this.totalDespesas;
    }

    public static toModel(totalizadores: any): TotalizadoresModel {
        return new TotalizadoresModel(
            totalizadores.totalReceitas,
            totalizadores.totalDespesas
        );
    }
}