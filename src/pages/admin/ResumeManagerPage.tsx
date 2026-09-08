import React, { useState } from 'react';
import { FileText, Printer, QrCode, Download, ExternalLink, Check, Copy, X } from 'lucide-react';
import { mockStorage } from '@/data/mockStorage';

interface ResumeManagerPageProps {
  onNavigate?: (route: string) => void;
}

export const ResumeManagerPage: React.FC<ResumeManagerPageProps> = ({ onNavigate }) => {
  const identity = mockStorage.getIdentity();
  const experience = mockStorage.getExperience();
  const skills = mockStorage.getSkills();
  const education = mockStorage.getEducation();
  const certs = mockStorage.getCertifications();

  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const copyResumeLink = () => {
    const url = `${window.location.origin}/resume`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-gray-100 font-sans pb-24">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Executive Resume & Print Suite</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">Print-ready ATS curriculum vitae, recruiter links, and interactive QR generator.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowQrModal(true)}
            className="px-3.5 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <QrCode className="w-3.5 h-3.5" /> Share QR Code
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-600/20"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save PDF
          </button>
          {onNavigate && (
            <button
              onClick={() => onNavigate('/resume/print')}
              className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Clean Print View
            </button>
          )}
        </div>
      </div>

      {/* Resume Document Canvas (A4 simulation) */}
      <div className="bg-white text-gray-900 rounded-2xl shadow-2xl max-w-4xl mx-auto p-8 sm:p-12 space-y-8 font-sans border border-gray-200">
        {/* Header */}
        <div className="border-b-2 border-gray-900 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-950 uppercase">{identity.name}</h1>
            <p className="text-sm font-bold text-[#ad314d] mt-1 uppercase tracking-wider">{identity.role}</p>
            <p className="text-xs text-gray-600 mt-1">{identity.tagline}</p>
          </div>
          <div className="text-xs text-gray-700 sm:text-right space-y-0.5 font-mono">
            <p className="font-bold text-gray-900">{identity.socialLinks.phone || '+918105561638'}</p>
            <p>{identity.socialLinks.email}</p>
            <p>linkedin.com/in/prajwal-d-l-118198370/</p>
            <p>{identity.socialLinks.website}</p>
            <p className="font-semibold text-gray-900">{identity.location}</p>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1">Summary</h2>
          <p className="text-xs text-gray-700 leading-relaxed">{identity.bio}</p>
        </div>

        {/* Skills */}
        <div className="space-y-2.5">
          <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Technical Troubleshooting',
              'WordPress Support',
              'DNS Management',
              'Frontend Development',
              'UI/UX Design',
              'Problem-Solving',
              'Communication',
              'Multitasking',
              'Quick Learner',
              'Microsoft Excel'
            ].map((sk, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 border border-gray-300 text-gray-800 text-xs font-medium rounded-md shadow-xs">
                {sk}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1">Experience</h2>
          <div className="space-y-5">
            {experience.map(exp => (
              <div key={exp.id} className="space-y-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-gray-950">{exp.company}</h3>
                    <p className="text-xs font-semibold text-[#ad314d]">{exp.role}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-gray-700 block font-semibold">{exp.startDate} – {exp.endDate}</span>
                    <span className="text-[11px] text-gray-500 font-mono">{exp.location}</span>
                  </div>
                </div>
                <ul className="list-disc list-outside pl-4 text-xs text-gray-800 space-y-1 leading-relaxed">
                  {exp.achievements && exp.achievements.length > 0 ? (
                    exp.achievements.map((ach, idx) => (
                      <li key={idx}>{ach}</li>
                    ))
                  ) : (
                    <li>{exp.description}</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-gray-200">
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1">Academic Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="text-xs space-y-0.5">
                <p className="font-bold text-gray-900">{edu.degree}</p>
                <p className="text-gray-600">{edu.institution} · {edu.year}</p>
                {edu.score && <p className="font-mono text-blue-700">{edu.score}</p>}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-b border-gray-300 pb-1">Accreditations & Honors</h2>
            {certs.map(cert => (
              <div key={cert.id} className="text-xs space-y-0.5">
                <p className="font-bold text-gray-900">{cert.name}</p>
                <p className="text-gray-600">{cert.issuer} ({cert.issueDate})</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QR Code Modal (Section 16.8) */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e131f] border border-white/10 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-purple-400" /> Shareable Resume QR
              </h3>
              <button onClick={() => setShowQrModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-white rounded-2xl w-48 h-48 mx-auto flex items-center justify-center shadow-inner">
              {/* Simulated crisp high-contrast SVG QR matrix */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-gray-950 fill-current">
                <rect x="10" y="10" width="24" height="24" rx="4" />
                <rect x="14" y="14" width="16" height="16" fill="white" />
                <rect x="18" y="18" width="8" height="8" rx="2" />

                <rect x="66" y="10" width="24" height="24" rx="4" />
                <rect x="70" y="14" width="16" height="16" fill="white" />
                <rect x="74" y="18" width="8" height="8" rx="2" />

                <rect x="10" y="66" width="24" height="24" rx="4" />
                <rect x="14" y="70" width="16" height="16" fill="white" />
                <rect x="18" y="74" width="8" height="8" rx="2" />

                <rect x="42" y="14" width="6" height="12" />
                <rect x="52" y="14" width="8" height="6" />
                <rect x="42" y="32" width="16" height="6" />
                <rect x="14" y="44" width="12" height="6" />
                <rect x="32" y="44" width="10" height="16" />
                <rect x="48" y="48" width="14" height="8" />
                <rect x="68" y="44" width="18" height="6" />
                <rect x="44" y="66" width="6" height="20" />
                <rect x="56" y="70" width="16" height="6" />
                <rect x="62" y="82" width="18" height="6" />
              </svg>
            </div>

            <p className="text-xs text-gray-300">
              Scan to inspect {identity.name}'s verified online credentials & portfolio.
            </p>

            <button
              onClick={copyResumeLink}
              className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedLink ? 'Link Copied!' : 'Copy Direct URL'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
