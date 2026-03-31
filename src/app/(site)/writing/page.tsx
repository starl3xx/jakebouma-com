import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
};

interface WritingItem {
  title: string;
  description: string;
  href: string;
  platform: string;
  year: string;
  tag?: string;
}

const writing: WritingItem[] = [
  {
    title: "Neon Parentheses",
    description:
      "My Substack newsletter \u2014 an experiment in sustained creative output. Fiction, essays, serialized stories, and whatever else comes out.",
    href: "/archive?category=Neon+Parentheses",
    platform: "Substack",
    year: "2021",
    tag: "Newsletter",
  },
  {
    title: "The Tombstone",
    description: "A modern parable about faith.",
    href: "/archive/the-tombstone",
    platform: "JakeBouma.com",
    year: "2019",
    tag: "Parable",
  },
  {
    title: "The Mute Monk",
    description: "A modern parable about grace.",
    href: "/archive/the-mute-monk",
    platform: "JakeBouma.com",
    year: "2018",
    tag: "Parable",
  },
  {
    title: "The Captain\u2019s Daughter",
    description: "A modern parable about fear.",
    href: "/archive/the-captains-daughter",
    platform: "JakeBouma.com",
    year: "2018",
    tag: "Parable",
  },
  {
    title: "Let\u2019s Do This: Facing Hodgkin Lymphoma \u2014 Official Release",
    description: "Announcing the documentary\u2019s public availability.",
    href: "/archive/lets-do-this-official-release",
    platform: "JakeBouma.com",
    year: "2016",
    tag: "Announcement",
  },
  {
    title: "Why I\u2019m Moving to Medium",
    description:
      "The final post on JakeBouma.com, explaining the move after 800+ posts and nearly a decade of blogging.",
    href: "/archive/why-im-moving-to-medium",
    platform: "JakeBouma.com",
    year: "2015",
    tag: "Essay",
  },
  {
    title: "Love is a Thief: A Reflection on Subverting the Norm",
    description:
      "A long-form essay connecting Adam Johnson\u2019s The Orphan Master\u2019s Son with the Subverting the Norm theology conference.",
    href: "/archive/the-theologian-as-thief",
    platform: "JakeBouma.com",
    year: "2013",
    tag: "Essay",
  },
  {
    title: "JakeBouma.com Blog Archive (2005\u20132013)",
    description:
      "800+ posts spanning theology, culture, technology, books, music, and life.",
    href: "/archive",
    platform: "JakeBouma.com",
    year: "2005\u20132013",
    tag: "Archive",
  },
];

export default function Writing() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-20">
      <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink-faint mb-6">
        Writing
      </p>
      <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-ink mb-4">
        Everything I&rsquo;ve written
      </h1>
      <p className="text-ink-muted mb-14 max-w-xl leading-relaxed">
        From the earliest blog posts in 2005 to my current Substack. The old
        JakeBouma.com had 800+ posts&mdash;some profound, some self-indulgent,
        all honest.
      </p>

      <div className="space-y-0">
        {writing.map((item, i) => (
          <a
            key={i}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8 py-5 border-b border-rule-light hover:bg-cream-dark/50 -mx-4 px-4 transition-colors"
          >
            <span className="font-sans text-xs tracking-wide text-ink-faint shrink-0 w-24">
              {item.year}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3">
                <h3 className="text-ink group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                {item.tag && (
                  <span className="font-sans text-[10px] tracking-wide uppercase text-ink-faint shrink-0">
                    {item.tag}
                  </span>
                )}
              </div>
              <p className="text-sm text-ink-muted mt-1">{item.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
