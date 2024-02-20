import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterRaffleComponent } from './enter-raffle.component';

describe('EnterRaffleComponent', () => {
  let component: EnterRaffleComponent;
  let fixture: ComponentFixture<EnterRaffleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterRaffleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnterRaffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
