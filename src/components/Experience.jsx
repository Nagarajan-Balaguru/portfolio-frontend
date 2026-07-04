import { useExperience } from '../hooks/usePortfolioData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Experience() {
  const { data: experiences, loading } = useExperience();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  if (loading) return (
    <div className="py-24 flex justify-center">
      <div className="w-8 h-8 border-2 border-[#3fb950] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section ref={ref} className="py-12 px-4 sm:py-16 sm:px-5 md:py-20 md:px-6 lg:py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-title"
        >
          My <span>Experience</span>
        </motion.h2>

        <div className="relative pl-5 sm:pl-6 md:pl-7 lg:pl-8 border-l border-[#21262d]">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative mb-6 sm:mb-8 md:mb-9 lg:mb-10 last:mb-0"
            >
              {/* dot */}
              <div className="absolute -left-[26px] sm:-left-[30px] md:-left-[34px] lg:-left-[38px] top-5 w-3 h-3 rounded-full bg-[#3fb950] border-2 border-[#0d1117]" />

              <div className="card rounded-xl p-4 sm:p-5 md:p-6 group max-w-full overflow-hidden">
                <div className="flex flex-col gap-1.5 mb-1">
                  <h3 className="text-white font-semibold text-base sm:text-lg group-hover:text-[#3fb950] transition-colors">
                    {exp.role}
                  </h3>
                  <span className="text-xs bg-[#1f2d1f] text-[#3fb950] border border-[#2d4a2d] px-3 py-0.5 rounded-full font-mono self-start whitespace-nowrap">
                    {exp.startDate?.slice(0, 7)} — {exp.current ? 'Present' : exp.endDate?.slice(0, 7)}
                  </span>
                </div>
                <p className="text-[#3fb950] text-sm font-medium mb-3 sm:mb-4">{exp.company}</p>
                <ul className="flex flex-col gap-2">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="text-[#8b949e] text-sm flex gap-2 items-start">
                      <span className="text-[#3fb950] mt-0.5 text-xs flex-shrink-0">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}