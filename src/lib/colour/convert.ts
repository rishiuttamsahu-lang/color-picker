export interface ColorData {
  r: number;
  g: number;
  b: number;
  a: number;
  hex: string;
  rgba: string;
  hsl: string;
  hsb: string;
  cmyk: string;
  cssVar: string;
  tailwind: string;
}

/**
 * Generate a random RGB color
 * Returns values between 0-255 for each channel
 */
export function getRandomRgb(): { r: number; g: number; b: number } {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
}

/**
 * Generate a random hex color
 * Example: #A3F2B1
 */
export function getRandomHexColor(): string {
  const { r, g, b } = getRandomRgb();
  return rgbToHex(r, g, b);
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number): string {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function rgbToHsb(r: number, g: number, b: number): string {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return `hsb(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%)`;
}

function rgbToCmyk(r: number, g: number, b: number): string {
  r /= 255;
  g /= 255;
  b /= 255;

  const k = 1 - Math.max(r, g, b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;

  return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
}

function generateCssVar(hex: string): string {
  return `--color-${hex.replace('#', '').toLowerCase()}`;
}

export function convertAll(r: number, g: number, b: number, a: number): ColorData {
  const hex = rgbToHex(r, g, b);
  const rgba = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a.toFixed(2)})`;
  const hsl = rgbToHsl(r, g, b);
  const hsb = rgbToHsb(r, g, b);
  const cmyk = rgbToCmyk(r, g, b);
  const cssVar = generateCssVar(hex);
  
  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
    a,
    hex,
    rgba,
    hsl,
    hsb,
    cmyk,
    cssVar,
    tailwind: '' // Will be filled by nearest.ts
  };
}
