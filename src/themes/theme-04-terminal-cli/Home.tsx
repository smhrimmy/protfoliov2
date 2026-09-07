import React, { useState, useRef, useEffect } from 'react';
import { ThemePageProps } from '@/themes/_contracts/PageRenderer';

interface TerminalLine {
  text: string;
  type: 'cmd' | 'output' | 'error' | 'header';
}

export const Home: React.FC<ThemePageProps> = ({ identity, projects, onNavigate }) => {
  const [inputVal, setInputVal] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: '====================================================================', type: 'header' },
    { text: `  ${identity.name.toUpperCase()} // PORTFOLIO CLI OPERATING SYSTEM (v2.0)`, type: 'header' },
    { text: `  Role: ${identity.role} | Location: ${identity.location}`, type: 'header' },
    { text: '====================================================================', type: 'header' },
    { text: 'Type "help" to list available commands, or "ls" to inspect directory tree.', type: 'output' }
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newLines: TerminalLine[] = [...lines, { text: `user@pdl-os:~$ ${inputVal}`, type: 'cmd' }];

    if (cmd === 'help') {
      newLines.push({ text: 'Available commands:', type: 'output' });
      newLines.push({ text: '  ls              List directories and projects', type: 'output' });
      newLines.push({ text: '  cat bio         Read operator background & manifesto', type: 'output' });
      newLines.push({ text: '  cat skills      View technical competencies', type: 'output' });
      newLines.push({ text: '  open <project>  Navigate to project case study (e.g. open nova-clinics)', type: 'output' });
      newLines.push({ text: '  contact         Print communication coordinates', type: 'output' });
      newLines.push({ text: '  clear           Wipe terminal scroll buffer', type: 'output' });
    } else if (cmd === 'ls') {
      newLines.push({ text: 'DIRECTORY: /portfolio', type: 'output' });
      projects.forEach((p, idx) => {
        newLines.push({ text: `  drwxr-xr-x  0${idx + 1}  ${p.slug.padEnd(18)}  "${p.title}"`, type: 'output' });
      });
    } else if (cmd === 'cat bio') {
      newLines.push({ text: `BIO: ${identity.bio}`, type: 'output' });
      newLines.push({ text: `STATS: Shipped: ${identity.stats.projectsShipped} | Revenue: ${identity.stats.revenueInfluenced}`, type: 'output' });
    } else if (cmd === 'cat skills') {
      newLines.push({ text: 'CORE SKILLS: React 19, TypeScript, Three.js, WebGL, Python, FastAPI, Agentic AI', type: 'output' });
    } else if (cmd === 'contact') {
      newLines.push({ text: `EMAIL:    ${identity.socialLinks.email}`, type: 'output' });
      newLines.push({ text: `GITHUB:   ${identity.socialLinks.github}`, type: 'output' });
      newLines.push({ text: `LINKEDIN: ${identity.socialLinks.linkedin}`, type: 'output' });
    } else if (cmd === 'clear') {
      setLines([]);
      setInputVal('');
      return;
    } else if (cmd.startsWith('open ')) {
      const slug = cmd.replace('open ', '').trim();
      const proj = projects.find(p => p.slug === slug || p.title.toLowerCase() === slug);
      if (proj) {
        newLines.push({ text: `Opening case study for ${proj.title}...`, type: 'output' });
        setTimeout(() => onNavigate(`/projects/${proj.slug}`), 400);
      } else {
        newLines.push({ text: `Project "${slug}" not found. Type "ls" to view slugs.`, type: 'error' });
      }
    } else {
      newLines.push({ text: `command not found: ${cmd}. Type "help" for command directory.`, type: 'error' });
    }

    setLines(newLines);
    setInputVal('');
  };

  return (
    <div className="min-h-screen bg-[#0c1017] text-[#4ade80] font-mono p-6 select-text">
      <div className="max-w-4xl mx-auto border border-[#1e293b] rounded-xl bg-[#161b22] p-6 shadow-2xl min-h-[85vh] flex flex-col justify-between">
        <div className="space-y-1.5 overflow-y-auto">
          {lines.map((l, i) => (
            <div
              key={i}
              className={`text-xs leading-relaxed ${
                l.type === 'header' ? 'text-[#22c55e] font-bold' :
                l.type === 'cmd' ? 'text-white' :
                l.type === 'error' ? 'text-red-400' :
                'text-[#86efac]'
              }`}
            >
              {l.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input prompt */}
        <form onSubmit={handleCommand} className="mt-4 pt-3 border-t border-[#1e293b] flex items-center gap-2">
          <span className="text-white text-xs select-none">user@pdl-os:~$</span>
          <input
            autoFocus
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            className="flex-1 bg-transparent text-xs text-white focus:outline-none font-mono caret-[#22c55e]"
          />
        </form>
      </div>
    </div>
  );
};
