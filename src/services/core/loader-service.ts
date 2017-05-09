import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ToastController, LoadingController } from 'ionic-angular';

@Injectable()
export class LoaderService {

    loader: any;
    constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController) {

    }

    initData() { }

    public showPreloader() {
        this.loader = this.loadingCtrl.create({});
        this.loader.present();
    }

    public hidePreloader() {
        this.loader.dismiss();
    }

    public showError(mensagem: string) {
        if (localStorage.getItem("exibindoErro") != null)
            return;
        localStorage.setItem("exibindoErro", "true");
        let a = this.toastCtrl.create({
            duration: 4000,
            message: mensagem,
            showCloseButton: true,
            closeButtonText: 'OK'
        });
        a.present();
        a.onDidDismiss(() => {
            localStorage.removeItem("exibindoErro");
        })
    }
}