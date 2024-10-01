import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SurveyComponent } from './survey.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { MusicStyleService } from '../services/music-style.service';
import { SurveyService } from '../services/survey.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('SurveyComponent', () => {
  let component: SurveyComponent;
  let fixture: ComponentFixture<SurveyComponent>;
  let musicStyleServiceSpy: jasmine.SpyObj<MusicStyleService>;
  let surveyServiceSpy: jasmine.SpyObj<SurveyService>;

  beforeEach(async () => {
    const musicStyleServiceMock = jasmine.createSpyObj('MusicStyleService', ['getMusicStyles']);
    const surveyServiceMock = jasmine.createSpyObj('SurveyService', ['submitSurvey']);

    await TestBed.configureTestingModule({
      imports: [
        SurveyComponent, // El componente standalone va en imports
        RouterTestingModule,
        ToastrModule.forRoot(),  // Configuramos Toastr
        ReactiveFormsModule
      ],
      providers: [
        { provide: MusicStyleService, useValue: musicStyleServiceMock },
        { provide: SurveyService, useValue: surveyServiceMock }
      ]
    }).compileComponents();

    musicStyleServiceSpy = TestBed.inject(MusicStyleService) as jasmine.SpyObj<MusicStyleService>;
    surveyServiceSpy = TestBed.inject(SurveyService) as jasmine.SpyObj<SurveyService>;

    fixture = TestBed.createComponent(SurveyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load music styles on init', () => {
    const mockMusicStyles = ['Rock', 'Pop', 'Jazz'];
    musicStyleServiceSpy.getMusicStyles.and.returnValue(of(mockMusicStyles));

    component.ngOnInit();
    expect(musicStyleServiceSpy.getMusicStyles).toHaveBeenCalled();
    expect(component.musicStyles).toEqual(mockMusicStyles);
  });


  it('should show validation error if form is invalid', () => {
    component.surveyForm.setValue({ email: 'invalid-email', musicStyle: '' });
    component.onSubmit();
    expect(component.surveyForm.invalid).toBeTruthy();
  });
});
