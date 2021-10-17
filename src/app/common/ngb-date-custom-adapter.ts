import { Injectable } from "@angular/core";
import { NgbDateAdapter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable({ providedIn: 'root' })
export class NgbDateCustomAdapter extends NgbDateAdapter<string> {
    private readonly DELIMITER = '-';

    public fromModel(value: string | null): NgbDateStruct | null {
        if (!value) return null;

        const date = value.split(this.DELIMITER);

        return {
            day: +date[2],
            month: +date[1],
            year: +date[0]
        };
    }

    public toModel(date: NgbDateStruct | null): string | null {
        return date ? `${date.year}${this.DELIMITER}${(date.month < 10 ? '0' : '')}${date.month}${this.DELIMITER}${(date.day < 10 ? '0' : '')}${date.day}` : null;
    }
}