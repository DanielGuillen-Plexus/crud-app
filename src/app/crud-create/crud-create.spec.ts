import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCreate } from './crud-create';

describe('CrudCreate', () => {
  let component: CrudCreate;
  let fixture: ComponentFixture<CrudCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
