import { useState } from 'react';
import { useEducation } from '../hooks/usePortfolioData';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeader from './common/SectionHeader';
import LoadingSpinner from './common/LoadingSpinner';

const EDUCATION_DETAILS = {
  'Sri Krishna College of Technology': {
    highlights: [
      'Studied core engineering fundamentals — mathematics, physics, problem solving',
      'Developed strong analytical and logical thinking skills',
      'Led team projects applying engineering design principles',
      'Transitioned into software engineering driven by passion for coding',
      'Self-taught Java, Spring Boot and React during final years',
    ],
    skills: ['Problem Solving', 'Team Leadership', 'Analytical Thinking', 'Self Learning'],
  },
};

const CERT_DETAILS = {
  'Spring Boot & Microservices Fundamentals': {
    highlights: [
      'Built RESTful APIs using Spring Boot from scratch',
      'Understood microservices architecture and service decomposition',
      'Learned inter-service communication with REST and messaging',
      'Implemented service discovery and API gateway patterns',
      'Applied in real projects at Apexon for microservices migration',
    ],
    skills: ['Spring Boot', 'Microservices', 'REST APIs', 'Docker'],
  },
  'Java Functional Programming': {
    highlights: [
      'Mastered Java Streams, Lambda expressions and method references',
      'Applied functional patterns to reduce code complexity by 25%',
      'Learned immutability, pure functions and functional composition',
      'Used Optional to eliminate null pointer exceptions',
      'Applied directly in production code at Apexon',
    ],
    skills: ['Java Streams', 'Lambdas', 'Functional Patterns', 'Clean Code'],
  },
};

function EducationCard({ edu, index, inView, expanded, onToggle }) {
  const details = EDUCATION_DETAILS[edu.institution];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="card rounded-xl overflow-hidden cursor-pointer"
      onClick={onToggle}
    >
      <div className="p-6">
        <div className="flex flex-wrap justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <h4 className="text-white font-semibold">{edu.institution}</h4>
            <span className="text-[#484f58] text-xs">{expanded ? '▲' : '▼'}</span>
          </div>
          <span className="text-xs bg-[#1f2d1f] text-[#3fb950] border border-[#2d4a2d] px-3 py-0.5 rounded-full font-mono">
            {edu.startDate?.slice(0, 4)} — {edu.endDate?.slice(0, 4)}
          </span>
        </div>
        <p className="text-[#3fb950] text-sm font-medium mb-1">{edu.degree}</p>
        <div className="flex gap-4 text-[#8b949e] text-xs mb-2">
          <span>📍 {edu.location}</span>
          <span>🎓 {edu.grade}</span>
        </div>
        <p className="text-[#484f58] text-xs">
          {expanded ? 'Click to collapse' : 'Click to see details'}
        </p>
      </div>

      <AnimatePresence>
        {expanded && details && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-[#21262d] px-6 pb-6 pt-4"
          >
            <p className="text-[#8b949e] text-xs font-mono mb-3 tracking-wider">
              HIGHLIGHTS
            </p>
            <ul className="flex flex-col gap-2 mb-4">
              {details.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-[#8b949e] text-sm flex gap-2 items-start"
                >
                  <span className="text-[#3fb950] mt-0.5">▸</span> {h}
                </motion.li>
              ))}
            </ul>
            <p className="text-[#8b949e] text-xs font-mono mb-2 tracking-wider">
              SKILLS GAINED
            </p>
            <div className="flex flex-wrap gap-2">
              {details.skills.map(skill => (
                <span key={skill} className="tag">{skill}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CertCard({ cert, index, inView, expanded, onToggle }) {
  const details = CERT_DETAILS[cert.degree];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.1 }}
      className="card rounded-xl overflow-hidden cursor-pointer"
      onClick={onToggle}
    >
      <div className="p-5 flex gap-4 items-start">
        <div className="w-10 h-10 rounded-lg bg-[#1f2d1f] border border-[#2d4a2d] flex items-center justify-center flex-shrink-0">
          <span className="text-lg">📜</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="text-white text-sm font-semibold mb-1">{cert.degree}</h4>
            <span className="text-[#484f58] text-xs ml-2">
              {expanded ? '▲' : '▼'}
            </span>
          </div>
          <p className="text-[#8b949e] text-xs mb-1">{cert.institution}</p>
          <span className="text-[#3fb950] text-xs font-mono">{cert.grade}</span>
          <p className="text-[#484f58] text-xs mt-1">
            {expanded ? 'Click to collapse' : 'Click to see what I learned'}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {expanded && details && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-[#21262d] px-5 pb-5 pt-4"
          >
            <p className="text-[#8b949e] text-xs font-mono mb-3 tracking-wider">
              WHAT I LEARNED
            </p>
            <ul className="flex flex-col gap-2 mb-4">
              {details.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-[#8b949e] text-sm flex gap-2 items-start"
                >
                  <span className="text-[#3fb950] mt-0.5">▸</span> {h}
                </motion.li>
              ))}
            </ul>
            <p className="text-[#8b949e] text-xs font-mono mb-2 tracking-wider">
              SKILLS APPLIED
            </p>
            <div className="flex flex-wrap gap-2">
              {details.skills.map(skill => (
                <span key={skill} className="tag">{skill}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Education() {
  const { data, loading } = useEducation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [expandedEdu, setExpandedEdu] = useState(null);
  const [expandedCert, setExpandedCert] = useState(null);

  if (loading) return <LoadingSpinner text="Loading education..." />;

  const educationList = data.filter(d => d.type === 'education');
  const certList = data.filter(d => d.type === 'certification');

  return (
    <section ref={ref} className="py-24 px-6" style={{ backgroundColor: '#161b22' }}>
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Education &" highlight="Certifications" />

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-1 h-5 bg-[#3fb950] rounded-full" />
          <h3 className="text-white font-semibold">Education</h3>
          <span className="text-[#484f58] text-xs font-mono">click card to expand</span>
        </motion.div>

        <div className="flex flex-col gap-4 mb-12">
          {educationList.map((edu, i) => (
            <EducationCard
              key={edu.id}
              edu={edu}
              index={i}
              inView={inView}
              expanded={expandedEdu === edu.id}
              onToggle={() => setExpandedEdu(expandedEdu === edu.id ? null : edu.id)}
            />
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-1 h-5 bg-[#3fb950] rounded-full" />
          <h3 className="text-white font-semibold">Certifications</h3>
          <span className="text-[#484f58] text-xs font-mono">click card to expand</span>
        </motion.div>

        <div className="flex flex-col gap-4">
            {certList.map((cert, i) => (
            <CertCard
              key={cert.id}
              cert={cert}
              index={i}
              inView={inView}
              expanded={expandedCert === cert.id}
              onToggle={() => setExpandedCert(expandedCert === cert.id ? null : cert.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}