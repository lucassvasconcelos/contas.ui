import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContaModel } from 'src/app/models/conta-model';
import { DeletarContaCommand } from 'src/app/services/commands/contas/deletar-conta-command';
import { ContaService } from 'src/app/services/conta.service';

@Component({
  selector: 'app-delecao-conta',
  templateUrl: './delecao-conta.component.html',
  styleUrls: ['./delecao-conta.component.scss']
})
export class DelecaoContaComponent {
  @Input() public conta?: ContaModel;

  @Output() public closeEvent: EventEmitter<any> = new EventEmitter();

  private toastr: ToastrService;
  private contaService: ContaService;

  public constructor(
    toastr: ToastrService,
    contaService: ContaService,
    private spinner: NgxSpinnerService
  ) {
    this.toastr = toastr;
    this.contaService = contaService;
  }

  public deletar(): void {
    const cmd = new DeletarContaCommand(String(this.conta?.id));

    this.spinner.show();
    this.contaService.deletar(cmd).subscribe((response) => {
      this.spinner.hide();
      this.toastr.info("Conta deletada com sucesso");
      this.closeEvent.emit();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }
}