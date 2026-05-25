'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronLeft, Star, Zap, TrendingUp } from 'lucide-react';
import { MOCK_COINS } from '@/lib/mockData';
import { RARITY_LABELS, RARITY_COLORS, MATERIAL_LABELS } from '@/lib/types';

const COUNTRIES = ['Todos', 'Brasil', 'Estados Unidos', 'Portugal', 'Alemanha', 'França'];
const MATERIALS = ['Todos', 'Prata', 'Ouro', 'Cobre', 'Bronze', 'Bimetálica'];
const RARITIES = ['Todos', 'Comum', 'Incomum', 'Escassa', 'Rara', 'Muito Rara'];

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('Todos');
  const [rarity, setRarity] = useState('Todos');

  const filtered = MOCK_COINS.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || String(c.year).includes(search);
    const matchCountry = country === 'Todos' || c.country === country;
    return matchSearch && matchCountry;
  });

  return (
    <div className="min-h-screen bg-animated bg-grid">
      <nav className="glass border-b border-[#2A3A55] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1.5 text-[#8899BB] hover:text-[#F0F4FF] text-sm">
            <ChevronLeft size={16} /> Início
          </Link>
          <span className="text-[#2A3A55]">·</span>
          <span className="font-outfit font-bold text-[#F0F4FF]">Catálogo Numismático</span>
          <div className="ml-auto">
            <Link href="/analyze" className="btn-primary py-1.5 px-4 text-sm flex items-center gap-1.5">
              <Zap size={13} /> Analisar Moeda
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-outfit font-black text-[#F0F4FF] mb-2">
            Catálogo <span className="gradient-gold">Numismático</span>
          </h1>
          <p className="text-[#8899BB]">8.341 moedas catalogadas · Dados de KM, PCGS, NGC, Amato e mais 50 fontes</p>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-4 mb-6 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5A7A]" />
            <input
              className="input-dark pl-9 py-2 text-sm"
              placeholder="Buscar por nome, ano, KM number..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="input-dark py-2 text-sm w-40 cursor-pointer" value={country} onChange={e => setCountry(e.target.value)}>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="input-dark py-2 text-sm w-40 cursor-pointer" value={rarity} onChange={e => setRarity(e.target.value)}>
            {RARITIES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((coin, i) => (
            <motion.div
              key={coin.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl p-5 card-hover cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-14 h-14 coin-circle flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🪙</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1.5 mb-1">
                    {coin.isErrorCoin && <span className="badge badge-red text-xs">Erro</span>}
                    {coin.isProof && <span className="badge badge-purple text-xs">Proof</span>}
                    {coin.isCommemorative && <span className="badge badge-blue text-xs">Comemorativa</span>}
                  </div>
                  <h3 className="font-outfit font-bold text-[#F0F4FF] text-sm leading-tight">{coin.name}</h3>
                  <p className="text-xs text-[#8899BB] mt-0.5">{coin.country} · {coin.year}</p>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { l: 'Material', v: MATERIAL_LABELS[coin.material] },
                  { l: 'Diâmetro', v: `${coin.diameter}mm` },
                  { l: 'Peso', v: `${coin.weight}g` },
                  { l: 'KM Number', v: coin.kmNumber || '—' },
                ].map(({ l, v }) => (
                  <div key={l} className="bg-[#0D1117] rounded-lg p-2">
                    <div className="text-[10px] text-[#4A5A7A] uppercase tracking-wide">{l}</div>
                    <div className="text-xs text-[#F0F4FF] font-medium">{v}</div>
                  </div>
                ))}
              </div>

              {/* Rarity & Value */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: RARITY_COLORS[coin.rarity] }} />
                  <span className="text-xs font-semibold" style={{ color: RARITY_COLORS[coin.rarity] }}>
                    {RARITY_LABELS[coin.rarity]}
                  </span>
                  <span className="text-xs text-[#4A5A7A]">({coin.rarityScore}/10)</span>
                </div>
                {coin.estimatedValue && (
                  <div className="text-right">
                    <div className="text-xs text-[#8899BB]">Est.</div>
                    <div className="text-sm font-bold text-[#D4AF37]">
                      R$ {coin.estimatedValue.toLocaleString('pt-BR')}
                    </div>
                  </div>
                )}
              </div>

              {/* Mintage */}
              {coin.mintage && (
                <div className="mt-3 pt-3 border-t border-[#2A3A55] flex items-center justify-between">
                  <span className="text-xs text-[#4A5A7A]">Tiragem</span>
                  <span className="text-xs text-[#8899BB]">{coin.mintage.toLocaleString('pt-BR')} unidades</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 glass rounded-2xl">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-outfit font-bold text-[#F0F4FF] text-xl mb-2">Nenhuma moeda encontrada</h3>
            <p className="text-[#8899BB]">Tente um termo de busca diferente ou limpe os filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
