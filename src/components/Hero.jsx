import { useProfile } from '../hooks/usePortfolioData';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

export default function Hero() {
  const { data, loading } = useProfile();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#3fb950] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-12 lg:pt-20 overflow-hidden">
      {/* Subtle bg glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#3fb950]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">

          {/* Avatar side — shown FIRST on mobile (compact), moves to the right on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0 order-1 lg:order-2"
          >
            <div className="relative w-32 h-32 lg:w-72 lg:h-72">
              <div className="absolute inset-0 rounded-2xl bg-[#3fb950]/10 border border-[#3fb950]/20" />
              <img
                src={data?.avatarUrl}
                alt={data?.name}
                onError={e => e.target.src = `https://ui-avatars.com/api/?name=${data?.name}&background=1f2d1f&color=3fb950&size=300`}
                className="w-full h-full object-cover object-[center_20%] rounded-2xl relative z-10"
              />
              {/* Stats badge — hidden on mobile to save space, shown on desktop */}
              <div className="hidden lg:block absolute -bottom-4 -right-4 card rounded-xl px-4 py-2 z-20 shadow-lg">
                <p className="text-[#3fb950] font-bold text-lg">3+</p>
                <p className="text-[#8b949e] text-xs">Years Exp.</p>
              </div>
            </div>
          </motion.div>

          {/* Text side — shown SECOND on mobile, first on desktop */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-3 justify-center lg:justify-start"
            >
              <span className="w-2 h-2 bg-[#3fb950] rounded-full animate-pulse" />
              <span className="text-[#3fb950] text-sm font-medium">Available for work</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-3xl lg:text-6xl font-bold text-white mb-2 lg:mb-3 leading-tight"
            >
              Hi, I'm{' '}
              <span className="text-[#3fb950]">{data?.name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[#8b949e] text-base lg:text-lg mb-4 lg:mb-5 h-7 lg:h-8"
            >
              <TypeAnimation
                sequence={[
                  'Full Stack Developer', 1500,
                  'Java & Spring Boot Dev', 1500,
                  'React.js Engineer', 1500,
                ]}
                repeat={Infinity}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[#8b949e] text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 max-w-lg mx-auto lg:mx-0"
            >
              {data?.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3 flex-wrap justify-center lg:justify-start"
            >
              <a href="#projects" className="btn-primary">View Projects</a>
              <a href={data?.resumeUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                Download CV
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-5 mt-6 lg:mt-8 justify-center lg:justify-start"
            >
              {data?.socialLinks && Object.entries(data.socialLinks).map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noreferrer"
                  className="text-[#8b949e] hover:text-[#3fb950] text-sm capitalize transition-colors">
                  {key} ↗
                </a>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}