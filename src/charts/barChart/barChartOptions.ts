export const barChartOptions = {
    plugins: {
        datalabels: { display: false },
        legend: { display: false },
        customCanvasBackgroundColor: {
            color: "white",
        },
    },
    indexAxis: "y",
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