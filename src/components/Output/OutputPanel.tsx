'use client';

import { useColourStore } from '@/store/useColourStore';
import { ColourSwatch } from './ColourSwatch';
import { FormatRow } from './FormatRow';

export function OutputPanel() {
  const { pickedColour, alpha, setAlpha } = useColourStore();

  if (!pickedColour) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
          Color Output
        </h2>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-center">
            Pick a color to see the formats here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
        Color Output
      </h2>
      
      <div className="space-y-8">
        {/* Color Swatch */}
        <div className="flex justify-center">
          <ColourSwatch />
        </div>

        {/* Format Rows */}
        <div className="space-y-2">
          <FormatRow label="HEX" value={pickedColour.hex} />
          <FormatRow label="RGBA" value={pickedColour.rgba} />
          <FormatRow label="HSL" value={pickedColour.hsl} />
          <FormatRow label="HSB" value={pickedColour.hsb} />
          <FormatRow label="CeiK" value={pickedColour.cmyk} />
          <FormatRow label="CSS" value={pickedColour.cssVar} />
        </div>

        {/* Alpha Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Opacity
            </label>
            <span className="text-sm font-mono text-gray-600">
              {Math.round(alpha * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={alpha * 100}
            onChange={(e) => setAlpha(Number(e.target.value) / 100)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>
    </div>
  );
}
