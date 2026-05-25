'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import {
  Coins, TrendingUp, Users, Zap, BarChart3, Bell,
  Search, Settings, Shield, Star, Clock, ChevronRight,
  Eye, Download, Plus, AlertCircle, Check, ChevronLeft,
  Home, Database, Layers, BookOpen, Award, LogOut
} from 'lucide-react';
import {
  MOCK_ANALYSES, MOCK_COLLECTION, MOCK_ALERTS, MOCK_STATS,
  MONTHLY_ANALYSES, RARITY_DISTRIBUTION
} from '@/lib/mockData';
import { GRADE_LABELS, RARITY_LABELS, RARITY_COLORS } from '@/lib/types';

type NavSection = 'overview' | 'analyses' | 'collection' | 'catalog' | 'alerts' | 'settings';

function Sidebar({ active, onNav }: { active: NavSection; onNav: (s: NavSection) => void }) {
  const items = [
    { id: 'overview', label: 'Visão Geral', icon: Home },
    { id: 'analyses', label: 'Minhas Análises', icon: Zap },
    { id: 'collection', label: 'Coleção', icon: Layers },
    { id: 'catalog', label: 'Catálogo', icon: BookOpen },
    { id: 'alerts', label: 'Alertas de Preço', icon: Bell },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ] as const;

  return (
    <aside className="sidebar">
      <div className="p-5 border-b border-[#2A3A55]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full coin-circle flex items-center justify-center">
            <Coins size={13} className="text-[#0D1117]" />
          </div>
          <div>
            <div className="font-outfit font-bold gradient-gold text-sm">CoinVision</div>
            <div className="text-[10px] text-[#4A5A7A]">Dashboard</div>
          </div>
        </div>
      </div>

      <div className="p-3 mt-2">
        <div className="text-[10px] font-semibold text-[#4A5A7A] uppercase tracking-widest px-3 mb-2">Menu</div>
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onNav(item.id as NavSection)}
            className={`sidebar-item w-full text-left ${active === item.id ? 'active' : ''}`}
          >
            <item.icon size={16} />
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-3 mt-auto border-t border-[#2A3A55] absolute bottom-0 left-0 right-0">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#A07C20] flex items-center justify-center text-xs font-bold text-[#0D1117]">
            RC
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-[#F0F4FF] truncate">Ricardo Costa</div>
            <div className="text-[10px] text-[#4A5A7A]">Plano Professional</div>
          </div>
          <LogOut size={14} className="text-[#4A5A7A] cursor-pointer hover:text-[#EF4444]" />
        </div>
      </div>
    </aside>
  );
}

function OverviewSection() {
  const stats = MOCK_STATS;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-outfit font-black text-[#F0F4FF]">Visão Geral</h1>
          <p className="text-[#8899BB] text-sm">Bem-vindo de volta, Ricardo 👋</p>
        </div>
        <Link href="/analyze" className="btn-primary py-2 px-5 text-sm flex items-center gap-2">
          <Plus size={16} /> Nova Análise
        </Link>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total de Análises', value: stats.totalAnalyses.toLocaleString('pt-BR'), change: '+12%', icon: Zap, color: '#D4AF37' },
          { label: 'Moedas Identificadas', value: stats.coinsIdentified.toLocaleString('pt-BR'), change: '+8%', icon: Coins, color: '#3B82F6' },
          { label: 'Raridades Encontradas', value: stats.rareCoinFound, change: '+5', icon: Star, color: '#8B5CF6' },
          { label: 'Precisão da IA', value: `${Math.round(stats.accuracyRate * 100)}%`, change: '+0.3%', icon: Shield, color: '#10B981' },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="stat-card">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${s.color}20` }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              <span className="badge badge-green text-xs">{s.change}</span>
            </div>
            <div className="metric-value" style={{ color: s.color }}>{s.value}</div>
            <div className="metric-label mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <h3 className="font-outfit font-bold text-[#F0F4FF] mb-4">Análises por Mês</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_ANALYSES}>
                <defs>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3A55" />
                <XAxis dataKey="month" tick={{ fill: '#8899BB', fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: '#8899BB', fontSize: 11 }} axisLine={false} />
                <Tooltip contentStyle={{ background: '#1A2332', border: '1px solid #2A3A55', borderRadius: '0.5rem' }} />
                <Area type="monotone" dataKey="analyses" stroke="#3B82F6" fill="url(#blueGrad)" strokeWidth={2} name="Análises" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="font-outfit font-bold text-[#F0F4FF] mb-4">Raridade das Moedas</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={RARITY_DISTRIBUTION} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value">
                  {RARITY_DISTRIBUTION.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`, '']} contentStyle={{ background: '#1A2332', border: '1px solid #2A3A55', borderRadius: '0.5rem' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {RARITY_DISTRIBUTION.slice(0, 4).map((r, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-[#8899BB]">
                <div className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                {r.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent analyses */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-[#2A3A55] flex items-center justify-between">
          <h3 className="font-outfit font-bold text-[#F0F4FF]">Análises Recentes</h3>
          <Link href="#" onClick={() => {}} className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1">
            Ver todas <ChevronRight size={12} />
          </Link>
        </div>
        <table className="table-dark">
          <thead>
            <tr>
              <th>Moeda</th>
              <th>País</th>
              <th>Ano</th>
              <th>Grau</th>
              <th>Raridade</th>
              <th>Valor Est.</th>
              <th>Confiança</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ANALYSES.map(a => (
              <tr key={a.id}>
                <td className="font-medium text-[#F0F4FF]">{a.coin?.name || 'Processando...'}</td>
                <td>{a.coin?.countryCode || '—'}</td>
                <td>{a.coin?.year || '—'}</td>
                <td>{a.grade ? <span className="badge badge-blue text-xs">{a.grade}</span> : '—'}</td>
                <td>
                  {a.rarity ? (
                    <span className="text-xs font-semibold" style={{ color: RARITY_COLORS[a.rarity] }}>
                      {RARITY_LABELS[a.rarity]}
                    </span>
                  ) : '—'}
                </td>
                <td className="text-[#D4AF37] font-semibold">
                  {a.estimatedValueAvg ? `R$ ${a.estimatedValueAvg.toLocaleString('pt-BR')}` : '—'}
                </td>
                <td>
                  {a.confidence > 0 ? (
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${a.confidence >= 0.85 ? 'bg-[#10B981]' : 'bg-[#F59E0B]'}`} />
                      <span className="text-xs">{Math.round(a.confidence * 100)}%</span>
                    </div>
                  ) : '—'}
                </td>
                <td>
                  <span className={`badge text-xs ${
                    a.status === 'completed' ? 'badge-green' :
                    a.status === 'processing' ? 'badge-gold' : 'badge-red'
                  }`}>
                    {a.status === 'completed' ? 'Concluído' : a.status === 'processing' ? 'Processando' : a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CollectionSection() {
  const totalValue = MOCK_COLLECTION.reduce((s, i) => s + (i.currentValue || 0), 0);
  const totalGain = MOCK_COLLECTION.reduce((s, i) => s + (i.gainLoss || 0), 0);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-outfit font-black text-[#F0F4FF]">Minha Coleção</h1>
          <p className="text-[#8899BB] text-sm">{MOCK_COLLECTION.length} itens · Valor total: R$ {totalValue.toLocaleString('pt-BR')}</p>
        </div>
        <Link href="/analyze" className="btn-primary py-2 px-5 text-sm flex items-center gap-2">
          <Plus size={16} /> Adicionar Moeda
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { l: 'Valor Total', v: `R$ ${totalValue.toLocaleString('pt-BR')}`, c: '#D4AF37' },
          { l: 'Lucro Total', v: `R$ ${totalGain.toLocaleString('pt-BR')}`, c: '#10B981' },
          { l: 'Itens na Coleção', v: MOCK_COLLECTION.length, c: '#3B82F6' },
        ].map((s, i) => (
          <div key={i} className="stat-card text-center">
            <div className="metric-label mb-1">{s.l}</div>
            <div className="font-outfit font-bold text-2xl" style={{ color: s.c }}>{s.v}</div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="table-dark">
          <thead>
            <tr>
              <th>Moeda</th>
              <th>Grau</th>
              <th>Compra</th>
              <th>Valor Atual</th>
              <th>Lucro/Perda</th>
              <th>Data Compra</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_COLLECTION.map(item => (
              <tr key={item.id}>
                <td className="font-medium text-[#F0F4FF]">{item.coin?.name}</td>
                <td>{item.grade ? <span className="badge badge-blue text-xs">{item.grade}</span> : '—'}</td>
                <td>R$ {item.purchasePrice?.toLocaleString('pt-BR')}</td>
                <td className="text-[#D4AF37] font-semibold">R$ {item.currentValue?.toLocaleString('pt-BR')}</td>
                <td>
                  <span className={item.gainLoss! >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}>
                    {item.gainLoss! >= 0 ? '+' : ''}R$ {item.gainLoss?.toLocaleString('pt-BR')} ({item.gainLossPct?.toFixed(1)}%)
                  </span>
                </td>
                <td className="text-[#8899BB] text-xs">{item.purchaseDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AlertsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-outfit font-black text-[#F0F4FF]">Alertas de Preço</h1>
      <div className="space-y-3">
        {MOCK_ALERTS.map(alert => (
          <div key={alert.id} className="glass rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${alert.triggered ? 'bg-[rgba(16,185,129,0.2)]' : 'bg-[rgba(245,158,11,0.2)]'}`}>
                <Bell size={18} className={alert.triggered ? 'text-[#10B981]' : 'text-[#F59E0B]'} />
              </div>
              <div>
                <div className="font-outfit font-bold text-[#F0F4FF]">{alert.coinName}</div>
                <div className="text-sm text-[#8899BB]">
                  {alert.direction === 'below' ? 'Abaixo de' : 'Acima de'} R$ {alert.targetPrice.toLocaleString('pt-BR')}
                  {alert.grade && ` · Grau ${alert.grade}`}
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className={`badge text-xs ${alert.triggered ? 'badge-green' : 'badge-gold'}`}>
                {alert.triggered ? '✓ Disparado' : '⏳ Aguardando'}
              </span>
              {alert.triggeredAt && <div className="text-xs text-[#4A5A7A] mt-1">{new Date(alert.triggeredAt).toLocaleDateString('pt-BR')}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceholderSection({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 glass rounded-2xl">
      <div className="text-5xl">🪙</div>
      <h2 className="text-xl font-outfit font-bold text-[#F0F4FF]">{title}</h2>
      <p className="text-[#8899BB] text-sm">Em desenvolvimento...</p>
    </div>
  );
}

export default function DashboardPage() {
  const [section, setSection] = useState<NavSection>('overview');

  return (
    <div className="min-h-screen bg-[#080B12] flex">
      <Sidebar active={section} onNav={setSection} />

      {/* Main */}
      <main className="flex-1 ml-[260px] min-h-screen">
        {/* Top bar */}
        <div className="glass border-b border-[#2A3A55] sticky top-0 z-30">
          <div className="px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5A7A]" />
                <input className="input-dark pl-9 py-1.5 text-sm w-56" placeholder="Buscar moeda..." />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell size={18} className="text-[#8899BB] cursor-pointer hover:text-[#F0F4FF]" />
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] text-[9px] text-white flex items-center justify-center font-bold">2</div>
              </div>
              <Link href="/analyze" className="btn-primary py-1.5 px-4 text-xs flex items-center gap-1.5">
                <Zap size={13} /> Analisar
              </Link>
            </div>
          </div>
        </div>

        <div className="p-8">
          {section === 'overview' && <OverviewSection />}
          {section === 'analyses' && <PlaceholderSection title="Todas as Análises" />}
          {section === 'collection' && <CollectionSection />}
          {section === 'catalog' && <PlaceholderSection title="Catálogo de Moedas" />}
          {section === 'alerts' && <AlertsSection />}
          {section === 'settings' && <PlaceholderSection title="Configurações" />}
        </div>
      </main>
    </div>
  );
}
