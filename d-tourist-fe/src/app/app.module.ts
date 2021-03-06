import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { AppConfigService } from '@core/services';
import { HttpClientModule } from '@angular/common/http';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DirectivesModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => appConfigService.loadAppConfig()
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
