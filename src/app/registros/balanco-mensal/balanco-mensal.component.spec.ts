import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancoMensalComponent } from './balanco-mensal.component';

describe('BalancoMensalComponent', () => {
  let component: BalancoMensalComponent;
  let fixture: ComponentFixture<BalancoMensalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalancoMensalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalancoMensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
