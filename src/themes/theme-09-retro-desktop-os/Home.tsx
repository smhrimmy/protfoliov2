import React, { useState, useRef, useEffect } from 'react';
import { ThemePageProps } from '../_contracts/PageRenderer';
import { Folder, Terminal as TermIcon, FileText, Monitor, Settings, ExternalLink, X, Minus, Square } from 'lucide-react';

interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  content: 'projects' | 'about' | 'terminal' | 'skills' | 'contact';
}

export const Home: React.FC<ThemePageProps> = ({ identity, projects, experience, skillCategories, onNavigate, config }) => {
  const [activeWindow, setActiveWindow] = useState<string>('about');
  const [startMenuOpen, setStartMenuOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState<string[]>([
    'PDL DOS v4.11 (C) Copyright Prajwal DL 2026',
    'Type "help" for a list of internal commands.'
  ]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const [windows, setWindows] = useState<Record<string, WindowState>>({
    about: {
      id: 'about',
      title: 'PRAJWAL_BIO.TXT - Notepad',
      icon: 'txt',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 60,
      y: 40,
      width: 580,
      height: 420,
      zIndex: 10,
      content: 'about'
    },
    projects: {
      id: 'projects',
      title: 'C:\\Projects\\Featured_Systems',
      icon: 'folder',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 180,
      y: 90,
      width: 640,
      height: 460,
      zIndex: 11,
      content: 'projects'
    },
    terminal: {
      id: 'terminal',
      title: 'MS-DOS Prompt [80x25]',
      icon: 'exe',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 240,
      y: 140,
      width: 520,
      height: 360,
      zIndex: 12,
      content: 'terminal'
    },
    skills: {
      id: 'skills',
      title: 'System_Architecture_Stack.cfg',
      icon: 'cfg',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 120,
      y: 120,
      width: 540,
      height: 380,
      zIndex: 9,
      content: 'skills'
    },
    contact: {
      id: 'contact',
      title: 'Dial-Up Direct Connect / Inquiry',
      icon: 'modem',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 200,
      y: 160,
      width: 480,
      height: 340,
      zIndex: 8,
      content: 'contact'
    }
  });

  const [maxZ, setMaxZ] = useState(15);
  const dragRef = useRef<{ id: string; startX: number; startY: number; initX: number; initY: number } | null>(null);

  const focusWindow = (id: string) => {
    setActiveWindow(id);
    const nextZ = maxZ + 1;
    setMaxZ(nextZ);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: nextZ }
    }));
  };

  const toggleMinimize = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: !prev[id].isMinimized }
    }));
  };

  const toggleMaximize = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized }
    }));
  };

  const closeWindow = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    focusWindow(id);
    dragRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      initX: windows[id].x,
      initY: windows[id].y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const { id, startX, startY, initX, initY } = dragRef.current;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      setWindows(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          x: Math.max(0, initX + deltaX),
          y: Math.max(0, initY + deltaY)
        }
      }));
    };

    const handleMouseUp = () => {
      dragRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    const newLog = [...cliHistory, `C:\\PDL>${cliInput}`];

    if (cmd === 'help') {
      newLog.push('Available commands:');
      newLog.push('  dir         - List files and directories');
      newLog.push('  projects    - Open Projects folder');
      newLog.push('  bio         - Open Prajwal DL biographical note');
      newLog.push('  skills      - Show verified technical competencies');
      newLog.push('  contact     - Open direct message channel');
      newLog.push('  cls         - Clear console screen');
    } else if (cmd === 'cls') {
      setCliHistory([]);
      setCliInput('');
      return;
    } else if (cmd === 'dir') {
      newLog.push(' Volume in drive C has no label.');
      newLog.push(' Directory of C:\\PDL');
      newLog.push(' 09/07/2026  09:00 AM    <DIR>          .');
      newLog.push(' 09/07/2026  09:00 AM    <DIR>          ..');
      projects.forEach(p => {
        newLog.push(` 09/07/2026  10:00 AM           42,000  ${p.slug.toUpperCase()}.EXE`);
      });
    } else if (cmd === 'projects') {
      focusWindow('projects');
      newLog.push('Executing C:\\Projects\\Featured_Systems...');
    } else if (cmd === 'bio') {
      focusWindow('about');
      newLog.push('Loading PRAJWAL_BIO.TXT into Notepad...');
    } else if (cmd === 'skills') {
      focusWindow('skills');
      newLog.push('Parsing System_Architecture_Stack.cfg...');
    } else if (cmd === 'contact') {
      focusWindow('contact');
      newLog.push('Connecting COM1 56.6k modem...');
    } else if (cmd) {
      newLog.push(`Bad command or file name: ${cmd}`);
    }

    setCliHistory(newLog);
    setCliInput('');
  };

  const allSkills = skillCategories.flatMap(c => c.skills);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none font-mono text-xs"
      style={{ backgroundColor: config?.colorTokens.bgPrimary || '#008080' }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 grid grid-flow-col grid-rows-6 gap-6 z-0">
        <div
          onDoubleClick={() => focusWindow('about')}
          onClick={() => focusWindow('about')}
          className="flex flex-col items-center w-20 p-2 cursor-pointer hover:bg-blue-600/30 active:bg-blue-800/50 rounded text-white group"
        >
          <div className="w-10 h-10 mb-1 bg-white border border-black flex items-center justify-center shadow-md">
            <FileText className="w-6 h-6 text-blue-900" />
          </div>
          <span className="text-[11px] text-center drop-shadow px-1 bg-black/40 rounded group-hover:bg-blue-900 leading-tight">
            Bio.txt
          </span>
        </div>

        <div
          onDoubleClick={() => focusWindow('projects')}
          onClick={() => focusWindow('projects')}
          className="flex flex-col items-center w-20 p-2 cursor-pointer hover:bg-blue-600/30 active:bg-blue-800/50 rounded text-white group"
        >
          <div className="w-10 h-10 mb-1 bg-yellow-400 border border-black flex items-center justify-center shadow-md">
            <Folder className="w-6 h-6 text-yellow-900 fill-yellow-500" />
          </div>
          <span className="text-[11px] text-center drop-shadow px-1 bg-black/40 rounded group-hover:bg-blue-900 leading-tight">
            Projects
          </span>
        </div>

        <div
          onDoubleClick={() => focusWindow('terminal')}
          onClick={() => focusWindow('terminal')}
          className="flex flex-col items-center w-20 p-2 cursor-pointer hover:bg-blue-600/30 active:bg-blue-800/50 rounded text-white group"
        >
          <div className="w-10 h-10 mb-1 bg-black border border-gray-400 flex items-center justify-center shadow-md">
            <TermIcon className="w-6 h-6 text-green-400" />
          </div>
          <span className="text-[11px] text-center drop-shadow px-1 bg-black/40 rounded group-hover:bg-blue-900 leading-tight">
            MS-DOS.exe
          </span>
        </div>

        <div
          onDoubleClick={() => focusWindow('skills')}
          onClick={() => focusWindow('skills')}
          className="flex flex-col items-center w-20 p-2 cursor-pointer hover:bg-blue-600/30 active:bg-blue-800/50 rounded text-white group"
        >
          <div className="w-10 h-10 mb-1 bg-gray-200 border border-black flex items-center justify-center shadow-md">
            <Settings className="w-6 h-6 text-gray-700" />
          </div>
          <span className="text-[11px] text-center drop-shadow px-1 bg-black/40 rounded group-hover:bg-blue-900 leading-tight">
            Stack.cfg
          </span>
        </div>

        <div
          onDoubleClick={() => focusWindow('contact')}
          onClick={() => focusWindow('contact')}
          className="flex flex-col items-center w-20 p-2 cursor-pointer hover:bg-blue-600/30 active:bg-blue-800/50 rounded text-white group"
        >
          <div className="w-10 h-10 mb-1 bg-emerald-100 border border-black flex items-center justify-center shadow-md">
            <Monitor className="w-6 h-6 text-emerald-800" />
          </div>
          <span className="text-[11px] text-center drop-shadow px-1 bg-black/40 rounded group-hover:bg-blue-900 leading-tight">
            DialUp.mod
          </span>
        </div>

        <div
          onClick={() => onNavigate && onNavigate('/admin')}
          className="flex flex-col items-center w-20 p-2 cursor-pointer hover:bg-blue-600/30 active:bg-blue-800/50 rounded text-white group"
        >
          <div className="w-10 h-10 mb-1 bg-indigo-900 border border-white flex items-center justify-center shadow-md">
            <ExternalLink className="w-5 h-5 text-yellow-300" />
          </div>
          <span className="text-[11px] text-center drop-shadow px-1 bg-black/40 rounded group-hover:bg-blue-900 leading-tight">
            Admin OS
          </span>
        </div>
      </div>

      {/* Floating Retro Windows */}
      {Object.values(windows).map((win) => {
        if (!win.isOpen || win.isMinimized) return null;
        const isActive = activeWindow === win.id;

        return (
          <div
            key={win.id}
            onMouseDown={() => focusWindow(win.id)}
            style={{
              transform: win.isMaximized
                ? 'translate(0, 0)'
                : `translate(${win.x}px, ${win.y}px)`,
              width: win.isMaximized ? '100vw' : `${win.width}px`,
              height: win.isMaximized ? 'calc(100vh - 36px)' : `${win.height}px`,
              zIndex: win.zIndex
            }}
            className="absolute flex flex-col bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-black border-r-black shadow-2xl overflow-hidden"
          >
            {/* Window Titlebar */}
            <div
              onMouseDown={(e) => handleMouseDown(e, win.id)}
              className={`flex items-center justify-between px-2 py-1 select-none cursor-move ${
                isActive
                  ? 'bg-gradient-to-r from-[#000080] to-[#1084d0] text-white font-bold'
                  : 'bg-[#808080] text-gray-300 font-semibold'
              }`}
            >
              <div className="flex items-center space-x-2 truncate">
                <span className="text-xs">💾</span>
                <span className="text-xs truncate">{win.title}</span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMinimize(win.id); }}
                  className="w-5 h-5 bg-[#c0c0c0] text-black border-t border-l border-t-white border-l-white border-b border-r border-b-black border-r-black flex items-center justify-center hover:bg-gray-300"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMaximize(win.id); }}
                  className="w-5 h-5 bg-[#c0c0c0] text-black border-t border-l border-t-white border-l-white border-b border-r border-b-black border-r-black flex items-center justify-center hover:bg-gray-300"
                >
                  <Square className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                  className="w-5 h-5 bg-[#c0c0c0] text-black border-t border-l border-t-white border-l-white border-b border-r border-b-black border-r-black flex items-center justify-center hover:bg-red-500 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-y-auto p-3 bg-white text-black border-t border-l border-t-gray-600 border-l-gray-600 border-b border-r border-b-white border-r-white m-1">
              {win.content === 'about' && (
                <div className="space-y-4 font-mono text-[13px] leading-relaxed">
                  <div className="p-3 bg-blue-50 border border-blue-200">
                    <p className="font-bold text-blue-900">{identity.name} ({identity.alias})</p>
                    <p className="text-blue-700 text-xs">{identity.role} — {identity.location}</p>
                    <p className="text-gray-600 text-xs mt-1">Tagline: {identity.tagline}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 uppercase tracking-wider text-xs border-b border-gray-300 pb-1 mb-2">
                      Biographical Excerpt
                    </h4>
                    <p className="text-gray-700 whitespace-pre-line">{identity.bio}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="border border-gray-300 p-2 bg-gray-50">
                      <span className="text-[10px] uppercase text-gray-500 font-bold block">Years Building</span>
                      <span className="text-lg font-bold text-blue-900">{identity.stats.yearsBuilding}</span>
                    </div>
                    <div className="border border-gray-300 p-2 bg-gray-50">
                      <span className="text-[10px] uppercase text-gray-500 font-bold block">Projects Shipped</span>
                      <span className="text-lg font-bold text-blue-900">{identity.stats.projectsShipped}</span>
                    </div>
                  </div>
                </div>
              )}

              {win.content === 'projects' && (
                <div className="space-y-3">
                  <div className="text-xs text-gray-600 mb-2 border-b pb-1">
                    Displaying {projects.length} verified system builds.
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {projects.map(p => (
                      <div
                        key={p.id}
                        className="border border-gray-300 p-2 bg-gray-50 hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="font-bold text-sm text-blue-950">{p.title}</h4>
                          <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                            {p.role}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2 mt-1">{p.summary}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {p.technologies.slice(0, 3).map(tech => (
                            <span key={tech} className="text-[10px] bg-white border border-gray-300 px-1">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {win.content === 'terminal' && (
                <div className="bg-black text-green-400 p-2 font-mono h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-1">
                    {cliHistory.map((line, idx) => (
                      <div key={idx} className="whitespace-pre-wrap">{line}</div>
                    ))}
                  </div>
                  <form onSubmit={handleCommand} className="flex items-center mt-2 border-t border-green-900 pt-1">
                    <span className="text-green-500 mr-1">C:\PDL&gt;</span>
                    <input
                      type="text"
                      value={cliInput}
                      onChange={(e) => setCliInput(e.target.value)}
                      className="flex-1 bg-transparent text-green-400 outline-none font-mono"
                      autoFocus
                    />
                  </form>
                </div>
              )}

              {win.content === 'skills' && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-600 border-b pb-1">
                    Core competency manifest &amp; platform runtime specifications.
                  </p>
                  <div className="space-y-3">
                    {allSkills.map(sk => (
                      <div key={sk.name} className="border border-gray-300 p-2 bg-gray-50">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-xs">{sk.name}</span>
                          <span className="text-[10px] text-gray-500">{sk.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 border border-gray-400 overflow-hidden">
                          <div
                            className="bg-blue-700 h-full"
                            style={{ width: `${sk.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {win.content === 'contact' && (
                <div className="p-2 space-y-4">
                  <div className="bg-yellow-50 border border-yellow-300 p-3 text-xs">
                    <p className="font-bold text-yellow-900">Direct Inbound Channel</p>
                    <p className="text-yellow-800 mt-1">
                      Ready for architecture audits, engineering contracts, and advisory roles.
                    </p>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 border bg-gray-50">
                      <span className="text-gray-500">EMAIL:</span>
                      <span className="font-bold text-blue-900">{identity.socialLinks.email}</span>
                    </div>
                    <div className="flex justify-between p-2 border bg-gray-50">
                      <span className="text-gray-500">LOCATION:</span>
                      <span className="font-bold text-gray-800">{identity.location}</span>
                    </div>
                    <div className="flex justify-between p-2 border bg-gray-50">
                      <span className="text-gray-500">GITHUB:</span>
                      <span className="font-bold text-blue-900">{identity.socialLinks.github}</span>
                    </div>
                    <div className="flex justify-between p-2 border bg-gray-50">
                      <span className="text-gray-500">LINKEDIN:</span>
                      <span className="font-bold text-blue-900">{identity.socialLinks.linkedin}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Start Menu Dropdown */}
      {startMenuOpen && (
        <div className="absolute bottom-9 left-1 w-64 bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-black border-r-black shadow-2xl z-50 flex">
          <div className="w-8 bg-gradient-to-t from-blue-950 to-blue-800 flex items-end justify-center pb-3">
            <span className="transform -rotate-90 text-white font-bold tracking-widest text-sm whitespace-nowrap">
              PRAJWAL DL 95
            </span>
          </div>
          <div className="flex-1 p-2 space-y-1">
            <button
              onClick={() => { focusWindow('projects'); setStartMenuOpen(false); }}
              className="w-full text-left px-2 py-1.5 hover:bg-[#000080] hover:text-white flex items-center space-x-2"
            >
              <Folder className="w-4 h-4 text-yellow-600" />
              <span>Projects Folder</span>
            </button>
            <button
              onClick={() => { focusWindow('about'); setStartMenuOpen(false); }}
              className="w-full text-left px-2 py-1.5 hover:bg-[#000080] hover:text-white flex items-center space-x-2"
            >
              <FileText className="w-4 h-4 text-blue-700" />
              <span>About &amp; Resume</span>
            </button>
            <button
              onClick={() => { focusWindow('terminal'); setStartMenuOpen(false); }}
              className="w-full text-left px-2 py-1.5 hover:bg-[#000080] hover:text-white flex items-center space-x-2"
            >
              <TermIcon className="w-4 h-4 text-gray-800" />
              <span>MS-DOS Command</span>
            </button>
            <button
              onClick={() => { focusWindow('skills'); setStartMenuOpen(false); }}
              className="w-full text-left px-2 py-1.5 hover:bg-[#000080] hover:text-white flex items-center space-x-2"
            >
              <Settings className="w-4 h-4 text-gray-600" />
              <span>System Stack</span>
            </button>
            <div className="border-t border-gray-400 my-1" />
            <button
              onClick={() => { onNavigate && onNavigate('/admin'); setStartMenuOpen(false); }}
              className="w-full text-left px-2 py-1.5 hover:bg-[#000080] hover:text-white flex items-center space-x-2"
            >
              <ExternalLink className="w-4 h-4 text-purple-700" />
              <span>Open Admin OS</span>
            </button>
          </div>
        </div>
      )}

      {/* Retro Bottom Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-9 bg-[#c0c0c0] border-t-2 border-t-white flex items-center px-1 z-40 justify-between select-none">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className={`px-2 py-1 font-bold text-xs flex items-center space-x-1.5 border-t border-l border-t-white border-l-white border-b-2 border-r-2 border-b-black border-r-black active:border-inset ${
              startMenuOpen ? 'bg-gray-300 border-inset' : 'bg-[#c0c0c0]'
            }`}
          >
            <div className="w-3.5 h-3.5 bg-red-600 grid grid-cols-2 gap-0.5 p-0.5">
              <div className="bg-red-300" />
              <div className="bg-blue-300" />
              <div className="bg-yellow-300" />
              <div className="bg-green-300" />
            </div>
            <span>Start</span>
          </button>

          <div className="h-6 w-[2px] bg-gray-400 mx-1 border-r border-white" />

          {/* Window Buttons */}
          <div className="flex items-center space-x-1">
            {Object.values(windows).map((win) => {
              if (!win.isOpen) return null;
              const isWinActive = activeWindow === win.id && !win.isMinimized;
              return (
                <button
                  key={win.id}
                  onClick={() => {
                    if (win.isMinimized) {
                      focusWindow(win.id);
                    } else if (activeWindow === win.id) {
                      toggleMinimize(win.id);
                    } else {
                      focusWindow(win.id);
                    }
                  }}
                  className={`max-w-[140px] truncate px-2 py-1 text-xs text-left border-t border-l border-t-white border-l-white border-b-2 border-r-2 border-b-black border-r-black ${
                    isWinActive ? 'bg-gray-300 font-bold border-inset' : 'bg-[#c0c0c0]'
                  }`}
                >
                  {win.title.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tray Clock */}
        <div className="flex items-center space-x-2 px-2 py-0.5 border-t border-l border-t-gray-600 border-l-gray-600 border-b border-r border-b-white border-r-white bg-gray-200">
          <span className="text-[10px]">🔊</span>
          <span className="text-[11px] font-mono">{currentTime}</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
