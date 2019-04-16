import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


/* modules */
import { PagesModule } from './pages/pages.module';

/* routes */
import { AppRoutingModule } from './app.routing';

/* components */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

/* services */
import { ServiceModule } from './services/service.module';

/* forms */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    /* the order of module is very important, be careful with routing*/
    PagesModule,
    AppRoutingModule,
    ServiceModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  /* constructor(router: Router) {
   console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  } */
}
