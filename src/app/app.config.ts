import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';  // Importar la función que permite usar módulos tradicionales
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';


import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { ResultsComponent } from './results/results.component';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const routes = [
  { path: '', component: HomeComponent },  // Ruta por defecto (Home)
  { path: 'survey', component: SurveyComponent },  // Ruta para la encuesta
  { path: 'results', component: ResultsComponent },  // Ruta para ver resultados
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),  // Proveedor de las rutas
    importProvidersFrom(ReactiveFormsModule),// Otros proveedores como servicios globales irían aquí
    provideHttpClient(),
    importProvidersFrom(CommonModule),
    importProvidersFrom(NgChartsModule),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(ToastrModule.forRoot({
      positionClass: 'toast-top-right',  // Posición en la esquina superior derecha
      timeOut: 3000,                     // Duración en milisegundos
      closeButton: true,                  // Botón de cierre
      progressBar: true,                  // Barra de progreso
      preventDuplicates: true, 
    })),

  ]
};
