import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GuideProfile } from '../../types';
import { 
  HeartHandshake, 
  Star, 
  ShieldCheck, 
  MapPin, 
  Languages, 
  Phone, 
  Navigation2, 
  Award,
  Search
} from 'lucide-react';
import { soundEffects } from '../../utils/audio';

export const GuideFinder: React.FC = () => {
  const { guides, handleGuideAcceptIncident, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredGuides = guides.filter(g => 
    g.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.languages.some(l => l.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleRequestGuide = (guide: GuideProfile) => {
    soundEffects.playSafeChime();
    handleGuideAcceptIncident('INC-1042', guide.id);
    addToast({
      title: 'Guide Escort Requested',
      description: `Request sent to ${guide.fullName}. Direct connection initiated.`,
      type: 'SAFE'
    });
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
              LOCAL EXPERTS
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">•</span>
            <span className="text-[11px] text-[var(--color-safe)] font-bold">VERIFIED GUIDES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mt-1">
            Find a Verified Local Guide
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed max-w-3xl">
            Connect with certified local guides who know the area perfectly. All guides are verified for your safety and peace of mind.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by guide name, language (Khasi, English, Hindi, Bengali), or trail specialization..."
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl glass-panel focus:border-[var(--accent-primary)]/60 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all shadow-sm"
        />
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGuides.map(guide => (
          <div
            key={guide.id}
            className="p-5 rounded-3xl glass-panel hover:border-[var(--accent-primary)]/40 transition-all flex flex-col justify-between shadow-xl group"
          >
            <div>
              {/* Top Profile Header */}
              <div className="flex items-start gap-3.5 mb-3.5">
                <div className="relative shrink-0">
                  <img
                    src={guide.avatarUrl}
                    alt={guide.fullName}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[var(--accent-primary)]/40 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[var(--bg-primary)] text-[var(--color-safe)]">
                    <ShieldCheck className="w-4 h-4 fill-[var(--color-safe)] text-[var(--bg-primary)]" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="text-sm font-bold text-[var(--text-primary)] truncate">{guide.fullName}</h3>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--accent-primary)]/15 text-[var(--color-safe)] font-mono border border-[var(--accent-primary)]/30">
                      {guide.badgeNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mt-1 text-xs text-[var(--color-moderate)]">
                    <Star className="w-3.5 h-3.5 fill-[var(--color-moderate)]" />
                    <span className="font-bold">{guide.rating}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">({guide.reviewCount} reviews)</span>
                  </div>

                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                    {guide.yearsOfExperience} yrs experience • <span className="text-[var(--color-safe)] font-semibold">{guide.status}</span>
                  </p>
                </div>
              </div>

              {/* Specialization & Languages */}
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5 text-xs">
                <p className="text-[var(--text-primary)] text-[11px] font-medium leading-relaxed">
                  🎯 {guide.specialization}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] flex-wrap">
                  <Languages className="w-3.5 h-3.5 text-[#60A5FA]" />
                  <span>{guide.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
              <a
                href={`tel:${guide.phone}`}
                className="p-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-[var(--text-primary)] border border-white/10 transition-colors"
                title="Call Guide"
              >
                <Phone className="w-4 h-4 text-[var(--color-safe)]" />
              </a>

              <button
                onClick={() => handleRequestGuide(guide)}
                className="flex-1 py-3 rounded-2xl bg-[var(--accent-primary)] hover:bg-[var(--color-safe)] text-[var(--bg-primary)] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[var(--accent-primary)]/15"
              >
                <Navigation2 className="w-3.5 h-3.5" />
                <span>Request Guide Escort</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
