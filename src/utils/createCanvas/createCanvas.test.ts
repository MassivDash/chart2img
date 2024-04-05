import { createCanvas } from './createCanvas';
import { describe, it, expect } from 'vitest';

describe('createCanvas', () => {
    it('should create a canvas with default width and height', () => {
        const canvas = createCanvas();
        expect(canvas).toBeDefined();
        expect(canvas.canvas.width).toEqual(400);
        expect(canvas.canvas.height).toEqual(400);
    });

    it('should create a canvas with specified width and height', () => {
        const width = 800;
        const height = 600;
        const canvas = createCanvas(width, height);
        expect(canvas).toBeDefined();
        expect(canvas.canvas.width).toEqual(width);
        expect(canvas.canvas.height).toEqual(height);
    });
});