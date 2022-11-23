import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompletematerialComponent } from './autocompletematerial.component';

describe('AutocompletematerialComponent', () => {
  let component: AutocompletematerialComponent;
  let fixture: ComponentFixture<AutocompletematerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompletematerialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompletematerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
