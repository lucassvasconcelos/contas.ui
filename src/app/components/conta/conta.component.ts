import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomAdapter } from 'src/app/common/ngb-date-custom-adapter';
import { StringHelper } from 'src/app/common/string-helper';
import { CategoriaModel } from 'src/app/models/categoria-model';
import { ContaModel } from 'src/app/models/conta-model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { AtualizarContaCommand } from 'src/app/services/commands/contas/atualizar-conta-command';
import { CriarContaCommand } from 'src/app/services/commands/contas/criar-conta-command';
import { ContaService } from 'src/app/services/conta.service';
import { CategoriasQuery } from 'src/app/services/queries/categorias/categorias-query';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class CriacaoContaComponent implements OnInit {
  @Input() public conta?: ContaModel;
  @Output() public closeEvent: EventEmitter<any> = new EventEmitter();

  public categorias: CategoriaModel[] = [];
  public errosValidacao: string[] = [];
  public contaFormGroup: FormGroup;
  public faCalendar: any = faCalendar;
  public isUpdate = false;

  public constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private ngbDateCustomAdapter: NgbDateCustomAdapter,
    private contaService: ContaService,
    private categoriaService: CategoriaService
  ) {
    this.contaFormGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      data: ['', Validators.required],
      valor: ['', Validators.required],
      parcelado: [false, Validators.required],
      numeroParcelas: [''],
      idCategoria: ['', Validators.required],
      observacao: ['']
    });

    this.contaFormGroup.get('parcelado')?.valueChanges.subscribe((value) => {
      const campoNumeroParcelas = this.contaFormGroup.controls['numeroParcelas'];
      if (value) {
        campoNumeroParcelas.setValidators([Validators.required]);
      } else {
        campoNumeroParcelas.clearValidators();
        campoNumeroParcelas.reset();
      }
    });
  }

  public ngOnInit(): void {
    this.isUpdate = this.conta ? true : false;

    this.obterCategorias();

    if (this.isUpdate) {
      this.contaFormGroup.patchValue({
        nome: this.conta?.nome,
        data: this.parseDate(String(this.conta?.data)),
        valor: this.conta?.valor,
        parcelado: this.conta?.parcelado,
        numeroParcelas: this.conta?.numeroParcelas === 0 ? '' : this.conta?.numeroParcelas,
        idCategoria: this.conta?.idCategoria,
        observacao: this.conta?.observacao
      });
    }
  }
  public obterCategorias(): void {
    var query = new CategoriasQuery();

    this.categoriaService.obterTodas(query).subscribe((response) => {
      this.categorias = response;
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }

  public salvar(): void {
    this.isUpdate ? this.atualizar() : this.cadastrar();
  }

  private cadastrar(): void {
    if (this.contaFormGroup.valid) {
      const c: ContaModel = Object.assign({}, this.conta, this.contaFormGroup.value);
      const cmd = new CriarContaCommand(environment.fakeUser.id, c.nome, c.data, +c.valor, c.parcelado, +c.numeroParcelas, c.observacao, c.idCategoria);

      this.contaService.criar(cmd).subscribe((response) => {
        this.toastr.info(`Conta ${response.nome} criada com sucesso!`)
        this.closeEvent.emit();
      });
    }
  }

  private atualizar(): void {
    if (this.contaFormGroup.valid) {
      const c: ContaModel = Object.assign({}, this.conta, this.contaFormGroup.value);
      const cmd = new AtualizarContaCommand(String(this.conta?.id), environment.fakeUser.id, c.nome, c.data, +c.valor, c.parcelado, +c.numeroParcelas, c.observacao, c.idCategoria);

      this.contaService.atualizar(cmd).subscribe((response) => {
        this.toastr.info(`Conta ${response.nome} atualizada com sucesso!`)
        this.closeEvent.emit();
      });
    }
  }

  private parseDate(date: string): string {
    const cleanedDate = StringHelper.getDateString(date);
    const dateObject = this.ngbDateCustomAdapter.fromModel(cleanedDate);
    return String(this.ngbDateCustomAdapter.toModel(dateObject));
  }
}