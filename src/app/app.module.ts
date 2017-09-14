import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
//import { ToggleClassName } from './app.component';
import { FormsModule } from '@angular/forms';

import { ClickOutsideModule } from 'ng-click-outside';

export const firebaseConfig = {
	apiKey: "AIzaSyDANQilphyNj1u3UQBMTnG1SEz6OpPsdUk",
	authDomain: "list-201c7.firebaseapp.com",
	databaseURL: "https://list-201c7.firebaseio.com",
	projectId: "list-201c7",
	storageBucket: "list-201c7.appspot.com",
	messagingSenderId: "301896512067"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    //HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ClickOutsideModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
