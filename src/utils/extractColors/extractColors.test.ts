import { extractColors } from './extractColors';
import { describe, it, expect } from 'vitest';

describe('extractColors', () => {
    it('should return an empty array if colorsRaw is undefined', () => {
        const colorsRaw = undefined;
        const result = extractColors(colorsRaw);
        expect(result).toEqual([]);
    });

    it('should extract rgba, rgb, hex, and hsl colors from colorsRaw', () => {
        const colorsRaw = 'rgba(255, 0, 0, 0.5) rgb(0, 255, 0) #0000FF hsl(120, 100%, 50%)';
        const result = extractColors(colorsRaw);
        expect(result).toEqual(['rgba(255, 0, 0, 0.5)', 'rgb(0, 255, 0)', '#0000FF', 'hsl(120, 100%, 50%)']);
    });

    it('should return an empty array if no colors are found in colorsRaw', () => {
        const colorsRaw = 'This is a sample string without any colors';
        const result = extractColors(colorsRaw);
        expect(result).toEqual([]);
    });
});