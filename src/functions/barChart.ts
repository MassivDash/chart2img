import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { createCanvas } from 'canvas';

export async function barChart(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

        // usual import results in typescript mismatch
    const Chart = require('chart.js/auto');

    const width = 400;
    const height = 400;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const plugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart, _args, options) => {
          const { ctx } = chart;
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = options.color || '#99ffff';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        },
      };
    
      const plugins = [plugin];
    
      const options = {
        plugins: {
          datalabels: { display: false },
          legend: { display: false },
          customCanvasBackgroundColor: {
            color: 'white',
          },
        },
        indexAxis: 'y',
        responsive: true,
        scales: {
          y: {
            offset: true,
            ticks: {
              display: true,
            },
            grid: {
              display: false,
              drawTicks: false,
            },
            border: {
              display: false,
            },
          },
          x: {
            suggestedMin: 0,
            suggestedMax: 15,
            border: {
              display: false,
            },
          },
        },
      };

      const labels = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Grey'];
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

    const chartConfig = {
      type: 'bar',
      data: data,
      options: options,
      plugins
    };


    new Chart(ctx, chartConfig);

    const pngBuffer = canvas.toBuffer('image/png');

    // Set the headers and send the PNG buffer in the response
    request.headers.set('Content-Type', 'image/png');
    request.headers.set('Content-Length', pngBuffer.length.toString());
    return {
        status: 200,
        body: pngBuffer,
        headers: request.headers
    };

};

app.http('barChart', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: barChart
});
