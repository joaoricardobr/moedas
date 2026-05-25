'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Coins, Eye, EyeOff, Mail, Lock, User, Zap, Check } from 'lucide-react';

const PLANS = [
  { id: 'free', label: 'Grátis', price: 'R$ 0', features: ['5 análises/mês', 'OCR básico', 'Catálogo público'] },
  { id: 'starter', label: 'Starter', price: 'R$ 39', features: ['50 análises/mês', 'Gemini 2.5 Flash', 'Histórico de preços'] },
  { id: 'professional', label: 'Pro', price: 'R$ 99', features: ['Ilimitado', 'Prioridade na fila', 'API access'] },
];

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [plan, setPlan] = useState('free');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-animated bg-grid py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full coin-circle flex items-center justify-center">
              <Coins size={18} className="text-[#0D1117]" />
            </div>
            <span className="font-outfit font-bold text-xl gradient-gold">CoinVision AI</span>
          </Link>
          <h1 className="text-3xl font-outfit font-black text-[#F0F4FF] mb-2">Crie sua conta</h1>
          <p className="text-[#8899BB]">Comece a identificar suas moedas com Inteligência Artificial</p>
        </motion.div>

        {/* Plan picker */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="grid grid-cols-3 gap-3 mb-6">
          {PLANS.map(p => (
            <button key={p.id} onClick={() => setPlan(p.id)}
              className={`glass rounded-xl p-4 text-left border-2 transition-all ${plan === p.id ? 'border-[#D4AF37]' : 'border-[#2A3A55] hover:border-[#D4AF37]/40'}`}>
              <div className="font-outfit font-bold text-[#F0F4FF] mb-0.5">{p.label}</div>
              <div className="text-[#D4AF37] font-bold text-lg mb-2">{p.price}<span className="text-xs text-[#8899BB]">/mês</span></div>
              <ul className="space-y-1">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-xs text-[#8899BB]">
                    <Check size={8} className="text-[#10B981]" /> {f}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-8 border border-[#2A3A55]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-[#8899BB] mb-2">Nome completo</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5A7A]" />
                <input type="text" required placeholder="Seu nome"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-[#080B12] border border-[#2A3A55] rounded-xl text-[#F0F4FF] placeholder-[#4A5A7A] focus:outline-none focus:border-[#D4AF37] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#8899BB] mb-2">E-mail</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5A7A]" />
                <input type="email" required placeholder="seu@email.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-[#080B12] border border-[#2A3A55] rounded-xl text-[#F0F4FF] placeholder-[#4A5A7A] focus:outline-none focus:border-[#D4AF37] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#8899BB] mb-2">Senha</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5A7A]" />
                <input type={showPass ? 'text' : 'password'} required placeholder="Mínimo 8 caracteres"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-[#080B12] border border-[#2A3A55] rounded-xl text-[#F0F4FF] placeholder-[#4A5A7A] focus:outline-none focus:border-[#D4AF37] transition-colors" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5A7A] hover:text-[#8899BB]">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <label className="flex items-start gap-2 text-sm text-[#8899BB] cursor-pointer">
              <input type="checkbox" required className="w-4 h-4 rounded mt-0.5" />
              <span>Concordo com os <Link href="/terms" className="text-[#D4AF37] hover:underline">Termos de Uso</Link> e <Link href="/privacy" className="text-[#D4AF37] hover:underline">Política de Privacidade</Link></span>
            </label>
            <button type="submit" disabled={loading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-base font-semibold">
              {loading ? <div className="w-5 h-5 rounded-full border-2 border-[#0D1117] border-t-transparent animate-spin" /> : <><Zap size={18} /> Criar conta — {PLANS.find(p2 => p2.id === plan)?.price}/mês</>}
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-[#2A3A55] text-center">
            <p className="text-[#8899BB] text-sm">
              Já tem uma conta?{' '}
              <Link href="/auth/login" className="text-[#D4AF37] hover:underline font-semibold">Entrar</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
