'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Flame, Compass, Activity, ArrowDown, HelpCircle, Server } from 'lucide-react';

interface TelemetryMetrics {
  altitude: number;
  velocity: number;
  temperature: number;
  gForce: number;
  progress: number;
  phase: string;
  status: 'SAFE' | 'WARNING' | 'CRITICAL' | 'LANDED';
}

export default function AltitudeHUD() {
  const [metrics, setMetrics] = useState<TelemetryMetrics>({
    altitude: 120000,
    velocity: 27500,
    temperature: 25,
    gForce: 0.0,
    progress: 0,
    phase: 'EXOSPHERE ENTRY',
    status: 'SAFE',
  });

  const [activeTab, setActiveTab] = useState<'TELEMETRY' | 'DIAGNOSTICS' | 'MISSION'>('TELEMETRY');

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const p = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);

      // Calculation of telemetry metrics matching atmospheric descent physics beautifully
      const altitude = Math.max(0, Math.round(120000 * (1 - p)));
      
      // Deceleration curve: speed slumps as atmospheric thickness increases
      const velocity = Math.round(27488 * Math.pow(1 - p, 1.8) + 12);
      
      // Temperature curve: starts at 25C, peaks at ~1850C in Ionosphere (p ~ 0.45) then drops to ~65C at ground level
      const tempSin = Math.sin(p * Math.PI);
      const temperature = Math.round(25 + 1825 * Math.pow(tempSin, 1.3) * (1 - p * 0.4));
      
      // G-force peaks near max deceleration in upper stratosphere
      const gForce = parseFloat((Math.pow(tempSin, 1.5) * 5.8 + (p >= 0.98 ? 1.0 : p * 0.8)).toFixed(1));

      // Flight phase determination
      let phase = 'EXOSPHERE ENTRY';
      let status: 'SAFE' | 'WARNING' | 'CRITICAL' | 'LANDED' = 'SAFE';

      if (p < 0.22) {
        phase = '01 // EXOSPHERE DESCENT';
        status = 'SAFE';
      } else if (p >= 0.22 && p < 0.48) {
        phase = '02 // PLASMA IONIZATION';
        status = temperature > 1500 ? 'CRITICAL' : 'WARNING';
      } else if (p >= 0.48 && p < 0.72) {
        phase = '03 // STRATO DECELERATION';
        status = 'WARNING';
      } else if (p >= 0.72 && p < 0.92) {
        phase = '04 // DECK OPERATIONS SYNC';
        status = 'SAFE';
      } else {
        phase = p >= 0.99 ? '06 // TOUCHDOWN SECURED' : '05 // SURFACE COUPLING';
        status = p >= 0.99 ? 'LANDED' : 'SAFE';
      }

      setMetrics({
        altitude,
        velocity,
        temperature,
        gForce,
        progress: p,
        phase,
        status,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger initially
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <>
      {/* Top Progress bar and flight phase */}
      <div id="hud-top-bar" className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/85 backdrop-blur-md border-b border-cyan-500/20 px-6 py-3 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                metrics.status === 'SAFE' ? 'bg-cyan-400' :
                metrics.status === 'WARNING' ? 'bg-amber-400' :
                metrics.status === 'CRITICAL' ? 'bg-rose-500' : 'bg-green-400'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                metrics.status === 'SAFE' ? 'bg-cyan-500' :
                metrics.status === 'WARNING' ? 'bg-amber-500' :
                metrics.status === 'CRITICAL' ? 'bg-rose-600' : 'bg-green-500'
              }`}></span>
            </span>
            <span className="text-neutral-400 font-medium">MISSION PILOT HUD</span>
            <span className="text-neutral-600">|</span>
            <span className="text-cyan-400 font-bold tracking-widest">{metrics.phase}</span>
          </div>

          {/* Core progress layout bar */}
          <div className="flex items-center gap-4 w-full md:w-96">
            <span className="text-[10px] text-neutral-500">APOAPSIS</span>
            <div className="relative h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-100 ease-out ${
                  metrics.status === 'CRITICAL' ? 'bg-rose-500' :
                  metrics.status === 'WARNING' ? 'bg-amber-400' : 'bg-cyan-400'
                }`}
                style={{ width: `${metrics.progress * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-neutral-500">PERIAPSIS</span>
            <span className="text-[10px] text-cyan-400 font-bold min-w-[32px] text-right">
              {Math.round(metrics.progress * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Floating HUD Right Panel (Glassmorphic Telemetry Deck) */}
      <div id="hud-right-panel" className="fixed right-6 top-24 bottom-6 w-80 z-50 hidden xl:flex flex-col gap-4 font-mono">
        <div className="bg-neutral-950/85 backdrop-blur-xl border border-cyan-500/20 rounded-lg p-5 flex flex-col flex-1 shadow-[0_0_20px_rgba(6,182,212,0.15)] select-none">
          {/* Header tabs */}
          <div className="flex border-b border-neutral-800 pb-3 mb-4 text-[10px]">
            {(['TELEMETRY', 'DIAGNOSTICS', 'MISSION'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center py-1 transition-colors relative ${
                  activeTab === tab ? 'text-cyan-400 font-bold' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabUnderline" 
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-cyan-400"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-5 text-neutral-300">
            {activeTab === 'TELEMETRY' && (
              <>
                {/* Major Dynamic Metric: Altitude */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-neutral-500">
                    <span>CURRENT ALTITUDE</span>
                    <span>ALT_TGT_00</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold tracking-tight text-white font-mono">
                      {formatNumber(metrics.altitude)}
                    </span>
                    <span className="text-xs text-cyan-400 font-bold ml-1">METERS</span>
                  </div>
                  {/* Dynamic Altitude Sub Bar */}
                  <div className="h-1 bg-neutral-900 rounded overflow-hidden">
                    <div 
                      className="h-full bg-cyan-500 transition-all duration-100 ease-out" 
                      style={{ width: `${(metrics.altitude / 120000) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Major Metric: Velocity */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-neutral-500">
                    <span>ENTRY SPEED</span>
                    <span>VEL_MACH</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold tracking-tight text-white font-mono">
                      {formatNumber(metrics.velocity)}
                    </span>
                    <span className="text-xs text-cyan-400 font-bold ml-1">KM/H</span>
                  </div>
                  <div className="flex justify-between text-[9px] text-neutral-500">
                    <span>MACH {(metrics.velocity / 1225).toFixed(1)}</span>
                    <span>EST_ETA: {Math.max(0, Math.ceil(80 * (1 - metrics.progress)))}S</span>
                  </div>
                </div>

                {/* Grid metrics: Temp & G-Force */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="bg-neutral-900/60 border border-neutral-800 rounded p-2.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-[9px] text-neutral-500">
                      <Flame className={`h-3.5 w-3.5 ${metrics.temperature > 1200 ? 'text-amber-500 animate-pulse' : 'text-neutral-400'}`} />
                      <span>SHEET TEMP</span>
                    </div>
                    <div className="text-lg font-bold text-white">
                      {formatNumber(metrics.temperature)}°C
                    </div>
                    <div className="w-full bg-neutral-800 h-0.5 rounded overflow-hidden">
                      <div 
                        className={`h-full ${metrics.temperature > 1500 ? 'bg-rose-500' : 'bg-amber-400'}`}
                        style={{ width: `${Math.min(100, (metrics.temperature / 1850) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-neutral-900/60 border border-neutral-800 rounded p-2.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-[9px] text-neutral-500">
                      <Activity className="h-3.5 w-3.5 text-neutral-400" />
                      <span>GRAV LOADS</span>
                    </div>
                    <div className="text-lg font-bold text-white">
                      {metrics.gForce.toFixed(1)} G
                    </div>
                    <div className="w-full bg-neutral-800 h-0.5 rounded overflow-hidden">
                      <div 
                        className="h-full bg-cyan-400"
                        style={{ width: `${(metrics.gForce / 8) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Heat Warning Banner during peak plasma heating */}
                <AnimatePresence>
                  {metrics.status === 'CRITICAL' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="bg-amber-500/10 border border-amber-500/40 rounded p-3 text-xs text-amber-400 space-y-1.5 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                        <span>THERMAL BLACKOUT COMPRESSION</span>
                      </div>
                      <p className="text-[10px] leading-relaxed opacity-80">
                        Atmospheric pressure peaked. Telemetry integrity degraded due to superheated microplasmatic envelope surrounding shield.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Quick Diagnostics logs */}
                <div className="space-y-1.5 text-[10px] bg-black/40 p-3 rounded border border-neutral-900 text-neutral-400">
                  <div className="flex justify-between">
                    <span>SYS_MATRIX_CORRECTION</span>
                    <span className="text-green-500">ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GUIDANCEINS_NAV_LOCK</span>
                    <span className="text-green-500">STABLE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ATMOSPHERIC_DRAG_COEFF</span>
                    <span className="text-cyan-400">{(0.34 + metrics.progress * 0.45).toFixed(3)}</span>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'DIAGNOSTICS' && (
              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-500 block">SYSTEM DIAGNOSTICS DECK</span>
                  <p className="text-[11px] opacity-80">Autonomous telemetry computing is synchronizing planetary parameters dynamically in real time.</p>
                </div>
                
                <div className="space-y-2 border-t border-neutral-800 pt-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-neutral-400">THRUST CONTROL ARRAYS</span>
                      <span className={metrics.progress > 0.85 ? "text-green-400" : "text-amber-500"}>
                        {metrics.progress > 0.85 ? "ARMED" : "HEATING"}
                      </span>
                    </div>
                    <div className="h-1.5 bg-neutral-900 rounded overflow-hidden">
                      <div className="h-full bg-cyan-500 transition-all duration-300" style={{ width: metrics.progress > 0.85 ? '100%' : '35%' }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-neutral-400">PLASMA DEFLECT SHIELD</span>
                      <span className="text-green-400">ENGAGED (98%)</span>
                    </div>
                    <div className="h-1.5 bg-neutral-900 rounded overflow-hidden">
                      <div className="h-full bg-cyan-500" style={{ width: '98%' }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-neutral-400">COMMUNICATION COUPLING</span>
                      <span className={metrics.status === 'CRITICAL' ? 'text-rose-400 animate-pulse' : 'text-green-400'}>
                        {metrics.status === 'CRITICAL' ? 'TEMP_BLACKOUT' : '99.8% LINK'}
                      </span>
                    </div>
                    <div className="h-1.5 bg-neutral-900 rounded overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${metrics.status === 'CRITICAL' ? 'bg-rose-600' : 'bg-cyan-500'}`} 
                        style={{ width: metrics.status === 'CRITICAL' ? '15%' : '99.8%' }} 
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-cyan-950/20 border border-cyan-800/30 rounded p-3 space-y-2 text-[10px]">
                  <span className="font-semibold text-cyan-400">ATMOSPHERE MATRIX:</span>
                  <p className="leading-tight text-neutral-400">
                    Density tracking shows high gas compression. Flight computers automatically angling dynamic canards to absorb compression energy cleanly.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'MISSION' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-neutral-800 pb-2">
                  <Compass className="h-4 w-4" />
                  <span>DESCENT PROTOCOL 9</span>
                </div>
                <p className="text-[11px] leading-relaxed text-neutral-400">
                  Target: Planetary Sector Theta-09. Establish stable landing deck at the coordinates of the core deep crust thermal terminal.
                </p>

                <div className="space-y-3">
                  <h4 className="text-[10px] text-neutral-500 font-bold tracking-wider">FLIGHT LANDMARKS</h4>
                  <div className="space-y-2 text-[10px]">
                    <div className="flex items-start gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full mt-1.5 ${metrics.progress >= 0.1 ? 'bg-cyan-400' : 'bg-neutral-700'}`} />
                      <div>
                        <p className={metrics.progress >= 0.1 ? 'text-white' : 'text-neutral-500'}>Exosphere Border Crossed</p>
                        <p className="text-[9px] text-neutral-500">Altitude: 100,000 M</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full mt-1.5 ${metrics.progress >= 0.4 ? 'bg-cyan-400' : 'bg-neutral-700'}`} />
                      <div>
                        <p className={metrics.progress >= 0.4 ? 'text-white' : 'text-neutral-500'}>Supercharged Plasma Zone</p>
                        <p className="text-[9px] text-neutral-500">Altitude: 60,000 M</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full mt-1.5 ${metrics.progress >= 0.7 ? 'bg-cyan-400' : 'bg-neutral-700'}`} />
                      <div>
                        <p className={metrics.progress >= 0.7 ? 'text-white' : 'text-neutral-500'}>Aeroshell Discard Sequence</p>
                        <p className="text-[9px] text-neutral-500">Altitude: 30,000 M</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full mt-1.5 ${metrics.progress >= 0.85 ? 'bg-cyan-400' : 'bg-neutral-700'}`} />
                      <div>
                        <p className={metrics.progress >= 0.85 ? 'text-white' : 'text-neutral-500'}>Flight Operations Sync</p>
                        <p className="text-[9px] text-neutral-500">Altitude: 12,000 M</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full mt-1.5 ${metrics.progress >= 0.99 ? 'bg-cyan-400' : 'bg-neutral-700'}`} />
                      <div>
                        <p className={metrics.progress >= 0.99 ? 'text-white' : 'text-neutral-500'}>Landing Core Interface Dock</p>
                        <p className="text-[9px] text-neutral-500 font-sans">Altitude: 0 M</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom telemetry status indicator */}
          <div className="border-t border-neutral-900 pt-3 mt-4 text-[10px] flex justify-between items-center text-neutral-500">
            <span>CORE_ID: DEEP_09</span>
            <span className="text-[9px] bg-cyan-950 px-2 py-0.5 rounded text-cyan-400 border border-cyan-800/30">
              SYS_STB_99.9
            </span>
          </div>
        </div>

        {/* Minimal altitude prompt card */}
        <div className="bg-neutral-950/85 backdrop-blur-xl border border-neutral-800 rounded-lg p-3 text-[10px] text-center text-cyan-500/60 leading-tight">
          SCROLL MANUALLY TO NAVIGATE DESCENT
        </div>
      </div>

      {/* Floating Bottom Navigation panel on smaller devices */}
      <div id="hud-mobile-panel" className="fixed bottom-4 left-4 right-4 z-40 xl:hidden bg-neutral-950/95 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4 font-mono text-xs flex justify-between items-center shadow-[0_0_15px_rgba(6,182,212,0.15)]">
        <div>
          <span className="text-[9px] text-neutral-500 block">ALTITUDE</span>
          <span className="text-lg font-bold text-white">{formatNumber(metrics.altitude)} M</span>
        </div>
        <div>
          <span className="text-[9px] text-neutral-500 block">VELOCITY</span>
          <span className="text-lg font-bold text-white">{formatNumber(metrics.velocity)} KM/H</span>
        </div>
        <div>
          <span className="text-[9px] text-neutral-500 block">HEAT</span>
          <span className={`text-lg font-bold ${metrics.temperature > 1400 ? 'text-amber-400' : 'text-white'}`}>{formatNumber(metrics.temperature)}°C</span>
        </div>
        <div className="flex flex-col items-center">
          <ArrowDown className="h-4 w-4 text-cyan-400 animate-bounce" />
          <span className="text-[8px] text-neutral-500 font-sans">SCROLL</span>
        </div>
      </div>
    </>
  );
}
