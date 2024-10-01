import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SurveyService } from './survey.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

describe('SurveyService', () => {
  let service: SurveyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SurveyService]
    });

    service = TestBed.inject(SurveyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send survey with correct data', () => {
    const email = 'test@example.com';
    const musicStyle = 'Rock';
    const expectedBody = `respuesta=${musicStyle}&email=${email}`;
    const mockResponse = 'Encuesta enviada correctamente';

    service.submitSurvey(email, musicStyle).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(expectedBody);
    expect(req.request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');
    
    req.flush(mockResponse); // Simula la respuesta del backend
  });
});
