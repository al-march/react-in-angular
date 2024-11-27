import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageReactComponent } from './page-react.component';

describe('PageReactComponent', () => {
  let component: PageReactComponent;
  let fixture: ComponentFixture<PageReactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageReactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageReactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
