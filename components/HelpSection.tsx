'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, AlertCircle, Radio, Settings, Power, HelpCircle as HelpIcon } from 'lucide-react';

interface HelpItem {
  id: string;
  title: string;
  symptom: string;
  solution: string;
  protocolId: string;
}

interface HelpProps {
  onEmergencySignal?: (message: string) => void;
}

export default function HelpSection({ onEmergencySignal }: HelpProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [signalSent, setSignalSent] = useState(false);

  const helpItems: HelpItem[] = [
    {
      id: 'lenis-jank',
      title: 'Lenis Smooth-Scroll Easing Calibrations',
      symptom: 'Noticeable frame drops or structural micro-stuttering upon heavy trackpad swipe gestures.',
      solution: 'Adjust Lenis wheelMultiplier coefficient down to 0.8. Ensure native GPU composition is activated on your terminal window (e.g., chrome://flags/#enable-gpu-rasterization). Smooth scroll runs on primary requestAnimationFrame routines and is sensitive to hardware throttles.',
      protocolId: 'PRTCOL_L_SCROLL_V1'
    },
    {
      id: 'gsap-sync',
      title: 'GSAP ScrollTrigger Tick Sync',
      symptom: 'Elements appearing off-screen or drift calculations lagging trailing scroll limits.',
      solution: 'Execute ScrollTrigger.update() on every Lenis frame draw event. Ensure ScrollTrigger.refresh() is executed once dynamic DOM expansion completes. Set `gsap.ticker.lagSmoothing(0)` to disable chronological delay compensation inside heavy loops.',
      protocolId: 'PRTCOL_G_TRIGGER_V2'
    },
    {
      id: 'telemetry-delay',
      title: 'Real-Time Telemetry Matrix Delays',
      symptom: 'Heat peaks, Mach counts, and G-Force curves lagging physical altitude drops.',
      solution: 'Recalibrate the local window scrolling event listener. The state tracker computes heights relative to current view constraints. Ensure passive events are optimized: `window.addEventListener("scroll", callback, { passive: true })` to prevent micro-delays.',
      protocolId: 'PRTCOL_T_MATRIX_V9'
    }
  ];

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const triggerEmergencySignal = () => {
    setSignalSent(true);
    const alarmMsg = "EMERGENCY_SUPPORT_TRANSCEIVER: Diagnostic distress beacon dispatched. Autonomous repair threads mobilized.";
    
    if (onEmergencySignal) {
      onEmergencySignal(alarmMsg);
    }

    setTimeout(() => {
      setSignalSent(false);
    }, 4000);
  };

  return (
    <div className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800 rounded-lg p-6 md:p-8 space-y-6 shadow-[0_0_20px_rgba(245,158,11,0.05)] bento-reveal group">
      
      {/* Panel Header */}
      <div className="flex justify-between items-start border-b border-neutral-900 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <HelpIcon className="h-5 w-5 text-amber-500 animate-pulse" />
            <h3 className="text-base font-mono font-bold text-white uppercase tracking-wider">SYSTEM TROUBLESHOOTING SHELL</h3>
          </div>
          <p className="text-xs text-neutral-500 font-mono">[OPERATOR::Calibrations Manual]</p>
        </div>
        <span className="text-[9px] font-mono bg-amber-950/40 text-amber-500 px-2.5 py-0.5 rounded border border-amber-800/30">SUPPORT_OPERATIONAL</span>
      </div>

      <p className="text-xs text-neutral-400 font-sans leading-relaxed">
        When automatic flight algorithms experience atmospheric drift, operators can diagnose frame timings and matrix calculation issues manually. Click a terminal segment to view solution keys:
      </p>

      {/* Accordion List */}
      <div className="space-y-3">
        {helpItems.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div 
              key={item.id}
              className={`border rounded overflow-hidden transition-all duration-300 ${
                isExpanded ? 'border-amber-500/40 bg-neutral-900/30' : 'border-neutral-900 bg-neutral-950/40 hover:border-neutral-800'
              }`}
            >
              {/* Accordion Trigger Button */}
              <button
                onClick={() => handleToggle(item.id)}
                className="w-full px-4 py-3.5 flex justify-between items-center text-left font-mono text-xs text-white selection:bg-transparent"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${isExpanded ? 'bg-amber-400' : 'bg-neutral-600'}`} />
                  <span className="font-bold tracking-wide">{item.title}</span>
                </div>
                {isExpanded ? <ChevronUp className="h-4 w-4 text-amber-400" /> : <ChevronDown className="h-4 w-4 text-neutral-500" />}
              </button>

              {/* Accordion Content with responsive collapse and slide-down animations */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-4 pb-4 pt-1 font-sans text-xs space-y-3 border-t border-neutral-900/40">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-neutral-500 block uppercase font-extrabold">Reported Symptom:</span>
                        <p className="text-neutral-300 bg-black/30 border border-neutral-900/60 p-2 rounded text-[11px] leading-relaxed">
                          {item.symptom}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-amber-500 block uppercase font-extrabold">Calibration Key:</span>
                        <p className="text-neutral-400 text-[11px] leading-relaxed">
                          {item.solution}
                        </p>
                      </div>

                      <div className="flex justify-between items-center text-[9px] font-mono text-neutral-600 pt-1">
                        <span>GUIDE: {item.protocolId}</span>
                        <span className="text-amber-500/80">REPAIR_INDEX: SECURE_1</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* EMERGENCY TRANSCEIVER TRIGGER BUTTON */}
      <div className="pt-4 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-left max-w-sm">
          <span className="font-mono font-bold text-white block">SUPPORT BEACON LINK</span>
          <p className="text-[10px] text-neutral-500 mt-0.5 leading-relaxed font-sans">Dispatches automated high-priority micro-wavelength distress packets matching telemetry codes.</p>
        </div>

        <button
          onClick={triggerEmergencySignal}
          disabled={signalSent}
          className={`font-mono text-xs font-bold uppercase tracking-wider px-5 py-3 rounded border text-center transition-all duration-300 w-full md:w-auto relative overflow-hidden cursor-pointer ${
            signalSent
              ? 'bg-rose-950/30 border-rose-500/70 text-rose-400 shadow-[0_0_15px_rgba(239,68,68,0.25)]'
              : 'bg-neutral-950 text-amber-400 border-amber-500/30 hover:border-amber-400 hover:text-amber-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]'
          }`}
        >
          {signalSent ? (
            <span className="flex items-center gap-1.5 justify-center">
              <Radio className="h-4.5 w-4.5 animate-spin" />
              SENDING DETECTOR DISTRESS...
            </span>
          ) : (
            <span className="flex items-center gap-1.5 justify-center">
              <Power className="h-4.5 w-4.5 animate-pulse text-amber-500" />
              EMERGENCY TRANSCEIVER SOURCE LINK
            </span>
          )}
        </button>
      </div>

    </div>
  );
}
