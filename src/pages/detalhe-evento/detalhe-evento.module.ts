import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheEvento } from './detalhe-evento';

@NgModule({
  declarations: [
    DetalheEvento,
  ],
  imports: [
    IonicPageModule.forChild(DetalheEvento),
  ],
  exports: [
    DetalheEvento
  ]
})
export class DetalheEventoModule {}
