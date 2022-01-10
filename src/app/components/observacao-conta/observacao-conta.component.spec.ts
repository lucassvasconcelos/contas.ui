import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacaoContaComponent } from './observacao-conta.component';

describe('ObservacaoContaComponent', () => {
  let component: ObservacaoContaComponent;
  let fixture: ComponentFixture<ObservacaoContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservacaoContaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacaoContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
