import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetalheEventoService } from '../../services/detalhe-evento.service';
import { EventoService } from '../../services/eventos.service';
import { Event } from '../../models/event.model';
import { EventDetail } from '../../models/event-detail.model';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-detalhe-evento',
  templateUrl: 'detalhe-evento.html',
})
export class DetalheEvento {

  detalhes: EventDetail[];
  evento: Event = {
    DATA: new Date()
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private detalheEventoService: DetalheEventoService, private eventoService: EventoService) {
    this.load();
  }

  private async load(): Promise<void> {
    const IDEVENTO = this.navParams.get('IDEVENTO');
    this.evento = await this.eventoService.getById(IDEVENTO).toPromise();
    this.detalhes = await this.detalheEventoService.getById(this.evento.IDEVENTO).toPromise();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalheEvento');
  }

}
