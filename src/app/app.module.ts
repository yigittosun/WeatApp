import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TodoModalComponent } from './modals/todo-modal/todo-modal.component';
import { FormsModule } from '@angular/forms';
import { MesajComponent } from './modals/mesaj/mesaj.component';
import { ModalPageComponent } from './modals/modal-page/modal-page.component';


@NgModule({
  declarations: [AppComponent,TodoModalComponent,MesajComponent,ModalPageComponent],
  entryComponents: [TodoModalComponent,MesajComponent,ModalPageComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
