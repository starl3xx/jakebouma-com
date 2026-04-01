export interface Source {
  slug: string;
  name: string;
  shortName: string;
  years: string;
  description: string;
  url: string;
  archiveUrl?: string;
  screenshot?: string;
  postCount?: number;
}

const sources: Record<string, Source> = {
  luther: {
    slug: "luther-college",
    name: "Luther College Student Page",
    shortName: "Luther College",
    years: "2004",
    description:
      "My first blog. I built a personal website on Luther College's student web server as a project for an educational psychology course. It ran on Powerblog, a PHP-based blogging tool, and lived at students.luther.edu/~boumja01/. I was a sophomore majoring in religion with emphases in music and education, writing about college life, faith, the Cubs, and whatever else was on my mind.",
    url: "http://students.luther.edu/~boumja01/",
    archiveUrl:
      "https://web.archive.org/web/20050210081150/http://students.luther.edu/~boumja01/blog/index.html",
    screenshot: "/images/source-luther.png",
  },
  blogspot: {
    slug: "blogspot",
    name: "Blogspot",
    shortName: "Blogspot",
    years: "2003–2005",
    description:
      "Two blogs on Blogger/Blogspot. The first was \"I'm Serious\" (buddhajake.blogspot.com, 2003–2004), started during my freshman year at Luther College\u2014musings about The Matrix, frisbee, Dr. Thunder rehearsals, and whatever else was on my mind. When I needed a blog I could update from home over dial-up, I started a second one: \"My Stupid Mouth\" (jbouma.blogspot.com, 2004–2005), which became the home for posts about finals, my 21st birthday, a study-abroad trip to Greece and Turkey, and online poker. In March 2005, I launched JakeBouma.com on WordPress, and the Blogspot era ended.",
    url: "https://jbouma.blogspot.com/",
    archiveUrl: "https://jbouma.blogspot.com/",
  },
  wordpress: {
    slug: "jakebouma-com",
    name: "JakeBouma.com (WordPress)",
    shortName: "JakeBouma.com",
    years: "2005–2013",
    description:
      "The main blog. Eight years of writing on WordPress, first on the Starter theme and then on the Thesis framework. A Feedburner RSS feed, a small but loyal readership, and posts about everything\u2014theology, culture, technology, books, music, movies, politics, food, the Enneagram, David Foster Wallace, and whatever else I was obsessing over that week. Over 800 posts in all.",
    url: "https://jakebouma.com/",
    archiveUrl:
      "https://web.archive.org/web/2013/http://jakebouma.com/",
  },
  medium: {
    slug: "medium",
    name: "Medium",
    shortName: "Medium",
    years: "2015–2019",
    description:
      "A handful of longer essays published on Medium after the WordPress blog went quiet. Topics ranged from a reflection on my cancer diagnosis to thoughts on the church and culture.",
    url: "https://medium.com/@jakebouma",
    archiveUrl: "https://medium.com/@jakebouma",
  },
  substack: {
    slug: "neon-parentheses",
    name: "Neon Parentheses (Substack)",
    shortName: "Neon Parentheses",
    years: "2021",
    description:
      "A paid Substack newsletter I ran in 2021. A mix of essays, fiction, and a serialized novella called Jazzwood. The name was a nod to the way I write\u2014always parenthetical, always digressing, always neon.",
    url: "https://jakebouma.substack.com/",
    archiveUrl: "https://jakebouma.substack.com/",
  },
};

export function getSource(sourceKey: string): Source | undefined {
  return sources[sourceKey];
}

export function getSourceBySlug(slug: string): (Source & { key: string }) | undefined {
  const entry = Object.entries(sources).find(([, s]) => s.slug === slug);
  if (!entry) return undefined;
  return { ...entry[1], key: entry[0] };
}

export function getAllSources(): (Source & { key: string })[] {
  return Object.entries(sources).map(([key, s]) => ({ ...s, key }));
}

export default sources;
