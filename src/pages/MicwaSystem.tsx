
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MessageCircle } from 'lucide-react';
import FadeIn from '../components/animations/FadeIn';
import SEO from '../components/SEO';
import n8nTemplates from '../data/n8n_templates.json';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MicwaSystem = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    n8nTemplates.forEach(t => t.categories.forEach(c => cats.add(c)));
    return ['All', ...Array.from(cats).sort()];
  }, []);

  const filteredTemplates = useMemo(() => {
    return n8nTemplates.filter(template => {
      const matchesSearch = 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || template.categories.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleRequestTemplate = (template: typeof n8nTemplates[0]) => {
    const message = `Hello, I am interested in the N8N workflow template: "${template.title}" (ID: ${template.id}). Can you please provide more details?`;
    // Update WhatsApp number to 201006334062 as requested
    const url = `https://wa.me/201006334062?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <SEO 
        title="Micwa N8N Automation Systems | Ahmed Mokireldin"
        description="Explore our extensive collection of N8N workflow templates for automation. Request specialized templates for your business needs."
        keywords={['N8N', 'Automation', 'Workflows', 'Micwa', 'Templates', 'Integration']}
      />
      
      <Header />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <FadeIn>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                Micwa N8N Automation Systems
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover powerful automation workflows to streamline your business. 
                Browse our catalog and request the templates satisfying your needs.
              </p>
            </div>
          </FadeIn>

          {/* Search and Filter */}
          <FadeIn delay={0.2}>
            <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                />
              </div>
              <div className="relative md:w-64">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-8 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer text-gray-900 dark:text-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </FadeIn>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template, index) => (
              <FadeIn key={template.id} delay={index * 0.05} className="h-full">
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col border border-gray-100 dark:border-gray-700"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img 
                      src={template.thumbnail} 
                      alt={template.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Automation+Template';
                      }}
                    />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md text-xs text-white font-medium">
                      {template.complexity}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {template.categories.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                      {template.categories.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-full">
                          +{template.categories.length - 3}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2" title={template.title}>
                      {template.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1 line-clamp-3" title={template.description}>
                      {template.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                       <div className="text-xs text-gray-500 dark:text-gray-400">
                          {template.date}
                       </div>
                       <button
                         onClick={() => handleRequestTemplate(template)}
                         className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                       >
                         <MessageCircle className="w-4 h-4" />
                         Request
                       </button>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
             <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No templates found matching your criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Clear filters
                </button>
             </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
};

export default MicwaSystem;
