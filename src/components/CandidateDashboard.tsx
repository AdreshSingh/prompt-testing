import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { CandidateData } from '../types/candidate';

interface Props {
  title: string;
  candidates: CandidateData[];
  searchQuery: string;
  columns: string[];
}

export function CandidateDashboard({ title, candidates, searchQuery, columns }: Props) {
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const chartData = candidates.map(c => ({
    name: c.name.split(' ')[0], // Use first name to save space
    score: c.gainedMarks,
  }));

  const lowerQuery = searchQuery.toLowerCase().trim();

  return (
    <motion.div 
      initial="hidden" animate="visible" variants={containerVariants}
      className="w-full max-w-6xl mx-auto mt-10 p-8 md:p-12 bg-[#1d1d1f]/50 border border-white/10 rounded-[2rem] backdrop-blur-2xl shadow-xl relative"
    >
      <div className="mb-10 border-b border-white/10 pb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">{title}</h2>
          <p className="text-zinc-400">Total metrics for {candidates.length} evaluated candidates.</p>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-xl font-semibold text-white mb-6">Cohort Score Distribution</h3>
        <div className="w-full h-[350px] bg-black/40 rounded-[1.5rem] p-6 border border-white/5 overflow-x-auto overflow-y-hidden custom-scrollbar">
          <div style={{ minWidth: `${Math.max(100, candidates.length * 40)}px`, height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" axisLine={false} tickLine={false} dy={10} tick={{ fontSize: 11 }} angle={-45} textAnchor="end" />
                <YAxis stroke="#71717a" axisLine={false} tickLine={false} dx={-10} tick={{ fontSize: 13 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.03)', radius: 8 }}
                  contentStyle={{ backgroundColor: '#2c2c2e', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
                />
                <Bar dataKey="score" fill="url(#colorScoreGlob)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <defs>
                  <linearGradient id="colorScoreGlob" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-6">Detailed Ledger</h3>
        <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-black/40 custom-scrollbar pb-2">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1d1d1f] text-zinc-400">
              <tr>
                {columns.map(col => (
                  <th key={col} className="px-5 py-4 font-medium uppercase tracking-wider text-xs">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {candidates.map((c, idx) => {
                const isMatch = lowerQuery !== '' && (c.name.toLowerCase().includes(lowerQuery) || c.email.toLowerCase().includes(lowerQuery));
                return (
                  <tr 
                    key={idx} 
                    className={`transition-all duration-300 ${isMatch ? 'bg-blue-500/20 shadow-[inset_0_0_15px_rgba(59,130,246,0.2)] border-l-2 border-l-blue-400' : 'hover:bg-white/5 border-l-2 border-l-transparent'}`}
                  >
                    {columns.map(col => (
                      <td key={col} className={`px-5 py-3 ${isMatch ? 'text-blue-100 font-semibold' : 'text-zinc-300'}`}>
                        {c.raw[col] || '-'}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </motion.div>
  );
}
