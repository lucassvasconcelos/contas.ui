import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { faPencilAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaModel } from 'src/app/models/categoria-model';
import { TipoCategoriaEnum } from 'src/app/models/enums/tipo-categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CategoriasQuery } from 'src/app/services/queries/categorias/categorias-query';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  @ViewChild('modalCategoria') public modalCategoria!: TemplateRef<HTMLElement>;
  @ViewChild('modalDelecaoCategoria') public modalDelecaoCategoria!: TemplateRef<HTMLElement>;

  public faPlus: any = faPlus;
  public faTrash: any = faTrash;
  public faPencil: any = faPencilAlt;
  public tiposCategoria = TipoCategoriaEnum;

  public categorias: CategoriaModel[] = [];
  public categoriaSelecionada?: CategoriaModel;

  private readonly modalService: NgbModal;
  private categoriaService: CategoriaService;

  public constructor(
    modalService: NgbModal,
    categoriaService: CategoriaService
  ) {
    this.modalService = modalService;
    this.categoriaService = categoriaService;
  }

  public ngOnInit(): void {
    this.init();
  }

  public init(): void {
    this.categoriaService.obterTodas(new CategoriasQuery())
      .subscribe((response) => {
        this.categorias = response;
      })
  }

  public criarCategoria(): void {
    this.categoriaSelecionada = undefined;
    this.modalService.open(this.modalCategoria, { centered: true, size: 'lg' });
  }

  public editarCategoria(categoria: CategoriaModel): void {
    this.categoriaSelecionada = categoria;
    this.modalService.open(this.modalCategoria, { centered: true, size: 'lg' });
  }

  public deletarCategoria(categoria: CategoriaModel): void {
    this.categoriaSelecionada = categoria;
    this.modalService.open(this.modalDelecaoCategoria, { centered: true, size: 'lg' });
  }

  public dismissAll(): void {
    this.init();
    this.modalService.dismissAll();
  }

}