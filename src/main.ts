import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app/app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyBqtvIYhCTKyn5otTS0g2c7Ar-wYKVLvlU",
  authDomain: "angular-login-58b90.firebaseapp.com",
  projectId: "angular-login-58b90",
  storageBucket: "angular-login-58b90.firebasestorage.app",
  messagingSenderId: "798097520514",
  appId: "1:798097520514:web:2e707a63bb6644afaf819b"
};

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
  ]
}).catch(err => console.error(err));
