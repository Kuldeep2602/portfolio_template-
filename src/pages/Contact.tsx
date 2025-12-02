import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiSend } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="mb-6 md:mb-12">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </nav>

      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight text-glow transition-colors duration-300">Get in Touch</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-light transition-colors duration-300">Have a project in mind? Let's build something amazing together.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="glass-panel rounded-3xl p-8 md:p-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Contact Information</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 font-light leading-relaxed transition-colors duration-300">
                  Feel free to reach out for collaborations, opportunities, or just a friendly hello!
                </p>

                <div className="space-y-6">
                  <a
                    href="mailto:kuldeeprathore1637@gmail.com"
                    className="flex items-center text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white group transition-colors"
                  >
                    <div className="p-3 bg-white/60 dark:bg-white/5 rounded-xl mr-4 group-hover:bg-white/80 dark:group-hover:bg-white/10 transition-colors border border-white/40 dark:border-white/10 shadow-sm">
                      <FiMail size={24} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="border-b border-transparent group-hover:border-blue-600 dark:group-hover:border-blue-400 transition-all">
                      kuldeeprathore1637@gmail.com
                    </span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/kuldeep-singh2602/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white group transition-colors"
                  >
                    <div className="p-3 bg-white/60 dark:bg-white/5 rounded-xl mr-4 group-hover:bg-white/80 dark:group-hover:bg-white/10 transition-colors border border-white/40 dark:border-white/10 shadow-sm">
                      <FiLinkedin size={24} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="border-b border-transparent group-hover:border-blue-600 dark:group-hover:border-blue-400 transition-all">
                      kuldeep-singh2602
                    </span>
                  </a>

                  <a
                    href="https://github.com/Kuldeep2602"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white group transition-colors"
                  >
                    <div className="p-3 bg-white/60 dark:bg-white/5 rounded-xl mr-4 group-hover:bg-white/80 dark:group-hover:bg-white/10 transition-colors border border-white/40 dark:border-white/10 shadow-sm">
                      <FiGithub size={24} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="border-b border-transparent group-hover:border-blue-600 dark:group-hover:border-blue-400 transition-all">
                      Kuldeep2602
                    </span>
                  </a>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200/50 dark:border-white/10">
                <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">Based in Noida, India • Available for Remote Work</p>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Send me a message</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-sm"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-sm"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none shadow-sm"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  <FiSend /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
