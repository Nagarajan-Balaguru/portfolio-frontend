import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSkills } from '../hooks/usePortfolioData';
import SectionHeader from './common/SectionHeader';
import LoadingSpinner from './common/LoadingSpinner';
import { SKILL_CATEGORIES } from '../utils/constants';

function SkillCard({ skill, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card rounded-xl p-4 group"
    >
      <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-2 mb-3">
        <img
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${
            skill.icon}/${skill.icon}-original.svg`}
          alt={skill.name}
          className="w-6 h-6 object-contain"
          onError={e => e.target.style.display = 'none'}
        />
        <span className="text-[#e6edf3] text-sm font-medium group-hover:text-[#3fb950] transition-colors">
          {skill.name}
        </span>
      </div>
        <span className="text-[#3fb950] text-xs font-mono">{skill.proficiency}%</span>
      </div>
      <div className="w-full bg-[#21262d] rounded-full h-1.5">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.proficiency}%` } : {}}
          transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: 'easeOut' }}
          className="h-1.5 rounded-full bg-[#3fb950]"
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { data: skills, loading } = useSkills();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const categorized = useMemo(() => (
    SKILL_CATEGORIES.map(cat => ({
      cat,
      skills: skills.filter(s => s.category === cat)
    })).filter(({ skills }) => skills.length > 0)
  ), [skills]);

  if (loading) return <LoadingSpinner text="Loading skills..." />;

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="My" highlight="Skills" />

        {categorized.map(({ cat, skills: catSkills }, ci) => (
          <div key={cat} className="mb-10">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: ci * 0.1 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-1 h-5 bg-[#3fb950] rounded-full" />
              <h3 className="text-white font-semibold">{cat}</h3>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {catSkills.map((skill, i) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  index={i}
                  inView={inView}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}