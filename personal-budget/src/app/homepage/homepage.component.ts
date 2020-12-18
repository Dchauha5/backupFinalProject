import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  title:any;
  amount:number;
  isChartVisible: boolean=true;

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

  constructor(private http: HttpClient, private route: Router) { }
  ngOnInit(): void {
    this.getData();
}

getData(){
  this.isChartVisible = true;
  this.http.get('http://localhost:3000/budget')

    .subscribe((res: any) => {
      for (var i = 0; i < res.length; i++) {
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
  this.isChartVisible = true;
  let body = {
    title : this.title,
    budget : this.amount
  }
  this.http.post("http://localhost:3000/new/budget",body)
    .subscribe((res: any) => {
      this.getData();
      })
  }

deleteBudget(){
  this.isChartVisible = false;
  let id = "something"
    this.http.delete("http://localhost:3000/remove/budget")
    .subscribe((res: any) => {
      this.getData();

    })
  }

logout(){
  this.route.navigate(['/login']);
}


}
