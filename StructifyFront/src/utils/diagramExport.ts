/**
 * Diagram export utilities for SVG and PNG formats.
 */

const DEFAULT_SVG_FILENAME = 'diagram.svg';
const DEFAULT_PNG_FILENAME = 'diagram.png';

function findSvgElement(containerId: string): SVGSVGElement {
    const container = document.getElementById(containerId);
    if (!container) {
        throw new Error(`Container element with id "${containerId}" not found.`);
    }

    const svg = container.querySelector<SVGSVGElement>('svg');
    if (!svg) {
        throw new Error(`No SVG element found inside container "${containerId}".`);
    }

    return svg;
}

function serializeSvg(svg: SVGSVGElement): string {
    const serializer = new XMLSerializer();
    return serializer.serializeToString(svg);
}

function triggerDownload(url: string, filename: string): void {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}

/**
 * Exports the SVG diagram from the given container as a downloadable `.svg` file.
 */
export function exportSVG(containerId: string): void {
    const svg = findSvgElement(containerId);
    const svgString = serializeSvg(svg);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    triggerDownload(url, DEFAULT_SVG_FILENAME);
    URL.revokeObjectURL(url);
}

/**
 * Recursively inlines computed styles from the live DOM element onto its clone.
 * This ensures the SVG renders correctly when drawn to a canvas (where
 * external stylesheets and inherited CSS are unavailable).
 */
function inlineStyles(source: Element, target: Element): void {
    const computed = window.getComputedStyle(source);
    const targetEl = target as HTMLElement | SVGElement;

    if ('style' in targetEl) {
        for (let i = 0; i < computed.length; i++) {
            const prop = computed[i];
            targetEl.style.setProperty(prop, computed.getPropertyValue(prop));
        }
    }

    const sourceChildren = source.children;
    const targetChildren = target.children;

    for (let i = 0; i < sourceChildren.length; i++) {
        if (targetChildren[i]) {
            inlineStyles(sourceChildren[i], targetChildren[i]);
        }
    }
}

/**
 * Creates a self-contained clone of the SVG with all styles inlined
 * and explicit width/height attributes set.
 */
function prepareSvgForExport(svg: SVGSVGElement): SVGSVGElement {
    const clone = svg.cloneNode(true) as SVGSVGElement;

    // Ensure the xmlns attribute is present for standalone serialization
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

    // Set explicit dimensions so the canvas knows how large to render
    const bounds = svg.getBoundingClientRect();
    const width = bounds.width || 800;
    const height = bounds.height || 600;
    clone.setAttribute('width', String(width));
    clone.setAttribute('height', String(height));

    // Inline all computed styles from the live DOM onto the clone
    inlineStyles(svg, clone);

    return clone;
}

/**
 * Exports the SVG diagram from the given container as a downloadable `.png` file.
 * Clones the SVG, inlines styles, and uses a base64 data-URL to avoid
 * cross-origin canvas tainting issues.
 */
export function exportPNG(containerId: string): void {
    const svg = findSvgElement(containerId);
    const preparedSvg = prepareSvgForExport(svg);
    const svgString = serializeSvg(preparedSvg);

    const bounds = svg.getBoundingClientRect();
    const width = bounds.width || 800;
    const height = bounds.height || 600;

    const scaleFactor = 2;
    const canvas = document.createElement('canvas');
    canvas.width = width * scaleFactor;
    canvas.height = height * scaleFactor;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Failed to obtain 2D rendering context from canvas.');
    }

    ctx.scale(scaleFactor, scaleFactor);

    // Use a base64 data URL instead of Blob URL to avoid CORS / tainted canvas
    const base64Svg = btoa(unescape(encodeURIComponent(svgString)));
    const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;

    const image = new Image();

    image.onload = (): void => {
        ctx.drawImage(image, 0, 0, width, height);
        const pngUrl = canvas.toDataURL('image/png');
        triggerDownload(pngUrl, DEFAULT_PNG_FILENAME);
    };

    image.onerror = (): void => {
        throw new Error('Failed to load SVG image for PNG conversion.');
    };

    image.src = dataUrl;
}
