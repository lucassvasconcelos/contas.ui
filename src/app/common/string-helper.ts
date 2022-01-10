export class StringHelper {
    public static getDateString(data: string): string {
        const date = new Date(data);
        const dia = date.getDate();
        const mes = date.getMonth();
        const ano = date.getFullYear();

        return `${ano}-${(mes + 1) < 10 ? '0' : ''}${mes + 1}-${dia < 10 ? '0' : ''}${dia}`;
    }

    public static isNullOrEmpty(text: string): boolean {
        return !text || text === null || text === '';
    }
}