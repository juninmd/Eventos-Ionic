import { DetalheEvento } from '../../src/pages/detalhe-evento/detalhe-evento';
import { EventoService } from '../../src/services/eventos.service';
import { DetalheEventoService } from '../../src/services/detalhe-evento.service';
import { Event } from '../../src/models/event.model';
import { EventDetail } from '../../src/models/event-detail.model';
import { NavController, NavParams } from 'ionic-angular';

describe('DetalheEvento', () => {
  const event: Event = { IDEVENTO: 42, TITULO: 'Conferência' };
  const details: EventDetail[] = [
    { IDEVENTO: 42, IDDETALHE: 1, DESC: 'Palestra' },
    { IDEVENTO: 42, IDDETALHE: 2, DESC: 'Workshop' }
  ];

  function resolveOf<T>(value: T): { toPromise: () => Promise<T> } {
    return { toPromise: () => Promise.resolve(value) };
  }

  function rejectOf(error: Error): { toPromise: () => Promise<never> } {
    return { toPromise: () => Promise.reject(error) };
  }

  function createPage(eventoService: EventoService, detalheService: DetalheEventoService): DetalheEvento {
    const navCtrl = {} as NavController;
    const navParams = new NavParams({ IDEVENTO: 42 });
    return new DetalheEvento(navCtrl, navParams, detalheService, eventoService);
  }

  it('should be created', () => {
    const page = createPage(
      { getById: () => resolveOf(event) } as unknown as EventoService,
      { getById: () => resolveOf(details) } as unknown as DetalheEventoService
    );
    expect(page).toBeTruthy();
  });

  it('should load event and its details sequentially using async/await', async () => {
    const page = createPage(
      { getById: () => resolveOf(event) } as unknown as EventoService,
      { getById: () => resolveOf(details) } as unknown as DetalheEventoService
    );

    await Promise.resolve();
    await Promise.resolve();

    expect(page.evento).toEqual(event);
    expect(page.detalhes).toEqual(details);
  });

  it('should pass the event ID to the detail service after loading the event', async () => {
    const eventoSvc = { getById: jasmine.createSpy('getById').and.returnValue(resolveOf(event)) } as unknown as EventoService;
    const detalheSvc = { getById: jasmine.createSpy('getById').and.returnValue(resolveOf(details)) } as unknown as DetalheEventoService;

    createPage(eventoSvc, detalheSvc);
    await Promise.resolve();
    await Promise.resolve();

    expect(eventoSvc.getById).toHaveBeenCalledWith(42);
    expect(detalheSvc.getById).toHaveBeenCalledWith(42);
  });

  it('should propagate errors when the event service fails', async () => {
    const boom = new Error('network down');
    const page = createPage(
      { getById: () => rejectOf(boom) } as unknown as EventoService,
      { getById: () => resolveOf(details) } as unknown as DetalheEventoService
    );

    await expectAsync(page['load']()).toBeRejectedWith(boom);
    expect(page.detalhes).toBeUndefined();
  });

  it('should propagate errors when the detail service fails', async () => {
    const boom = new Error('detail failed');
    const page = createPage(
      { getById: () => resolveOf(event) } as unknown as EventoService,
      { getById: () => rejectOf(boom) } as unknown as DetalheEventoService
    );

    await expectAsync(page['load']()).toBeRejectedWith(boom);
    expect(page.evento).toEqual(event);
    expect(page.detalhes).toBeUndefined();
  });
});
