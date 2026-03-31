import Link from "next/link";

interface EraLink {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
}

interface Era {
  id: string;
  years: string;
  numeral: string;
  title: string;
  subtitle: string;
  description: string;
  links: EraLink[];
}

const eras: Era[] = [
  {
    id: "early",
    years: "1996–2002",
    numeral: "I",
    title: "The Early Years",
    subtitle: "GeoCities, movie WAVs, and MS Paint",
    description:
      "Before blogs existed, I was building fan pages, collecting movie sound clips, and teaching myself HTML on a 56k modem. The internet was weird and wonderful and I was hooked from the start.",
    links: [
      {
        title: "Jake's Movie Wavs",
        href: "https://web.archive.org/web/20020211122622/geocities.com/Hollywood/Makeup/8205/",
        description: "Preserved by the Wayback Machine",
        external: true,
      },
      {
        title: "Dr. Thunder & the Generic Sodas",
        href: "/dr-thunder",
        description: "The best band. Ever. (Luther College, c. 2004)",
      },
      {
        title: "More coming soon",
        href: "#early",
        description: "Digging through old hard drives",
      },
    ],
  },
  {
    id: "blog",
    years: "2004–2012",
    numeral: "II",
    title: "JakeBouma.com",
    subtitle: "800+ blog posts on theology, culture, tech, books, and life",
    description:
      "What started as a Luther College student blog became an eight-year writing habit. WordPress, the Thesis theme, a Feedburner RSS feed, and a small but loyal readership. I wrote about everything\u2014faith, music, movies, politics, food, the Enneagram, David Foster Wallace, and whatever else I was obsessing over that week.",
    links: [
      {
        title: "Browse the full archive",
        href: "/archive?year=2004",
        description: "869 posts, searchable by year and category",
      },
      {
        title: "Luther College blog",
        href: "/archive?tag=luther-college",
        description: "15 posts from the pre-WordPress era (2004)",
      },
      {
        title: "2012 Books",
        href: "/archive/2012-books",
        description: "Annual reading lists were a staple",
      },
    ],
  },
  {
    id: "cancer",
    years: "2012–2015",
    numeral: "III",
    title: "Cancer",
    subtitle: "Hodgkin lymphoma at 28, documented in real time",
    description:
      "In 2012 I was diagnosed with Hodgkin lymphoma. I blogged and vlogged the entire journey\u2014diagnosis, chemo, remission\u2014and it became the most meaningful thing I\u2019d ever published. It led to a guest blog series, a published book, and a feature-length documentary.",
    links: [
      {
        title: "Let\u2019s Do This",
        href: "/lets-do-this",
        description: "The documentary by Nathan Matta",
      },
      {
        title: "Cancer & Theology",
        href: "/archive/cancer-and-theology-series",
        description: "The series that became a book",
      },
      {
        title: "Cancer posts",
        href: "/archive?category=Lymphoma",
        description: "Every post from diagnosis through remission",
      },
    ],
  },
  {
    id: "writing",
    years: "2013–2021",
    numeral: "IV",
    title: "Writing",
    subtitle: "Parables, fiction, curriculum, and a Substack",
    description:
      "After shutting down the blog, I moved to Medium and started writing fiction\u2014modern parables that explored faith through story. I co-founded Elbow Co. with Erik Ullestad and we published youth ministry curriculum. Later, I launched Neon Parentheses on Substack as an experiment in sustained creative output.",
    links: [
      {
        title: "The Mute Monk",
        href: "/archive/the-mute-monk",
        description: "A modern parable about grace",
      },
      {
        title: "The Tombstone",
        href: "/archive/the-tombstone",
        description: "A modern parable about faith",
      },
      {
        title: "Neon Parentheses",
        href: "/archive?category=Neon+Parentheses",
        description: "Fiction, essays, and Jazzwood",
      },
    ],
  },
  {
    id: "crypto",
    years: "2023–present",
    numeral: "V",
    title: "Crypto + ???",
    subtitle: "Onchain games, DeFi marketing, and whatever comes next",
    description:
      "I fell into crypto professionally\u2014first at OKX, then as Brand & Content Lead at Reserve Protocol. Along the way I started building my own things: an onchain word game, a wallet-to-social lookup tool, and more. The through-line is still the same: making things on the internet.",
    links: [
      {
        title: "Let\u2019s Have A Word!",
        href: "/projects",
        description: "An onchain word game on Ethereum",
      },
      {
        title: "walletlink.social",
        href: "/projects",
        description: "Social discovery for DeFi and NFT users",
      },
      {
        title: "Reserve Protocol",
        href: "/work",
        description: "Brand & Content Lead",
      },
    ],
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 md:pt-36 md:pb-28">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink-faint mb-6">
          Est. 1996
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-ink">
          Writer, builder,
          <br />
          cancer survivor.
        </h1>
        <p className="mt-8 text-lg md:text-xl text-ink-muted leading-relaxed max-w-xl">
          I&rsquo;ve been making things on the internet for nearly three
          decades. This is where all of it lives.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/about"
            className="font-sans inline-flex items-center px-5 py-2.5 bg-ink text-cream text-xs font-medium tracking-wide uppercase rounded hover:bg-ink-light transition-colors"
          >
            About me
          </Link>
          <Link
            href="/archive"
            className="font-sans inline-flex items-center px-5 py-2.5 border border-rule text-ink-muted text-xs font-medium tracking-wide uppercase rounded hover:border-ink-faint hover:text-ink transition-colors"
          >
            Full archive
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <hr className="border-rule" />
      </div>

      {/* Eras */}
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <div className="space-y-20 md:space-y-28">
          {eras.map((era, i) => (
            <div key={era.id} id={era.id}>
              {/* Era header */}
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-sans text-xs tracking-[0.15em] text-ink-faint uppercase">
                  {era.numeral}
                </span>
                <span className="font-sans text-xs tracking-[0.15em] text-ink-faint">
                  {era.years}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-ink mb-2">
                {era.title}
              </h2>

              <p className="text-sm italic text-ink-muted mb-6">
                {era.subtitle}
              </p>

              <p className="text-ink-light leading-[1.8] max-w-2xl mb-8">
                {era.description}
              </p>

              {/* Links */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                {era.links.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group border border-rule rounded px-5 py-3.5 hover:border-ink-faint transition-colors bg-cream"
                  >
                    <span className="font-sans text-sm font-medium text-ink group-hover:text-accent transition-colors">
                      {link.title}
                      {link.external && (
                        <span className="text-ink-faint ml-1 text-xs">&#8599;</span>
                      )}
                    </span>
                    {link.description && (
                      <span className="block font-sans text-xs text-ink-faint mt-0.5">
                        {link.description}
                      </span>
                    )}
                  </a>
                ))}
              </div>

              {/* Divider between eras */}
              {i < eras.length - 1 && (
                <hr className="border-rule-light mt-20 md:mt-28" />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
