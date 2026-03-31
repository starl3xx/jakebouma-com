import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Let\u2019s Do This",
  description:
    "A feature-length documentary following Jake Bouma from Hodgkin lymphoma diagnosis through treatment and recovery.",
};

const vlogs = [
  { title: "Diagnosis Day", description: "The day everything changed." },
  { title: "Treatment Begins", description: "First round of chemo and what to expect." },
  { title: "The Halfway Point", description: "Reflections from the middle of treatment." },
  { title: "Ringing the Bell", description: "The moment I was declared cancer-free." },
];

export default function LetsDoThis() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-20">
      {/* Header */}
      <div className="max-w-2xl mb-16">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink-faint mb-6">
          Documentary
        </p>
        <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-ink mb-6">
          Let&rsquo;s Do This: Facing Hodgkin Lymphoma
        </h1>
        <p className="text-ink-light leading-[1.85] mb-5">
          In 2012, at age 28, I was diagnosed with Hodgkin lymphoma. I decided to
          document everything&mdash;the fear, the treatment, the humor, the
          uncertainty, and the hope. Thousands of people around the world followed
          along through blog posts and YouTube vlogs.
        </p>
        <p className="text-ink-light leading-[1.85]">
          Director Nathan Matta turned that raw footage and story into a
          feature-length documentary that premiered in 2015. It was funded through
          a Kickstarter campaign and is available to the public.
        </p>
      </div>

      {/* Trailer embed */}
      <div className="mb-16">
        <p className="font-sans text-xs tracking-[0.15em] uppercase text-ink-faint mb-6">
          Trailer
        </p>
        <div className="aspect-video overflow-hidden rounded bg-cream-dark border border-rule-light">
          <iframe
            src="https://player.vimeo.com/video/93893479?h=0&title=0&byline=0&portrait=0"
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Let\u2019s Do This: Facing Hodgkin Lymphoma \u2014 Trailer"
          />
        </div>
      </div>

      {/* Links */}
      <div className="mb-16">
        <p className="font-sans text-xs tracking-[0.15em] uppercase text-ink-faint mb-6">
          Watch & Learn More
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "IMDB", href: "https://www.imdb.com/title/tt5162956/" },
            { label: "Vimeo", href: "https://vimeo.com/93893479" },
            { label: "Kickstarter", href: "https://www.kickstarter.com/projects/nathanmatta/lets-do-this-facing-hodgkin-lymphoma" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm border border-rule rounded px-5 py-3 text-ink hover:border-ink-faint hover:text-accent transition-colors"
            >
              {link.label} &#8599;
            </a>
          ))}
        </div>
      </div>

      <hr className="border-rule mb-16" />

      {/* Press */}
      <div className="mb-16">
        <p className="font-sans text-xs tracking-[0.15em] uppercase text-ink-faint mb-6">
          Press
        </p>
        <a
          href="https://www.huffpost.com/entry/hodgkin-lymphoma-patient_n_1625775"
          target="_blank"
          rel="noopener noreferrer"
          className="group block max-w-xl"
        >
          <p className="font-sans text-xs text-ink-faint mb-2">HuffPost</p>
          <h3 className="text-ink group-hover:text-accent transition-colors mb-1">
            Hodgkin&rsquo;s Lymphoma Patient Jake Bouma, 28, Learns That He Is
            Cancer-Free
          </h3>
          <p className="text-sm text-ink-muted">
            HuffPost covered the moment I got the news.
          </p>
        </a>
      </div>

      {/* Vlogs section */}
      <div>
        <p className="font-sans text-xs tracking-[0.15em] uppercase text-ink-faint mb-6">
          Cancer Vlogs
        </p>
        <p className="text-ink-muted mb-8 max-w-xl leading-relaxed">
          Throughout treatment, I recorded video updates shared on YouTube.
          These became the raw material for the documentary.
        </p>
        <div className="space-y-0">
          {vlogs.map((vlog, i) => (
            <div key={i} className="py-4 border-b border-rule-light">
              <h3 className="text-ink mb-0.5">{vlog.title}</h3>
              <p className="text-sm text-ink-muted">{vlog.description}</p>
              <p className="font-sans text-xs text-ink-faint mt-1 italic">
                Video link coming soon
              </p>
            </div>
          ))}
        </div>
        <p className="text-sm text-ink-faint mt-6 italic">
          Full vlog archive is being restored.
        </p>
      </div>
    </div>
  );
}
