import { LoaderService } from '../../src/services/core/loader-service';
import { ToastController, LoadingController, Toast, Loading } from 'ionic-angular';

describe('LoaderService', () => {
  let service: LoaderService;
  let toast: jasmine.SpyObj<Toast>;
  let loading: jasmine.SpyObj<Loading>;
  let toastCtrl: jasmine.SpyObj<ToastController>;
  let loadingCtrl: jasmine.SpyObj<LoadingController>;

  beforeEach(() => {
    toast = jasmine.createSpyObj<Toast>('Toast', ['present', 'onDidDismiss']);
    toast.onDidDismiss.and.callFake((cb: () => void) => {
      toast['_dismiss'] = cb;
    });
    loading = jasmine.createSpyObj<Loading>('Loading', ['present', 'dismiss']);

    toastCtrl = jasmine.createSpyObj<ToastController>('ToastController', ['create']);
    toastCtrl.create.and.returnValue(toast);
    loadingCtrl = jasmine.createSpyObj<LoadingController>('LoadingController', ['create']);
    loadingCtrl.create.and.returnValue(loading);

    localStorage.clear();
    service = new LoaderService(toastCtrl, loadingCtrl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showPreloader / hidePreloader', () => {
    it('should create and present a loading overlay', () => {
      service.showPreloader();
      expect(loadingCtrl.create).toHaveBeenCalledWith({});
      expect(loading.present).toHaveBeenCalled();
    });

    it('should dismiss the current loading overlay', () => {
      service.showPreloader();
      service.hidePreloader();
      expect(loading.dismiss).toHaveBeenCalled();
    });

    it('should not throw when hiding without a preloader', () => {
      expect(() => service.hidePreloader()).not.toThrow();
    });
  });

  describe('showError', () => {
    it('should present a toast with the given message', () => {
      service.showError('Falha na comunicação');

      expect(toastCtrl.create).toHaveBeenCalledWith(jasmine.objectContaining({ message: 'Falha na comunicação' }));
      expect(toast.present).toHaveBeenCalled();
    });

    it('should ignore subsequent calls with the same dedupe flag', () => {
      service.showError('primeiro');
      service.showError('segundo');

      expect(toastCtrl.create).toHaveBeenCalledTimes(1);
    });

    it('should clear the dedupe flag after the toast is dismissed', () => {
      service.showError('uma vez');
      expect(localStorage.getItem('exibindoErro')).toEqual('true');

      toast['_dismiss']();
      expect(localStorage.getItem('exibindoErro')).toBeNull();
    });
  });
});
