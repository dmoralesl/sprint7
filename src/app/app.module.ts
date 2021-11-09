import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from './components/panel/panel.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PanelComponent,
    CustomInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
