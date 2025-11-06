import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { Github, Linkedin, Mail, Moon, Sun } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
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

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-slate-950/60 border-b border-slate-200/60 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <button className="font-bold text-lg" onClick={() => scroll.scrollToTop()}>Yuki</button>
          <nav className="hidden gap-6 md:flex">
            {['about','skills','projects','experience','contact'].map(id => (
              <ScrollLink key={id} to={id} smooth offset={-80} duration={500} className="cursor-pointer hover:text-fuchsia-600">
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </ScrollLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:your@email" aria-label="Email" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
              <Mail className="h-5 w-5" />
            </a>
            <button aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4">
        {/* Hero */}
        <section className="min-h-[70vh] flex items-center" id="hero">
          <div className="w-full py-20">
            <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Hi, I’m <span className="text-fuchsia-600">Yuki</span>.
            </motion.h1>
            <p className="mt-4 text-xl text-slate-600 dark:text-slate-300">
              <TypeAnimation
                sequence={["Frontend Engineer", 1600, "Full‑stack Developer", 1600, "UI/UX Enthusiast", 1600]}
                speed={50}
                repeat={Infinity}
              />
            </p>
            <div className="mt-8 flex gap-4">
              <ScrollLink to="projects" smooth offset={-80} duration={500} className="px-5 py-3 rounded-md bg-fuchsia-600 text-white font-medium cursor-pointer hover:bg-fuchsia-500">See Projects</ScrollLink>
              <a href="/resume.pdf" download className="px-5 py-3 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">Download CV</a>
            </div>
          </div>
        </section>

        {/* About */}
        <Section id="about" title="About Me">
          <p>I build modern, fast, and delightful web experiences.</p>
        </Section>

        {/* Skills */}
        <Section id="skills" title="Skills">
          <div className="flex flex-wrap gap-2">
            {['React','TypeScript','Tailwind','Node','Vite'].map(s => (
              <span key={s} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">{s}</span>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <ProjectsSection />

        {/* Experience */}
        <Section id="experience" title="Experience">
          <ul className="space-y-4">
            <li>
              <h4 className="font-semibold">Company • Role</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">2023 — Present</p>
              <p className="mt-1">Highlights of impact and responsibilities.</p>
            </li>
          </ul>
        </Section>

        {/* Contact */}
        <Section id="contact" title="Contact">
          <p>Let’s build something great together.</p>
          <div className="mt-4 flex gap-4">
            <a className="px-5 py-3 rounded-md bg-fuchsia-600 text-white font-medium hover:bg-fuchsia-500" href="mailto:your@email">Email me</a>
            <a className="px-5 py-3 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800" href="https://linkedin.com/in/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </Section>

        <footer className="py-12 text-center text-sm text-slate-500">© {new Date().getFullYear()} Yuki</footer>
      </main>
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
  const featured: string[] = ['Istrack', 'Guess-It-Game', 'NameTheFlag'];
  const username = 'YusufWolf';

  useEffect(() => {
    if (!username) {
      // Show placeholder projects when username not set
      setRepos([
        { id: 1, name: 'Istrack', description: 'A fantastic project showcasing modern web development', language: 'TypeScript', stargazers_count: 42, html_url: '#' },
        { id: 2, name: 'Guess-It-Game', description: 'An innovative solution to a real-world problem', language: 'React', stargazers_count: 28, html_url: '#' },
        { id: 3, name: 'NameTheFlag', description: 'Beautiful UI components library built with React', language: 'JavaScript', stargazers_count: 15, html_url: '#' },
      ]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
      .then(r => r.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : [];
        const prioritized = featured.length
          ? items.sort((a: any, b: any) => {
              const aF = featured.includes(a.name) ? 0 : 1;
              const bF = featured.includes(b.name) ? 0 : 1;
              return aF - bF || (b.stargazers_count - a.stargazers_count);
            })
          : items.sort((a: any, b: any) => (b.stargazers_count - a.stargazers_count));
        setRepos(prioritized.slice(0, 6));
        setLoading(false);
      })
      .catch(() => {
        setRepos([]);
        setLoading(false);
      });
  }, []);

  return (
    <Section id="projects" title="Projects">
      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading projects...</div>
      ) : repos.length === 0 ? (
        <div className="text-center py-12 text-slate-500">No projects found. Update your GitHub username to fetch your repositories.</div>
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


