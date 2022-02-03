import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDashComponent } from './contact-dash.component';

describe('ContactDashComponent', () => {
  let component: ContactDashComponent;
  let fixture: ComponentFixture<ContactDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
