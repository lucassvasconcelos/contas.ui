import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

interface IData {
  mes: number;
  ano: number;
}
@Component({
  selector: 'app-month-datepicker',
  templateUrl: './month-datepicker.component.html',
  styleUrls: ['./month-datepicker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MonthDatePickerComponent),
    multi: true
  }]
})
export class MonthDatePickerComponent implements ControlValueAccessor {
  @Input() public disabled = false;
  @Input() public mascara = "mm/yyyy";

  @ViewChild('calendarPanel') public calendar!: NgbDropdown;

  public readonly meses: string[] = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

  public data!: IData;
  public dataTxt!: string;
  public somenteAnos: boolean = false;
  public incr: number = 0;
  public faCalendar: any = faCalendar;

  private separador: string;
  private mesAntesDoAno: boolean;
  private indexSeparador: number;

  public constructor() {
    this.separador = this.mascara.replace(/m|y|M/gi, "");
    this.mesAntesDoAno = this.mascara.indexOf('y') > 0;
    this.indexSeparador = this.mascara.indexOf(this.separador);
  }

  public change(value: string) {
    value = this.separador == " " ? value.replace(/\.|-|\//, " ") :
      this.separador == "/" ? value.replace(/\.|-| /, "/") :
        this.separador == "-" ? value.replace(/\.| |\//, "-") :
          value.replace(/.| |\/ /, "-");

    const lastchar = value.substr(value.length - 1);

    if (lastchar == this.separador && value.length <= this.indexSeparador) {
      if (this.mesAntesDoAno) {
        value = "0" + value;
      }
    }

    if (value.length > this.indexSeparador && value.indexOf(this.separador) < 0) {
      value = value.substr(0, value.length - 1) + this.separador + lastchar;
    }

    this.dataTxt = value;
    const items = value.split(this.separador);

    if (items.length == 2) {
      const ano = this.mesAntesDoAno ? items[1] : items[0];
      const mes = this.mesAntesDoAno ? items[0] : items[1];

      let imes = this.meses.indexOf(mes);
      if ((imes) < 0)
        imes = parseInt(mes);
      else
        imes = imes + 1;

      let iano = parseInt(ano);

      if (iano < 100)
        iano = iano + 2000;

      this.data = { ano: iano, mes: imes };
      this.incr = this.getIncr(this.data.ano);
    }

    this.writeValue(this.data);
  }

  public selecionar($event: any, index: number) {
    if (this.somenteAnos) {
      $event.stopPropagation();
      this.data.ano = index + this.incr;
      this.dataTxt = this.formatarData(this.data);
      this.somenteAnos = false;
      this.incr = this.getIncr(this.data.ano);
    }
    else {
      this.data.mes = index + 1;
      this.dataTxt = this.formatarData(this.data);
      this.calendar.close();
    }
  }

  public mostrarAnos($event: any) {
    $event.stopPropagation();
    this.somenteAnos = !this.somenteAnos;
  }

  public alterarAno($event: any, incr: number) {
    $event.stopPropagation();
    let ano = this.somenteAnos ? this.data.ano + 10 * incr : this.data.ano + incr;
    this.data.ano = ano;
    this.incr = this.getIncr(ano);
    this.dataTxt = this.formatarData(this.data);
  }

  public onTouched = () => { };

  public writeValue(data: IData): void {
    this.data = data;
    this.onChange(this.data)
  }

  public registerOnChange(fn: (data: IData) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private onChange = (data: IData) => {
    this.data = data;
    this.dataTxt = this.mesAntesDoAno ? "" + data.mes + this.separador + data.ano :
      "" + data.ano + this.separador + data.mes;
    this.incr = this.getIncr(this.data.ano);
  };

  private getIncr(ano: number): number {
    return (ano - ano % 10) - 1;
  }

  private formatarData(data: IData): string {
    const mes = data.mes < 10 ? "0" + data.mes : "" + data.mes;
    return this.mesAntesDoAno ? mes + this.separador + data.ano :
      "" + data.ano + this.separador + mes
  }
}
