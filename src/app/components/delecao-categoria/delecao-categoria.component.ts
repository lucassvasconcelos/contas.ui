import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoriaModel } from 'src/app/models/categoria-model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DeletarCategoriaCommand } from 'src/app/services/commands/categorias/deletar-categoria-command';

@Component({
  selector: 'app-delecao-categoria',
  templateUrl: './delecao-categoria.component.html',
  styleUrls: ['./delecao-categoria.component.scss']
})
export class DelecaoCategoriaComponent {
  @Input() public categoria?: CategoriaModel;
  @Output() public closeEvent: EventEmitter<any> = new EventEmitter();

  private toastr: ToastrService;
  private categoriaService: CategoriaService;

  public constructor(
    toastr: ToastrService,
    categoriaService: CategoriaService,
    private spinner: NgxSpinnerService
  ) {
    this.toastr = toastr;
    this.categoriaService = categoriaService;
  }

  public deletar(): void {
    const cmd = new DeletarCategoriaCommand(String(this.categoria?.id));

    this.spinner.show();
    this.categoriaService.deletar(cmd).subscribe((response) => {
      this.spinner.hide();
      this.toastr.info("Categoria deletada com sucesso");
      this.closeEvent.emit();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }
}
