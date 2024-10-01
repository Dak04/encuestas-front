import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MusicStyleService } from './music-style.service';

describe('MusicStyleService', () => {
  let service: MusicStyleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MusicStyleService]
    });

    service = TestBed.inject(MusicStyleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve music styles from the API via GET', () => {
    const mockMusicStyles = ['Rock', 'Pop', 'Jazz'];

    service.getMusicStyles().subscribe(styles => {
      expect(styles).toEqual(mockMusicStyles);
    });

    const req = httpMock.expectOne(service['apiUrl']); // Verifica que se haya realizado una solicitud a la URL correcta
    expect(req.request.method).toBe('GET');
    req.flush(mockMusicStyles); // Simula la respuesta del backend con datos de prueba
  });

  it('should handle errors from the API', () => {
    const errorMessage = '404 error';

    service.getMusicStyles().subscribe(
      () => fail('Expected an error, not music styles'),
      error => expect(error.status).toBe(404)
    );

    const req = httpMock.expectOne(service['apiUrl']);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
