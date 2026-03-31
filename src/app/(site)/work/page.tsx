import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
};

interface Role {
  company: string;
  title: string;
  period: string;
  description: string;
  href?: string;
}

const roles: Role[] = [
  {
    company: "Reserve Protocol",
    title: "Brand & Content Lead",
    period: "Current",
    description:
      "Leading brand voice and content strategy for Reserve, a permissionless platform for launching asset-backed currencies on the blockchain.",
    href: "https://reserve.org/",
  },
  {
    company: "OKX",
    title: "Senior Copywriter",
    period: "Previous",
    description:
      "Crafted copy and content for one of the world\u2019s largest cryptocurrency exchanges, spanning product launches, campaigns, and educational content.",
    href: "https://www.okx.com/",
  },
  {
    company: "Elbow Co.",
    title: "Co-founder",
    period: "2012\u20132015",
    description:
      "Co-founded a ministry resources venture with Erik Ullestad. Published Cancer & Theology, created the Hypotherables curriculum, and produced a bi-weekly newsletter.",
  },
];

const independentWork = [
  {
    title: "Let\u2019s Have A Word!",
    description: "Designed and built an onchain word game on Ethereum.",
    href: "https://www.letshaveaword.fun/",
  },
  {
    title: "walletlink.social",
    description: "Built a social discovery tool for DeFi users and NFT holders.",
    href: "https://walletlink.social/",
  },
  {
    title: "Let\u2019s Do This Documentary",
    description: "Produced and starred in a feature-length cancer documentary.",
    href: "/lets-do-this",
  },
  {
    title: "Cancer & Theology",
    description: "Edited an anthology of 16 essays on faith and illness.",
    href: "https://www.amazon.com/Cancer-Theology-Tony-Jones/dp/0615946976",
  },
];

export default function Work() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-20">
      <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink-faint mb-6">
        Work
      </p>
      <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-ink mb-4">
        What I do
      </h1>
      <p className="text-ink-muted mb-14 max-w-xl leading-relaxed">
        I write, build, and lead content in the crypto/web3 space. Before that, I
        co-founded a ministry resources company.
      </p>

      {/* Roles */}
      <p className="font-sans text-xs tracking-[0.15em] uppercase text-ink-faint mb-8">
        Roles
      </p>
      <div className="space-y-0 mb-16">
        {roles.map((role, i) => (
          <div key={i} className="py-6 border-b border-rule-light">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-3">
              <div>
                {role.href ? (
                  <a
                    href={role.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-ink link-underline"
                  >
                    {role.company}
                  </a>
                ) : (
                  <span className="text-lg text-ink">{role.company}</span>
                )}
                <span className="text-ink-faint mx-2">&middot;</span>
                <span className="text-ink-muted">{role.title}</span>
              </div>
              <span className="font-sans text-xs text-ink-faint tracking-wide">
                {role.period}
              </span>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">
              {role.description}
            </p>
          </div>
        ))}
      </div>

      {/* Independent Work */}
      <p className="font-sans text-xs tracking-[0.15em] uppercase text-ink-faint mb-8">
        Independent Projects
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {independentWork.map((item, i) => (
          <a
            key={i}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group border border-rule rounded px-5 py-4 hover:border-ink-faint transition-colors"
          >
            <h3 className="font-sans text-sm font-medium text-ink group-hover:text-accent transition-colors mb-1">
              {item.title}
            </h3>
            <p className="text-sm text-ink-muted">{item.description}</p>
          </a>
        ))}
      </div>

      {/* LinkedIn CTA */}
      <div className="mt-16 py-6 border-t border-rule-light">
        <p className="text-sm text-ink-muted">
          Full professional history on{" "}
          <a
            href="https://www.linkedin.com/in/jakebouma/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-ink-light"
          >
            LinkedIn
          </a>.
        </p>
      </div>
    </div>
  );
}
