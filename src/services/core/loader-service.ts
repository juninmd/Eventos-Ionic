import { Injectable } from '@angular/core';
import { ToastController, LoadingController, Loading, Toast } from 'ionic-angular';

@Injectable()
export class LoaderService {

    private loading: Loading;
    constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController) {

    }

    initData(): void {
    }

    public showPreloader(): void {
        this.loading = this.loadingCtrl.create({});
        this.loading.present();
    }

    public hidePreloader(): void {
        this.loading?.dismiss();
    }

    public showError(mensagem: string): void {
        if (localStorage.getItem("exibindoErro") != null) {
            return;
        }
        localStorage.setItem("exibindoErro", "true");
        const toast: Toast = this.toastCtrl.create({
            duration: 4000,
            message: mensagem,
            showCloseButton: true,
            closeButtonText: 'OK'
        });
        toast.present();
        toast.onDidDismiss(() => {
            localStorage.removeItem("exibindoErro");
        });
    }
}
