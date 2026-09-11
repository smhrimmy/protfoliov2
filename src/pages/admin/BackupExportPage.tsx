import React, { useState } from 'react';
import { Database, Download, Upload, Trash2, RefreshCw, Check, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { SiteBackup } from '@/types/portfolio';

export const BackupExportPage: React.FC = () => {
  const [backups, setBackups] = useState<SiteBackup[]>(mockStorage.getBackups());
  const [note, setNote] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleCreateBackup = () => {
    const b = mockStorage.createBackup(note || 'Manual checkpoint');
    setBackups(mockStorage.getBackups());
    setNote('');
    setSuccessMsg(`Backup snapshot ${b.version} generated successfully.`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleDownloadFullJson = () => {
    const jsonStr = mockStorage.exportFullJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pdl-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setSuccessMsg('Complete site export downloaded.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const ok = mockStorage.importFullJson(content);
      if (ok) {
        setBackups(mockStorage.getBackups());
        setSuccessMsg('Portfolio state restored from imported JSON file.');
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        alert('Invalid backup JSON format.');
      }
    };
    reader.readAsText(file);
  };

  const handleDeleteBackup = (id: string) => {
    if (confirm('Delete this backup snapshot?')) {
      mockStorage.deleteBackup(id);
      setBackups(mockStorage.getBackups());
      setSuccessMsg('Backup snapshot deleted.');
      setTimeout(() => setSuccessMsg(null), 2000);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 text-[#222222] font-sans pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/8">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#ad314d] uppercase font-bold mb-1">
            DATA RESILIENCE · DISASTER RECOVERY
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#ad314d]" />
            <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight">Full Site Backup & Versioned Export</h1>
          </div>
          <p className="text-xs text-[#55555e] mt-1">Snapshot entire CMS contents, theme settings, automations, and media metadata.</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="px-4 py-2 bg-white hover:bg-gray-50 text-[#1a1a1a] border border-black/10 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer">
            <Upload className="w-3.5 h-3.5" /> Import JSON
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          <button
            onClick={handleDownloadFullJson}
            className="px-4 py-2 bg-[#ad314d] hover:bg-[#8e253d] text-white rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Download Site JSON
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-semibold">
          <Check className="w-4 h-4 text-emerald-600" /> {successMsg}
        </div>
      )}

      {/* Snapshot Generator Card */}
      <div className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-black/8 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-[#1a1a1a] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Create Instant Versioned Snapshot
        </h3>
        <p className="text-xs text-[#55555e] leading-relaxed">
          Saves all 19 theme configurations, draft revisions, blog posts, projects, and media references into an immutable local checkpoint.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
          <input
            type="text"
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Checkpoint note (e.g. Pre-redesign baseline)..."
            className="flex-1 bg-white border border-black/10 rounded-xl px-3 py-2 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#ad314d]"
          />
          <button
            onClick={handleCreateBackup}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors shrink-0 shadow-sm"
          >
            Take Snapshot
          </button>
        </div>
      </div>

      {/* Past Backups Table */}
      <div className="bg-white/85 backdrop-blur-md border border-black/8 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-black/8 flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#55555e]">Snapshot History</h3>
          <span className="text-xs font-mono text-[#888890]">{backups.length} Versions Recorded</span>
        </div>

        <div className="divide-y divide-black/6">
          {backups.map(b => (
            <div key={b.id} className="p-4 flex items-center justify-between hover:bg-black/[0.02] transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#1a1a1a]">{b.version}</span>
                  <span className="text-xs text-[#44444c] font-medium">{b.note}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono text-[#888890]">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(b.timestamp).toLocaleString()}</span>
                  <span>·</span>
                  <span>{b.sizeKb} KB</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeleteBackup(b.id)}
                  className="p-2 text-[#71717a] hover:text-red-600 rounded-xl transition-colors"
                  title="Delete Snapshot"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
