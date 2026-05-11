import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrederConfirmationComponent } from './order-confirmation.component';

describe('OrederConfirmationComponent', () => {
  let component: OrederConfirmationComponent;
  let fixture: ComponentFixture<OrederConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrederConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrederConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
