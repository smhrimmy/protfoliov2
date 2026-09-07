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
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-gray-100 font-sans pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Full Site Backup & Versioned Export</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">Snapshot entire CMS contents, theme settings, automations, and media metadata.</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5" /> Import JSON
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          <button
            onClick={handleDownloadFullJson}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-600/20"
          >
            <Download className="w-3.5 h-3.5" /> Download Site JSON
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4" /> {successMsg}
        </div>
      )}

      {/* Snapshot Generator Card */}
      <div className="p-5 rounded-2xl bg-[#0e131f] border border-white/5 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Create Instant Versioned Snapshot
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed">
          Saves all 19 theme configurations, draft revisions, blog posts, projects, and media references into an immutable local checkpoint.
        </p>

        <div className="flex items-center gap-3 pt-1">
          <input
            type="text"
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Checkpoint note (e.g. Pre-redesign baseline)..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleCreateBackup}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-colors shrink-0 shadow-lg shadow-emerald-600/20"
          >
            Take Snapshot
          </button>
        </div>
      </div>

      {/* Past Backups Table */}
      <div className="bg-[#0e131f] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400">Snapshot History</h3>
          <span className="text-xs font-mono text-gray-500">{backups.length} Versions Recorded</span>
        </div>

        <div className="divide-y divide-white/5">
          {backups.map(b => (
            <div key={b.id} className="p-4 flex items-center justify-between hover:bg-white/2 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white">{b.version}</span>
                  <span className="text-xs text-gray-300 font-medium">{b.note}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(b.timestamp).toLocaleString()}</span>
                  <span>·</span>
                  <span>{b.sizeKb} KB</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeleteBackup(b.id)}
                  className="p-2 text-gray-400 hover:text-red-400 rounded-xl transition-colors"
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
