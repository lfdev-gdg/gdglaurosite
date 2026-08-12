"use client";
import { useEffect, useRef, useState } from "react";

type Initiative = {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
  featured?: "primary" | "large";
  span?: string;
};

const initiatives: Initiative[] = [
  {
    id: "virtuais",
    title: "Encontros Virtuais",
    desc: "Palestras e discussões online sobre tecnologias Google, acessíveis de qualquer lugar.",
    icon: "💻",
    color: "#4285F4",
  },
  {
    id: "presenciais",
    title: "Encontros Presenciais",
    desc: "Palestras, laboratórios e networking presencial na região de Lauro de Freitas.",
    icon: "📍",
    color: "#EA4335",
  },
  {
    id: "devfest",
    title: "DevFest",
    desc: "O maior evento anual da comunidade Google Developers, reunindo centenas de participantes.",
    icon: "⭐",
    color: "#FBBC05",
    featured: "large",
    span: "lg:col-span-1",
  },
  {
    id: "build",
    title: "Build with AI",
    desc: "Workshops práticos focados em inteligência artificial com tecnologias Google. Construímos agentes reais no laboratório.",
    icon: "✨",
    color: "#4285F4",
    featured: "primary",
    span: "lg:col-span-2",
  },
  {
    id: "workshops",
    title: "Workshops",
    desc: "Sessões hands-on para aprender novas habilidades com especialistas da comunidade.",
    icon: "⚡",
    color: "#FBBC05",
  },
  {
    id: "mentorias",
    title: "Mentorias",
    desc: "Programa de mentoria para desenvolvedores em início de carreira guiados por profissionais experientes.",
    icon: "🎓",
    color: "#34A853",
  },
  {
    id: "wtm",
    title: "Women Techmakers",
    desc: "Programa Technovation que promove visibilidade, comunidade e recursos para mulheres na tecnologia.",
    icon: "💜",
    color: "#8E24AA",
  },
];

function useParallax() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrollY;
}

export default function IniciativasGDG() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollY = useParallax();
  const [visible, setVisible] = useState<Set<string>>(new Set());

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible((prev) => new Set(prev).add(e.target.id));
          }
        });
      },
      { threshold: 0.15 }
    );
    initiatives.forEach((init) => {
      const el = document.getElementById(init.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* bg */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#4285F4]/5 blur-[120px] rounded-full" />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-[720px] mx-auto mb-16">
          <div className="inline-flex px-3 py-1 rounded-full bg-slate-100 text-[11px] font-bold tracking-widest text-slate-600">
            O QUE FAZEMOS
          </div>
          <h2 className="mt-6 text-[36px] lg:text-[48px] font-black tracking-[-0.03em] text-[#0f172a]">
            Nossas Iniciativas
          </h2>
          <p className="mt-4 text-[17px] leading-7 text-slate-600">
            Conheça os programas e encontros que movimentam a comunidade Google Developers em Lauro de Freitas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initiatives.map((item, idx) => {
            const isVisible = visible.has(item.id);
            const parallaxOffset = (scrollY * (0.02 + idx * 0.008)) % 20;

            return (
              <div
                key={item.id}
                id={item.id}
                className={`
                  group relative rounded-[24px] border p-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${item.featured === "primary"
                    ? "bg-[#1a73e8] border-[#1a73e8] text-white shadow-[0_20px_60px_rgba(26,115,232,0.3)] lg:col-span-2"
                    : item.featured === "large"
                    ? "bg-white border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2"
                    : "bg-white border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2"
                  }
                  ${item.span || ""}
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                `}
                style={{
                  transitionDelay: `${idx * 80}ms`,
                  transform: `translateY(${isVisible ? parallaxOffset * -0.3 : 40}px)`,
                }}
              >
                {item.featured === "primary" && (
                  <div className="absolute inset-0 rounded-[24px] p-[1px] bg-gradient-to-r from-white/20 via-white/5 to-white/20 opacity-60">
                    <div className="h-full w-full rounded-[23px] bg-[#1a73e8]" />
                  </div>
                )}

                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-6 ${
                      item.featured === "primary"
                        ? "bg-white/15 backdrop-blur"
                        : "bg-slate-50 border border-slate-100"
                    }`}
                  >
                    {item.icon}
                  </div>

                  <h3
                    className={`text-[18px] font-bold tracking-tight mb-3 ${
                      item.featured === "primary" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {item.title}
                    {item.featured === "large" && (
                      <span className="ml-2 inline-flex text-[10px] px-2 py-0.5 rounded-full bg-[#FBBC05] text-black font-black tracking-widest">
                        ANUAL
                      </span>
                    )}
                  </h3>

                  <p
                    className={`text-[14px] leading-6 ${
                      item.featured === "primary" ? "text-blue-100" : "text-slate-600"
                    }`}
                  >
                    {item.desc}
                  </p>

                  {item.featured === "primary" && (
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-white">
                      Entrar no lab <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  )}
                </div>

                {item.featured !== "primary" && (
                  <div
                    className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
