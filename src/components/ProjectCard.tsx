import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  demoUrl: string;
  codeUrl: string;
  tags: string[];
}

const ProjectCard = ({
  title,
  description,
  imageUrl,
  demoUrl,
  codeUrl,
  tags,
}: ProjectCardProps) => {
  return (
    <motion.div
      className="glass-panel rounded-3xl overflow-hidden group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
          <div className="flex space-x-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-full hover:scale-105 transition-transform flex items-center gap-2"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-black/50 text-white backdrop-blur-md border border-white/20 text-sm font-medium rounded-full hover:bg-black/70 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Github size={16} /> Code
            </a>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 font-light leading-relaxed line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 border border-blue-100 text-blue-600 text-xs rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
