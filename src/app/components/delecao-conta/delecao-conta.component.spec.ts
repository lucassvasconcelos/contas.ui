import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelecaoContaComponent } from './delecao-conta.component';

describe('DelecaoContaComponent', () => {
  let component: DelecaoContaComponent;
  let fixture: ComponentFixture<DelecaoContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelecaoContaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelecaoContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
