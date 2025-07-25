import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleComponent } from './modale.component';

describe('ModaleComponent', () => {
  let component: ModaleComponent;
  let fixture: ComponentFixture<ModaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
