import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResultsService } from './results.service';

describe('ResultsService', () => {
  let service: ResultsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Importa el módulo de pruebas HTTP
      providers: [ResultsService]
    });
    service = TestBed.inject(ResultsService);
    httpMock = TestBed.inject(HttpTestingController);  // Inyecta el controlador de pruebas HTTP
  });

  afterEach(() => {
    httpMock.verify();  // Verifica que no haya solicitudes HTTP pendientes después de cada prueba
  });

  it('should be created', () => {
    expect(service).toBeTruthy();  // Comprueba que el servicio se crea correctamente
  });

  it('should retrieve results from the API', () => {
    const mockResults = { Rock: 50, Pop: 30 };  // Datos simulados para la prueba

    service.getResults().subscribe(results => {
      expect(results).toEqual(mockResults);  // Verifica que los datos recibidos coincidan con los simulados
    });

    // Simula la solicitud HTTP GET
    const req = httpMock.expectOne('http://localhost:8080/api/results');
    expect(req.request.method).toBe('GET');  // Verifica que el método HTTP es GET
    req.flush(mockResults);  // Envía la respuesta simulada
  });
});
