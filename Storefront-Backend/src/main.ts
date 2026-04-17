import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton: true
      })
    )
  ]
}).catch(err => console.error(err));
