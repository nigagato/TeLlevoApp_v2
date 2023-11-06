import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';

import { RegistroPage } from './registro.page';
import { ModuloMaterialModule } from 'src/app/modulo/modulo-material/modulo-material.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRoutingModule,
    ModuloMaterialModule
  ],
  declarations: [RegistroPage]
})
export class RegistroPageModule {}
