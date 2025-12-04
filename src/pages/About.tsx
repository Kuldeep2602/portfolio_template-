import { FiArrowRight, FiMail, FiMapPin, FiUser, FiCode, FiPlus, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import InlineEdit from '../components/InlineEdit';
import { EditModal } from '../components/EditableWrapper';
import type { Experience } from '../types/portfolio';

const About = () => {
  const { config, updateAbout, isEditorMode } = usePortfolio();
  const { about, theme } = config;
  const [showAddExpModal, setShowAddExpModal] = useState(false);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({
    title: '',
    company: '',
    companyUrl: '',
    startDate: '',
    endDate: 'Present',
    current: false,
    highlights: [''],
    color: 'blue'
  });

  const handleAddExperience = () => {
    if (newExperience.title && newExperience.company) {
      const exp: Experience = {
        id: Date.now().toString(),
        title: newExperience.title || '',
        company: newExperience.company || '',
        companyUrl: newExperience.companyUrl,
        startDate: newExperience.startDate || '',
        endDate: newExperience.endDate || 'Present',
        current: newExperience.current || false,
        highlights: newExperience.highlights?.filter(h => h.trim()) || [],
        color: newExperience.color || 'blue'
      };
      updateAbout({ experiences: [...about.experiences, exp] });
      setNewExperience({ title: '', company: '', companyUrl: '', startDate: '', endDate: 'Present', current: false, highlights: [''], color: 'blue' });
      setShowAddExpModal(false);
    }
  };

  const handleDeleteExperience = (id: string) => {
    updateAbout({ experiences: about.experiences.filter(e => e.id !== id) });
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      updateAbout({ skills: [...about.skills, newSkill.trim()] });
      setNewSkill('');
      setShowAddSkillModal(false);
    }
  };

  const handleDeleteSkill = (index: number) => {
    updateAbout({ skills: about.skills.filter((_, i) => i !== index) });
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { border: string; dot: string; text: string }> = {
      blue: { border: 'border-blue-100 dark:border-blue-800', dot: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400' },
      purple: { border: 'border-purple-100 dark:border-purple-800', dot: 'bg-purple-500', text: 'text-purple-600 dark:text-purple-400' },
      green: { border: 'border-green-100 dark:border-green-800', dot: 'bg-green-500', text: 'text-green-600 dark:text-green-400' },
      orange: { border: 'border-orange-100 dark:border-orange-800', dot: 'bg-orange-500', text: 'text-orange-600 dark:text-orange-400' },
      pink: { border: 'border-pink-100 dark:border-pink-800', dot: 'bg-pink-500', text: 'text-pink-600 dark:text-pink-400' },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen p-4 md:p-6 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="py-2 px-4 sm:px-6 mb-2">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight text-glow transition-colors duration-300">About Me</h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-light transition-colors duration-300">
            {isEditorMode ? (
              <InlineEdit
                value={about.bio}
                onSave={(value) => updateAbout({ bio: value })}
                multiline
              >
                {about.bio}
              </InlineEdit>
            ) : (
              about.bio
            )}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Profile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-panel rounded-3xl p-6 lg:w-80 flex-shrink-0"
          >
            <div className="flex flex-col items-center text-center">
              <div 
                className="w-28 h-28 rounded-full mb-4 overflow-hidden border-4 border-white/50 dark:border-white/20 shadow-2xl relative group cursor-pointer"
                style={{ background: about.avatarUrl ? 'transparent' : `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}
                onClick={() => {
                  if (isEditorMode) {
                    const url = prompt('Enter image URL for your avatar:', about.avatarUrl || '');
                    if (url !== null) {
                      updateAbout({ avatarUrl: url });
                    }
                  }
                }}
              >
                {about.avatarUrl ? (
                  <img 
                    src={about.avatarUrl} 
                    alt={about.fullName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <span className="text-4xl font-light">
                      {about.fullName ? about.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : about.initials}
                    </span>
                  </div>
                )}
                {isEditorMode && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-medium">Click to change</span>
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                {isEditorMode ? (
                  <InlineEdit
                    value={about.fullName}
                    onSave={(value) => updateAbout({ fullName: value })}
                  >
                    {about.fullName}
                  </InlineEdit>
                ) : (
                  about.fullName
                )}
              </h3>
              <p 
                className="font-medium mb-6 px-4 py-1.5 rounded-full inline-block text-sm border transition-colors duration-300"
                style={{ 
                  backgroundColor: `${theme.primaryColor}15`,
                  borderColor: `${theme.primaryColor}30`,
                  color: theme.primaryColor
                }}
              >
                {isEditorMode ? (
                  <InlineEdit
                    value={about.role}
                    onSave={(value) => updateAbout({ role: value })}
                  >
                    {about.role}
                  </InlineEdit>
                ) : (
                  about.role
                )}
              </p>

              <div className="w-full space-y-3 mb-6">
                <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-white/5 px-4 py-3 rounded-xl border border-white/40 dark:border-white/10 text-sm shadow-sm transition-all duration-300">
                  <FiMapPin style={{ color: theme.primaryColor }} />
                  {isEditorMode ? (
                    <InlineEdit
                      value={about.location}
                      onSave={(value) => updateAbout({ location: value })}
                    >
                      {about.location}
                    </InlineEdit>
                  ) : (
                    <span>{about.location}</span>
                  )}
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-white/5 px-4 py-3 rounded-xl border border-white/40 dark:border-white/10 text-sm shadow-sm transition-all duration-300">
                  <FiMail style={{ color: theme.primaryColor }} />
                  {isEditorMode ? (
                    <InlineEdit
                      value={about.email}
                      onSave={(value) => updateAbout({ email: value })}
                    >
                      {about.email}
                    </InlineEdit>
                  ) : (
                    <a href={`mailto:${about.email}`} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                      {about.email}
                    </a>
                  )}
                </div>
              </div>

              {about.resumeUrl && (
                <a
                  href={about.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  Download CV
                  <FiArrowRight className="ml-2" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Right column - Experience and Skills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 flex flex-col gap-4"
          >
            {/* Journey section - Show always in edit mode, or when has experiences */}
            {(about.experiences.length > 0 || isEditorMode) && (
            <div className="glass-panel rounded-3xl p-5">
              <div className="flex items-center mb-6">
                <div 
                  className="p-3 rounded-xl mr-4 border transition-colors duration-300"
                  style={{ 
                    backgroundColor: `${theme.primaryColor}15`,
                    borderColor: `${theme.primaryColor}30`
                  }}
                >
                  <FiUser style={{ color: theme.primaryColor }} className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">My Journey</h2>
              </div>

              <div className="space-y-6">
                {about.experiences.length === 0 && isEditorMode && (
                  <p className="text-gray-400 dark:text-gray-500 text-sm italic text-center py-4">No experiences added yet. Click below to add one.</p>
                )}
                {about.experiences.map((exp) => {
                  const colors = getColorClasses(exp.color);
                  return (
                    <div key={exp.id} className={`relative pl-6 border-l-2 ${colors.border} group/exp`}>
                      <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${colors.dot} border-4 border-white dark:border-gray-900`}></div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                      <div className="flex justify-between items-center mb-2">
                        {exp.companyUrl ? (
                          <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className={`${colors.text} font-medium hover:underline`}>
                            {exp.company}
                          </a>
                        ) : (
                          <span className={`${colors.text} font-medium`}>{exp.company}</span>
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>
                      <ul className="list-disc list-outside ml-4 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                      {isEditorMode && (
                        <button
                          onClick={() => handleDeleteExperience(exp.id)}
                          className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover/exp:opacity-100 transition-opacity shadow-lg"
                        >
                          <FiTrash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
                {isEditorMode && (
                  <button
                    onClick={() => setShowAddExpModal(true)}
                    className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors text-sm"
                  >
                    <FiPlus className="w-4 h-4" /> Add Experience
                  </button>
                )}
              </div>
            </div>
            )}

            {/* Skills section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-panel rounded-3xl p-5"
            >
              <div className="flex items-center mb-6">
                <div 
                  className="p-3 rounded-xl mr-4 border transition-colors duration-300"
                  style={{ 
                    backgroundColor: `${theme.secondaryColor}15`,
                    borderColor: `${theme.secondaryColor}30`
                  }}
                >
                  <FiCode style={{ color: theme.secondaryColor }} className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Skills & Expertise</h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {about.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.05 * i + 0.4 }}
                    className="relative group/skill bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium border border-white/40 dark:border-white/10 transition-colors cursor-default shadow-sm"
                  >
                    {skill}
                    {isEditorMode && (
                      <button
                        onClick={() => handleDeleteSkill(i)}
                        className="absolute -top-1.5 -right-1.5 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover/skill:opacity-100 transition-opacity shadow-lg"
                      >
                        <FiTrash2 className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </motion.div>
                ))}
                {isEditorMode && (
                  <button
                    onClick={() => setShowAddSkillModal(true)}
                    className="flex items-center gap-1.5 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors text-sm"
                  >
                    <FiPlus className="w-4 h-4" /> Add Skill
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Add Experience Modal */}
      <EditModal
        isOpen={showAddExpModal}
        onClose={() => setShowAddExpModal(false)}
        title="Add Experience"
        onSave={handleAddExperience}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
            <input
              type="text"
              value={newExperience.title}
              onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
              placeholder="e.g., Full Stack Developer"
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
            <input
              type="text"
              value={newExperience.company}
              onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              placeholder="e.g., Google"
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
              <input
                type="text"
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                placeholder="e.g., Jan 2023"
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
              <input
                type="text"
                value={newExperience.endDate}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                placeholder="e.g., Present"
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
            <select
              value={newExperience.color}
              onChange={(e) => setNewExperience({ ...newExperience, color: e.target.value as Experience['color'] })}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
            >
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="green">Green</option>
              <option value="orange">Orange</option>
              <option value="pink">Pink</option>
            </select>
          </div>
        </div>
      </EditModal>

      {/* Add Skill Modal */}
      <EditModal
        isOpen={showAddSkillModal}
        onClose={() => setShowAddSkillModal(false)}
        title="Add Skill"
        onSave={handleAddSkill}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skill Name</label>
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="e.g., React.js"
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
          />
        </div>
      </EditModal>
    </div>
  );
};

export default About;
