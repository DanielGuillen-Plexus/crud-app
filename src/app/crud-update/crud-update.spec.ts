import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudUpdate } from './crud-update';

describe('CrudUpdate', () => {
  let component: CrudUpdate;
  let fixture: ComponentFixture<CrudUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
