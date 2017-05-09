import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetalheEventoService } from '../../services/detalhe-evento.service';
import { EventoService } from '../../services/eventos.service';

@Component({
  selector: 'page-detalhe-evento',
  templateUrl: 'detalhe-evento.html',
})
export class DetalheEvento {

  detalhes: [any];
  evento: any = {
    DATA: new Date()
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, detalheEventoService: DetalheEventoService, eventoService: EventoService) {
    eventoService.getById(navParams.get('IDEVENTO'))
      .subscribe(q => {
        this.evento = q;
        detalheEventoService.getById(q.IDEVENTO)
          .subscribe(q => this.detalhes = q)
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalheEvento');
  }

}
