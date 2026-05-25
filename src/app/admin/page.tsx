'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, AreaChart, Area, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';
import {
  Users, Zap, Database, Shield, Settings, Activity,
  TrendingUp, AlertCircle, Check, Clock, Server,
  Cpu, BarChart3, Bell, Search, RefreshCw, Layers,
  ChevronRight, LogOut, Coins, Home, BookOpen, Terminal
} from 'lucide-react';
import { MOCK_ADMIN_STATS, MONTHLY_ANALYSES, REVENUE_DATA, RARITY_DISTRIBUTION } from '@/lib/mockData';

type AdminSection = 'overview' | 'users' | 'coins' | 'ai' | 'apis' | 'queue' | 'logs';

const FAKE_USERS = [
  { id: 1, name: 'Ricardo Costa', email: 'ricardo@email.com', plan: 'professional', analyses: 142, joined: '2025-11-10', status: 'active' },
  { id: 2, name: 'Ana Silva', email: 'ana@email.com', plan: 'starter', analyses: 28, joined: '2026-01-05', status: 'active' },
  { id: 3, name: 'João Numismata', email: 'joao@num.com', plan: 'enterprise', analyses: 891, joined: '2025-08-22', status: 'active' },
  { id: 4, name: 'Maria Colecionadora', email: 'maria@col.com', plan: 'free', analyses: 7, joined: '2026-03-14', status: 'pending' },
  { id: 5, name: 'Pedro Leilões', email: 'pedro@leil.com', plan: 'professional', analyses: 234, joined: '2025-12-01', status: 'active' },
];

const FAKE_QUEUE = [
  { id: 'j1', type: 'coin_analysis', status: 'processing', user: 'ana@email.com', created: '14:52:33', priority: 'high' },
  { id: 'j2', type: 'price_scrape', status: 'pending', user: 'system', created: '14:51:00', priority: 'medium' },
  { id: 'j3', type: 'coin_analysis', status: 'pending', user: 'pedro@leil.com', created: '14:50:12', priority: 'high' },
  { id: 'j4', type: 'catalog_sync', status: 'done', user: 'system', created: '14:45:00', priority: 'low' },
  { id: 'j5', type: 'ai_training', status: 'pending', user: 'admin', created: '14:30:00', priority: 'medium' },
];

const FAKE_LOGS = [
  { level: 'INFO', msg: 'Análise concluída: 500 Réis 1889 EF45 — confiança 94.7%', time: '15:01:05' },
  { level: 'INFO', msg: 'Novo usuário registrado: joao@numismata.com', time: '14:58:22' },
  { level: 'WARN', msg: 'API Heritage: rate limit atingido (100/min)', time: '14:55:11' },
  { level: 'INFO', msg: 'Scraping MercadoLivre: 48 novos preços coletados', time: '14:50:00' },
  { level: 'ERROR', msg: 'OCR timeout na análise #a829f — reprocessando', time: '14:47:33' },
  { level: 'INFO', msg: 'Modelo AI v2.3 carregado com sucesso', time: '14:30:00' },
  { level: 'INFO', msg: 'Cache Redis limpo: 2.4GB liberados', time: '14:15:00' },
];

const API_SOURCES = [
  { name: 'Heritage Auctions', status: 'online', latency: 342, calls: 1240, errors: 3 },
  { name: 'Stack\'s Bowers', status: 'online', latency: 512, calls: 890, errors: 0 },
  { name: 'PCGS CoinFacts', status: 'online', latency: 218, calls: 2150, errors: 1 },
  { name: 'NGC Coin Explorer', status: 'online', latency: 195, calls: 1820, errors: 0 },
  { name: 'MercadoLivre', status: 'degraded', latency: 1842, calls: 3400, errors: 47 },
  { name: 'eBay Coins', status: 'online', latency: 420, calls: 1100, errors: 2 },
  { name: 'Google Gemini API', status: 'online', latency: 1200, calls: 14872, errors: 12 },
  { name: 'Tesseract OCR', status: 'online', latency: 890, calls: 14872, errors: 5 },
];

function AdminSidebar({ active, onNav }: { active: AdminSection; onNav: (s: AdminSection) => void }) {
  const items = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'coins', label: 'Moedas', icon: Coins },
    { id: 'ai', label: 'Modelo IA', icon: Cpu },
    { id: 'apis', label: 'APIs & Scrapers', icon: Database },
    { id: 'queue', label: 'Fila de Jobs', icon: Layers },
    { id: 'logs', label: 'Logs do Sistema', icon: Terminal },
  ] as const;

  return (
    <aside className="sidebar border-r border-[#2A3A55]">
      <div className="p-5 border-b border-[#2A3A55]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[rgba(139,92,246,0.2)] border border-[rgba(139,92,246,0.4)] flex items-center justify-center">
            <Shield size={14} className="text-[#8B5CF6]" />
          </div>
          <div>
            <div className="font-outfit font-bold text-[#F0F4FF] text-sm">Admin Panel</div>
            <div className="text-[10px] text-[#8B5CF6]">CoinVision AI</div>
          </div>
        </div>
      </div>
      <div className="p-3 mt-2">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onNav(item.id as AdminSection)}
            className={`sidebar-item w-full text-left ${active === item.id ? 'active' : ''}`}
          >
            <item.icon size={16} /> {item.label}
          </button>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2A3A55]">
        <Link href="/dashboard" className="sidebar-item block text-center text-xs">
          ← Voltar ao Dashboard
        </Link>
      </div>
    </aside>
  );
}

function AdminOverview() {
  const s = MOCK_ADMIN_STATS;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-outfit font-black text-[#F0F4FF]">Painel Administrativo</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: 'Total de Usuários', v: s.totalUsers.toLocaleString(), c: '#D4AF37', icon: Users, delta: `+${s.newUsersToday} hoje` },
          { l: 'Análises Hoje', v: s.analysesToday, c: '#3B82F6', icon: Zap, delta: `Fila: ${s.processingQueue}` },
          { l: 'Receita do Mês', v: `R$ ${s.revenueMonth.toLocaleString('pt-BR')}`, c: '#10B981', icon: TrendingUp, delta: `${s.activeSubscriptions} assinaturas` },
          { l: 'Precisão da IA', v: `${Math.round(s.accuracyRate * 100)}%`, c: '#8B5CF6', icon: Cpu, delta: `Erro: ${(s.errorRate * 100).toFixed(1)}%` },
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${stat.c}20` }}>
                <stat.icon size={18} style={{ color: stat.c }} />
              </div>
              <span className="text-[10px] text-[#8899BB]">{stat.delta}</span>
            </div>
            <div className="font-outfit font-bold text-2xl" style={{ color: stat.c }}>{stat.v}</div>
            <div className="metric-label mt-1">{stat.l}</div>
          </div>
        ))}
      </div>

      {/* System health */}
      <div className="grid lg:grid-cols-3 gap-4">
        {[
          { l: 'CPU', v: 42, color: '#10B981', unit: '%' },
          { l: 'Memória', v: 68, color: '#F59E0B', unit: '%' },
          { l: 'Storage', v: Math.round(s.storageUsedGB / 10), color: '#3B82F6', unit: '% (847GB)' },
        ].map((m, i) => (
          <div key={i} className="stat-card">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[#8899BB]">{m.l}</span>
              <span className="text-sm font-bold" style={{ color: m.color }}>{m.v}{m.unit}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${m.v}%`, background: m.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-outfit font-bold text-[#F0F4FF] mb-4">Receita Mensal (R$)</h3>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A3A55" />
              <XAxis dataKey="month" tick={{ fill: '#8899BB', fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: '#8899BB', fontSize: 11 }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#1A2332', border: '1px solid #2A3A55', borderRadius: '0.5rem' }} formatter={(v: number) => [`R$ ${v.toLocaleString('pt-BR')}`, 'Receita']} />
              <Bar dataKey="revenue" fill="#D4AF37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function UsersSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-outfit font-black text-[#F0F4FF]">Gestão de Usuários</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5A7A]" />
            <input className="input-dark pl-8 py-2 text-sm w-48" placeholder="Buscar usuário..." />
          </div>
        </div>
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        <table className="table-dark">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Plano</th>
              <th>Análises</th>
              <th>Cadastro</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {FAKE_USERS.map(u => (
              <tr key={u.id}>
                <td>
                  <div>
                    <div className="font-medium text-[#F0F4FF]">{u.name}</div>
                    <div className="text-xs text-[#8899BB]">{u.email}</div>
                  </div>
                </td>
                <td>
                  <span className={`badge text-xs ${u.plan === 'enterprise' ? 'badge-purple' : u.plan === 'professional' ? 'badge-gold' : u.plan === 'starter' ? 'badge-blue' : 'badge-teal'}`}>
                    {u.plan}
                  </span>
                </td>
                <td>{u.analyses}</td>
                <td className="text-[#8899BB] text-xs">{u.joined}</td>
                <td>
                  <span className={`badge text-xs ${u.status === 'active' ? 'badge-green' : 'badge-gold'}`}>
                    {u.status === 'active' ? 'Ativo' : 'Pendente'}
                  </span>
                </td>
                <td>
                  <button className="text-xs text-[#D4AF37] hover:underline">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ApisSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-outfit font-black text-[#F0F4FF]">APIs & Scrapers</h1>
        <button className="btn-secondary py-2 px-4 text-sm flex items-center gap-2">
          <RefreshCw size={14} /> Verificar Todas
        </button>
      </div>
      <div className="grid gap-3">
        {API_SOURCES.map((api, i) => (
          <div key={i} className="glass rounded-xl p-4 flex items-center gap-4">
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${api.status === 'online' ? 'bg-[#10B981]' : api.status === 'degraded' ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'}`}
              style={{ boxShadow: api.status === 'online' ? '0 0 8px #10B981' : api.status === 'degraded' ? '0 0 8px #F59E0B' : '0 0 8px #EF4444' }} />
            <div className="flex-1">
              <div className="font-medium text-[#F0F4FF] text-sm">{api.name}</div>
              <div className="text-xs text-[#8899BB]">{api.calls.toLocaleString()} chamadas hoje · {api.errors} erros</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-mono" style={{ color: api.latency > 1000 ? '#EF4444' : api.latency > 500 ? '#F59E0B' : '#10B981' }}>
                {api.latency}ms
              </div>
              <div className="text-xs text-[#4A5A7A]">{api.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QueueSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-outfit font-black text-[#F0F4FF]">Fila de Processamento</h1>
      <div className="grid grid-cols-4 gap-4">
        {[
          { l: 'Na Fila', v: 12, c: '#F59E0B' },
          { l: 'Processando', v: 3, c: '#3B82F6' },
          { l: 'Concluídos Hoje', v: 247, c: '#10B981' },
          { l: 'Erros Hoje', v: 4, c: '#EF4444' },
        ].map((s, i) => (
          <div key={i} className="stat-card text-center">
            <div className="font-outfit font-bold text-3xl" style={{ color: s.c }}>{s.v}</div>
            <div className="metric-label mt-1">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        <table className="table-dark">
          <thead>
            <tr><th>ID</th><th>Tipo</th><th>Status</th><th>Usuário</th><th>Criado</th><th>Prioridade</th></tr>
          </thead>
          <tbody>
            {FAKE_QUEUE.map(j => (
              <tr key={j.id}>
                <td className="font-mono text-xs text-[#4A5A7A]">{j.id}</td>
                <td className="text-sm">{j.type}</td>
                <td>
                  <span className={`badge text-xs ${j.status === 'processing' ? 'badge-blue' : j.status === 'done' ? 'badge-green' : 'badge-gold'}`}>
                    {j.status}
                  </span>
                </td>
                <td className="text-xs text-[#8899BB]">{j.user}</td>
                <td className="font-mono text-xs text-[#8899BB]">{j.created}</td>
                <td>
                  <span className={`badge text-xs ${j.priority === 'high' ? 'badge-red' : j.priority === 'medium' ? 'badge-gold' : 'badge-teal'}`}>
                    {j.priority}
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

function LogsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-outfit font-black text-[#F0F4FF]">Logs do Sistema</h1>
      <div className="glass rounded-2xl p-4 font-mono text-sm space-y-2 max-h-[500px] overflow-y-auto">
        {FAKE_LOGS.map((log, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="text-[#4A5A7A] text-xs flex-shrink-0">{log.time}</span>
            <span className={`text-xs font-bold flex-shrink-0 w-12 ${log.level === 'ERROR' ? 'text-[#EF4444]' : log.level === 'WARN' ? 'text-[#F59E0B]' : 'text-[#10B981]'}`}>
              [{log.level}]
            </span>
            <span className="text-[#8899BB] text-xs">{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [section, setSection] = useState<AdminSection>('overview');

  return (
    <div className="min-h-screen bg-[#080B12] flex">
      <AdminSidebar active={section} onNav={setSection} />
      <main className="flex-1 ml-[260px] min-h-screen">
        <div className="glass border-b border-[#2A3A55] sticky top-0 z-30">
          <div className="px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-[#8B5CF6]" />
              <span className="text-sm font-medium text-[#8899BB]">Admin</span>
              <ChevronRight size={12} className="text-[#4A5A7A]" />
              <span className="text-sm text-[#F0F4FF] capitalize">{section}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-[#10B981]">
                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                Sistema Online
              </div>
              <span className="text-[#4A5A7A]">·</span>
              <span className="text-xs text-[#8899BB]">v2.3.1</span>
            </div>
          </div>
        </div>
        <div className="p-8">
          {section === 'overview' && <AdminOverview />}
          {section === 'users' && <UsersSection />}
          {section === 'apis' && <ApisSection />}
          {section === 'queue' && <QueueSection />}
          {section === 'logs' && <LogsSection />}
          {(section === 'coins' || section === 'ai') && (
            <div className="flex flex-col items-center justify-center h-64 gap-4 glass rounded-2xl">
              <div className="text-5xl">🛠</div>
              <h2 className="text-xl font-outfit font-bold text-[#F0F4FF]">Em desenvolvimento</h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
