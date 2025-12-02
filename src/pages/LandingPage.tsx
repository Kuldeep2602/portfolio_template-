import { Link } from 'react-router-dom';
import { FolderOpen, User, Mail, FileText, Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassBubbleText from '../components/GlassBubbleText';
import TiltCard from '../components/TiltCard';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-start min-h-[80vh] pt-8 md:pt-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="text-center mb-6" variants={itemVariants}>
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-3 tracking-tighter text-glow transition-colors duration-300">
          <GlassBubbleText shimmer>Kuldeep Singh</GlassBubbleText>
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-light tracking-wide transition-colors duration-300">
          Full Stack Developer & Digital Experience Creator
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-5xl">

        {/* Main Card (Spans 2 columns) */}
        <motion.div
          className="lg:col-span-2"
          variants={itemVariants}
        >
          <TiltCard className="h-full glass-bubble-card-glow bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl dark:shadow-none rounded-3xl min-h-[300px] relative overflow-hidden group">
            <div className="flex flex-col justify-between h-full w-full p-6 md:p-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

              {/* Available Badge */}
              <div className="flex items-center gap-2 mb-6 relative z-10">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="bg-white/60 dark:bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 border border-white/40 dark:border-white/10 shadow-sm transition-colors duration-300">
                  Available for work
                </span>
              </div>

              {/* Main Content */}
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight transition-colors duration-300">
                  Crafting Digital <br />
                  <GlassBubbleText shimmer>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                      Experiences
                    </span>
                  </GlassBubbleText>
                </h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-light max-w-md leading-relaxed transition-colors duration-300">
                  Specializing in modern web applications with React, TypeScript, Next.js, and cutting-edge design systems.
                </p>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5 relative z-10">
                {[
                  { name: 'Resume', icon: FileText, href: 'https://drive.google.com/file/d/1FKKIlL_NYfJxPopVgLHYZ-QEZGWiW5id/view?usp=drive_link' },
                  { name: 'GitHub', icon: Github, href: 'https://github.com/Kuldeep2602' },
                  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/kuldeep-singh2602/' },
                  { name: 'Twitter', icon: Twitter, href: 'https://x.com/kuldeep26021' }
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-bubble-button bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-sm rounded-xl flex items-center justify-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 transition-all duration-300"
                    onMouseDown={(e) => e.stopPropagation()} // Prevent tilt interference
                  >
                    <item.icon className="w-4 h-4" /> {item.name}
                  </a>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Right Column Stack */}
        <div className="flex flex-col gap-4">

          {/* Projects Card */}
          <Link to="/projects" className="flex-1 block">
            <motion.div variants={itemVariants} className="h-full">
              <TiltCard className="glass-bubble-card bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl dark:shadow-none rounded-3xl h-full group relative overflow-hidden">
                <div className="flex flex-col items-center justify-center text-center h-full w-full p-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="mb-4 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <FolderOpen className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                    <GlassBubbleText>Projects</GlassBubbleText>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">View my work</p>
                </div>
              </TiltCard>
            </motion.div>
          </Link>

          {/* About Card */}
          <Link to="/about" className="flex-1 block">
            <motion.div variants={itemVariants} className="h-full">
              <TiltCard className="glass-bubble-card bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl dark:shadow-none rounded-3xl h-full group relative overflow-hidden">
                <div className="flex flex-col items-center justify-center text-center h-full w-full p-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="mb-4 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <User className="w-8 h-8 text-purple-500 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                    <GlassBubbleText>About</GlassBubbleText>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Learn more</p>
                </div>
              </TiltCard>
            </motion.div>
          </Link>

          {/* Contact Card */}
          <a href="https://cal.com/kuldeep-singh" target="_blank" rel="noopener noreferrer" className="flex-1 block">
            <motion.div variants={itemVariants} className="h-full">
              <TiltCard className="glass-bubble-card bg-orange-50/80 dark:bg-orange-900/20 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl dark:shadow-none rounded-3xl h-full group relative overflow-hidden">
                <div className="flex flex-col items-center justify-center text-center h-full w-full p-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="mb-4 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Mail className="w-8 h-8 text-orange-500 dark:text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                    <GlassBubbleText>Contact</GlassBubbleText>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Get in touch</p>
                </div>
              </TiltCard>
            </motion.div>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
