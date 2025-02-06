import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSalesGraphComponent } from './app-sales-graph.component';

describe('AppSalesGraphComponent', () => {
  let component: AppSalesGraphComponent;
  let fixture: ComponentFixture<AppSalesGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppSalesGraphComponent]
    });
    fixture = TestBed.createComponent(AppSalesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
