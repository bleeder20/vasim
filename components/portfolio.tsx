"use client";

import { useEffect, useState } from "react";
import portfolio from "@/data/portfolio.json";

type Theme = "dark" | "light";

const ArrowUpRight = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const ProjectArt = ({ accent, index }: { accent: string; index: number }) => {
  const colors = {
    lime: "bg-lime",
    violet: "bg-violet",
    orange: "bg-orange-400",
    blue: "bg-sky-400",
  };

  return (
    <div className={`relative aspect-[4/3] overflow-hidden rounded-[2rem] ${colors[accent as keyof typeof colors] ?? "bg-lime"}`}>
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#111_1px,transparent_1px),linear-gradient(90deg,#111_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute left-7 top-7 flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-[0.2em]">
        <span className="h-2 w-2 rounded-full bg-ink" /> Project {String(index + 1).padStart(2, "0")}
      </div>
      {index % 2 === 0 ? (
        <div className="absolute inset-x-[12%] bottom-[12%] top-[18%] rotate-[-5deg] rounded-3xl border-2 border-ink bg-paper p-4 shadow-[12px_12px_0_#111]">
          <div className="flex h-full flex-col justify-between">
            <div className="flex justify-between"><span className="h-2 w-16 rounded-full bg-ink" /><span className="h-2 w-2 rounded-full bg-violet" /></div>
            <div><div className="mb-3 h-3 w-2/3 rounded bg-ink" /><div className="h-12 rounded-lg bg-ink/10" /></div>
          </div>
        </div>
      ) : (
        <div className="absolute left-[18%] top-[20%] h-[60%] w-[64%] rounded-full border-[18px] border-ink/90 bg-paper shadow-[15px_15px_0_#111]">
          <div className="absolute inset-[15%] rounded-full bg-ink" />
          <div className="absolute inset-[32%] rounded-full bg-paper" />
        </div>
      )}
    </div>
  );
};

export function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [theme, setTheme] = useState<Theme>("dark");
  const categories = ["All", ...Array.from(new Set(portfolio.projects.map((project) => project.category)))];
  const visibleProjects = filter === "All" ? portfolio.projects : portfolio.projects.filter((project) => project.category === filter);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <main className="portfolio overflow-hidden bg-paper" data-theme={theme}>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur-xl">
        <div className="section-shell flex h-20 items-center justify-between">
          <a href="#top" className="font-display text-xl font-bold tracking-[-0.04em]">{portfolio.name}<span className="text-violet">.</span></a>
          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex" aria-label="Main navigation">
            <a className="transition hover:text-violet" href="#work">Work</a>
            <a className="transition hover:text-violet" href="#about">About</a>
            <a className="transition hover:text-violet" href="#experience">Experience</a>
          </nav>
          <div className="flex items-center gap-3">
            <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} className="rounded-full border border-ink/20 px-4 py-3 text-sm font-bold transition hover:border-ink">
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
            <a href={`mailto:${portfolio.email}`} className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-violet">Let&apos;s talk</a>
          </div>
        </div>
      </header>

      <section id="top" className="section-shell relative min-h-screen pb-16 pt-32 lg:pt-40">
        <div className="absolute -right-20 top-24 h-72 w-72 rounded-full bg-violet/20 blur-3xl" />
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-8 flex items-center gap-3"><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-violet" /><span className="text-sm font-semibold">{portfolio.availability}</span></div>
            <h1 className="max-w-5xl font-display text-[clamp(4rem,12vw,10rem)] font-bold leading-[0.78] tracking-[-0.075em]">
              I make ideas<br /><span className="outline-text">feel alive.</span>
            </h1>
          </div>
          <div className="max-w-sm lg:pb-3">
            <p className="text-xl font-medium leading-relaxed sm:text-2xl">{portfolio.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="rounded-full bg-ink px-6 py-4 text-sm font-bold text-white transition hover:bg-violet">Explore my work</a>
              <a href={`mailto:${portfolio.email}`} className="rounded-full border-2 border-ink px-6 py-4 text-sm font-bold transition hover:bg-lime">Email me</a>
            </div>
          </div>
        </div>
        <div className="mt-20 flex items-center justify-between border-t border-ink/20 pt-5 text-xs font-semibold uppercase tracking-[0.16em]">
          <span>Scroll to discover</span><span>{portfolio.location}</span>
        </div>
      </section>

      <section className="overflow-hidden border-y border-ink bg-lime py-5">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
          {[...portfolio.skills, ...portfolio.skills].map((skill, index) => <span key={`${skill}-${index}`} className="flex items-center gap-10">{skill}<span className="text-violet">✦</span></span>)}
        </div>
      </section>

      <section id="work" className="section-shell py-24 sm:py-32">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div><p className="eyebrow mb-4">Selected work</p><h2 className="font-display text-5xl font-bold tracking-[-0.06em] sm:text-7xl">Built to matter.</h2></div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => <button key={category} onClick={() => setFilter(category)} className={`rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold transition ${filter === category ? "bg-ink text-white" : "hover:border-ink"}`}>{category}</button>)}
          </div>
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          {visibleProjects.map((project, index) => (
            <article key={project.title} className={index % 2 === 1 ? "lg:mt-24" : ""}>
              <ProjectArt accent={project.accent} index={index} />
              <div className="mt-6 flex items-start justify-between gap-6">
                <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-ink/50">{project.category} · {project.year}</p><h3 className="font-display text-3xl font-bold tracking-[-0.04em] sm:text-4xl">{project.title}</h3><p className="mt-3 max-w-lg text-ink/65">{project.description}</p></div>
                <button aria-label={`View ${project.title}`} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink transition hover:rotate-45 hover:bg-ink hover:text-white"><ArrowUpRight /></button>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full border border-ink/15 px-3 py-1 text-xs font-semibold">{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="bg-ink py-24 text-white sm:py-32">
        <div className="section-shell grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="eyebrow mb-5 text-lime">About me</p><h2 className="font-display text-5xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-7xl">Design with<br />purpose.</h2></div>
          <div><p className="max-w-3xl text-2xl font-medium leading-relaxed sm:text-4xl">{portfolio.summary}</p><div className="mt-16 grid grid-cols-3 gap-4 border-t border-white/20 pt-7">{portfolio.stats.map((stat) => <div key={stat.label}><p className="font-display text-4xl font-bold text-lime sm:text-6xl">{stat.value}</p><p className="mt-2 text-xs uppercase tracking-wider text-white/50">{stat.label}</p></div>)}</div></div>
        </div>
      </section>

      <section className="section-shell py-24 sm:py-32">
        <div className="mb-16"><p className="eyebrow mb-4">What I do</p><h2 className="font-display text-5xl font-bold tracking-[-0.06em] sm:text-7xl">From idea to impact.</h2></div>
        <div className="grid border-t border-ink/20">{portfolio.services.map((service) => <div key={service.title} className="group grid gap-4 border-b border-ink/20 py-8 transition hover:pl-4 md:grid-cols-[80px_1fr_1.3fr_auto] md:items-center"><span className="text-sm font-bold">{service.number}</span><h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{service.title}</h3><p className="text-ink/60">{service.description}</p><span className="hidden h-12 w-12 place-items-center rounded-full border border-ink transition group-hover:rotate-45 group-hover:bg-lime md:grid"><ArrowUpRight /></span></div>)}</div>
      </section>

      <section id="experience" className="bg-violet py-24 text-white sm:py-32">
        <div className="section-shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="eyebrow mb-5 text-lime">Experience</p><h2 className="font-display text-5xl font-bold tracking-[-0.06em] sm:text-7xl">A path<br />built on craft.</h2></div>
          <div>{portfolio.experience.map((item) => <div key={`${item.role}-${item.company}`} className="grid gap-3 border-t border-white/30 py-8 first:pt-0 sm:grid-cols-[150px_1fr_1.35fr]"><p className="text-sm text-white/60">{item.period}</p><div><h3 className="font-display text-2xl font-bold">{item.role}</h3><p className="mt-1 text-sm text-lime">{item.company}</p></div><p className="text-white/75">{item.description}</p></div>)}</div>
        </div>
      </section>

      <section className="section-shell py-24 sm:py-32">
        <div className="relative overflow-hidden rounded-[2rem] bg-lime px-6 py-16 sm:px-14 sm:py-24">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[50px] border-ink/10" />
          <div className="relative z-10 max-w-4xl"><p className="eyebrow mb-5">Have a project in mind?</p><h2 className="font-display text-5xl font-bold leading-[0.9] tracking-[-0.065em] sm:text-8xl">Let&apos;s make<br />something <span className="outline-text">great.</span></h2><a href={`mailto:${portfolio.email}`} className="mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-violet">{portfolio.email}<ArrowUpRight /></a></div>
        </div>
      </section>

      <footer className="border-t border-ink/20 py-8">
        <div className="section-shell flex flex-col justify-between gap-5 text-sm font-semibold sm:flex-row"><p>© {new Date().getFullYear()} {portfolio.name}. All rights reserved.</p><div className="flex gap-6"><a href={portfolio.github} className="hover:text-violet">GitHub</a><a href={portfolio.linkedin} className="hover:text-violet">LinkedIn</a><a href={portfolio.dribbble} className="hover:text-violet">Dribbble</a></div></div>
      </footer>
    </main>
  );
}
