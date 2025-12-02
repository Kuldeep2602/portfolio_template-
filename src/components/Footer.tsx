import { FaHeart } from 'react-icons/fa';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-glass-border mt-20 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2 text-white tracking-tight">Kuldeep Singh</h2>
            <p className="text-gray-400 font-light">Full Stack Developer</p>
          </div>

          <div className="flex space-x-6 mb-6 md:mb-0">
            {[
              { icon: FiGithub, href: "https://github.com/Kuldeep2602", label: "GitHub" },
              { icon: FiLinkedin, href: "https://www.linkedin.com/in/kuldeep-singh2602/", label: "LinkedIn" },
              { icon: FiTwitter, href: "https://x.com/kuldeep26021", label: "Twitter" },
              { icon: FiMail, href: "mailto:kuldeep.singh2602@gmail.com", label: "Email" }
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 border border-white/5 hover:border-white/20"
                aria-label={item.label}
              >
                <item.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-500 text-sm font-light">
          <p>
            &copy; {currentYear} Kuldeep Singh. All rights reserved.
          </p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Made with <FaHeart className="text-red-500/80" /> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
