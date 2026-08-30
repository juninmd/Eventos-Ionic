import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DetalheEventoService } from '../../src/services/detalhe-evento.service';
import { HttpBase } from '../../src/services/core/http-base';
import { Webconfig } from '../../src/webconfig';
import { EventDetail } from '../../src/models/event-detail.model';

describe('DetalheEventoService', () => {
  let service: DetalheEventoService;
  let http: jasmine.SpyObj<HttpBase>;
  let webconfig: Webconfig;

  const sampleDetail: EventDetail = { IDEVENTO: 1, IDDETALHE: 5, DESC: 'Sala principal' };

  function mockResponse(body: unknown): any {
    return { json: () => body };
  }

  beforeEach(() => {
    http = jasmine.createSpyObj<HttpBase>('HttpBase', ['get', 'post', 'put']);
    webconfig = new Webconfig();
    service = new DetalheEventoService(http, webconfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all details and map the response', (done) => {
    http.get.and.returnValue(Observable.of(mockResponse([sampleDetail])));
    service.getAll().subscribe((result: EventDetail[]) => {
      expect(result).toEqual([sampleDetail]);
      expect(http.get).toHaveBeenCalledWith(`${webconfig.UrlCore}eventos/detalhe`, null);
      done();
    });
  });

  it('should fetch a single detail by id', (done) => {
    http.get.and.returnValue(Observable.of(mockResponse(sampleDetail)));
    service.getById(5).subscribe((result: EventDetail) => {
      expect(result).toEqual(sampleDetail);
      expect(http.get).toHaveBeenCalledWith(`${webconfig.UrlCore}eventos/detalhe/5`, null);
      done();
    });
  });

  it('should POST a detail', (done) => {
    http.post.and.returnValue(Observable.of(mockResponse(sampleDetail)));
    service.insert(sampleDetail).subscribe((result: EventDetail) => {
      expect(result).toEqual(sampleDetail);
      expect(http.post).toHaveBeenCalledWith(`${webconfig.UrlCore}eventos/detalhe`, sampleDetail, null);
      done();
    });
  });

  it('should PUT a detail', (done) => {
    http.put.and.returnValue(Observable.of(mockResponse(sampleDetail)));
    service.put(sampleDetail).subscribe((result: EventDetail) => {
      expect(result).toEqual(sampleDetail);
      expect(http.put).toHaveBeenCalledWith(`${webconfig.UrlCore}eventos/detalhe`, sampleDetail, null);
      done();
    });
  });

  it('should delete a detail by id', (done) => {
    http.get.and.returnValue(Observable.of(mockResponse(sampleDetail)));
    service.delete(5).subscribe(() => {
      expect(http.get).toHaveBeenCalledWith(`${webconfig.UrlCore}eventos/detalhe/5`, null);
      done();
    });
  });
});
