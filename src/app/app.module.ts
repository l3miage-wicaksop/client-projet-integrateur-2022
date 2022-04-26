import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
// import { AngularFireAuthModule } from '@angular/fire/auth';


@NgModule({
  declarations: [AppComponent, ConnexionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LeafletModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  
}

