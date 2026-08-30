import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { EventoService } from '../../src/services/eventos.service';
import { HttpBase } from '../../src/services/core/http-base';
import { Webconfig } from '../../src/webconfig';
import { Event } from '../../src/models/event.model';

describe('EventoService', () => {
  let service: EventoService;
  let http: jasmine.SpyObj<HttpBase>;
  let webconfig: Webconfig;

  const sampleEvent: Event = { IDEVENTO: 1, TITULO: 'Festa de Aniversário' };

  function mockResponse(body: unknown): any {
    return { json: () => body };
  }

  beforeEach(() => {
    http = jasmine.createSpyObj<HttpBase>('HttpBase', ['get', 'post', 'put']);
    webconfig = new Webconfig();
    service = new EventoService(http, webconfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should fetch all events and return an array', (done) => {
      http.get.and.returnValue(Observable.of(mockResponse([sampleEvent])));

      service.getAll().subscribe((result: Event[]) => {
        expect(result).toEqual([sampleEvent]);
        expect(http.get).toHaveBeenCalledWith(`${webconfig.UrlCore}eventos`, null);
        done();
      });
    });
  });

  describe('getById', () => {
    it('should fetch a single event by id and map the response', (done) => {
      http.get.and.returnValue(Observable.of(mockResponse(sampleEvent)));

      service.getById(1).subscribe((result: Event) => {
        expect(result).toEqual(sampleEvent);
        expect(http.get).toHaveBeenCalledWith(`${webconfig.UrlCore}eventos/1`, null);
        done();
      });
    });
  });

  describe('insert', () => {
    it('should POST the event body', (done) => {
      const created: Event = { ...sampleEvent, IDEVENTO: 2 };
      http.post.and.returnValue(Observable.of(mockResponse(created)));

      service.insert(sampleEvent).subscribe((result: Event) => {
        expect(result).toEqual(created);
        expect(http.post).toHaveBeenCalledWith(`${webconfig.UrlCore}eventos`, sampleEvent, null);
        done();
      });
    });
  });

  describe('put', () => {
    it('should PUT the event body', (done) => {
      const updated: Event = { ...sampleEvent, TITULO: 'Atualizado' };
      http.put.and.returnValue(Observable.of(mockResponse(updated)));

      service.put(updated).subscribe((result: Event) => {
        expect(result).toEqual(updated);
        expect(http.put).toHaveBeenCalledWith(`${webconfig.UrlCore}eventos`, updated, null);
        done();
      });
    });
  });

  describe('delete', () => {
    it('should fetch delete endpoint for the given id', (done) => {
      http.get.and.returnValue(Observable.of(mockResponse(sampleEvent)));

      service.delete(3).subscribe(() => {
        expect(http.get).toHaveBeenCalledWith(`${webconfig.UrlCore}eventos/3`, null);
        done();
      });
    });
  });
});
