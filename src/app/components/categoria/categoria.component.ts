import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoriaModel } from 'src/app/models/categoria-model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { AtualizarCategoriaCommand } from 'src/app/services/commands/categorias/atualizar-categoria-command';
import { CriarCategoriaCommand } from 'src/app/services/commands/categorias/criar-categoria-command';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CriacaoCategoriaComponent implements OnInit {
  @Input() public categoria?: CategoriaModel;
  @Output() public closeEvent: EventEmitter<any> = new EventEmitter();

  public errosValidacao: string[] = [];
  public categoriaFormGroup: FormGroup;
  public isUpdate = false;

  public constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private categoriaService: CategoriaService
  ) {
    this.categoriaFormGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: [''],
      tipo: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    this.isUpdate = this.categoria ? true : false;

    if (this.isUpdate) {
      this.categoriaFormGroup.patchValue({
        nome: this.categoria?.nome,
        descricao: this.categoria?.descricao,
        tipo: this.categoria?.tipo
      });
    }
  }

  public close(): void {
    this.closeEvent.emit();
  }

  public salvar(): void {
    this.isUpdate ? this.atualizar() : this.cadastrar();
  }

  private cadastrar(): void {
    if (this.categoriaFormGroup.valid) {
      const c: CategoriaModel = Object.assign({}, this.categoria, this.categoriaFormGroup.value);
      const cmd = new CriarCategoriaCommand(environment.fakeUser.id, c.nome, c.descricao, +c.tipo);

      this.categoriaService.criar(cmd).subscribe((response) => {
        this.toastr.info(`Categoria ${response.nome} criada com sucesso!`)
        this.closeEvent.emit();
      });
    }
  }

  private atualizar(): void {
    if (this.categoriaFormGroup.valid) {
      const c: CategoriaModel = Object.assign({}, this.categoria, this.categoriaFormGroup.value);
      const cmd = new AtualizarCategoriaCommand(String(this.categoria?.id), environment.fakeUser.id, c.nome, c.descricao, +c.tipo);

      this.categoriaService.atualizar(cmd).subscribe((response) => {
        this.toastr.info(`Categoria ${response.nome} atualizada com sucesso!`)
        this.closeEvent.emit();
      });
    }
  }
}