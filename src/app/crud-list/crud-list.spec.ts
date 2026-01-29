import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudList } from './crud-list';

describe('CrudList', () => {
  let component: CrudList;
  let fixture: ComponentFixture<CrudList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
