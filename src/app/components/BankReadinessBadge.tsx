import { CheckCircle2, XCircle } from 'lucide-react';

interface BankReadinessBadgeProps {
  complete: boolean;
  label: string;
}

export function BankReadinessBadge({ complete, label }: BankReadinessBadgeProps) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
      complete 
        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
        : 'bg-gray-50 text-gray-500 border border-gray-200'
    }`}>
      {complete ? (
        <CheckCircle2 className="w-4 h-4" />
      ) : (
        <XCircle className="w-4 h-4" />
      )}
      <span>{label}</span>
    </div>
  );
}
