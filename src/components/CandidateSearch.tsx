import { Search } from 'lucide-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export function CandidateSearch({ value, onChange }: Props) {
  return (
    <div className="relative w-full max-w-xl mx-auto z-50">
      <div className="relative flex items-center w-full h-14 rounded-2xl focus-within:ring-2 focus-within:ring-blue-500 bg-[#1d1d1f]/80 border border-white/10 overflow-hidden backdrop-blur-xl shadow-lg">
        <div className="grid place-items-center h-full w-14 text-zinc-400">
          <Search size={20} />
        </div>
        <input
          className="peer h-full w-full outline-none text-base text-white bg-transparent pr-4 tracking-wide placeholder-zinc-500"
          type="text"
          id="search"
          placeholder="Search by name or email to highlight rows..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
