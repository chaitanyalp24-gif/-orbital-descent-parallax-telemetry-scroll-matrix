'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Shield, Orbit, Cpu, Users, Award, Target, Landmark } from 'lucide-react';

interface MilestoneProps {
  label: string;
  value: string;
  sub: string;
}

function MilestoneCard({ label, value, sub }: MilestoneProps) {
  return (
    <div className="bg-neutral-900/40 border border-neutral-800 rounded p-4 flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300">
      <span className="text-[10px] font-mono text-cyan-500 tracking-widest block mb-2">{label}</span>
      <div className="text-2xl font-bold font-mono text-white mb-1">{value}</div>
      <p className="text-xs text-neutral-400 font-sans">{sub}</p>
    </div>
  );
}

export default function AboutUs() {
  const milestones: MilestoneProps[] = [
    { label: "TACTICAL EXCURSIONS", value: "1,200+", sub: "Successful planetary atmospheric reentries logged." },
    { label: "DEFECT SHIELD INDEX", value: "99.8%", sub: "Average molecular heat dissipation shield integrity." },
    { label: "NAVIGATION CORRELATION", value: "0.02s", sub: "Autonomous real-time flight telemetry adjustment latency." },
    { label: "MISSION CONTINUUM", value: "SECURE", sub: "Operational parameters exceed high-G tolerance index." }
  ];

  return (
    <div className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800 rounded-lg p-6 md:p-8 space-y-8 shadow-[0_0_20px_rgba(6,182,212,0.05)] bento-reveal group">
      
      {/* Panel Title */}
      <div className="flex justify-between items-start border-b border-neutral-900 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-cyan-400" />
            <h3 className="text-base font-mono font-bold text-white uppercase tracking-wider">FLIGHT OPERATIONS COMMAND</h3>
          </div>
          <p className="text-xs text-neutral-500 font-mono">[AGENCY::ORBITAL_DESCENT_PROJECT]</p>
        </div>
        <span className="text-[9px] font-mono bg-cyan-950/40 text-cyan-400 px-2.5 py-0.5 rounded border border-cyan-800/30">DEEP_RETRY_READY</span>
      </div>

      {/* Narrative Intro */}
      <div className="space-y-3 font-sans text-xs md:text-sm text-neutral-300">
        <p className="leading-relaxed">
          The <span className="text-cyan-400 font-semibold font-mono">Orbital Descent Program</span> is a global consolidated aerospace initiative tasked with deploying heavy unmanned sensor packages through hostile planetary envelopes. By modeling gas compression interfaces with high-precision mechanics, our crews manage the transition from orbit to soft impact.
        </p>
      </div>

      {/* Milestones Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {milestones.map((m, idx) => (
          <MilestoneCard key={idx} {...m} />
        ))}
      </div>

      {/* Engineering Committees Divider */}
      <div className="space-y-4 pt-4 border-t border-neutral-900">
        <h4 className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
          <Landmark className="h-4 w-4 text-amber-500" />
          Engineers Council & Core Committees
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Committee 1 */}
          <div className="bg-black/50 border border-neutral-900 p-4 rounded text-left space-y-2">
            <div className="flex items-center gap-2 text-cyan-400">
              <Cpu className="h-4.5 w-4.5 shrink-0" />
              <span className="font-mono text-xs font-bold tracking-wider uppercase">Telemetry Metrics</span>
            </div>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              Handles multi-band sensor ingestion, high-speed calculation pipelines, and matrix outputs for real-time G-Forces, heat peaks, and descent rates.
            </p>
          </div>

          {/* Committee 2 */}
          <div className="bg-black/50 border border-neutral-900 p-4 rounded text-left space-y-2">
            <div className="flex items-center gap-2 text-amber-500">
              <Orbit className="h-4.5 w-4.5 shrink-0" />
              <span className="font-mono text-xs font-bold tracking-wider uppercase">Propulsion Dynamics</span>
            </div>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              Manages chemical thruster engines, retro-rocket firing calibration intervals, fuel optimization, and landing velocity attenuation grids.
            </p>
          </div>

          {/* Committee 3 */}
          <div className="bg-black/50 border border-neutral-900 p-4 rounded text-left space-y-2">
            <div className="flex items-center gap-2 text-white">
              <Shield className="h-4.5 w-4.5 shrink-0" />
              <span className="font-mono text-xs font-bold tracking-wider uppercase">Aerodynamics</span>
            </div>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              Formulates vector canard positioning, entry profile coefficients, carbon ablation shield erosion metrics, and crossbreeze yaw stabilizers.
            </p>
          </div>

        </div>
      </div>

      {/* Team footer */}
      <div className="text-[10px] font-mono text-neutral-500 flex justify-between items-center pt-2">
        <span>EST: 2026-Q2-ACTIVE</span>
        <span>CREW_MEMBERS: 124 ACTIVE L-99</span>
      </div>
    </div>
  );
}
