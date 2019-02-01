import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollDetailPage } from './roll-detail.page';

describe('RollDetailPage', () => {
  let component: RollDetailPage;
  let fixture: ComponentFixture<RollDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
