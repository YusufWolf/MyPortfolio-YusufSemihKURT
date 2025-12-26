import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { GithubIcon, Linkedin, Mail, Moon, Sun } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { useLanguage } from './hooks/useLanguage';
import { VisitorCounter } from './components/VisitorCounter';
import { ChatWidget } from './components/ChatWidget';
import { NotificationHandler } from './components/NotificationHandler';
import './index.css';

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  return { theme, setTheme };
}

export default function App() {
  const { theme, setTheme } = useTheme();
  const { language, t, toggleLanguage } = useLanguage();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsProfileModalOpen(false);
      }
    };

    if (isProfileModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isProfileModalOpen]);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-slate-950/60 border-b border-slate-200/60 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Profile Picture Button */}
            <button 
              onClick={() => setIsProfileModalOpen(true)}
              className="focus:outline-none focus:ring-2 focus:ring-fuchsia-500 rounded-full transition-transform hover:scale-110"
              aria-label="View profile picture"
            >
              <img 
                src="/profile-picture.png" 
                alt="Yusuf Semih Kurt" 
                className="w-10 h-10 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
              />
            </button>
            {/* Home button */}
            <button className="font-bold text-lg" onClick={() => scroll.scrollToTop()}>Yusuf Semih Kurt</button>
          </div>
          <nav className="hidden gap-6 md:flex">
            {['about','skills','projects','experience','contact'].map(id => (
              <ScrollLink key={id} to={id} smooth offset={-80} duration={500} className="cursor-pointer hover:text-fuchsia-600">
                {t(`nav.${id}`)}
              </ScrollLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <VisitorCounter />
            <a href="https://github.com/YusufWolf/" target="_blank" rel="noreferrer" aria-label="GitHub" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
              <GithubIcon className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/in/yusuf-semih-kurt-14294a209/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:yusufsemihkurt@gmail.com" aria-label="Email" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
              <Mail className="h-5 w-5" />
            </a>
            <button 
              aria-label="Toggle language" 
              onClick={toggleLanguage} 
              className="px-3 py-1.5 rounded text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
              title={`Switch to ${language === 'en' ? 'Türkçe' : 'English'}`}
            >
              {language === 'en' ? 'TR' : 'EN'}
            </button>
            <button aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4">
        {/* Hero */}
        <section 
          className="min-h-[70vh] flex items-center relative overflow-hidden rounded-2xl my-8" 
          id="hero"
          style={{
            backgroundImage: 'url(/software-engineer.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-slate-900/80 dark:from-slate-950/90 dark:via-slate-900/85 dark:to-slate-950/90"></div>
          
          <div className="w-full py-20 relative z-10 px-4">
            <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              {t('hero.greeting')} <span className="text-fuchsia-400">{t('hero.name')}</span>.
            </motion.h1>
            <p className="mt-4 text-xl text-slate-200 dark:text-slate-300">
              <TypeAnimation
                sequence={(t('hero.roles') as string[]).map((role: string) => [role, 1600]).flat()}
                speed={50}
                repeat={Infinity}
              />
            </p>
            <div className="mt-8 flex gap-4">
              <ScrollLink to="projects" smooth offset={-80} duration={500} className="px-5 py-3 rounded-md bg-fuchsia-600 text-white font-medium cursor-pointer hover:bg-fuchsia-500">{t('hero.seeProjects')}</ScrollLink>
              <a href="/YusufSemihKurt_CV.pdf" download="YusufSemihKurt_CV.pdf" className="px-5 py-3 rounded-md border border-slate-300 dark:border-slate-700 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 dark:hover:bg-slate-800">{t('hero.downloadCV')}</a>
            </div>
          </div>
        </section>

        {/* About */}
        <Section id="about" title={t('about.title')}>
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-4 shadow-sm">
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed indent-6">
                {t('about.paragraph1')}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-4 shadow-sm">
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed indent-6">
                {t('about.paragraph2')}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-4 shadow-sm">
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed indent-6">
                {t('about.paragraph3')}
              </p>
            </div>
          </div>
        </Section>

        {/* Projects */}
        <ProjectsSection />

        {/* Experience */}
        <Section id="experience" title={t('experience.title')}>
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-semibold text-slate-800 dark:text-slate-100">{t('experience.job1.title')}</h4>
                <span className="text-sm text-slate-500 dark:text-slate-400">{t('experience.job1.period')}</span>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {t('experience.job1.description')}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-semibold text-slate-800 dark:text-slate-100">{t('experience.job2.title')}</h4>
                <span className="text-sm text-slate-500 dark:text-slate-400">{t('experience.job2.period')}</span>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {t('experience.job2.description')}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-semibold text-slate-800 dark:text-slate-100">{t('experience.job3.title')}</h4>
                <span className="text-sm text-slate-500 dark:text-slate-400">{t('experience.job3.period')}</span>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {t('experience.job3.description')}
              </p>
            </div>
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" title={t('contact.title')}>
          <p>{t('contact.description')}</p>
          <div className="mt-4 flex gap-4">
            <a className="px-5 py-3 rounded-md bg-fuchsia-600 text-white font-medium hover:bg-fuchsia-500" href="mailto:yusufsemihkurt@gmail.com">{t('contact.emailMe')}</a>
            <a className="px-5 py-3 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800" href="https://www.linkedin.com/in/yusuf-semih-kurt-14294a209/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </Section>

        <footer className="py-12 text-center text-sm text-slate-500">© {new Date().getFullYear()} {t('footer.copyright')}</footer>
      </main>

      {/* Real-time Chat Widget */}
      <ChatWidget />

      {/* Notification Handler */}
      <NotificationHandler />

      {/* Profile Picture Modal */}
      {isProfileModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setIsProfileModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-2xl max-h-[90vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center shadow-lg z-10"
              aria-label="Close modal"
            >
              <span className="text-xl">×</span>
            </button>
            <img 
              src="/profile-picture.png" 
              alt="Yusuf Semih Kurt" 
              className="w-full h-auto rounded-lg shadow-2xl object-contain max-h-[90vh]"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-20">
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-2xl md:text-3xl font-bold">
        {title}
      </motion.h2>
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }} className="mt-6">
        {children}
      </motion.div>
    </section>
  );
}

function ProjectsSection() {
  const [repos, setRepos] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const featured: string[] = ['Istrack', 'Guess-It-Game', 'NameTheFlag'];
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'YusufWolf';

  useEffect(() => {
    if (!username) {
      setError('GitHub username not configured. Please set VITE_GITHUB_USERNAME in your .env file.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok || data.message) {
          if (r.status === 404) {
            throw new Error(`GitHub user "${username}" not found. Please check your username.`);
          } else if (r.status === 403) {
            throw new Error('GitHub API rate limit exceeded. Please try again later.');
          } else {
            throw new Error(data.message || 'Failed to fetch repositories from GitHub.');
          }
        }
        return data;
      })
      .then((data) => {
        const items = Array.isArray(data) ? data : [];
        if (items.length === 0) {
          setError(`No repositories found for user "${username}".`);
          setRepos([]);
        } else {
          const prioritized = featured.length
            ? items.sort((a: any, b: any) => {
                const aF = featured.includes(a.name) ? 0 : 1;
                const bF = featured.includes(b.name) ? 0 : 1;
                return aF - bF || (b.stargazers_count - a.stargazers_count);
              })
            : items.sort((a: any, b: any) => (b.stargazers_count - a.stargazers_count));
          setRepos(prioritized.slice(0, 6));
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch repositories. Please check your GitHub username.');
        setRepos([]);
        setLoading(false);
      });
  }, [username]);

  const { t } = useLanguage();

  return (
    <Section id="projects" title={t('projects.title')}>
      {loading ? (
        <div className="text-center py-12 text-slate-500">{t('projects.loading')}</div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400 mb-2">{error}</p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            {!username ? (
              <>Set <code className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">VITE_GITHUB_USERNAME</code> in your <code className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">.env</code> file</>
            ) : (
              <>Current username: <code className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">{username}</code></>
            )}
          </p>
        </div>
      ) : repos.length === 0 ? (
        <div className="text-center py-12 text-slate-500">{t('projects.noProjects')}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repos.map((r) => (
            <motion.a
              key={r.id}
              href={r.html_url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg hover:border-fuchsia-400/60 dark:hover:border-fuchsia-500/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-semibold text-lg group-hover:text-fuchsia-600">{r.name}</h3>
                <span className="text-xs rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-1">★ {r.stargazers_count}</span>
              </div>
              {r.description && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{r.description}</p>}
              {r.language && <p className="mt-3 text-xs text-slate-500">{r.language}</p>}
            </motion.a>
          ))}
        </div>
      )}
    </Section>
  );
}


