import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable({ providedIn: 'root' })
export class NgbDateCustomDateParserFormatter extends NgbDateParserFormatter {
    private readonly DELIMITER = '/';

    public parse(value: string): NgbDateStruct | null {
        if (!value) return null;

        const date = value.split(this.DELIMITER);

        return {
            day: +date[0],
            month: +date[1],
            year: +date[2]
        };
    }

    public format(date: NgbDateStruct | null): string {
        return date ? `${(date.day < 10 ? '0' : '')}${date.day}${this.DELIMITER}${(date.month < 10 ? '0' : '')}${date.month}${this.DELIMITER}${date.year}` : '';
    }
}