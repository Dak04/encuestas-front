import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { Router } from '@angular/router'; 

import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  standalone: true, 
  imports: [NgChartsModule]
})
export class ResultsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private router: Router, 
    private resultsService: ResultsService){}
    
  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Votos por estilo musical',
        data: [],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1
      }
    ]
  };

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {},
      y: { beginAtZero: true }
    }
  };

  chartType: ChartConfiguration<'bar'>['type'] = 'bar';

  ngOnInit(): void {
    this.loadResults();
  }

  loadResults(): void {
    this.resultsService.getResults().subscribe(
      (data: any) => {
        this.chartData.labels = Object.keys(data);
        this.chartData.datasets[0].data = Object.values(data);
        setTimeout(() => {
          this.updateChart(); // Actualiza el gráfico después de un breve retraso
        }, 100); 
      },
      error => {
        console.error('Error al cargar los resultados:', error);
      }
    );
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.update(); // Fuerza la actualización del gráfico
    }
  }


  goBack() {
    this.router.navigate(['..']); // Navega a la pantalla anterior
  }

}