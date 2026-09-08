import React, { useState } from 'react';
import { 
  Layers, Compass, GraduationCap, Award, MessageSquare, 
  ShieldAlert, Settings, User, Plus, Trash2, Edit, Save, Check 
} from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';
import { Experience, SkillCategory, Education, Certification, Testimonial } from '@/types/portfolio';

export const ExperienceManager: React.FC = () => {
  const [items, setItems] = useState<Experience[]>(mockStorage.getExperience());

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-[#222222] font-sans pb-28">
      <div className="pb-4 border-b border-black/8">
        <div className="text-[10px] font-mono tracking-widest text-[#ad314d] uppercase font-bold mb-1">
          CAREER & TRAJECTORY · TIMELINE CMS
        </div>
        <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight flex items-center gap-2">
          <Layers className="w-6 h-6 text-[#ad314d]" /> Work Experience & Career Milestones
        </h1>
        <p className="text-xs text-[#55555e] mt-1">Manage career milestones, roles, and achievements.</p>
      </div>
      <div className="space-y-4">
        {items.map(exp => (
          <div key={exp.id} className="p-5 rounded-2xl bg-[#0e131f] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">{exp.role} · <span className="text-blue-400">{exp.company}</span></h3>
                <p className="text-xs font-mono text-gray-400">{exp.startDate} - {exp.endDate} · {exp.location}</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed pt-1">{exp.description}</p>
            <div className="flex flex-wrap gap-1 pt-2">
              {exp.technologies.map((t, idx) => (
                <span key={idx} className="text-[10px] font-mono bg-white/5 text-gray-400 px-2 py-0.5 rounded">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkillsManager: React.FC = () => {
  const [categories, setCategories] = useState<SkillCategory[]>(mockStorage.getSkills());

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-[#222222] font-sans pb-28">
      <div className="pb-4 border-b border-black/8">
        <div className="text-[10px] font-mono tracking-widest text-[#ad314d] uppercase font-bold mb-1">
          CAPABILITIES & PROFICIENCY · RADAR CMS
        </div>
        <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight flex items-center gap-2">
          <Compass className="w-6 h-6 text-[#ad314d]" /> Technical Skills & Matrix
        </h1>
        <p className="text-xs text-[#55555e] mt-1">Proficiencies, framework categorizations, and featured radar skills.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="p-6 rounded-2xl bg-[#0e131f] border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">{cat.category}</h3>
            <div className="space-y-3">
              {cat.skills.map((s, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-200">{s.name}</span>
                    <span className="font-mono text-blue-400">{s.level}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CredentialsManager: React.FC = () => {
  const [education] = useState<Education[]>(mockStorage.getEducation());
  const [certifications] = useState<Certification[]>(mockStorage.getCertifications());
  const [testimonials] = useState<Testimonial[]>(mockStorage.getTestimonials());

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 text-[#222222] font-sans pb-28">
      <div className="pb-4 border-b border-black/8">
        <div className="text-[10px] font-mono tracking-widest text-[#ad314d] uppercase font-bold mb-1">
          VALIDATION & REPUTATION · TRUST REPOSITORY
        </div>
        <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight flex items-center gap-2">
          <Award className="w-6 h-6 text-[#ad314d]" /> Credentials & Endorsements
        </h1>
        <p className="text-xs text-[#55555e] mt-1">Formal education, verified certifications, and client endorsements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Education */}
        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-400" /> Education
          </h3>
          {education.map(edu => (
            <div key={edu.id} className="p-4 bg-white/2 rounded-xl border border-white/5 space-y-1">
              <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
              <p className="text-xs text-blue-400">{edu.institution} · {edu.location}</p>
              <p className="text-xs font-mono text-gray-400">{edu.year} · {edu.score}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" /> Certifications
          </h3>
          {certifications.map(c => (
            <div key={c.id} className="p-4 bg-white/2 rounded-xl border border-white/5 space-y-1">
              <h4 className="text-sm font-bold text-white">{c.name}</h4>
              <p className="text-xs text-gray-400">{c.issuer} · {c.issueDate}</p>
              <p className="text-[10px] font-mono text-gray-500">ID: {c.credentialId}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-400" /> Client Testimonials & Endorsements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map(t => (
            <div key={t.id} className="p-4 bg-white/2 rounded-xl border border-white/5 flex flex-col justify-between space-y-3">
              <p className="text-xs text-gray-300 italic leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="text-xs font-bold text-white">{t.name}</p>
                  <p className="text-[10px] text-gray-400">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ActivityLog: React.FC = () => {
  const revisions = mockStorage.getRevisions();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-[#222222] font-sans pb-28">
      <div className="pb-4 border-b border-black/8">
        <div className="text-[10px] font-mono tracking-widest text-[#ad314d] uppercase font-bold mb-1">
          GOVERNANCE & TELEMETRY · AUDIT ENGINE
        </div>
        <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-[#ad314d]" /> Audit & Activity Log
        </h1>
        <p className="text-xs text-[#55555e] mt-1">Chronological record of saves, theme activations, and content lifecycle transitions.</p>
      </div>

      <div className="bg-[#0e131f] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5 text-xs font-mono">
        {revisions.map(r => (
          <div key={r.id} className="p-4 flex items-center justify-between hover:bg-white/2">
            <div>
              <span className="text-blue-400 font-bold uppercase mr-3">[{r.entityType}]</span>
              <span className="text-white font-medium">{r.summary}</span>
            </div>
            <span className="text-gray-500">{new Date(r.timestamp).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProfileSettings: React.FC = () => {
  const [identity, setIdentity] = useState(mockStorage.getIdentity());
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    mockStorage.setIdentity(identity);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 text-[#222222] font-sans pb-28">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/8">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#ad314d] uppercase font-bold mb-1">
            IDENTITY & BRANDING · OWNER PROFILE
          </div>
          <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight flex items-center gap-2">
            <User className="w-6 h-6 text-[#ad314d]" /> Owner Profile & Brand Identity
          </h1>
          <p className="text-xs text-[#55555e] mt-1">Personal details, taglines, social links, and system flags.</p>
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2.5 bg-[#ad314d] hover:bg-[#8e253d] text-white rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved' : 'Save Profile'}
        </button>
      </div>

      <div className="bg-[#0e131f] border border-white/5 rounded-2xl p-6 space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 font-mono block mb-1">Full Name</label>
            <input
              type="text"
              value={identity.name}
              onChange={e => setIdentity({ ...identity, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-gray-400 font-mono block mb-1">Alias / Brand</label>
            <input
              type="text"
              value={identity.alias}
              onChange={e => setIdentity({ ...identity, alias: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
            />
          </div>
        </div>

        <div>
          <label className="text-gray-400 font-mono block mb-1">Primary Role Headline</label>
          <input
            type="text"
            value={identity.role}
            onChange={e => setIdentity({ ...identity, role: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
          />
        </div>

        <div>
          <label className="text-gray-400 font-mono block mb-1">Tagline</label>
          <input
            type="text"
            value={identity.tagline}
            onChange={e => setIdentity({ ...identity, tagline: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
          />
        </div>

        <div>
          <label className="text-gray-400 font-mono block mb-1">Bio</label>
          <textarea
            rows={4}
            value={identity.bio}
            onChange={e => setIdentity({ ...identity, bio: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
