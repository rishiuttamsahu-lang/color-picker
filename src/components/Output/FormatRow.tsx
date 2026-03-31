import { CopyButton } from './CopyButton';

interface FormatRowProps {
  label: string;
  value: string;
}

export function FormatRow({ label, value }: FormatRowProps) {
  return (
    <div className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
      <span className="text-xs font-medium tracking-wide text-gray-500 uppercase min-w-[60px]">
        {label}
      </span>
      <input
        type="text"
        value={value}
        readOnly
        className="flex-1 mx-4 px-3 py-2 text-sm font-mono text-gray-900 bg-transparent border-0 outline-none cursor-default"
      />
      <CopyButton value={value} />
    </div>
  );
}
