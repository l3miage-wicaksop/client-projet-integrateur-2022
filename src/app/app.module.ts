import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AuthentificationComponent } from './authentification/authentification.component';
import { HttpClientModule } from '@angular/common/http';
import { TableVueComponent } from './table-vue/table-vue.component';
import { RegstrationFrameComponent } from './regstration-frame/regstration-frame.component';
import { ModalComponent } from './modal/modal.component';
import { VisitesComponent } from './visites/visites.component';
import { DefiComponent } from './defi/defi.component';
import { EtapeComponent } from './etape/etape.component';
import { QuestionComponent } from './question/question.component';
import { IndicationComponent } from './indication/indication.component';
import { ChoixPossibleComponent } from './choix-possible/choix-possible.component';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    TableVueComponent,
    RegstrationFrameComponent,
    ModalComponent,
    VisitesComponent,
    DefiComponent,
    EtapeComponent,
    QuestionComponent,
    IndicationComponent,
    ChoixPossibleComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LeafletModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
