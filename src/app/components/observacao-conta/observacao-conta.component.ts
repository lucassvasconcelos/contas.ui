import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContaModel } from 'src/app/models/conta-model';

@Component({
  selector: 'app-observacao-conta',
  templateUrl: './observacao-conta.component.html',
  styleUrls: ['./observacao-conta.component.scss']
})
export class ObservacaoContaComponent {
  @Input() public conta?: ContaModel;

  @Output() public closeEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  public close(): void {
    this.closeEvent.emit();
  }

}
