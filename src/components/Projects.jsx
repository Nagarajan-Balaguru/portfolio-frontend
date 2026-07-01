import { useState, useMemo } from 'react';
import { useProjects } from '../hooks/usePortfolioData';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeader from './common/SectionHeader';
import LoadingSpinner from './common/LoadingSpinner';

const TABS = [
  { key: 'all', label: '⚡ All Projects' },
  { key: 'personal', label: '🧑‍💻 Personal' },
  { key: 'professional', label: '🏢 Professional' },
];

const ICONS = ['🌐', '⚙️', '📊', '🚀', '💡', '🔧'];

export default function Projects() {
  const { data: projects, loading } = useProjects();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilter, setActiveFilter] = useState('All');

  const tabFiltered = useMemo(() => {
    if (activeTab === 'all') return projects;
    return projects.filter(p => p.category === activeTab);
  }, [projects, activeTab]);

  const filters = useMemo(() => {
    if (!tabFiltered.length) return ['All'];
    const techs = new Set();
    tabFiltered.forEach(p => p.techStack?.forEach(t => techs.add(t)));
    return ['All', ...Array.from(techs)];
  }, [tabFiltered]);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return tabFiltered;
    return tabFiltered.filter(p => p.techStack?.includes(activeFilter));
  }, [tabFiltered, activeFilter]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveFilter('All');
  };

  if (loading) return <LoadingSpinner text="Loading projects..." />;

  return (
    <section ref={ref} className="py-24 px-6" style={{ backgroundColor: '#161b22' }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="My" highlight="Projects" />

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex justify-center mb-8"
        >
          <div className="flex gap-1 bg-[#0d1117] p-1 rounded-xl border border-[#21262d]">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-[#238636] text-white shadow-lg shadow-[#23863630]'
                    : 'text-[#8b949e] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-6 mb-8"
        >
          {[
            { label: 'Total', value: projects.length },
            { label: 'Personal', value: projects.filter(p => p.category === 'personal').length },
            { label: 'Professional', value: projects.filter(p => p.category === 'professional').length },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-[#3fb950] font-bold text-xl">{stat.value}</p>
              <p className="text-[#484f58] text-xs">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Tech filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-[#238636] text-white border border-[#2ea043]'
                  : 'bg-transparent text-[#8b949e] border border-[#21262d] hover:border-[#3fb950] hover:text-[#3fb950]'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Count */}
        <p className="text-[#484f58] text-xs text-center mb-8 font-mono">
          Showing {filtered.length} of {projects.length} projects
          {activeFilter !== 'All' && ` · filtered by "${activeFilter}"`}
          {activeTab !== 'all' && ` · ${activeTab} only`}
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="card rounded-xl overflow-hidden group flex flex-col"
              >
                {/* Card header */}
                <div className="h-40 bg-[#0d1117] flex items-center justify-center relative">
                  <div className="flex gap-1.5 absolute top-3 left-3">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
            <div className="flex gap-3 flex-wrap justify-center px-4">
              {project.techStack?.slice(0, 3).map(tech => (
                <img
                  key={tech}
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${
                    tech.toLowerCase()
                      .replace('spring boot', 'spring')
                      .replace('react.js', 'react')
                      .replace('spring webflux', 'spring')
                      .replace('spring mvc', 'spring')
                      .replace('rest apis', 'fastapi')
                      .replace('aws cloudwatch', 'amazonwebservices')
                      .replace('.js', '')
                      .replace(' ', '')
                  }/${
                    tech.toLowerCase()
                      .replace('spring boot', 'spring')
                      .replace('react.js', 'react')
                      .replace('spring webflux', 'spring')
                      .replace('spring mvc', 'spring')
                      .replace('rest apis', 'fastapi')
                      .replace('aws cloudwatch', 'amazonwebservices')
                      .replace('.js', '')
                      .replace(' ', '')
                  }-original.svg`}
                  alt={tech}
                  className="w-10 h-10 object-contain"
                  onError={e => {
                    e.target.style.display = 'none';
                  }}
                />
              ))}
            </div>

                  {/* Category badge */}
                  <span className={`absolute top-3 right-3 text-xs px-2 py-0.5 rounded border font-mono ${
                    project.category === 'personal'
                      ? 'bg-[#1f2d1f] text-[#3fb950] border-[#2d4a2d]'
                      : 'bg-[#1c2033] text-[#79c0ff] border-[#2d3a5c]'
                  }`}>
                    {project.category === 'personal' ? '🧑‍💻 Personal' : '🏢 Professional'}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-white font-semibold mb-1 group-hover:text-[#3fb950] transition-colors">
                    {project.title}
                  </h3>

                  {/* Company name for professional */}
                  {project.company && (
                    <p className="text-[#79c0ff] text-xs mb-2 font-mono">
                      @ {project.company}
                    </p>
                  )}

                  <p className="text-[#8b949e] text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack?.map(tech => (
                      <button
                        key={tech}
                        onClick={() => setActiveFilter(tech)}
                        className={`tag transition-all hover:scale-105 ${
                          activeFilter === tech
                            ? 'bg-[#238636] text-white border-[#2ea043]'
                            : ''
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-3 border-t border-[#21262d] items-center">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer"
                        className="text-[#8b949e] hover:text-[#3fb950] text-sm transition-colors">
                        ⌥ GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer"
                        className="text-[#8b949e] hover:text-[#3fb950] text-sm transition-colors">
                        ↗ Live
                      </a>
                    )}
                    {!project.githubUrl && !project.liveUrl && (
                      <span className="text-[#484f58] text-xs font-mono flex items-center gap-1">
                        🔒 Private / Company Project
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No results */}
{filtered.length === 0 && tabFiltered.length === 0 && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-16"
  >
    <p className="text-[#484f58] text-sm font-mono mb-3">
      No projects found in {activeTab === 'all' ? 'any category' : `"${activeTab}" category`}
    </p>
    <button
      onClick={() => { setActiveFilter('All'); setActiveTab('all'); }}
      className="text-[#3fb950] text-sm border border-[#3fb95066] px-4 py-2 rounded hover:bg-[#3fb95011] transition-all"
    >
      Show all projects
    </button>
  </motion.div>
)}

{filtered.length === 0 && tabFiltered.length > 0 && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-16"
  >
    <p className="text-[#484f58] text-sm font-mono mb-3">
      No projects found with "{activeFilter}" in {activeTab} projects
    </p>
    <button
      onClick={() => setActiveFilter('All')}
      className="text-[#3fb950] text-sm border border-[#3fb95066] px-4 py-2 rounded hover:bg-[#3fb95011] transition-all"
    >
      Clear filter
    </button>
  </motion.div>
)}
      </div>
    </section>
  );
}