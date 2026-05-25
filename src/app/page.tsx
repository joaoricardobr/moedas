'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Coins, Zap, Shield, TrendingUp, Eye, Search, Star,
  ChevronRight, Check, Globe, Award, BarChart3, Lock,
  Cpu, ScanLine, Database, ArrowRight, Sparkles
} from 'lucide-react';

const FEATURES = [
  { icon: ScanLine, title: 'Visão Computacional', desc: 'YOLO + CLIP detectam e analisam cada detalhe da moeda com precisão microscópica', color: '#D4AF37' },
  { icon: Cpu, title: 'OCR Avançado', desc: 'Tesseract + Gemini 1.5 Pro lêem inscrições, datas e marcas da casa da moeda', color: '#3B82F6' },
  { icon: Database, title: 'Catálogos Globais', desc: 'Integração com KM, PCGS, NGC, Amato, Vieira e 50+ bancos numismáticos', color: '#8B5CF6' },
  { icon: TrendingUp, title: 'Preço em Tempo Real', desc: 'Scraping de leilões Heritage, Stack\'s Bowers, MercadoLivre e eBay', color: '#10B981' },
  { icon: Shield, title: 'Autenticação IA', desc: 'Detecta falsificações e erros de cunhagem com 94%+ de precisão', color: '#F59E0B' },
  { icon: BarChart3, title: 'Histórico de Valorização', desc: 'Gráficos de tendência, índice de raridade e projeções de mercado', color: '#EF4444' },
];

const STATS = [
  { value: '14.8K+', label: 'Análises Realizadas' },
  { value: '94.4%', label: 'Precisão da IA' },
  { value: '8.3K+', label: 'Moedas Catalogadas' },
  { value: '50+', label: 'Fontes de Dados' },
];

const PLANS = [
  {
    name: 'Starter', price: 'R$ 49', period: '/mês', color: '#3B82F6',
    features: ['10 análises/mês', 'Identificação básica', 'Valor estimado', 'Histórico 6 meses'],
    cta: 'Começar Grátis',
  },
  {
    name: 'Professional', price: 'R$ 149', period: '/mês', color: '#D4AF37', popular: true,
    features: ['100 análises/mês', 'Análise completa IA', 'Detecção de erros', 'Histórico completo', 'Alertas de preço', 'API access', 'Export PDF'],
    cta: 'Assinar Agora',
  },
  {
    name: 'Enterprise', price: 'R$ 499', period: '/mês', color: '#8B5CF6',
    features: ['Análises ilimitadas', 'Treinamento personalizado', 'Integração dedicada', 'SLA garantido', 'Suporte prioritário', 'Multi-usuário', 'Whitelabel'],
    cta: 'Contato Comercial',
  },
];

const COIN_DEMO_STEPS = [
  { step: 1, text: 'Upload da foto da moeda', icon: '📸', done: true },
  { step: 2, text: 'OCR detecta "500 RÉIS · 1889"', icon: '🔍', done: true },
  { step: 3, text: 'IA identifica: Brasil · Prata · KM#481', icon: '🧠', done: true },
  { step: 4, text: 'Conservação classificada: EF-45', icon: '📊', done: true },
  { step: 5, text: 'Valor estimado: R$ 4.800', icon: '💰', done: true },
];

export default function HomePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(s => (s + 1) % COIN_DEMO_STEPS.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-animated bg-grid">
      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 60 ? 'glass border-b border-[#2A3A55]' : 'bg-[#080B12]/90 backdrop-blur-md border-b border-[#2A3A55]/50'}`}>
        <div className="w-full max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full coin-circle flex items-center justify-center">
              <Coins size={14} className="text-[#0D1117]" />
            </div>
            <span className="font-outfit font-bold text-lg gradient-gold">CoinVision AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#8899BB]">
            <Link href="#features" className="hover:text-[#F0F4FF] transition-colors">Recursos</Link>
            <Link href="#how" className="hover:text-[#F0F4FF] transition-colors">Como Funciona</Link>
            <Link href="#pricing" className="hover:text-[#F0F4FF] transition-colors">Preços</Link>
            <Link href="/catalog" className="hover:text-[#F0F4FF] transition-colors">Catálogo</Link>
            <Link href="/dashboard" className="hover:text-[#F0F4FF] transition-colors">Dashboard</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm text-[#8899BB] hover:text-[#F0F4FF] transition-colors px-4 py-2">Entrar</Link>
            <Link href="/auth/register" className="btn-secondary text-sm py-2 px-4">Cadastrar</Link>
            <Link href="/analyze" className="btn-primary text-sm py-2 px-5">
              Analisar Moeda
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-24 px-6 text-center relative overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full border border-[#2A3A55]/30 absolute" />
          <div className="w-[900px] h-[900px] rounded-full border border-[#2A3A55]/20 absolute" />
          <div className="w-[1200px] h-[1200px] rounded-full border border-[#2A3A55]/10 absolute" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="inline-flex items-center gap-2 badge badge-gold mb-6">
            <Sparkles size={12} />
            Plataforma SaaS Numismática com IA
          </div>

          <h1 className="text-5xl md:text-7xl font-outfit font-black mb-6 leading-tight">
            <span className="gradient-gold">Google Lens</span>
            <br />
            <span className="text-[#F0F4FF]">para Moedas Raras</span>
          </h1>

          <p className="text-lg text-[#8899BB] max-w-2xl mx-auto mb-10 leading-relaxed">
            Envie a foto de qualquer moeda e nossa IA identifica, cataloga, autentica e precifica em segundos.
            Visão computacional + OCR + catálogos globais + preços de mercado em tempo real.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/analyze" className="btn-primary text-base py-3 px-8 inline-flex items-center gap-2">
              <Zap size={18} />
              Analisar Agora — Grátis
            </Link>
            <Link href="/dashboard" className="btn-secondary text-base py-3 px-8 inline-flex items-center gap-2">
              <Eye size={18} />
              Ver Demonstração
            </Link>
          </div>

          {/* Stats row */}
          <div className="w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass rounded-xl p-4"
              >
                <div className="metric-value text-2xl gradient-gold">{s.value}</div>
                <div className="metric-label mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── LIVE DEMO PREVIEW ── */}
      <section className="py-16 px-6">
        <div className="w-full max-w-5xl mx-auto">
          <div className="glass rounded-2xl overflow-hidden border border-[#2A3A55]">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2A3A55] bg-[#0D1117]">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span className="ml-3 text-xs text-[#4A5A7A]">coinvision.ai/analyze — Análise em Tempo Real</span>
            </div>
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left: coin visualization */}
              <div className="p-8 flex flex-col items-center justify-center bg-[#080B12] relative min-h-[320px]">
                <div className="relative">
                  <div className="w-44 h-44 coin-circle float">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl">🪙</span>
                    </div>
                  </div>
                  {/* Scan animation */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="scan-line" style={{ animation: 'scan 2s linear infinite' }} />
                  </div>
                  {/* Targeting corners */}
                  {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} w-6 h-6 border-[#D4AF37] border-2`}
                      style={{
                        borderRight: pos.includes('left') ? 'none' : undefined,
                        borderLeft: pos.includes('right') ? 'none' : undefined,
                        borderBottom: pos.includes('top') ? 'none' : undefined,
                        borderTop: pos.includes('bottom') ? 'none' : undefined,
                      }} />
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <div className="badge badge-gold text-xs animate-pulse">
                    <span className="w-2 h-2 bg-[#D4AF37] rounded-full inline-block" />
                    Analisando...
                  </div>
                </div>
              </div>
              {/* Right: pipeline steps */}
              <div className="p-8 flex flex-col justify-center gap-3">
                <h3 className="font-outfit font-bold text-lg mb-4 text-[#F0F4FF]">Pipeline da IA</h3>
                {COIN_DEMO_STEPS.map((step, i) => (
                  <motion.div
                    key={step.step}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                      i === activeStep
                        ? 'bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.3)]'
                        : i < activeStep ? 'opacity-70' : 'opacity-30'
                    }`}
                  >
                    <span className="text-lg">{step.icon}</span>
                    <span className="text-sm text-[#F0F4FF] flex-1">{step.text}</span>
                    {i <= activeStep && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0"
                      >
                        <Check size={10} className="text-white" />
                      </motion.span>
                    )}
                    {i === activeStep && (
                      <div className="w-5 h-5 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin flex-shrink-0" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 px-6">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-outfit font-black text-[#F0F4FF] mb-4">
              Tecnologia de <span className="gradient-gold">Ponta a Ponta</span>
            </h2>
            <p className="text-[#8899BB] max-w-xl mx-auto">Pipeline completo de IA com visão computacional, OCR, machine learning e integração com catálogos globais.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 card-hover"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}>
                  <f.icon size={22} style={{ color: f.color }} />
                </div>
                <h3 className="font-outfit font-bold text-[#F0F4FF] text-lg mb-2">{f.title}</h3>
                <p className="text-[#8899BB] text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-20 px-6 bg-[#080B12]">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-outfit font-black text-[#F0F4FF] mb-4">
              Como <span className="gradient-gold">Funciona</span>
            </h2>
          </div>
          <div className="space-y-6">
            {[
              { n: '01', title: 'Envie a Foto', desc: 'Upload de frente, verso e borda. Arraste ou tire diretamente pela câmera.', icon: '📸' },
              { n: '02', title: 'IA Processa', desc: 'OCR + YOLO + CLIP analisam cada pixel. 9 etapas de processamento em segundos.', icon: '🧠' },
              { n: '03', title: 'Catálogos Consultados', desc: 'Buscamos em 50+ fontes: KM, PCGS, NGC, Amato, leilões internacionais.', icon: '📚' },
              { n: '04', title: 'Relatório Completo', desc: 'País, ano, grau, raridade, autenticidade, valor mínimo/médio/máximo e tendência.', icon: '📊' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-6 p-6 glass rounded-2xl"
              >
                <div className="text-4xl flex-shrink-0">{step.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-[#D4AF37] font-bold">{step.n}</span>
                    <h3 className="font-outfit font-bold text-[#F0F4FF] text-xl">{step.title}</h3>
                  </div>
                  <p className="text-[#8899BB]">{step.desc}</p>
                </div>
                <ChevronRight size={20} className="text-[#2A3A55] flex-shrink-0 mt-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-20 px-6">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-outfit font-black text-[#F0F4FF] mb-4">
              Planos <span className="gradient-gold">Transparentes</span>
            </h2>
            <p className="text-[#8899BB]">Escolha o plano ideal para o seu perfil de colecionador ou negócio numismático.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative glass rounded-2xl p-8 flex flex-col ${plan.popular ? 'border-[#D4AF37]/40 glow-gold' : ''}`}
                style={{ border: `1px solid ${plan.color}30` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge badge-gold text-xs whitespace-nowrap">
                    <Star size={10} fill="currentColor" /> Mais Popular
                  </div>
                )}
                <div className="mb-6">
                  <div className="font-outfit font-bold text-xl mb-1" style={{ color: plan.color }}>{plan.name}</div>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-[#F0F4FF]">{plan.price}</span>
                    <span className="text-[#8899BB] mb-1">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-[#8899BB]">
                      <Check size={14} style={{ color: plan.color }} className="flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3 rounded-xl font-outfit font-bold text-sm transition-all duration-300"
                  style={{
                    background: plan.popular ? `linear-gradient(135deg, ${plan.color}, ${plan.color}88)` : 'transparent',
                    border: `1px solid ${plan.color}60`,
                    color: plan.popular ? '#0D1117' : plan.color,
                  }}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-20 px-6">
        <div className="w-full max-w-3xl mx-auto text-center">
          <div className="glass-gold rounded-3xl p-12">
            <div className="w-16 h-16 coin-circle mx-auto mb-6 flex items-center justify-center">
              <Coins size={24} className="text-[#0D1117]" />
            </div>
            <h2 className="text-3xl font-outfit font-black text-[#F0F4FF] mb-4">
              Comece sua Análise <span className="gradient-gold">Agora</span>
            </h2>
            <p className="text-[#8899BB] mb-8">10 análises gratuitas por mês. Sem cartão de crédito. Resultado em segundos.</p>
            <Link href="/analyze" className="btn-primary text-base py-3 px-10 inline-flex items-center gap-2">
              Analisar Minha Moeda <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#2A3A55] py-12 px-6">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full coin-circle" />
            <span className="font-outfit font-bold gradient-gold">CoinVision AI</span>
            <span className="text-[#4A5A7A] text-sm ml-2">© 2026. Todos os direitos reservados.</span>
          </div>
          <div className="flex gap-6 text-sm text-[#4A5A7A]">
            <Link href="/dashboard" className="hover:text-[#8899BB] transition-colors">Dashboard</Link>
            <Link href="/analyze" className="hover:text-[#8899BB] transition-colors">Analisar</Link>
            <Link href="/catalog" className="hover:text-[#8899BB] transition-colors">Catálogo</Link>
            <Link href="/admin" className="hover:text-[#8899BB] transition-colors">Admin</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
