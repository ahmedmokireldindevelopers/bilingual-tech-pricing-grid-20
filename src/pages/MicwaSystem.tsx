import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Download, Link as LinkIcon, Activity, ExternalLink, Blocks, ChevronRight, Code2 } from 'lucide-react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Use same host if on same server, or port 3001 in dev
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

interface Template {
  id: string;
  urlSlug: string;
  title: string;
  description: string;
  isPremium: boolean;
  downloads: number;
  tags: string[];
}

const MicwaSystem = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    fetch(`${API_BASE}/api/templates`)
      .then(res => res.json())
      .then(data => {
        setTemplates(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load templates', err);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    templates.forEach(t => (t.tags || []).forEach(c => cats.add(c.toUpperCase())));
    return ['ALL', ...Array.from(cats).sort()];
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = 
        (template.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (template.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
      
      const tagsUpper = (template.tags || []).map(t => t.toUpperCase());
      const matchesCategory = selectedCategory === 'ALL' || tagsUpper.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [templates, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);

  const paginatedTemplates = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTemplates.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTemplates, currentPage]);

  const handleDownloadFree = async (templateId: string, title: string) => {
    try {
      setDownloadingId(templateId);
      const res = await fetch(`${API_BASE}/api/templates/${templateId}`);
      if (!res.ok) throw new Error('Failed to download');
      const data = await res.json();

      const blob = new Blob([JSON.stringify(data.workflowJson, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('Failed to execute protocol sequence [D_ERR_01].');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleSelectGroup = (template: Template) => {
    const message = `INIT_PROCEDURE: [SELECT_GROUP]\nTARGET_ID: [${template.id}]\nDESIGNATION: [${template.title}]\n\nRequesting access authorization.`;
    const url = `https://wa.me/201006334062?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-[#050505] min-h-screen font-sans text-gray-300 selection:bg-yellow-400 selection:text-black">
      <SEO 
        title="MICWA // N8N PROTOCOLS "
        description="A brutalist, high-performance directory of N8N automation protocols. Engage system integrations."
        keywords={['N8N', 'Automation', 'Workflows', 'Micwa', 'Cybernetic', 'Integration']}
      />
      
      <Header />

      {/* Cyber-Industrial Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-yellow-500/5 to-transparent"></div>
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]"></div>
      </div>

      <main className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">

        {/* Extreme Hero Section */}
        <div className="mb-24 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row items-end justify-between gap-12 border-b-2 border-white/10 pb-12"
          >
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-2 w-12 bg-yellow-400"></div>
                <span className="font-mono text-xs tracking-[0.3em] text-yellow-400 uppercase">System Active // V2.4.9</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold text-white leading-[0.9] tracking-tighter mb-8 uppercase" style={{ fontVariantLigatures: 'none' }}>
                Automation <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Protocols</span>
              </h1>
              <p className="font-mono text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed border-l-2 border-white/20 pl-6">
                ACCESS THE DIRECTORY OF PRE-CONFIGURED N8N NEURAL PATHWAYS.
                DEPLOY AUTOMATION SCHEMAS INSTANTLY. <br />
                WARNING: HIGH DATA THROUGHPUT DETECTED.
              </p>
            </div>

            <div className="hidden lg:flex flex-col items-end gap-2 font-mono text-xs text-white/40 text-right">
              <div>[STATUS: ONLINE]</div>
              <div>[SERVER: LOCALHOST_5002]</div>
              <div>[NODE: MAIN_FRAME]</div>
              <div className="mt-4 w-32 h-[1px] bg-white/20"></div>
              <div className="flex gap-1 mt-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`w-1 h-3 ${Math.random() > 0.5 ? 'bg-yellow-400/80 animate-pulse' : 'bg-white/10'}`}></div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Industrial Interface Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="sticky top-24 z-40 bg-[#050505]/80 backdrop-blur-xl border border-white/10 p-4 mb-16 shadow-[0_20px_40px_-15px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4"
        >
          <div className="relative group flex items-center bg-white/5 border border-white/10 focus-within:border-yellow-400/50 transition-colors">
            <div className="px-4 text-white/50 group-focus-within:text-yellow-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="QUERY TEMPLATE REGISTRY..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-white font-mono text-sm h-14 outline-none placeholder:text-white/20 uppercase tracking-widest"
            />
          </div>

          <div className="relative flex items-center bg-white/5 border border-white/10 w-full md:w-[300px]">
            <div className="px-4 text-white/50">
              <Filter className="w-5 h-5" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-transparent border-none text-white font-mono text-sm h-14 outline-none appearance-none cursor-pointer uppercase tracking-widest pr-10 focus:ring-0"
              style={{ paddingInlineStart: 0 }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-[#050505] text-white py-2">{cat}</option>
              ))}
            </select>
            <div className="absolute right-4 pointer-events-none text-yellow-400">
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-40 font-mono text-yellow-400">
            <Activity className="w-12 h-12 animate-pulse mb-6" />
            <div className="text-lg tracking-[0.2em] relative inline-block">
              ESTABLISHING CONNECTION...
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-yellow-400/50 overflow-hidden">
                <span className="absolute top-0 left-0 w-1/3 h-full bg-yellow-400 animate-[bounce_1s_infinite]"></span>
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-end mb-8 font-mono text-xs uppercase text-white/40 border-b border-white/10 pb-4">
              <div>Matches Found: [{filteredTemplates.length}]</div>
              <div>Sort: ALPHANUMERIC // MODE: GRID</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {paginatedTemplates.map((template, index) => (
                    <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                    key={template.id}
                    className="group flex flex-col bg-[#0a0a0c] border border-white/10 hover:border-yellow-400/50 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Hover Glitch Effect Line */}
                    <div className="absolute top-0 left-[-100%] w-full h-1 bg-yellow-400 group-hover:animate-[glitchSlide_1s_ease-in-out_infinite]"></div>

                    <div className="p-6 flex-1 flex flex-col z-10">

                      {/* Top Meta Row */}
                      <div className="flex justify-between items-start mb-6">
                        <div className={`px-2 py-1 font-mono text-[10px] uppercase font-bold tracking-widest border ${template.isPremium ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10' : 'border-blue-500/50 text-blue-400 bg-blue-500/10'}`}>
                          {template.isPremium ? '[ TIER: PREMIUM ]' : '[ TIER: FREE ]'}
                        </div>
                        <div className="text-white/20 font-mono text-[10px]">
                          ID: {template.id.substring(0, 6)}
                        </div>
                      </div>

                      {/* Title & Desc */}
                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-yellow-400 transition-colors">
                        {template.title}
                      </h3>

                      <p className="text-white/50 text-sm mb-8 flex-1 line-clamp-3 font-mono leading-relaxed">
                        {template.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(template.tags || []).slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 text-white/60 text-[10px] uppercase font-mono tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center gap-4">
                        <div className="flex items-center gap-2 font-mono text-[10px] text-white/40">
                          <Activity className="w-3 h-3" />
                          {template.downloads.toLocaleString()} DL
                        </div>

                        {template.isPremium ? (
                          <button
                            onClick={() => handleSelectGroup(template)}
                            className="flex items-center justify-center gap-2 flex-1 h-10 bg-yellow-400 text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-yellow-300 transition-colors relative overflow-hidden group/btn"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Lvl 2 Access
                            </span>
                            <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDownloadFree(template.id, template.title)}
                            disabled={downloadingId === template.id}
                            className={`flex items-center justify-center gap-2 flex-1 h-10 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-widest hover:border-blue-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors ${downloadingId === template.id ? 'opacity-50 cursor-wait' : ''}`}
                          >
                              {downloadingId === template.id ? (
                                '[ EXTRACTING... ]'
                              ) : (
                                <>
                                  <Download className="w-4 h-4" />
                                  Extract
                                </>
                              )}
                            </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                </AnimatePresence>
              </div>

              {totalPages > 1 && (
                <div className="mt-16 flex justify-center items-center gap-4">
                  <button
                    onClick={() => {
                      setCurrentPage(p => Math.max(1, p - 1));
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center w-32 h-12 border border-white/20 text-white font-mono text-sm tracking-widest disabled:opacity-20 disabled:cursor-not-allowed hover:border-yellow-400 hover:text-yellow-400 hover:bg-yellow-400/5 transition-colors uppercase"
                  >
                    PREV
                  </button>
                  <div className="font-mono text-white/40 text-sm tracking-widest px-4">
                    PAGE <span className="text-yellow-400 font-bold mx-1">{currentPage}</span> / {totalPages}
                  </div>
                  <button
                    onClick={() => {
                      setCurrentPage(p => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center w-32 h-12 border border-white/20 text-white font-mono text-sm tracking-widest disabled:opacity-20 disabled:cursor-not-allowed hover:border-yellow-400 hover:text-yellow-400 hover:bg-yellow-400/5 transition-colors uppercase"
                  >
                    NEXT
                  </button>
                </div>
              )}

            {filteredTemplates.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-white/10 bg-white/5"
              >
                <Blocks className="w-16 h-16 text-white/20 mb-6" />
                <p className="font-mono text-white/50 text-lg uppercase tracking-widest mb-6">0 PROTOCOLS FOUND MATCHING DIRECTIVE.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
                  className="px-6 py-3 border border-yellow-400 text-yellow-400 font-mono text-sm tracking-widest hover:bg-yellow-400 hover:text-black transition-colors"
                >
                  [ CLEAR DIRECTIVES ]
                </button>
              </motion.div>
            )}
          </>
        )}
      </main>

      <Footer />

      {/* Put keyframes in a style tag for the glitch/slide effect */}
      <style>{`
        @keyframes glitchSlide {
          0% { left: -100%; width: 10%; }
          50% { left: 100%; width: 100%; }
          100% { left: 100%; width: 10%; }
        }
      `}</style>
    </div>
  );
};

export default MicwaSystem;
