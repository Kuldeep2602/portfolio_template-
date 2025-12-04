import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const ContactEditor: React.FC = () => {
  const { config, updateContact } = usePortfolio();
  const { contact } = config;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Contact Section</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Configure your contact page
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Headline
          </label>
          <input
            type="text"
            value={contact.headline}
            onChange={(e) => updateContact({ headline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Get in Touch"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Subheadline
          </label>
          <textarea
            value={contact.subheadline}
            onChange={(e) => updateContact({ subheadline: e.target.value })}
            rows={2}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Have a project in mind? Let's build something amazing together."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => updateContact({ email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location Text
            </label>
            <input
              type="text"
              value={contact.locationText}
              onChange={(e) => updateContact({ locationText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Based in New York"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Availability Text
            </label>
            <input
              type="text"
              value={contact.availabilityText}
              onChange={(e) => updateContact({ availabilityText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Available for Remote Work"
            />
          </div>
        </div>

        {/* Contact Form Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Show Contact Form
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Display a contact form on the page
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={contact.showContactForm}
              onChange={(e) => updateContact({ showContactForm: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {contact.showContactForm && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Form Endpoint (optional)
            </label>
            <input
              type="url"
              value={contact.formEndpoint || ''}
              onChange={(e) => updateContact({ formEndpoint: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://formspree.io/f/..."
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Use services like Formspree, Netlify Forms, or your own backend
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactEditor;
