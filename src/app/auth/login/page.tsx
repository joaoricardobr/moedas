'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Coins, Eye, EyeOff, Mail, Lock, Zap, Check } from 'lucide-react';

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    // Simula login: redireciona para dashboard
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-animated bg-grid flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full coin-circle flex items-center justify-center">
              <Coins size={18} className="text-[#0D1117]" />
            </div>
            <span className="font-outfit font-bold text-xl gradient-gold">CoinVision AI</span>
          </Link>
          <h1 className="text-3xl font-outfit font-black text-[#F0F4FF] mb-2">Bem-vindo de volta</h1>
          <p className="text-[#8899BB]">Acesse sua conta para continuar analisando moedas</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-8 border border-[#2A3A55]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-[#8899BB] mb-2">E-mail</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5A7A]" />
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  required placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#080B12] border border-[#2A3A55] rounded-xl text-[#F0F4FF] placeholder-[#4A5A7A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#8899BB] mb-2">Senha</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5A7A]" />
                <input
                  type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  required placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-[#080B12] border border-[#2A3A55] rounded-xl text-[#F0F4FF] placeholder-[#4A5A7A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5A7A] hover:text-[#8899BB]">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#8899BB] cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                Lembrar de mim
              </label>
              <Link href="/auth/forgot" className="text-[#D4AF37] hover:underline">Esqueci a senha</Link>
            </div>
            <button type="submit" disabled={loading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-base font-semibold">
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-[#0D1117] border-t-transparent animate-spin" />
              ) : (
                <><Zap size={18} /> Entrar</>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#2A3A55] text-center">
            <p className="text-[#8899BB] text-sm">
              Não tem uma conta?{' '}
              <Link href="/auth/register" className="text-[#D4AF37] hover:underline font-semibold">Criar conta grátis</Link>
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-6 grid grid-cols-3 gap-3 text-center">
          {['94% Precisão', '10 etapas de IA', 'Grátis para começar'].map((f, i) => (
            <div key={i} className="flex items-center justify-center gap-1.5 text-xs text-[#4A5A7A]">
              <Check size={10} className="text-[#10B981]" /> {f}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
