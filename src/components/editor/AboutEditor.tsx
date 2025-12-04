import React, { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Experience } from '../../types/portfolio';

const AboutEditor: React.FC = () => {
  const { config, updateAbout } = usePortfolio();
  const { about } = config;
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !about.skills.includes(newSkill.trim())) {
      updateAbout({ skills: [...about.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    updateAbout({ skills: about.skills.filter(s => s !== skill) });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: 'New Position',
      company: 'Company Name',
      companyUrl: '',
      startDate: new Date().getFullYear().toString(),
      endDate: 'Present',
      current: true,
      highlights: ['Add your accomplishments here'],
      color: 'blue',
    };
    updateAbout({ experiences: [newExp, ...about.experiences] });
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    updateAbout({
      experiences: about.experiences.map(exp =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    updateAbout({
      experiences: about.experiences.filter(exp => exp.id !== id),
    });
  };

  const updateHighlight = (expId: string, index: number, value: string) => {
    const exp = about.experiences.find(e => e.id === expId);
    if (exp) {
      const newHighlights = [...exp.highlights];
      newHighlights[index] = value;
      updateExperience(expId, { highlights: newHighlights });
    }
  };

  const addHighlight = (expId: string) => {
    const exp = about.experiences.find(e => e.id === expId);
    if (exp) {
      updateExperience(expId, { highlights: [...exp.highlights, ''] });
    }
  };

  const removeHighlight = (expId: string, index: number) => {
    const exp = about.experiences.find(e => e.id === expId);
    if (exp) {
      updateExperience(expId, {
        highlights: exp.highlights.filter((_, i) => i !== index),
      });
    }
  };

  const colorOptions = [
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
    { value: 'pink', label: 'Pink', class: 'bg-pink-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">About Section</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Share your story and experience
        </p>
      </div>

      {/* Profile Info */}
      <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-white">Profile Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Initials
            </label>
            <input
              type="text"
              value={about.initials}
              onChange={(e) => updateAbout({ initials: e.target.value.slice(0, 3).toUpperCase() })}
              maxLength={3}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="JD"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={about.fullName}
              onChange={(e) => updateAbout({ fullName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Role / Title
          </label>
          <input
            type="text"
            value={about.role}
            onChange={(e) => updateAbout({ role: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Full Stack Developer"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location
            </label>
            <input
              type="text"
              value={about.location}
              onChange={(e) => updateAbout({ location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="New York, USA"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={about.email}
              onChange={(e) => updateAbout({ email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Bio
          </label>
          <textarea
            value={about.bio}
            onChange={(e) => updateAbout({ bio: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Tell visitors about yourself..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Resume URL (optional)
          </label>
          <input
            type="url"
            value={about.resumeUrl || ''}
            onChange={(e) => updateAbout({ resumeUrl: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://drive.google.com/..."
          />
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-white">Skills</h3>
        
        <div className="flex flex-wrap gap-2">
          {about.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-1 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Add a skill..."
          />
          <button
            onClick={addSkill}
            className="px-4 py-2.5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 dark:text-white">Experience</h3>
          <button
            onClick={addExperience}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Experience
          </button>
        </div>

        <div className="space-y-4">
          {about.experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                  <div className="flex gap-1">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => updateExperience(exp.id, { color: color.value as Experience['color'] })}
                        className={`w-5 h-5 rounded-full ${color.class} ${
                          exp.color === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Company URL (optional)
                </label>
                <input
                  type="url"
                  value={exp.companyUrl || ''}
                  onChange={(e) => updateExperience(exp.id, { companyUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Jan 2023"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    disabled={exp.current}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    placeholder="Present"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, { 
                    current: e.target.checked,
                    endDate: e.target.checked ? 'Present' : exp.endDate
                  })}
                  className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                Currently working here
              </label>

              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Key Highlights
                </label>
                <div className="space-y-2">
                  {exp.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => updateHighlight(exp.id, index, e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe an achievement..."
                      />
                      <button
                        onClick={() => removeHighlight(exp.id, index)}
                        className="text-red-500 hover:text-red-600 transition-colors p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addHighlight(exp.id)}
                    className="text-sm text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add highlight
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutEditor;
