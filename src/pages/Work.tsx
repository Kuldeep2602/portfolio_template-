import { motion } from 'framer-motion';
import { FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import GlassBubbleText from '../components/GlassBubbleText';
import { projects } from '../data/projects';

const Work: React.FC = () => {
  return (
    <div className="min-h-screen p-6">
      {/* Navigation */}
      <nav className="py-4 px-4 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 dark:text-white mb-3">
            <GlassBubbleText shimmer>My Projects</GlassBubbleText>
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 font-light">A showcase of my recent work</p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-bubble-card bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl border border-white/50 dark:border-white/10 p-6 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-full md:w-2/5 overflow-hidden rounded-xl h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full md:w-3/5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-900/30 backdrop-blur-sm px-2 py-1 rounded-full border border-white/40 dark:border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl font-medium text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <GlassBubbleText>{project.title}</GlassBubbleText>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex items-center space-x-3">
                      {project.codeUrl && (
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-bubble-button inline-flex items-center bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-medium shadow-md rounded-lg px-4 py-2 gap-2 text-sm transition-all duration-300 backdrop-blur-md border border-white/40 dark:border-white/20"
                        >
                          <FiArrowRight className="w-4 h-4" /> Code
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-bubble-button inline-flex items-center bg-blue-100/60 dark:bg-blue-900/30 hover:bg-blue-200/60 dark:hover:bg-blue-800/40 text-blue-700 dark:text-blue-300 font-medium shadow-md rounded-lg px-4 py-2 gap-2 text-sm transition-all duration-300 backdrop-blur-md border border-white/40 dark:border-white/20"
                        >
                          <FiExternalLink className="w-4 h-4" /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Work;
