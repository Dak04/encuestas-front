import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // Importa aquí si no funciona
import { Router } from '@angular/router'; 

import { MusicStyleService } from '../services/music-style.service';
import { SurveyService } from '../services/survey.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule] 
})
export class SurveyComponent implements OnInit {
  surveyForm: FormGroup;
  musicStyles: string[] = [];

  respEncuestaRespondida ="Encuesta guardada";
  respCorreoRepetido ="Correo con encuesta respondida";

  constructor(private formBuilder: FormBuilder, private router: Router,
    private musicStyleService: MusicStyleService,
    private surveyService: SurveyService,
    private toastr: ToastrService
  ) {
    this.surveyForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      musicStyle: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMusicStyles();  // Llamada para obtener los estilos musicales
  }

  loadMusicStyles(): void {
    this.musicStyleService.getMusicStyles().subscribe(styles => {
      this.musicStyles = styles;
    }, error => {
      console.error('Error al cargar estilos musicales:', error);
    });
  }

  onSubmit(): void {
    if (this.surveyForm.valid) {
      const email = this.surveyForm.get('email')?.value;
      const musicStyle = this.surveyForm.get('musicStyle')?.value;

      this.surveyService.submitSurvey(email, musicStyle).subscribe(
        response => {
          console.log('Encuesta enviada correctamente:', response);
          // Aquí puedes agregar lógica para notificar al usuario
          if(response ==='true'){
            this.toastr.success('Correo registrado','Encuesta enviada');
          }else{
            this.toastr.info('Correo ya esta registrado', 'Encuesta enviada'); // Mensaje de éxito
          }          
          this.surveyForm.reset();
          this.router.navigate(['results']);
        },
        error => {
          console.error('Error al enviar la encuesta:', error);
          // Aquí puedes manejar errores de envío
          console.error('Error al enviar la encuesta:', error);
          this.toastr.error('Error al enviar la encuesta', 'Error');
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  goBack() {
    this.router.navigate(['..']); // Navega a la pantalla anterior
  }
}