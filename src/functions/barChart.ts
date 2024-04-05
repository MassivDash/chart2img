import {
    app,
    HttpRequest,
    HttpResponseInit,
    InvocationContext,
} from "@azure/functions";
import { extractColors, createCanvas } from "../utils";
import { barChartOptions } from '../charts';
import { Chart, ChartConfiguration, ChartItem, Plugin } from "chart.js/auto";

export async function barChart(
    request: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {


    try {
        context.log(`Http function processed request for url "${request.url}"`);


        const { canvas, ctx } = createCanvas(400, 400);

        const plugin: Plugin = {
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


        const labels = request.query.get("labels")?.split(",");
        const dataValues = request.query.get("data")?.split(",").map(Number);

        if (!labels || labels.length === 0 || !dataValues || dataValues.length === 0) {
            throw new Error("Unable to create");
        }

        const backgroundColorsRaw = request.query.get("backgroundColors");
        const borderColorsRaw = request.query.get("borderColors");

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

        const chartConfig = {
            type: "bar",
            data: data,
            options: barChartOptions,
            plugins,
        };

        new Chart(ctx as unknown as ChartItem, chartConfig as ChartConfiguration);

        const pngBuffer = canvas.toBuffer("image/png");

        // Set the headers and send the PNG buffer in the response
        request.headers.set("Content-Type", "image/png");
        request.headers.set("Content-Length", pngBuffer.length.toString());
        return {
            status: 200,
            body: pngBuffer,
            headers: request.headers,
        };
        
    } catch (error) {
        context.log(error);
        return {
            status: 500,
            body: "Internal server error",
        };
    }
}

app.http("barChart", {
    methods: ["GET", "POST"],
    authLevel: "anonymous",
    handler: barChart,
});
