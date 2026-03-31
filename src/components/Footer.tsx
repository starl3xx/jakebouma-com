const socials = [
  { label: "Twitter", href: "https://x.com/jakebouma" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jakebouma/" },
  { label: "Medium", href: "https://medium.com/@jakebouma" },
  { label: "Substack", href: "https://jakebouma.substack.com/" },
  { label: "Instagram", href: "https://www.instagram.com/jakebouma/" },
  { label: "Flickr", href: "https://www.flickr.com/photos/jakebouma/" },
  { label: "Spotify", href: "https://open.spotify.com/artist/2wrAdhMnkG58bbEoTvigGZ" },
];

export default function Footer() {
  return (
    <footer className="border-t border-rule-light mt-20">
      <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="font-sans text-xs text-ink-faint tracking-wide">
          Est. 2005 &middot; Jake Bouma &middot; Waukee, Iowa
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-ink-faint hover:text-accent transition-colors tracking-wide"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
