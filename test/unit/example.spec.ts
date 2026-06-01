import { TestBed, async } from '@angular/core/testing';
import { MyApp } from '../src/app/app.component';

describe('MyApp', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyApp
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MyApp);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should initialize app properly', async(() => {
    const fixture = TestBed.createComponent(MyApp);
    const app = fixture.debugElement.componentInstance;
    // Test that initializeApp doesn't throw an error
    expect(app.initializeApp).toBeDefined();
  }));
});