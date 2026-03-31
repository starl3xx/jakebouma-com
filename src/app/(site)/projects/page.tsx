import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

interface Project {
  title: string;
  description: string;
  href?: string;
  year: string;
  category: string;
  collaborators?: string;
}

const projects: Project[] = [
  {
    title: "Let\u2019s Have A Word!",
    description:
      "A global onchain word game where everyone eliminates wrong answers until one player hits the ETH jackpot.",
    href: "https://www.letshaveaword.fun/",
    year: "2025",
    category: "Web3",
  },
  {
    title: "walletlink.social",
    description:
      "A social discovery tool for finding DeFi users and NFT holders.",
    href: "https://walletlink.social/",
    year: "2024",
    category: "Web3",
  },
  {
    title: "Neon Parentheses",
    description:
      "My Substack newsletter \u2014 an experiment in sustained creative output.",
    href: "https://jakebouma.substack.com/",
    year: "2021",
    category: "Writing",
  },
  {
    title: "Modern Parables Series",
    description:
      "A trilogy of original short stories: The Mute Monk (grace), The Captain\u2019s Daughter (fear), and The Tombstone (faith).",
    year: "2018\u20132019",
    category: "Writing",
  },
  {
    title: "Let\u2019s Do This: Facing Hodgkin Lymphoma",
    description:
      "A feature-length documentary directed by Nathan Matta, following my cancer journey. Funded on Kickstarter.",
    href: "/lets-do-this",
    year: "2015",
    category: "Film",
  },
  {
    title: "Cancer & Theology",
    description:
      "An anthology of sixteen essays featuring writers like Brian McLaren, Tony Jones, and Kester Brewin.",
    href: "https://www.amazon.com/Cancer-Theology-Tony-Jones/dp/0615946976",
    year: "2014",
    category: "Book",
  },
  {
    title: "Hypotherables",
    description:
      "A youth ministry curriculum built around original stories and hypothetical questions.",
    year: "2013",
    category: "Ministry",
    collaborators: "Erik Ullestad",
  },
  {
    title: "Elbow Co.",
    description:
      "A ministry resources venture \u2014 \u201Cministry resources by and for church nerds.\u201D",
    year: "2012\u20132015",
    category: "Venture",
    collaborators: "Erik Ullestad",
  },
  {
    title: "JakeBouma.com v1\u2013v5",
    description:
      "My original blog, running from 2005 to 2013 on WordPress. 800+ posts across nearly a decade.",
    year: "2005\u20132013",
    category: "Blog",
  },
];

export default function Projects() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-20">
      <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink-faint mb-6">
        Projects
      </p>
      <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-ink mb-4">
        Things I&rsquo;ve made
      </h1>
      <p className="text-ink-muted mb-14 max-w-xl leading-relaxed">
        Everything I&rsquo;ve built, edited, co-created, and shipped&mdash;from
        books and documentaries to onchain games and newsletters.
      </p>

      <div className="space-y-0">
        {projects.map((project, i) => {
          const inner = (
            <>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-sans text-xs tracking-wide text-ink-faint">
                  {project.year}
                </span>
                <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-ink-faint">
                  {project.category}
                </span>
                {project.collaborators && (
                  <span className="font-sans text-xs text-ink-faint">
                    w/ {project.collaborators}
                  </span>
                )}
              </div>
              <h3 className="text-lg text-ink group-hover:text-accent transition-colors mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {project.description}
              </p>
            </>
          );

          return project.href ? (
            <a
              key={i}
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel={
                project.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group block py-6 border-b border-rule-light hover:bg-cream-dark/50 -mx-4 px-4 transition-colors"
            >
              {inner}
            </a>
          ) : (
            <div
              key={i}
              className="group py-6 border-b border-rule-light -mx-4 px-4"
            >
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
