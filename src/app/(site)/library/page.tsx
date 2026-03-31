import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library",
};

interface Book {
  title: string;
  author: string;
  year?: string;
  note?: string;
  category: string;
}

const books: Book[] = [
  {
    title: "The Orphan Master\u2019s Son",
    author: "Adam Johnson",
    year: "2013",
    note: "The early and distant lead for 2013\u2019s Favorite Fiction Book. A masterwork about North Korea, identity, and love.",
    category: "Fiction",
  },
  {
    title: "The Idolatry of God",
    author: "Peter Rollins",
    note: "A radical rethinking of faith\u2014not freedom to pursue satisfaction, but freedom from the pursuit.",
    category: "Theology",
  },
  {
    title: "Cancer & Theology",
    author: "Edited by Jake Bouma & Erik Ullestad",
    year: "2014",
    note: "Sixteen essays on the difficult questions of faith raised by illness and death.",
    category: "Theology",
  },
];

export default function Library() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-20">
      <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink-faint mb-6">
        Library
      </p>
      <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-ink mb-4">
        Books that left a mark
      </h1>
      <p className="text-ink-muted mb-4 max-w-xl leading-relaxed">
        I&rsquo;m gradually rebuilding a list that goes back to at least 2009.
      </p>
      <p className="text-sm text-ink-faint mb-14">
        See also:{" "}
        <a
          href="https://www.goodreads.com/author/show/7417967.Jake_Bouma"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-ink-muted"
        >
          Goodreads
        </a>
      </p>

      <div className="space-y-0">
        {books.map((book, i) => (
          <div key={i} className="py-5 border-b border-rule-light">
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-ink">{book.title}</h3>
              <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-ink-faint">
                {book.category}
              </span>
            </div>
            <p className="text-sm text-ink-muted">{book.author}</p>
            {book.note && (
              <p className="text-sm text-ink-faint mt-2 italic">{book.note}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 py-6 border-t border-rule">
        <p className="text-sm text-ink-muted italic">
          More books coming soon, including annual reading lists and favorites.
        </p>
      </div>
    </div>
  );
}
