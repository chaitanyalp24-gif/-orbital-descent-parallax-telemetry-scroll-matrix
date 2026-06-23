'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Shield, 
  Orbit, 
  Activity, 
  Gauge, 
  Navigation, 
  Radio, 
  SlidersHorizontal,
  CheckCircle,
  AlertTriangle,
  Flame,
  ArrowDown,
  Compass,
  CornerDownRight,
  RefreshCw,
  Cpu,
  Layers,
  Terminal,
  Grid
} from 'lucide-react';
import SmoothScroll from '@/components/SmoothScroll';
import AltitudeHUD from '@/components/AltitudeHUD';
import AboutUs from '@/components/AboutUs';
import HelpSection from '@/components/HelpSection';

export default function Home() {
  const pageContainerRef = useRef<HTMLDivElement>(null);
  
  // Interactive Simulation states for cyberpunk pilot panel
  const [pitch, setPitch] = useState(12.5);
  const [yaw, setYaw] = useState(-3.2);
  const [roll, setRoll] = useState(0.4);
  const [thrustersArmed, setThrustersArmed] = useState(false);
  const [landingLockConfirmed, setLandingLockConfirmed] = useState(false);
  const [missionLogs, setMissionLogs] = useState<string[]>([
    "SYS_OK: Inertial guidance lock active [Apoapsis 120,000M]",
    "SYS_INFO: Exospheric thermosphere threshold established",
    "SYS_OK: Core battery nodes operating at 100% capacity",
  ]);

  const addMissionLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setMissionLogs(prev => [`[${timestamp}] ${msg}`, ...prev.slice(0, 5)]);
  };

  const handleThrustersToggle = () => {
    const state = !thrustersArmed;
    setThrustersArmed(state);
    addMissionLog(state ? "THRUSTERS_ARMED: Ready for terminal braking impulse" : "THRUSTERS_DEACTIVATED: Inertial passive cruise active");
  };

  const handleLandingEngagement = () => {
    if (!thrustersArmed) {
      alert("WARNING: TERMINAL DESCENT THRUSTERS MUST BE ARMED BEFORE DOCKING COUPLING!");
      addMissionLog("ERR: Attempted landing coupling without motor ignition");
      return;
    }
    setLandingLockConfirmed(true);
    addMissionLog("MISSION_SUCCESS: Final touchdown telemetry verified. Core terminal lock established!");
  };

  // GSAP Animations with scoping
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // --- SECTION 1 PARALLAX ANIMATIONS ("Exosphere") ---
    gsap.to('.parallax-bg-exosphere', {
      scrollTrigger: {
        trigger: '#exosphere',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      yPercent: 25,
      ease: 'none',
    });

    gsap.to('.parallax-mid-exosphere', {
      scrollTrigger: {
        trigger: '#exosphere',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      yPercent: -15,
      rotate: 45,
      ease: 'none',
    });

    // --- SECTION 2 PARALLAX ANIMATIONS ("Ionosphere") ---
    gsap.to('.parallax-bg-ionosphere', {
      scrollTrigger: {
        trigger: '#ionosphere',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      yPercent: 15,
      ease: 'none',
    });

    gsap.to('.parallax-mid-ionosphere', {
      scrollTrigger: {
        trigger: '#ionosphere',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      yPercent: -20,
      scale: 1.15,
      ease: 'none',
    });

    // --- SECTION 3 PARALLAX ANIMATIONS ("Stratos") ---
    gsap.to('.parallax-bg-stratos', {
      scrollTrigger: {
        trigger: '#stratos',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      yPercent: 30,
      ease: 'none',
    });

    gsap.to('.parallax-mid-stratos', {
      scrollTrigger: {
        trigger: '#stratos',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      yPercent: -10,
      ease: 'none',
    });

    // --- SECTION 4 PARALLAX ANIMATIONS ("Operations") ---
    gsap.to('.parallax-bg-operations', {
      scrollTrigger: {
        trigger: '#operations',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      yPercent: 20,
      ease: 'none',
    });

    gsap.to('.parallax-mid-operations', {
      scrollTrigger: {
        trigger: '#operations',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      yPercent: -15,
      scale: 1.15,
      ease: 'none',
    });

    // --- SECTION 5 PARALLAX ANIMATIONS ("Core Terminal") ---
    gsap.to('.parallax-bg-terminal', {
      scrollTrigger: {
        trigger: '#terminal',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      yPercent: 10,
      ease: 'none',
    });

    gsap.to('.parallax-mid-terminal', {
      scrollTrigger: {
        trigger: '#terminal',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      yPercent: -30,
      scale: 1.3,
      ease: 'none',
    });

    // --- GRAPHIC TEXT REVEALS (Clip-Path Masking) ---
    const sections = ['#exosphere', '#ionosphere', '#stratos', '#operations', '#terminal'];
    sections.forEach((sec, i) => {
      // Reveal Heading
      gsap.fromTo(`${sec} .clip-heading`, 
        { 
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          y: 60,
          opacity: 0,
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top center+=150',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Reveal Subtitle & lines
      gsap.fromTo(`${sec} .clip-sub`, 
        { 
          opacity: 0, 
          x: -40 
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top center+=150',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Staggered bento / elements entry inside sections
      gsap.from(`${sec} .bento-reveal`, {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sec,
          start: 'top 40%',
          toggleActions: 'play none none none',
        }
      });
    });

    // Animate structural vectors continuously
    gsap.to('.rotator-slow', {
      rotate: 360,
      duration: 50,
      repeat: -1,
      ease: 'none',
    });

    gsap.to('.rotator-fast', {
      rotate: -360,
      duration: 25,
      repeat: -1,
      ease: 'none',
    });

  }, { scope: pageContainerRef });

  return (
    <SmoothScroll>
      <div ref={pageContainerRef} className="relative min-h-screen bg-black overflow-hidden font-sans">
        
        {/* Persistent Flight Deck Interface & Indicators */}
        <AltitudeHUD />

        {/* Outer Grid overlay across everything for technical theme */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#050b14_1px,transparent_1px),linear-gradient(to_bottom,#050b14_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-10 opacity-60" />

        {/* ================= SECTION 1: EXOSPHERE LANDING ================= */}
        <section 
          id="exosphere" 
          className="relative h-screen min-h-[850px] w-full overflow-hidden flex items-center justify-center border-b border-cyan-950/40"
        >
          {/* Background Layer (Parallax stars & orbital track coordinate details) */}
          <div className="absolute inset-0 z-0 parallax-bg-exosphere pointer-events-none opacity-50 select-none">
            <div className="absolute inset-0 bg-gradient-to-b from-[#02050b] via-black to-[#050e18]" />
            {/* Random glowing star vectors */}
            <div className="absolute top-1/4 left-1/4 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_cyan]" />
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_6px_white] delay-300" />
            <div className="absolute bottom-1/3 left-1/3 w-0.5 h-0.5 bg-amber-400 rounded-full animate-pulse delay-700" />
            <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-40" />
            
            {/* Technical grid coordinates */}
            <div className="absolute top-12 left-12 font-mono text-[9px] text-cyan-600/40">
              [GRID_COORDS // THETA: 124.9° :: RAD: 52,900]
            </div>
            <div className="absolute bottom-12 right-12 font-mono text-[9px] text-cyan-600/40">
              [TRAJECTORY // LOCK: REENTRY_ARC_009]
            </div>
          </div>

          {/* Midground Layer (Sleek Spinning Holographic Ring Vector) */}
          <div className="absolute inset-x-0 z-10 flex justify-center items-center parallax-mid-exosphere pointer-events-none opacity-30 select-none">
            <svg width="600" height="600" viewBox="0 0 400 400" className="w-[300px] md:w-[600px] rotator-slow">
              <circle cx="200" cy="200" r="180" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="5 15" />
              <circle cx="200" cy="200" r="150" fill="none" stroke="#22d3ee" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="130" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="30 20" />
              <circle cx="200" cy="200" r="100" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="2 6" />
              <line x1="200" y1="0" x2="200" y2="400" stroke="#22d3ee" strokeWidth="0.2" />
              <line x1="0" y1="200" x2="400" y2="200" stroke="#22d3ee" strokeWidth="0.2" />
            </svg>
          </div>

          {/* Foreground Layer (Content + Core Mission Launch Card) */}
          <div className="relative max-w-7xl w-full mx-auto px-6 z-20 flex flex-col justify-center h-full pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Mission Launch Title Deck */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 border border-cyan-500/30 px-3 py-1 bg-cyan-950/20 rounded">
                    <Orbit className="h-4 w-4 text-cyan-400 animate-spin" />
                    <span className="text-[10px] font-mono tracking-widest text-cyan-400">DESCENT SEQUENCER</span>
                  </div>
                  <p className="text-xs font-mono text-neutral-500 tracking-wider clip-sub">EST_ENTRY_FLIGHT // AL_TGT_120K</p>
                </div>

                {/* Masked Title Animation */}
                <div className="overflow-hidden">
                  <h1 className="text-4xl md:text-7xl font-sans font-black tracking-tight text-white uppercase clip-heading leading-none">
                    The Orbital <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-200 to-amber-500">
                      Descent
                    </span>
                  </h1>
                </div>

                <p className="text-sm md:text-base text-neutral-400 font-sans max-w-lg leading-relaxed clip-sub">
                  Brace for atmospheric impact. You are piloting a planetary probe crossing the exosphere threshold. Smooth kinetic scroll controls navigation surfaces, vector canards, and telemetry modules.
                </p>

                {/* Desktop direction hint */}
                <div className="flex items-center gap-3 pt-4 text-xs font-mono text-cyan-500/80 clip-sub">
                  <ArrowDown className="h-4 w-4 animate-bounce" />
                  <span>SCROLL MANUALLY TO BEGIN PASSIVE PLANETARY DRAFTING</span>
                </div>
              </div>

              {/* High Tech HUD Initialization Card */}
              <div className="lg:col-span-5 bento-reveal">
                <div className="bg-neutral-950/80 backdrop-blur-md border border-cyan-500/20 rounded-lg p-6 shadow-[0_0_30px_rgba(6,182,212,0.1)] space-y-4 font-mono">
                  <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
                    <div className="flex items-center gap-2">
                      <Grid className="h-4 w-4 text-cyan-400" />
                      <span className="text-[11px] font-bold tracking-wider">SYSTEM INITIALIZER_</span>
                    </div>
                    <span className="text-[9px] bg-green-950 text-green-400 px-2 py-0.5 rounded border border-green-800/40">SYS_OK</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between text-neutral-400">
                      <span>VESSEL_ID:</span>
                      <span className="text-white">ORBITER_THETA_9</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>FUSING COMPUTER STATE:</span>
                      <span className="text-green-400">CONNECTED</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>ATMOSPHERE PROFILE:</span>
                      <span className="text-cyan-400">NITROGEN/OXYGEN</span>
                    </div>
                    
                    {/* Simulated loading stats */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-[10px] text-neutral-500">
                        <span>CALIBRATING CANARDS DECK</span>
                        <span>100%</span>
                      </div>
                      <div className="h-1.5 bg-neutral-900 rounded overflow-hidden">
                        <div className="h-full bg-cyan-400 w-full" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] text-neutral-500">
                        <span>THERMOSHIELD CALIBRATIONMATRIX</span>
                        <span>94.2%</span>
                      </div>
                      <div className="h-1.5 bg-neutral-900 rounded overflow-hidden">
                        <div className="h-full bg-amber-500 w-[94.2%]" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-950/20 border border-cyan-800/30 rounded p-3 text-[10px] text-neutral-400 flex items-start gap-2">
                    <Terminal className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      Inertial navigation calculates a parabolic trajectory landing at exactly 0,0 coordinates. Maintain descent profile trajectory.
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= SECTION 2: IONOSPHERE HUB ================= */}
        <section 
          id="ionosphere" 
          className="relative min-h-screen py-32 w-full overflow-hidden flex items-center justify-center border-b border-cyan-950/40 bg-[#010408]"
        >
          {/* Background Layer */}
          <div className="absolute inset-0 z-0 parallax-bg-ionosphere pointer-events-none opacity-40 select-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.06),transparent_60%)]" />
            <div className="absolute top-1/4 right-1/3 w-0.5 h-0.5 bg-amber-400 rounded-full" />
            <div className="absolute top-1/2 left-10 text-[9px] font-mono text-cyan-900 leading-none">
              MATRIX RECON:: 0x889FA9 - 0x1110AA - 0xAAFFB2
            </div>
          </div>

          {/* Midground Layer (Glowing svg ionosphere cores / planets) */}
          <div className="absolute right-0 z-10 flex justify-center items-center parallax-mid-ionosphere pointer-events-none opacity-20 select-none">
            <svg width="450" height="450" viewBox="0 0 400 400" className="w-[200px] md:w-[450px] rotator-fast">
              <polygon points="200,30 350,120 350,280 200,370 50,280 50,120" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="10 5" />
              <polygon points="200,50 330,130 330,270 200,350 70,270 70,130" fill="none" stroke="#22d3ee" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="80" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
              <circle cx="200" cy="200" r="12" fill="#22d3ee" />
            </svg>
          </div>

          {/* Foreground Content Section */}
          <div className="relative max-w-7xl w-full mx-auto px-6 z-20">
            <div className="space-y-12">
              
              {/* Header Titles */}
              <div className="space-y-4 max-w-3xl text-left">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 border border-amber-500/30 px-3 py-1 bg-amber-950/20 rounded">
                    <Flame className="h-4 w-4 text-amber-500 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-amber-500">THERMAL ATTENUATOR</span>
                  </div>
                  <p className="text-xs font-mono text-neutral-500 tracking-wider clip-sub">ALT_RNG_90K // ION_IONIZATION</p>
                </div>
                
                <div className="overflow-hidden">
                  <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white uppercase clip-heading">
                    IONOSPHERE THERMAL <br className="hidden sm:inline" />
                    <span className="text-amber-500">HIGH-DENSITY</span> HUB
                  </h2>
                </div>
                
                <p className="text-sm md:text-base text-neutral-400 font-sans max-w-2xl clip-sub">
                  As the probe descends into the compressed molecular gas envelope of the upper ionosphere, thermal build-up peaks. This causes localized ionization waves, resulting in high communication hazards.
                </p>
              </div>

              {/* Bento Grid layout containing real interactive/live details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pt-4">
                
                {/* Bento Card 1: Heat Shield Ablation Status (Large Card) */}
                <div className="bg-neutral-950/70 backdrop-blur-md border border-neutral-800 rounded-lg p-6 lg:col-span-7 space-y-6 flex flex-col justify-between bento-reveal hover:border-amber-500/30 transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1 font-mono">
                        <span className="text-[9px] text-neutral-500 block">ABLATIVE PROTECTOR</span>
                        <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">CARBON DESTRUCTION SHIELD</h3>
                      </div>
                      <Shield className="h-6 w-6 text-amber-500" />
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      Duralumin-graphene hybrid structural frame deflects ionized plasma particles. Current simulation values reflect passive molecular resistance parameters.
                    </p>
                    
                    {/* Live grid of material degradation */}
                    <div className="grid grid-cols-4 gap-2.5 pt-2 text-[9px] font-mono">
                      <div className="border border-cyan-800/20 bg-cyan-950/5 p-2 rounded">
                        <span className="text-neutral-500 block">SECTOR_N1</span>
                        <span className="text-white font-bold opacity-90">99.2% OK</span>
                      </div>
                      <div className="border border-cyan-800/20 bg-cyan-950/5 p-2 rounded">
                        <span className="text-neutral-500 block">SECTOR_N2</span>
                        <span className="text-amber-400 font-bold">96.8% HOT</span>
                      </div>
                      <div className="border border-cyan-800/20 bg-cyan-950/5 p-2 rounded">
                        <span className="text-neutral-500 block">SECTOR_W1</span>
                        <span className="text-white font-bold opacity-90">99.1% OK</span>
                      </div>
                      <div className="border border-cyan-800/20 bg-cyan-950/5 p-2 rounded">
                        <span className="text-neutral-500 block">SECTOR_E1</span>
                        <span className="text-amber-500 font-bold">94.5% PLAS</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-neutral-900 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-neutral-500">THERMOSENSORS ONLINE [OK]</span>
                    </div>
                    <span className="text-amber-400">MAX_TEMP: 1,850°C ALLOWED</span>
                  </div>
                </div>

                {/* Bento Card 2: Ionization Waves Chart Representation (Vertical tall Card) */}
                <div className="bg-neutral-950/70 backdrop-blur-md border border-neutral-800 rounded-lg p-6 lg:col-span-5 flex flex-col justify-between bento-reveal hover:border-cyan-500/30 transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start font-mono">
                      <div className="space-y-1">
                        <span className="text-[9px] text-neutral-500 block">FREQUENCY RESPONSE</span>
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">COMM_ATTENUATION_WAVE</h3>
                      </div>
                      <Radio className="h-6 w-6 text-cyan-400 animate-pulse" />
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      Descent vector cuts through static ions, compressing signals. Wave graph below details feedback frequencies as speed increases:
                    </p>

                    {/* Vector animated diagram resembling a digital oscilloscope */}
                    <div className="relative h-28 bg-black/60 border border-neutral-900 rounded overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-x-0 h-[1px] bg-neutral-800" />
                      <svg viewBox="0 0 300 100" className="w-full h-full text-cyan-400/70">
                        <path 
                          d="M0,50 Q25,20 50,50 T100,50 T150,50 T200,50 T250,50 T300,50" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="1.5"
                          className="animate-pulse" 
                        />
                        <path 
                          d="M0,50 Q30,10 60,65 T120,40 T180,60 T240,45 T300,50" 
                          fill="none" 
                          stroke="#f59e0b" 
                          strokeWidth="1"
                          strokeDasharray="4 2"
                        />
                      </svg>
                      <span className="absolute bottom-2 left-2 text-[8px] font-mono text-neutral-500">RF_BAND_A: ACTIVE</span>
                      <span className="absolute bottom-2 right-2 text-[8px] font-mono text-neutral-500">ATTN: -42dB</span>
                    </div>
                  </div>

                  <div className="border-t border-neutral-900 pt-4 flex justify-between font-mono text-[10px] text-neutral-500">
                    <span>GRIDLOCK CORRELATOR</span>
                    <span className="text-cyan-400">144.15 MHz LOCK</span>
                  </div>
                </div>

                {/* Bento Card 3: Dynamic Inertial vector status (Small wide card) */}
                <div className="bg-neutral-950/70 backdrop-blur-md border border-neutral-800 rounded-lg p-6 lg:col-span-12 font-mono bento-reveal hover:border-cyan-500/30 transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-cyan-400" />
                        <h4 className="text-sm font-bold text-white uppercase">Atmospheric Drafting Matrix</h4>
                      </div>
                      <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                        Vector arrays compute aerodynamic resistance coefficients. As altitude drop crosses critical ion densities, flight guidance computes roll and pitch adjustments.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-neutral-900/40 border border-neutral-800 p-3 rounded">
                        <span className="text-neutral-500 block text-[9px]">DRAFT_EFFICIENCY</span>
                        <span className="text-white font-bold block text-base mt-1">98.42%</span>
                        <span className="text-[9px] text-green-400 block mt-0.5">OPTIMIZED ENTRY</span>
                      </div>
                      <div className="bg-neutral-900/40 border border-neutral-800 p-3 rounded">
                        <span className="text-neutral-500 block text-[9px]">ION_HEAT_ABSORPTION</span>
                        <span className="text-amber-500 font-bold block text-base mt-1">421 W/M²</span>
                        <span className="text-[9px] text-amber-500 block mt-0.5">WARNING ATTN</span>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <span className="text-[9px] text-neutral-500 block">COMPREHENSIVE ION MATRIX FEEDBACK</span>
                      <div className="bg-black/60 border border-neutral-900 p-3 rounded text-[9px] space-y-1.5 font-mono text-neutral-400">
                        <div className="flex justify-between">
                          <span>GRID_X: 421.492</span>
                          <span className="text-green-500">STABLE</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GRID_Y: -22.918</span>
                          <span className="text-green-500">STABLE</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GRID_Z: 14.882</span>
                          <span className="text-cyan-400">DRIFTING_OK</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ================= SECTION 3: STRATOSPHERE NEBULA SHOWCASE ================= */}
        <section 
          id="stratos" 
          className="relative min-h-screen py-32 w-full overflow-hidden flex items-center justify-center border-b border-cyan-950/40 bg-black"
        >
          {/* Background Layer */}
          <div className="absolute inset-0 z-0 parallax-bg-stratos pointer-events-none opacity-40 select-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.08),transparent_60%)]" />
            <div className="absolute bottom-1/4 left-1/4 w-0.5 h-0.5 bg-cyan-400 rounded-full" />
            <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-neutral-800 rounded-full" />
            <div className="absolute bottom-10 left-12 font-mono text-[9px] text-neutral-600">
              [STRATOSPHERE FLIGHT GUIDANCE DEEP COMPUTES LOCKED]
            </div>
          </div>

          {/* Midground Layer (Grid/Crosshairs structural vectors) */}
          <div className="absolute left-12 z-10 flex justify-center items-center parallax-mid-stratos pointer-events-none opacity-15 select-none">
            <svg width="500" height="300" viewBox="0 0 500 300" className="w-[300px] md:w-[500px]">
              <line x1="0" y1="150" x2="500" y2="150" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 8" />
              <line x1="250" y1="0" x2="250" y2="300" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 8" />
              <circle cx="250" cy="150" r="120" fill="none" stroke="#22d3ee" strokeWidth="0.8" />
              <circle cx="250" cy="150" r="80" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="30 15" />
              <rect x="190" y="90" width="120" height="120" fill="none" stroke="#22d3ee" strokeWidth="0.5" />
              <text x="260" y="140" fill="#22d3ee" fontSize="10" fontFamily="monospace">CROSS_TGT</text>
            </svg>
          </div>

          {/* Foreground content: Tables with retro Cyberpunk pilot adjustable controls */}
          <div className="relative max-w-7xl w-full mx-auto px-6 z-20">
            <div className="space-y-12">
              
              {/* Titles Section */}
              <div className="space-y-4 max-w-3xl text-left">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 border border-cyan-500/30 px-3 py-1 bg-cyan-950/20 rounded">
                    <Navigation className="h-4 w-4 text-cyan-400" />
                    <span className="text-[10px] font-mono tracking-widest text-cyan-400">NAV DIRECTIVE_</span>
                  </div>
                  <p className="text-xs font-mono text-neutral-500 tracking-wider clip-sub">ALT_RNG_60K // STRATO_DESCENT</p>
                </div>

                <div className="overflow-hidden">
                  <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white uppercase clip-heading">
                    STRATOSPHERE RANGE & <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-100">
                      NAVIGATION LOCK
                    </span>
                  </h2>
                </div>

                <p className="text-sm md:text-base text-neutral-400 font-sans max-w-2xl clip-sub">
                  Entering the Stratosphere, denser gas compression becomes the primary deceleration tool. Pilot guidance triggers interactive thruster calibration matrices to maintain optimal landing glide.
                </p>
              </div>

              {/* Main content grid: Interactive simulator and structured charts */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
                
                {/* CYBERPUNK INTERACTIVE PILOT CONTROL UNIT (Interactive Bento Option) */}
                <div className="lg:col-span-7 bg-neutral-950/80 backdrop-blur-md border border-cyan-500/20 rounded-lg p-6 flex flex-col justify-between bento-reveal shadow-[0_0_20px_rgba(6,182,212,0.1)] group">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="h-5 w-5 text-cyan-400" />
                        <span className="font-mono text-xs font-bold uppercase text-white">Manual Vector Overrides</span>
                      </div>
                      <span className="text-[9px] font-mono bg-cyan-950/40 text-cyan-400 px-2.5 py-0.5 rounded border border-cyan-800/30">INTEGRITY_STABLE</span>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed max-w-lg font-sans">
                      Test probe reaction control thrusters during supersonic wind friction. Adjust pitch, yaw, and roll below, then arm mechanical braking arrays:
                    </p>

                    {/* Adjustable cyber slider 1: Pitch */}
                    <div className="space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">ANGLE OF ATTACK (PITCH_COEFF)</span>
                        <span className="text-cyan-400 font-semibold">{pitch.toFixed(1)}°</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="30" 
                        step="0.5"
                        value={pitch} 
                        onChange={(e) => {
                          setPitch(parseFloat(e.target.value));
                          addMissionLog(`CAL: Adjusting pitch array parameter to ${parseFloat(e.target.value).toFixed(1)}°`);
                        }}
                        className="w-full h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 outline-none"
                      />
                    </div>

                    {/* Adjustable cyber slider 2: Yaw */}
                    <div className="space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">CROSSBREEZE BALANCE (YAW_COEFF)</span>
                        <span className={`font-semibold ${yaw < 0 ? 'text-rose-400' : 'text-cyan-400'}`}>{yaw.toFixed(1)}°</span>
                      </div>
                      <input 
                        type="range" 
                        min="-20" 
                        max="20" 
                        step="0.5"
                        value={yaw} 
                        onChange={(e) => {
                          setYaw(parseFloat(e.target.value));
                          addMissionLog(`CAL: Adjusting yaw array parameter to ${parseFloat(e.target.value).toFixed(1)}°`);
                        }}
                        className="w-full h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 outline-none"
                      />
                    </div>

                    {/* Interactive Arm Thrusters toggle */}
                    <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between bg-black/50 border border-neutral-900 p-4 rounded-lg">
                      <div className="text-left">
                        <span className="font-mono text-xs font-bold text-white block">TERMINAL LANDING THRUSTERS</span>
                        <p className="text-[10px] text-neutral-500 font-sans leading-tight mt-0.5">Activate chemical combustion core thrusters for the surface capture phase.</p>
                      </div>
                      
                      <button 
                        onClick={handleThrustersToggle}
                        className={`font-mono text-xs font-bold tracking-wider px-5 py-2.5 rounded transition-all duration-300 w-full sm:w-auto text-center border cursor-pointer ${
                          thrustersArmed 
                            ? 'bg-amber-400 text-black border-amber-500 hover:bg-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]' 
                            : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-cyan-500/50 hover:text-cyan-400'
                        }`}
                      >
                        {thrustersArmed ? "[ DISARM MOTOR ]" : "[ ARM MOTOR CORE ]"}
                      </button>
                    </div>

                  </div>

                  <div className="border-t border-neutral-900 pt-5 mt-6 flex justify-between items-center text-[10px] font-mono text-neutral-500">
                    <span className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${thrustersArmed ? 'bg-amber-400 animate-pulse' : 'bg-neutral-700'}`} />
                      SYS_TH_ARMD: {thrustersArmed ? "TRUE" : "FALSE"}
                    </span>
                    <span>FLIGHT_GLIDE_V8.1A</span>
                  </div>
                </div>

                {/* HISTORICAL REENTRY TARGET MATRIX (The Showcase Chart/Table) */}
                <div className="lg:col-span-5 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 rounded-lg p-6 flex flex-col justify-between bento-reveal hover:border-cyan-500/30 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
                      <div className="flex items-center gap-2">
                        <Layers className="h-5 w-5 text-cyan-400" />
                        <span className="font-mono text-xs font-bold uppercase text-white">Entry Flight Profile</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                      Detailed telemetry mapping tracks atmospheric friction densities matching simulated altitude parameters:
                    </p>

                    {/* Highly polished custom Cyberpunk Telemetry Table */}
                    <div className="overflow-x-auto border border-neutral-900 rounded">
                      <table className="w-full font-mono text-[10px] text-left text-neutral-400">
                        <thead className="bg-[#040913] border-b border-neutral-900 text-neutral-500">
                          <tr>
                            <th className="p-2.5">ALT (M)</th>
                            <th className="p-2.5">DRAG COEFF</th>
                            <th className="p-2.5">PREDICT STATE</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-900">
                          <tr>
                            <td className="p-2.5 font-bold text-white">120,000</td>
                            <td className="p-2.5 text-cyan-500">0.051 Coeff</td>
                            <td className="p-2.5 text-green-500">✓ PERFECT_LOCK</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold text-white">90,000</td>
                            <td className="p-2.5 text-cyan-500">0.182 Coeff</td>
                            <td className="p-2.5 text-green-500">✓ PLASMASENS_OK</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold text-white">60,000</td>
                            <td className="p-2.5 text-cyan-500">0.428 Coeff</td>
                            <td className="p-2.5 text-amber-500">⚠ THERMAL_WARN</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold text-white">30,000</td>
                            <td className="p-2.5 text-cyan-500">0.894 Coeff</td>
                            <td className="p-2.5 text-cyan-400">● GLIDE_LOCK</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-bold text-white">Surface</td>
                            <td className="p-2.5 text-cyan-500">1.250 Coeff</td>
                            <td className="p-2.5 text-orange-400">● MOTOR_CAPT</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Live Mission logs console */}
                    <div className="space-y-1.5 font-mono text-[9px] pt-1">
                      <span className="text-neutral-500 block uppercase font-bold tracking-wider">Mission Log Computations:</span>
                      <div className="bg-black/80 border border-neutral-900 rounded-lg p-2.5 h-20 overflow-y-auto space-y-1 text-neutral-400 scrollbar-thin">
                        {missionLogs.map((log, i) => (
                          <div key={i} className="flex items-start gap-1">
                            <span className="text-cyan-400 shrink-0">→</span>
                            <span className="leading-tight">{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  <div className="border-t border-neutral-900 pt-4 text-[9px] font-mono text-neutral-500 flex justify-between">
                    <span>SYS_MATRIX_LOG: ACTIVE</span>
                    <span>PAGE_SIZE: 12.4KB</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 4: FLIGHT OPERATIONS COMMAND & CALIBRATION ================= */}
        <section 
          id="operations" 
          className="relative min-h-screen py-32 w-full overflow-hidden flex items-center justify-center border-b border-cyan-950/40 bg-neutral-950"
        >
          {/* Background Layer (Parallax telemetry arrays) */}
          <div className="absolute inset-0 z-0 parallax-bg-operations pointer-events-none opacity-45 select-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.06),transparent_60%)]" />
            <div className="absolute top-1/3 left-1/4 w-0.5 h-0.5 bg-amber-400 rounded-full animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full" />
          </div>

          <div className="absolute right-10 top-20 z-10 flex justify-center items-center parallax-mid-operations pointer-events-none opacity-10 select-none">
            <svg width="400" height="400" viewBox="0 0 400 400" className="w-[200px] md:w-[400px]">
              <rect x="20" y="20" width="360" height="360" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="5 15" />
              <circle cx="200" cy="200" r="100" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
              <path d="M50 200 L350 200" stroke="#22d3ee" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Core bento layout containing sub systems and accountability details */}
          <div className="relative max-w-7xl w-full mx-auto px-6 z-20">
            <div className="space-y-12">
              
              {/* Header Title segment */}
              <div className="space-y-4 max-w-3xl text-left">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 border border-cyan-500/30 px-3 py-1 bg-cyan-950/20 rounded">
                    <Grid className="h-4 w-4 text-cyan-400" />
                    <span className="text-[10px] font-mono tracking-widest text-cyan-400">FLIGHT CENTER DIRECTIVE //</span>
                  </div>
                  <p className="text-xs font-mono text-neutral-500 tracking-wider clip-sub">ALT_RNG_12K // CONSOLE_SYSTEMS</p>
                </div>

                <div className="overflow-hidden">
                  <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white uppercase clip-heading">
                    FLIGHT DECKS & <br className="hidden sm:inline" />
                    <span className="text-cyan-400">OPERATIONAL RULES</span>
                  </h2>
                </div>

                <p className="text-sm md:text-base text-neutral-400 font-sans max-w-2xl clip-sub">
                  Operators maintain physical-biological telemetry coherence here. Use the accountability reports below to review mission goals and troubleshoot system drift parameters.
                </p>
              </div>

              {/* Grid of the two new rich sub-components */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-4">
                
                {/* 1. Accountabilities Card Segment */}
                <div className="flex bento-reveal">
                  <AboutUs />
                </div>

                {/* 2. System Troubleshooting Shell */}
                <div className="flex bento-reveal">
                  <HelpSection onEmergencySignal={(msg) => {
                    addMissionLog(msg);
                  }} />
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ================= SECTION 5: CORE TERMINAL ================= */}
        <section 
          id="terminal" 
          className="relative h-screen min-h-[900px] w-full overflow-hidden flex items-center justify-center border-b border-cyan-950/40 bg-[#02050c]"
        >
          {/* Background Layer */}
          <div className="absolute inset-0 z-0 parallax-bg-terminal pointer-events-none opacity-40 select-none">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#040d1c] to-[#010408]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-cyan-950/10 rounded-full blur-3xl" />
          </div>

          {/* Midground Layer (Expanding abstract vector target portal) */}
          <div className="absolute inset-x-0 z-10 flex justify-center items-center parallax-mid-terminal pointer-events-none opacity-25 select-none">
            <svg width="650" height="650" viewBox="0 0 400 400" className="w-[350px] md:w-[650px] rotator-slow">
              <rect x="50" y="50" width="300" height="300" fill="none" stroke="#22d3ee" strokeWidth="0.5" />
              <rect x="100" y="100" width="200" height="200" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="10 20" />
              <circle cx="200" cy="200" r="160" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
              <circle cx="200" cy="200" r="120" fill="none" stroke="#22d3ee" strokeWidth="0.5" />
              <line x1="200" y1="0" x2="200" y2="400" stroke="#f59e0b" strokeWidth="0.5" />
              <line x1="0" y1="200" x2="400" y2="200" stroke="#f59e0b" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Foreground interface card + landing checklist */}
          <div className="relative max-w-7xl w-full mx-auto px-6 z-20 h-full flex flex-col justify-center pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Headline and terminal state */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 border border-green-500/30 px-3 py-1 bg-green-950/20 rounded">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-[10px] font-mono tracking-widest text-green-400">TOUCHDOWN LOCKED</span>
                  </div>
                  <p className="text-xs font-mono text-neutral-500 tracking-wider clip-sub">ALT_RNG_0M // DEEP_CRUST_CAPT</p>
                </div>

                <div className="overflow-hidden">
                  <h2 className="text-4xl md:text-6xl font-sans font-black tracking-tight text-white uppercase clip-heading leading-tight">
                    CORE TERMINAL <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-green-500">
                      TOUCHDOWN
                    </span>
                  </h2>
                </div>

                <p className="text-sm md:text-base text-neutral-400 font-sans leading-relaxed max-w-lg clip-sub">
                  Final atmospheric deceleration is successfully complete. Ground sensor lock has calculated the coordinate dock parameters. Initiate landing sequencer thrusters to secure touchdown and capture.
                </p>

                {/* Retro warnings matrix */}
                <div className="bento-reveal border border-neutral-900 bg-black/40 p-5 rounded-lg space-y-3 font-mono text-xs max-w-lg">
                  <div className="flex items-center gap-2 text-amber-500 font-bold border-b border-neutral-900 pb-2">
                    <AlertTriangle className="h-4.5 w-4.5" />
                    <span>MANUAL CAPTURE HAZARDS</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span>Wind shear: NORMAL</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span>Rotor trim: STABLE</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span>Heat shield: DISCARD</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span>Fuel level: 42.1% OK</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Terminal Controller / Landing Action Button */}
              <div className="lg:col-span-6 bento-reveal">
                <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-800 rounded-lg p-6 md:p-8 space-y-6 font-mono relative shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                  
                  {/* Decorative glowing green light */}
                  <div className={`absolute top-6 right-6 h-3 w-3 rounded-full ${landingLockConfirmed ? 'bg-green-400 animate-ping' : 'bg-amber-400'}`} />
                  
                  <div className="border-b border-neutral-900 pb-4">
                    <span className="text-[10px] text-neutral-500 block">DESCENT CONTROLLER DECK</span>
                    <h3 className="text-base font-bold text-white uppercase">TERMINAL CAPTURE COUPLING</h3>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Touchdown Checklist:</h4>
                    
                    <div className="space-y-2 text-xs text-neutral-300">
                      <div className="flex items-center justify-between bg-neutral-900/40 p-2.5 rounded border border-neutral-900">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Heat shield discarded cleanly</span>
                        </div>
                        <span className="text-green-500 text-[10px]">VERIFIED</span>
                      </div>

                      <div className="flex items-center justify-between bg-neutral-900/40 p-2.5 rounded border border-neutral-900">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Ground Rangefinder Lock Active</span>
                        </div>
                        <span className="text-green-500 text-[10px]">100% SIGNAL</span>
                      </div>

                      <div className="flex items-center justify-between bg-neutral-900/40 p-2.5 rounded border border-neutral-900">
                        <div className="flex items-center gap-2">
                          <span className={`h-4 w-4 rounded-full border flex items-center justify-center text-[10px] ${
                            thrustersArmed ? 'bg-green-500 border-green-600 text-neutral-950 font-bold' : 'border-neutral-700 text-neutral-500'
                          }`}>
                            {thrustersArmed ? "✓" : ""}
                          </span>
                          <span className={thrustersArmed ? 'text-white' : 'text-neutral-500'}>
                            Terminal Descent Motor Core Ignited
                          </span>
                        </div>
                        <span className={thrustersArmed ? 'text-amber-400 text-[10px]' : 'text-neutral-600 text-[10px]'}>
                          {thrustersArmed ? "ACTIVE" : "STANDBY"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Huge Interactive Terminal Touchdown overlay Button */}
                  <div className="pt-2">
                    {landingLockConfirmed ? (
                      <div className="bg-green-950/30 border border-green-500/40 rounded p-4 text-center space-y-2 text-green-400 animate-pulse">
                        <CheckCircle className="h-8 w-8 mx-auto" />
                        <span className="font-extrabold tracking-widest block text-sm">MISSION ACCOMPLISHED</span>
                        <p className="text-[10px] text-neutral-400 font-sans max-w-sm mx-auto leading-tight">
                          Descender core docked safely at Planetary coordinates. Telemetry uplink has locked stable connection grid. Welcome to Sector Theta-9!
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={handleLandingEngagement}
                        className={`w-full py-4 rounded font-extrabold text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer text-center border ${
                          thrustersArmed 
                            ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-black border-green-600 hover:from-emerald-400 hover:to-green-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                            : 'bg-neutral-900 text-neutral-500 border-neutral-800 cursor-not-allowed'
                        }`}
                      >
                        {thrustersArmed ? "[ ENGAGE TOUCHDOWN SEQUENCE ]" : "[ MOTOR DISARMED - SECURE COMBUS ]"}
                      </button>
                    )}
                  </div>

                  {/* Manual simulation trigger */}
                  <div className="flex justify-between items-center text-[9px] text-neutral-500 font-mono pt-2">
                    <span>SECTOR_LOCK: 42A.1B</span>
                    <span>VER: DESCENT_SYS_v15</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Cinematic ambient sound or visual toggle prompt */}
        <footer className="bg-[#010408] border-t border-neutral-900 py-12 px-6 font-mono text-[10px] text-neutral-500 text-center relative z-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-cyan-500" />
              <span>THE ORBITAL DESCENT REENTRY TERMINAL PROTOCOL</span>
            </div>
            <div>
              <span>DEVELOPED FOR CORE PLANETARY INTERFACE COUPLING © 2026</span>
            </div>
            <div className="flex gap-4">
              <span className="text-cyan-400 font-bold">LATENCY: 0.12ms</span>
              <span>GRID: ACTIVE</span>
            </div>
          </div>
        </footer>

      </div>
    </SmoothScroll>
  );
}
