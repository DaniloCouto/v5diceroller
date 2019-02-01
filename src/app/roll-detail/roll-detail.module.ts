import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, ModalController } from '@ionic/angular';

import { RollDetailPage } from './roll-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RollDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [ ModalController ],
  declarations: [RollDetailPage]
})
export class RollDetailPageModule {}
