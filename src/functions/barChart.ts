import {
    app,
    HttpRequest,
    HttpResponseInit,
    InvocationContext,
} from "@azure/functions";
import { createCanvas } from "canvas";

export async function barChart(
    request: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    // usual import results in typescript mismatch
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Chart = require("chart.js/auto");

    const width = 400;
    const height = 400;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    const plugin = {
        id: "customCanvasBackgroundColor",
        beforeDraw: (chart, _args, options) => {
            const { ctx } = chart;
            ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            ctx.fillStyle = options.color || "#99ffff";
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

    const labels = request.query.get("labels")?.split(",");
    const dataValues = request.query.get("data")?.split(",").map(Number);

    const backgroundColorsRaw = request.query.get("backgroundColors");
    const borderColorsRaw = request.query.get("borderColors");

    function extractColors(colorsRaw: string | undefined): string[] | undefined {
        if (colorsRaw?.includes("rgba")) {
            return colorsRaw.match(/rgba\(([^)]+)\)/g);
        } else {
            return colorsRaw?.split(",");
        }
    }

    const backgroundColors = extractColors(backgroundColorsRaw);
    const borderColors = extractColors(borderColorsRaw);
    const data = {
        labels: labels,
        datasets: [
            {
                label: "My First Dataset",
                data: dataValues,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    console.log(borderColors);

    const chartConfig = {
        type: "bar",
        data: data,
        options: options,
        plugins,
    };

    new Chart(ctx, chartConfig);

    const pngBuffer = canvas.toBuffer("image/png");

    // Set the headers and send the PNG buffer in the response
    request.headers.set("Content-Type", "image/png");
    request.headers.set("Content-Length", pngBuffer.length.toString());
    return {
        status: 200,
        body: pngBuffer,
        headers: request.headers,
    };
}

app.http("barChart", {
    methods: ["GET", "POST"],
    authLevel: "anonymous",
    handler: barChart,
});
