import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchautocompleteComponent } from './searchautocomplete.component';

describe('SearchautocompleteComponent', () => {
  let component: SearchautocompleteComponent;
  let fixture: ComponentFixture<SearchautocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchautocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchautocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
