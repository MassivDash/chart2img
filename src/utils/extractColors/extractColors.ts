
export function extractColors(colorsRaw: string | undefined | null): string[] | [] {
    if (!colorsRaw) {
        return [];
    }

    const rgba = colorsRaw.match(/rgba\(([^)]+)\)/g);
    const rgb = colorsRaw.match(/rgb\(([^)]+)\)/g);
    const hex = colorsRaw.match(/#([a-fA-F0-9]{3,6})/g);
    const hsl = colorsRaw.match(/hsl\(([^)]+)\)/g);

    return [...rgba || [], ...rgb || [], ...hex || [], ...hsl || []];
}
