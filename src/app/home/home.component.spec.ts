import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule] // Importamos el módulo de testeo para el router
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Inyectamos el router
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /results when goToResults is called', () => {
    const navigateSpy = spyOn(router, 'navigate'); // Espía la función de navegación

    component.goToResults();

    expect(navigateSpy).toHaveBeenCalledWith(['/results']);
  });

  it('should navigate to /survey when goToSurvey is called', () => {
    const navigateSpy = spyOn(router, 'navigate'); // Espía la función de navegación

    component.goToSurvey();

    expect(navigateSpy).toHaveBeenCalledWith(['/survey']);
  });
});
