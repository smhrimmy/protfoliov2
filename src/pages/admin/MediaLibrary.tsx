import React, { useState, useEffect } from 'react';
import { 
  Image, Folder, Upload, Search, Trash2, Copy, AlertTriangle, 
  Check, ExternalLink, HardDrive, Filter, X
} from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { MediaAsset } from '@/types/cms';

export const MediaLibrary: React.FC = () => {
  const [media, setMedia] = useState<MediaAsset[]>(mockStorage.getMedia());
  const [activeFolder, setActiveFolder] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showDeleteWarning, setShowDeleteWarning] = useState<MediaAsset | null>(null);

  useEffect(() => {
    const update = () => setMedia(mockStorage.getMedia());
    return mockStorage.subscribe(update);
  }, []);

  const folders = ['All', 'Projects', 'General', 'Blog'];

  const filtered = media.filter(m => {
    const matchFolder = activeFolder === 'All' || m.folder === activeFolder;
    const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        m.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchFolder && matchSearch;
  });

  const totalBytes = media.reduce((acc, m) => acc + m.sizeBytes, 0);
  const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard?.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSimulatedUpload = () => {
    const newAsset: MediaAsset = {
      id: `med-${Date.now()}`,
      name: `asset-${Date.now().toString().slice(-4)}.webp`,
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      sizeBytes: 154820,
      dimensions: { width: 1920, height: 1080 },
      altText: 'Uploaded design asset',
      folder: activeFolder === 'All' ? 'General' : activeFolder,
      tags: ['upload', 'new'],
      usedIn: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    mockStorage.saveMedia(newAsset);
  };

  const confirmDelete = () => {
    if (showDeleteWarning) {
      mockStorage.deleteMedia(showDeleteWarning.id);
      setShowDeleteWarning(null);
      if (selectedAsset?.id === showDeleteWarning.id) setSelectedAsset(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-gray-100 font-sans pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Media Library</h1>
          <p className="text-xs text-gray-400 mt-1">Asset storage, dimensions, focal point mapping, and usage tracking.</p>
        </div>
        <button
          onClick={handleSimulatedUpload}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20"
        >
          <Upload className="w-4 h-4" /> Upload New Asset
        </button>
      </div>

      {/* Storage Bar & Folder Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0e131f] p-4 rounded-2xl border border-white/5">
        <div className="flex items-center gap-2">
          {folders.map(f => (
            <button
              key={f}
              onClick={() => setActiveFolder(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors ${
                activeFolder === f ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Folder className="w-3.5 h-3.5" /> {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-gray-400 flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-blue-400" />
            <span>{totalMB} MB / 500 MB quota</span>
          </span>
          <div className="w-24 bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[12%]" />
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map(asset => (
          <div
            key={asset.id}
            onClick={() => setSelectedAsset(asset)}
            className={`rounded-xl bg-[#0e131f] border overflow-hidden cursor-pointer group transition-all ${
              selectedAsset?.id === asset.id ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-white/5 hover:border-white/20'
            }`}
          >
            <div className="h-32 w-full bg-slate-900 overflow-hidden relative">
              <img src={asset.url} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              {asset.usedIn.length > 0 && (
                <span className="absolute bottom-1.5 left-1.5 bg-blue-600/90 text-white px-1.5 py-0.5 rounded text-[9px] font-mono">
                  Used ({asset.usedIn.length})
                </span>
              )}
            </div>
            <div className="p-2.5 space-y-1">
              <p className="text-xs font-medium text-white truncate">{asset.name}</p>
              <p className="text-[10px] font-mono text-gray-400">{asset.dimensions.width}x{asset.dimensions.height} · {(asset.sizeBytes / 1024).toFixed(0)}KB</p>
            </div>
          </div>
        ))}
      </div>

      {/* Asset Detail Drawer */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-[#111827] border-l border-white/10 h-full p-6 flex flex-col justify-between shadow-2xl text-white">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-semibold text-sm truncate">{selectedAsset.name}</h3>
                <button onClick={() => setSelectedAsset(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="h-48 rounded-xl overflow-hidden bg-black/50 border border-white/10">
                <img src={selectedAsset.url} alt={selectedAsset.name} className="w-full h-full object-contain" />
              </div>

              <div className="space-y-2 text-xs font-mono bg-white/5 p-3.5 rounded-xl border border-white/5">
                <div className="flex justify-between"><span className="text-gray-400">Dimensions:</span><span>{selectedAsset.dimensions.width} x {selectedAsset.dimensions.height}px</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Size:</span><span>{(selectedAsset.sizeBytes / 1024).toFixed(1)} KB</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Folder:</span><span>{selectedAsset.folder}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Uploaded:</span><span>{selectedAsset.createdAt}</span></div>
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Alt Text</label>
                <input
                  type="text"
                  value={selectedAsset.altText}
                  onChange={e => {
                    const updated = { ...selectedAsset, altText: e.target.value };
                    mockStorage.saveMedia(updated);
                    setSelectedAsset(updated);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              {/* References Usage Check */}
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Used In ({selectedAsset.usedIn.length} places)</label>
                {selectedAsset.usedIn.length === 0 ? (
                  <p className="text-xs text-gray-500 font-mono">Not referenced anywhere yet.</p>
                ) : (
                  <div className="space-y-1">
                    {selectedAsset.usedIn.map((ref, idx) => (
                      <div key={idx} className="p-2 bg-white/5 rounded-lg text-xs flex items-center justify-between">
                        <span className="font-semibold text-white">{ref.title}</span>
                        <span className="text-[10px] font-mono text-blue-400 uppercase">{ref.entityType}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-2">
              <button
                onClick={() => handleCopyUrl(selectedAsset.url, selectedAsset.id)}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                {copiedId === selectedAsset.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === selectedAsset.id ? 'Copied!' : 'Copy URL'}
              </button>

              <button
                onClick={() => setShowDeleteWarning(selectedAsset)}
                className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 rounded-xl"
                title="Delete asset"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Alert Modal */}
      {showDeleteWarning && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-red-500/30 rounded-2xl w-full max-w-md p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-base">Warning: Asset In Use</h3>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              This asset is currently referenced in <strong className="text-white">{showDeleteWarning.usedIn.length} project(s) or post(s)</strong>. Deleting it will cause missing image references on public pages.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowDeleteWarning(null)} className="px-4 py-2 bg-white/5 rounded-xl text-xs">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-xl text-xs font-semibold">
                Delete Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
