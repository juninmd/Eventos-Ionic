import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { HttpModule, JsonpModule, XHRBackend, RequestOptions } from '@angular/http';

/** Serviços Core */
import { LoaderService } from '../services/core/loader-service';
import { HttpBase } from '../services/core/http-base';
import { Webconfig } from '../webconfig';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Eventos } from '../pages/eventos/eventos';
import { DetalheEvento } from '../pages/detalhe-evento/detalhe-evento';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DetalheEventoService } from '../services/detalhe-evento.service';
import { EventoService } from '../services/eventos.service';


export function httpFactory(backend: XHRBackend, options: RequestOptions, loader: LoaderService, navController: NavController) {
  return new HttpBase(backend, options, loader, navController)
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Eventos,
    DetalheEvento
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Eventos,
    DetalheEvento
  ],
  providers: [
    LoaderService,
    HttpBase,
    Webconfig,
    StatusBar,
    SplashScreen,
    DetalheEventoService,
    EventoService,
    { provide: LOCALE_ID, useValue: "pt-BR" },
    {
      provide: HttpBase,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, LoaderService]
    },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
