import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JumbotronInfoComponent } from './jumbotron-info.component';

describe('JumbotronInfoComponent', () => {
  let component: JumbotronInfoComponent;
  let fixture: ComponentFixture<JumbotronInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JumbotronInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JumbotronInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
