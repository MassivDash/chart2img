import { createCanvas as create } from "canvas";

export function createCanvas(width = 400, height = 400) {
    const canvas = create(width, height);
    const ctx = canvas.getContext("2d");
    return { canvas, ctx };
}