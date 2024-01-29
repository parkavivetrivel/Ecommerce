import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntireProductsComponent } from './entire-products.component';

describe('EntireProductsComponent', () => {
  let component: EntireProductsComponent;
  let fixture: ComponentFixture<EntireProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntireProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntireProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
