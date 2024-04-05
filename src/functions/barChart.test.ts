import { HttpRequest, InvocationContext } from '@azure/functions';
import { barChart } from './barChart';
import { describe, it, expect, vi } from 'vitest';

describe('barChart', () => {
    it('should return a response with status 200 and pngBuffer', async () => {
        // Mock the request object
        const request = {
            url: 'https://example.com',
            query: new Map([
                ['labels', 'Label 1,Label 2,Label 3'],
                ['data', '10,20,30'],
                ['backgroundColors', 'rgba(255, 0, 0, 0.5),rgb(0, 255, 0),#0000FF,hsl(120, 100%, 50%)'],
                ['borderColors', 'rgba(0, 0, 0, 0.5),rgb(255, 255, 255),#FF0000,hsl(240, 100%, 50%)'],
            ]),
            headers: new Map(),
        };

        // Mock the context object
        const context = {
            log: vi.fn(),
        };

        // Call the barChart function
        const response = await barChart(request as unknown as HttpRequest, context as unknown as InvocationContext);

        // Assert the response status and body
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Buffer);

        // Clean up after the call
        request.query.clear();
        request.headers.clear();
        context.log.mockClear();
    });

    it('should return a response with status 500 if request query does not have any values', async () => {
        // Mock the request object
        const request = {
            url: 'https://example.com',
            query: new Map(),
            headers: new Map(),
        };

        // Mock the context object
        const context = {
            log: vi.fn(),
        };

        // Call the barChart function
        const response = await barChart(request as unknown as HttpRequest, context as unknown as InvocationContext);

        // Assert the response status
        expect(response.status).toBe(500);

        // Clean up after the call
        request.query.clear();
        request.headers.clear();
        context.log.mockClear();
    });
});