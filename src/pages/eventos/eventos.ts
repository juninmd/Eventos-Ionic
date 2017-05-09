import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventoService } from '../../services/eventos.service';

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

}
