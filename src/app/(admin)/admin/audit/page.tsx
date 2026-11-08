import React from 'react';
import { ShieldCheck, Terminal } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import type { AuditLog } from '@/lib/supabase/types';

export const revalidate = 0;

export default async function AdminAuditPage() {
  const supabase = await createClient();
  const { data: logs, error } = await supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  const logList = (logs as unknown as AuditLog[]) || [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#C9A84C]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#024696]" /> Governance & Institutional Compliance
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight mt-1">
            System & Publishing Audit Trail
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Tamper-evident logs of administrative actions, content mutations, and authorization events.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#024696]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-[10px] font-mono uppercase tracking-widest">
          <Terminal className="w-3.5 h-3.5 text-[#024696]" />
          <span>Immutable Record Active</span>
        </div>
      </div>

      {error && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-[2px] font-mono">
          Error retrieving audit logs: {error.message}
        </div>
      )}

      {logList.length === 0 ? (
        <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-[2px] bg-[#010c1c] border border-white/10 flex items-center justify-center mx-auto text-white/40">
            <ShieldCheck className="w-8 h-8 text-[#024696]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-serif font-bold text-white">No Audit Events Recorded Yet</h3>
            <p className="text-xs text-white/60 max-w-md mx-auto font-sans">
              Any creation or publishing action across News, Vacancies, or Tenders will immediately create a cryptographic timestamped entry here.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-[#02142d] border border-white/10 rounded-[2px] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#010c1c] border-b border-white/10 text-white/60 font-mono text-[10px] uppercase tracking-widest">
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4">Action</th>
                  <th className="py-3.5 px-4">Entity</th>
                  <th className="py-3.5 px-4">Target ID</th>
                  <th className="py-3.5 px-4">Payload Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80 font-mono text-[11px]">
                {logList.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 text-white/50 whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-white">
                      <span className="px-2 py-0.5 rounded-[2px] bg-[#010c1c] border border-white/10 text-[#C9A84C] text-[10px] uppercase tracking-wider">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#C9A84C]">
                      {log.entity_type || log.target_table || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-white/40 truncate max-w-[140px]">
                      {log.entity_id || log.target_id || '-'}
                    </td>
                    <td className="py-3.5 px-4 text-white/70 max-w-md truncate font-sans text-xs">
                      {log.changes
                        ? JSON.stringify(log.changes)
                        : log.new_data
                          ? JSON.stringify(log.new_data)
                          : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
