import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { faCheck, faPencilAlt, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaModel } from 'src/app/models/categoria-model';
import { ContaModel } from 'src/app/models/conta-model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ContaService } from 'src/app/services/conta.service';
import { CategoriasQuery } from 'src/app/services/queries/categorias/categorias-query';
import { ContasQuery } from 'src/app/services/queries/contas/contas-query';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.scss']
})
export class ContasComponent implements OnInit {
  @ViewChild('modalConta') public modalConta!: TemplateRef<HTMLElement>;
  @ViewChild('modalDelecaoConta') public modalDelecaoConta!: TemplateRef<HTMLElement>;

  public faCheck: any = faCheck;
  public faTimes: any = faTimes;
  public faPlus: any = faPlus;
  public faTrash: any = faTrash;
  public faPencil: any = faPencilAlt;

  public contas: ContaModel[] = [];
  public categorias: CategoriaModel[] = [];
  public contaSelecionada?: ContaModel;

  private readonly modalService: NgbModal;
  private categoriaService: CategoriaService;
  private contaService: ContaService;

  public constructor(
    modalService: NgbModal,
    contaService: ContaService,
    categoriaService: CategoriaService
  ) {
    this.modalService = modalService;
    this.contaService = contaService;
    this.categoriaService = categoriaService;
  }

  public ngOnInit(): void {
    this.init();
  }

  private async init(): Promise<void> {
    await this.obterDados().then(() => {
      this.contas = this.contas.map((conta) => ContaModel.atribuirCategoria(conta, this.categorias));
    });
  }

  private async obterDados(): Promise<any> {
    return Promise.all([
      this.contaService.obterTodas(new ContasQuery()).toPromise()
        .then((response) => {
          this.contas = response;
        }),
      this.categoriaService.obterTodas(new CategoriasQuery()).toPromise()
        .then((response) => {
          this.categorias = response;
        })
    ]);
  }

  public criarConta(): void {
    this.contaSelecionada = undefined;
    this.modalService.open(this.modalConta, { centered: true, size: 'lg' });
  }

  public editarConta(conta: ContaModel): void {
    this.contaSelecionada = conta;
    this.modalService.open(this.modalConta, { centered: true, size: 'lg' });
  }

  public deletarConta(conta: ContaModel): void {
    this.contaSelecionada = conta;
    this.modalService.open(this.modalDelecaoConta, { centered: true, size: 'lg' });
  }

  public dismissAll(): void {
    this.init();
    this.modalService.dismissAll();
  }

}