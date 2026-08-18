import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Navigation, 
  HeartHandshake, 
  Hospital, 
  AlertTriangle, 
  Compass,
  CornerDownLeft
} from 'lucide-react';
import { soundEffects } from '../../utils/audio';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionTag?: string;
  data?: any;
}

export const AiSafetyAssistant: React.FC = () => {
  const { tourist, activeZone, weather, guides, emergencyResources, trip, setActiveTab, triggerEmergencySos } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_1',
      sender: 'assistant',
      text: `Hello Varun! I am your AI Safety Guardian. I am actively monitoring your Shillong → Cherrapunji route, geo-fences, and weather telemetry. Ask me anything about your current safety status.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState<string>('');

  const quickPrompts = [
    'Am I safe right now?',
    'Where is my nearest hospital?',
    'Show me safer route recommendations',
    'Where is my assigned guide?',
    'What should I do in heavy rain?'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    soundEffects.playSafeChime();
    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Generate intelligent domain-specific safety responses
    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('safe') || lower.includes('score')) {
        reply = `Your current Safety Score is ${tourist.safetyScore}/100 (${tourist.safetyTier}). You are in the ${activeZone.name}. ${
          tourist.safetyTier === 'SAFE'
            ? 'All verified safety parameters (5G cell coverage, police presence, emergency proximity) are nominal.'
            : 'Caution advised: Terrain is rugged and cell signal is intermittent. Stick strictly to National Highway 106.'
        }`;
      } else if (lower.includes('hospital') || lower.includes('medical') || lower.includes('doctor')) {
        const h = emergencyResources.find(r => r.type === 'HOSPITAL') || emergencyResources[1];
        reply = `Nearest trauma center is ${h.name} located at ${h.locationName} (~${h.distanceKm} km away, ETA: ${h.etaMinutes} mins). Contact number: ${h.contactNumber}.`;
      } else if (lower.includes('route') || lower.includes('road') || lower.includes('path')) {
        reply = `Recommended corridor: "${trip.selectedRoute.name}". Distance: ${trip.selectedRoute.distanceKm} km, ETA: ${trip.selectedRoute.durationMinutes} mins. This route is fully covered by solar police posts and 5G emergency coverage.`;
      } else if (lower.includes('guide') || lower.includes('escort')) {
        const g = guides[0];
        reply = `Verified Eco-Guide ${g.fullName} (${g.badgeNumber}) is stationed 1.2 km from your GPS location. Rating: ${g.rating}⭐ with Khasi, English & Hindi fluency.`;
      } else if (lower.includes('weather') || lower.includes('rain') || lower.includes('fog')) {
        reply = `Current weather: ${weather.condition} (${weather.tempC}°C, Humidity: ${weather.humidityPct}%). ${weather.advisory}. Keep rain protection ready.`;
      } else if (lower.includes('where') || lower.includes('location')) {
        reply = `You are at GPS (${tourist.currentLocation.lat.toFixed(4)}, ${tourist.currentLocation.lng.toFixed(4)}) in ${tourist.currentLocationName}. Active Geo-Zone: ${activeZone.name}.`;
      } else {
        reply = `I am continuously tracking your active itinerary from Shillong to Cherrapunji. Your digital ID ${tourist.digitalId} is active, and emergency responders are synchronized with your GPS beacon.`;
      }

      const botMsg: Message = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 400);
  };

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-300 max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[#A78BFA]/30 flex items-center justify-between shadow-lg shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#120F18] border border-[#A78BFA]/50 flex items-center justify-center text-[#C084FC]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">AI Safety Assistant</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#A78BFA]/15 border border-[#A78BFA]/30 text-[#C084FC] font-semibold">
                Domain Specific
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)]">Trained on Meghalaya topography, geo-fences, and emergency protocols</p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-[var(--color-safe)] px-2.5 py-1 rounded-full bg-[var(--color-safe)]/10 border border-[var(--color-safe)]/30">
          Telemetry Synced
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3 p-4 rounded-2xl bg-[#101510] border border-white/10">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-[#171220] border border-[#A78BFA]/40 flex items-center justify-center text-[#C084FC] shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)] font-medium rounded-tr-none'
                : 'bg-[var(--bg-primary)] border border-white/10 text-[var(--text-primary)] rounded-tl-none'
            }`}>
              <p>{msg.text}</p>
              <span className={`text-[9px] block mt-1.5 font-mono ${msg.sender === 'user' ? 'text-[var(--bg-primary)]/70 text-right' : 'text-[var(--text-muted)]'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0 scrollbar-none">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSend(qp)}
            className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all whitespace-nowrap"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="relative shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask AI about routes, safety score, hospital ETA, or weather..."
          className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-[var(--bg-primary)] border border-white/15 focus:border-[#A78BFA] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none shadow-xl transition-all"
        />
        <button
          onClick={() => handleSend()}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-[#A78BFA] hover:bg-[#C084FC] text-[var(--bg-primary)] font-bold transition-transform active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
