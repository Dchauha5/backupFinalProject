import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  title:any;
  amount:number;

public dataSource =  {
  datasets: [
  {
          data: [],
          backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
      'black',
      'green',
      'red'
          ],
}  ],

  labels: []
};

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for(var i = 0 ; i < res.length; i++)
      {

          this.dataSource.datasets[0].data[i] = res[i].budget;
          this.dataSource.labels[i] = res[i].title;
          this.createChart();
  }

    });

}

createChart() {
  var ctx = document.getElementById('myChartPie');
  var myPieChart = new Chart(ctx , {
      type: 'pie',
      data: this.dataSource
    });

  var ctx = document.getElementById('myChartBar');
  var mixedChart = new Chart(ctx, {
    type: 'bar',
    data: this.dataSource,
    options: {
      responsive: true,
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
     });


  var ctx = document.getElementById('polarArea');
  var mixedChart = new Chart(ctx, {
    type: 'polarArea',
    data: this.dataSource,
     });

  var ctx = document.getElementById('line');
  var mixedChart = new Chart(ctx, {
    type: 'line',
    data: this.dataSource,
    options: {
      responsive: true,
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
     });

  }

updateBudget(){
  let body = {
    title : this.title,
    budget : this.amount
  }
  this.http.post("http://localhost:3000/addBudget",body)
    .subscribe((res: any) => {
    window.alert("Data Updated")
    })
    this.createChart()
    this.ngOnInit()
  }
}
