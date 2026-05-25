'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Coins, User, Mail, Bell, Shield, CreditCard, ChevronRight, Check, Camera, Star } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'profile', label: 'Meu Perfil', icon: User },
  { id: 'notifications', label: 'Notificações', icon: Bell },
  { id: 'security', label: 'Segurança', icon: Shield },
  { id: 'billing', label: 'Assinatura', icon: CreditCard },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-animated bg-grid">
      {/* Nav */}
      <nav className="glass border-b border-[#2A3A55] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full coin-circle flex items-center justify-center">
              <Coins size={12} className="text-[#0D1117]" />
            </div>
            <span className="font-outfit font-bold gradient-gold">CoinVision AI</span>
          </Link>
          <span className="text-[#2A3A55]">/</span>
          <span className="text-[#8899BB] text-sm">Minha Conta</span>
          <div className="ml-auto flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-[#8899BB] hover:text-[#F0F4FF] transition-colors">Dashboard</Link>
            <Link href="/analyze" className="btn-primary text-sm py-1.5 px-4">Nova Análise</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            {/* Avatar */}
            <div className="glass rounded-2xl p-6 text-center mb-4">
              <div className="relative inline-block mb-3">
                <div className="w-20 h-20 rounded-full coin-circle flex items-center justify-center mx-auto">
                  <User size={32} className="text-[#0D1117]" />
                </div>
                <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#D4AF37] flex items-center justify-center">
                  <Camera size={12} className="text-[#0D1117]" />
                </button>
              </div>
              <div className="font-outfit font-bold text-[#F0F4FF]">João Ricardo</div>
              <div className="text-xs text-[#8899BB]">joaobr@fundacaolume.org</div>
              <div className="mt-2"><span className="badge badge-gold text-xs">Plano Pro</span></div>
            </div>
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${activeTab === item.id ? 'bg-[rgba(212,175,55,0.1)] text-[#D4AF37] border border-[#D4AF37]/30' : 'text-[#8899BB] hover:text-[#F0F4FF] hover:bg-[#1A2332]'}`}>
                <item.icon size={16} />
                {item.label}
                <ChevronRight size={14} className="ml-auto" />
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-8">
                <h2 className="text-xl font-outfit font-bold text-[#F0F4FF] mb-6">Informações do Perfil</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    { label: 'Nome completo', placeholder: 'João Ricardo', type: 'text' },
                    { label: 'Username', placeholder: 'joaoricardobr', type: 'text' },
                    { label: 'E-mail', placeholder: 'joaobr@fundacaolume.org', type: 'email' },
                    { label: 'Telefone', placeholder: '+55 (11) 99999-9999', type: 'tel' },
                    { label: 'País', placeholder: 'Brasil', type: 'text' },
                    { label: 'Cidade', placeholder: 'São Paulo', type: 'text' },
                  ].map((field, i) => (
                    <div key={i}>
                      <label className="block text-sm text-[#8899BB] mb-2">{field.label}</label>
                      <input type={field.type} defaultValue={field.placeholder}
                        className="w-full px-4 py-3 bg-[#080B12] border border-[#2A3A55] rounded-xl text-[#F0F4FF] focus:outline-none focus:border-[#D4AF37] transition-colors" />
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <label className="block text-sm text-[#8899BB] mb-2">Bio</label>
                  <textarea rows={3} placeholder="Colecionador de moedas brasileiras raras..."
                    className="w-full px-4 py-3 bg-[#080B12] border border-[#2A3A55] rounded-xl text-[#F0F4FF] placeholder-[#4A5A7A] focus:outline-none focus:border-[#D4AF37] transition-colors resize-none" />
                </div>
                <button onClick={handleSave} className={`mt-6 btn-primary px-8 py-2.5 flex items-center gap-2 ${saved ? 'opacity-80' : ''}`}>
                  {saved ? <><Check size={16} /> Salvo!</> : 'Salvar alterações'}
                </button>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-8">
                <h2 className="text-xl font-outfit font-bold text-[#F0F4FF] mb-6">Preferências de Notificação</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Análise concluída', desc: 'Notificar quando a IA terminar de analisar uma moeda' },
                    { label: 'Alerta de preço', desc: 'Alertar quando uma moeda atingir o preço-alvo' },
                    { label: 'Novidades no catálogo', desc: 'Novas moedas adicionadas ao catálogo' },
                    { label: 'Newsletter mensal', desc: 'Resumo de mercado e raridades numismáticas' },
                    { label: 'Segurança da conta', desc: 'Logins e alterações importantes na conta' },
                  ].map((n, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#080B12] rounded-xl">
                      <div>
                        <div className="text-[#F0F4FF] text-sm font-medium">{n.label}</div>
                        <div className="text-[#4A5A7A] text-xs mt-0.5">{n.desc}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={i < 3} className="sr-only peer" />
                        <div className="w-11 h-6 bg-[#2A3A55] peer-checked:bg-[#D4AF37] rounded-full transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5" />
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-8">
                <h2 className="text-xl font-outfit font-bold text-[#F0F4FF] mb-6">Segurança</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-[#080B12] rounded-xl">
                    <div className="text-[#F0F4FF] text-sm font-medium mb-3">Alterar senha</div>
                    <div className="space-y-3">
                      {['Senha atual', 'Nova senha', 'Confirmar nova senha'].map((lbl, i) => (
                        <input key={i} type="password" placeholder={lbl}
                          className="w-full px-4 py-2.5 bg-[#0D1117] border border-[#2A3A55] rounded-lg text-[#F0F4FF] placeholder-[#4A5A7A] focus:outline-none focus:border-[#D4AF37] transition-colors text-sm" />
                      ))}
                      <button className="btn-primary py-2 px-6 text-sm">Alterar senha</button>
                    </div>
                  </div>
                  <div className="p-4 bg-[#080B12] rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-[#F0F4FF] text-sm font-medium">Autenticação de 2 fatores</div>
                      <div className="text-[#4A5A7A] text-xs mt-0.5">Adicionar camada extra de segurança</div>
                    </div>
                    <button className="btn-secondary text-sm px-4 py-2">Ativar 2FA</button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'billing' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="glass rounded-2xl p-8">
                  <h2 className="text-xl font-outfit font-bold text-[#F0F4FF] mb-2">Assinatura Atual</h2>
                  <div className="glass-gold rounded-xl p-6 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Star size={16} className="text-[#D4AF37]" />
                        <span className="font-outfit font-bold text-[#D4AF37]">Plano Professional</span>
                      </div>
                      <div className="text-[#8899BB] text-sm">Renova em 25/06/2026</div>
                    </div>
                    <div className="text-right">
                      <div className="font-outfit font-black text-2xl text-[#D4AF37]">R$ 99</div>
                      <div className="text-[#8899BB] text-xs">/mês</div>
                    </div>
                  </div>
                </div>
                <div className="glass rounded-2xl p-8">
                  <h3 className="font-outfit font-bold text-[#F0F4FF] mb-4">Histórico de Pagamentos</h3>
                  <div className="space-y-2">
                    {['25/05/2026', '25/04/2026', '25/03/2026'].map((date, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-[#080B12] rounded-lg">
                        <span className="text-[#8899BB] text-sm">{date} — Plano Professional</span>
                        <span className="text-[#10B981] text-sm font-semibold">R$ 99,00</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
