"use client";
import { useState, useEffect, useRef } from "react";

const slides = [
  {
    id: 1,
    eyebrow: "Build with AI • Laboratório Ativo em Lauro de Freitas",
    eyebrowStyle: "blue",
    title: "A gente não só fala de IA. A gente constrói no laboratório.",
    highlight: "constrói",
    subtitle:
      "Do zero ao agente. No laboratório de informática, transformamos curiosidade em projeto, projeto em portfólio e devs iniciantes em profissionais mentorados. Mentoria, network e código real.",
    primaryCta: "Quero construir meu agente",
    primaryCtaHref: "https://www.youtube.com/watch?v=fa6JD7udYeE",
    secondaryCta: "Como funciona o lab",
    hasAvatars: true,
  },
  {
    id: 2,
    eyebrow: "🚀 Seja bem-vindo ao futuro",
    eyebrowStyle: "blue",
    title: " Conheça o Google Developer Group Lauro de Freitas",
    highlight: "Lauro de Freitas",
    highlightColor: "text-[#1a73e8]",
    subtitle:
      "Conecte-se com outros desenvolvedores locais, aprenda as tecnologias mais recentes e cresça sua carreira através de eventos gratuitos e workshops práticos.",
    primaryCta: "Participar",
    primaryCtaHref: "#contato",
    secondaryCta: "Ver Eventos",
    hasAvatars: false,
  },
];

export default function HeroGDGLauroFixed() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const id = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % 2);
        setIsAnimating(false);
      }, 300);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left - rect.width / 2) / 100,
      y: (e.clientY - rect.top - rect.height / 2) / 100,
    });
  };

  const goTo = (idx: number) => {
    if (idx === current) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setIsAnimating(false);
    }, 300);
  };

  const slide = slides[current];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-[#fcfcfd]"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#4285F4]/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-0 w-[350px] h-[350px] bg-[#FBBC05]/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* LEFT - FIXED LAYOUT */}
          <div className="flex flex-col justify-center min-h-[580px] lg:min-h-[620px]">
            {/* Eyebrow */}
            <div
              key={`eyebrow-${current}`}
              className={`transition-all duration-500 ease-out ${
                isAnimating ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"
              }`}
            >
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium border ${
                  slide.eyebrowStyle === "blue"
                    ? "bg-[#e8f0fe] border-[#d2e3fc] text-[#1a73e8]"
                    : "bg-white border-slate-200 text-slate-700 shadow-sm"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                {slide.eyebrow}
              </span>
            </div>

            {/* Title - Fixed height container */}
            <div className="mt-8 min-h-[180px] lg:min-h-[200px]">
              <h1
                key={`title-${current}`}
                className={`text-[36px] lg:text-[52px] font-black leading-[0.95] tracking-[-0.04em] text-[#0f172a] transition-all duration-500 ease-out delay-75 ${
                  isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                }`}
              >
                {current === 0 ? (
                  <>
                    A gente não só fala de IA. A gente{" "}
                    <span className="text-[#1a73e8]">constrói</span> no laboratório.
                  </>
                ) : (
                  <>
                    Conheça o Google Developer Group {" "}
                    <span className="text-[#1a73e8]">Lauro de Freitas</span>
                  </>
                )}
              </h1>
            </div>

            {/* Subtitle */}
            <div className="mt-6 min-h-[84px]">
              <p
                key={`sub-${current}`}
                className={`text-[16px] lg:text-[17px] leading-7 text-slate-600 max-w-[520px] transition-all duration-500 ease-out delay-100 ${
                  isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                }`}
              >
                {slide.subtitle}
              </p>
            </div>

            {/* CTAs */}
            <div
              key={`cta-${current}`}
              className={`mt-8 flex flex-wrap gap-3 transition-all duration-500 delay-150 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              <a
                href={slide.primaryCtaHref}
                target={slide.primaryCtaHref.startsWith("http") ? "_blank" : undefined}
                rel={slide.primaryCtaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                className="px-7 py-3.5 rounded-full bg-[#1a73e8] text-white font-semibold shadow-lg shadow-blue-500/20 hover:bg-[#1557b0] transition-colors flex items-center gap-2"
              >
                {slide.primaryCta} <span>→</span>
              </a>
              <button className="px-7 py-3.5 rounded-full bg-white border border-slate-200 text-slate-800 font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2">
                {current === 0 && <span className="text-xs">▶</span>} {slide.secondaryCta}
              </button>
            </div>

            {/* Avatars - only slide 1 */}
            <div className="mt-10 min-h-[48px]">
              {current === 0 && (
                <div
                  className={`flex items-center gap-4 transition-all duration-500 delay-200 ${
                    isAnimating ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="flex -space-x-2">
                    {["A", "L", "M", "R", "J"].map((l, i) => (
                      <div
                        key={i}
                        className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm"
                      >
                        {l}
                      </div>
                    ))}
                    <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                      +115
                    </div>
                  </div>
                  <div className="text-[13px] leading-tight">
                    <div className="font-bold text-slate-900">120+ agentes construídos no lab</div>
                    <div className="text-slate-500">por devs da comunidade • últimos 4 meses</div>
                  </div>
                </div>
              )}
            </div>

            {/* Dots */}
            <div className="mt-10 flex gap-2">
              {[0, 1].map((i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`relative h-2 rounded-full transition-all duration-500 overflow-hidden ${
                    i === current ? "w-10 bg-slate-900" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Ir para slide ${i + 1}`}
                >
                  {i === current && (
                    <span className="absolute inset-0 bg-white/20 animate-[shrink_6s_linear]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT - VISUAL */}
          <div className="relative flex items-center justify-center min-h-[560px] lg:min-h-[620px]">
            {/* SLIDE 1 - CODE WINDOW */}
            <div
              className={`absolute w-full max-w-[560px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                current === 0
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 translate-y-12 pointer-events-none"
              }`}
            >
              <div
                className="absolute -top-12 -left-4 lg:-left-8 z-20 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-slate-100 px-4 py-3 flex gap-3 items-center"
                style={{ transform: `translate3d(${mouse.x * 1.2}px, ${mouse.y * 1}px, 0)` }}
              >
                <div className="w-9 h-9 rounded-xl bg-[#e8f0fe] flex items-center justify-center text-sm">💻</div>
                <div className="text-xs leading-tight">
                  <div className="font-bold text-slate-900">Lab</div>
                  <div className="text-slate-500">2ª e 4ª • 19h</div>
                </div>
              </div>

              <div
                className="absolute -top-8 -right-4 lg:-right-10 z-20 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-slate-100 px-4 py-3 flex gap-3 items-center"
                style={{ transform: `translate3d(${mouse.x * -1.5}px, ${mouse.y * -1.2}px, 0)` }}
              >
                <div className="w-9 h-9 rounded-xl bg-[#fef7e0] flex items-center justify-center text-sm">🤖</div>
                <div className="text-xs leading-tight">
                  <div className="font-bold text-slate-900">Agentes</div>
                  <div className="text-slate-500">120+ no lab</div>
                </div>
              </div>

              <div className="bg-white rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.12)] border border-slate-200 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="text-[11px] px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                    lab.gdg.lauro.dev
                  </div>
                </div>
                <div className="p-6 font-mono text-[12.5px] leading-[1.7]">
                  <div className="text-slate-400">// inicializando o lab</div>
                  <div>
                    <span className="text-[#8b5cf6]">const</span>{" "}
                    <span className="text-slate-900 font-bold">lab</span> ={" "}
                    <span className="text-[#8b5cf6]">await</span>{" "}
                    <span className="text-[#1a73e8]">GDGLauro</span>.
                    <span className="text-[#d93025]">init</span>({"{"}
                  </div>
                  <div className="pl-4">
                    <span className="text-[#34A853]">where</span>:{" "}
                    <span className="text-[#d93025]">'laboratório de informática'</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-[#34A853]">what</span>: [
                    <span className="text-[#d93025]">'agentes IA'</span>,{" "}
                    <span className="text-[#d93025]">'RAG'</span>,{" "}
                    <span className="text-[#d93025]">'Gemini API'</span>],
                  </div>
                  <div className="pl-4">
                    <span className="text-[#34A853]">how</span>: [
                    <span className="text-[#d93025]">'mentorias'</span>,{" "}
                    <span className="text-[#d93025]">'network'</span>,{" "}
                    <span className="text-[#d93025]">'comunidade'</span>]
                  </div>
                  <div>{"})"}</div>
                  <div className="mt-4 text-slate-900">
                    lab.<span className="text-[#1a73e8]">build</span>(){" "}
                    <span className="text-slate-400">// → seu portfólio</span>
                  </div>
                </div>
                <div className="mx-4 mb-4 rounded-2xl bg-[#0f172a] text-white p-4 text-[12px] leading-5">
                  <div className="flex gap-2 text-slate-400 mb-2 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-green-400 mt-1 animate-pulse" />
                    lab • building
                  </div>
                  <div className="text-slate-200 font-mono">
                    $ ✅ agente criado • RAG conectado
                    <br />
                    &nbsp;&nbsp;deploy distribuído • @ana.pereira
                    <br />
                    &nbsp;&nbsp;portfólio publicado
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-10 -left-4 lg:-left-8 z-20 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-slate-100 px-4 py-3 flex gap-3 items-center"
                style={{ transform: `translate3d(${mouse.x * 1}px, ${mouse.y * 0.8}px, 0)` }}
              >
                <div className="w-9 h-9 rounded-xl bg-[#e6f4ea] flex items-center justify-center text-sm">👥</div>
                <div className="text-xs leading-tight">
                  <div className="font-bold text-slate-900">Mentorias</div>
                  <div className="text-slate-500">1:1 com experts</div>
                </div>
              </div>

              <div
                className="absolute -bottom-12 -right-4 lg:-right-8 z-20 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-slate-100 px-4 py-3 flex gap-3 items-center"
                style={{ transform: `translate3d(${mouse.x * -1}px, ${mouse.y * -0.8}px, 0)` }}
              >
                <div className="w-9 h-9 rounded-xl bg-[#fce8e6] flex items-center justify-center text-sm">🌐</div>
                <div className="text-xs leading-tight">
                  <div className="font-bold text-slate-900">Network</div>
                  <div className="text-slate-500">Conexões reais</div>
                </div>
              </div>
            </div>

            {/* SLIDE 2 - POLAROID */}
            <div
              className={`absolute w-full max-w-[480px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                current === 1
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 translate-y-12 pointer-events-none"
              }`}
            >
              <div
                className="relative"
                style={{ transform: `rotate(-2deg) translate3d(${mouse.x * 0.8}px, ${mouse.y * 0.6}px, 0)` }}
              >
                <div className="absolute -top-5 -right-5 w-14 h-14 bg-[#1a8c4a] rounded-2xl flex items-center justify-center text-white font-mono text-xl shadow-lg rotate-3 z-20">
                  &lt;&gt;
                </div>
                <div className="bg-white p-4 rounded-[28px] shadow-[0_24px_80px_rgba(0,0,0,0.14)] border border-slate-200">
                  <div className="aspect-[4/3] rounded-[16px] overflow-hidden relative">
                    <img
                      src="/assets/images/hero_section2.jpeg"
                      alt="Comunidade GDG Lauro de Freitas"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
                      <div className="text-[10px] font-bold tracking-widest bg-white/80 px-3 py-1 rounded-full border">
                        TECH HUB • GDG LAURO
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur rounded-2xl p-3 flex justify-between items-center shadow-sm border border-white">
                      <div>
                        <div className="text-[11px] text-[#1a73e8] font-bold uppercase tracking-wide">Próximo Encontro</div>
                        <div className="text-[14px] font-bold text-slate-900">Google I/O Extended '24</div>
                      </div>
                      <div className="w-9 h-9 bg-[#e8f0fe] rounded-xl flex items-center justify-center text-sm">📅</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </section>
  );
}
