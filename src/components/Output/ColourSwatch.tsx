import { useColourStore } from '@/store/useColourStore';

export function ColourSwatch() {
  const { pickedColour } = useColourStore();

  if (!pickedColour) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="w-40 h-40 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300" />
        <p className="text-gray-500 font-serif text-lg">No color selected</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className="w-40 h-40 rounded-2xl shadow-lg border border-gray-200 transition-all duration-300"
        style={{ backgroundColor: pickedColour.hex }}
      />
      <div className="text-center space-y-1">
        <p className="font-serif text-xl font-medium text-gray-900">
          {pickedColour.tailwind || 'Custom Color'}
        </p>
        <p className="font-mono text-sm text-gray-600">
          {pickedColour.hex}
        </p>
      </div>
    </div>
  );
}
