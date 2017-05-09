import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventoService } from '../../services/eventos.service';

import { DetalheEvento } from '../detalhe-evento/detalhe-evento';


@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class Eventos {

  eventos: [any];
  constructor(public navCtrl: NavController, public navParams: NavParams, private eventoService: EventoService) {
  }

  ionViewDidLoad() {
    this.eventoService.getAll().subscribe(q => this.eventos = q);
  }

  open(evento: any) {
    this.navCtrl.push(DetalheEvento, { IDEVENTO: evento.IDEVENTO })
  }

}
