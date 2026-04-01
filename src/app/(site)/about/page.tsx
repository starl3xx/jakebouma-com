import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-20">
      <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink-faint mb-6">
        About
      </p>
      <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-ink mb-16">
        Jake Bouma
      </h1>

      <div className="grid md:grid-cols-3 gap-12 md:gap-16">
        {/* Headshot */}
        <div className="md:col-span-1">
          <div className="aspect-[3/4] overflow-hidden rounded">
            <img
              src="/images/headshot.png"
              alt="Jake Bouma"
              className="w-full h-full object-cover grayscale-[15%]"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-2 space-y-6 text-ink-light leading-[1.85]">
          <p className="text-lg text-ink leading-[1.8]">
            I&rsquo;m a writer, builder, and storyteller based in Waukee, Iowa.
          </p>

          <p>
            I&rsquo;ve been publishing things on the internet since 2005, when I launched the
            first version of JakeBouma.com. Over the years that blog grew to 800+
            posts covering everything from theology and culture to technology and
            the deeply self-indulgent. The site eventually went offline, but the
            impulse to create never stopped.
          </p>

          <p>
            In 2012, I was diagnosed with Hodgkin lymphoma at age 28. I documented
            my entire journey through treatment and recovery in a series of vlogs
            that thousands followed along with. That story eventually became{" "}
            <em>Let&rsquo;s Do This: Facing Hodgkin Lymphoma</em>, a feature-length
            documentary directed by Nathan Matta. I&rsquo;ve been cancer-free for over
            a decade now.
          </p>

          <p>
            The cancer experience also led to{" "}
            <em>Cancer &amp; Theology</em>, an anthology I edited featuring essays
            from thinkers like Brian McLaren, Tony Jones, Kester Brewin, and others,
            published by Elbow Co. in 2014. Elbow Co. was a venture I co-founded
            with Erik Ullestad to create ministry resources, including{" "}
            <em>Hypotherables</em>, a youth ministry curriculum built around
            original stories and hypothetical questions.
          </p>

          <p>
            More recently, I&rsquo;ve been working in the crypto/web3 space as a writer
            and builder. I&rsquo;ve served as Brand &amp; Content Lead at{" "}
            <a href="https://reserve.org/" target="_blank" rel="noopener noreferrer" className="link-underline text-ink">Reserve Protocol</a>{" "}
            and as Senior Copywriter at OKX. I&rsquo;ve also built things like{" "}
            <a href="https://www.letshaveaword.fun/" target="_blank" rel="noopener noreferrer" className="link-underline text-ink">Let&rsquo;s Have A Word!</a>{" "}
            and{" "}
            <a href="https://walletlink.social/" target="_blank" rel="noopener noreferrer" className="link-underline text-ink">walletlink.social</a>.
          </p>

          <p>
            I write fiction and creative nonfiction on my Substack,{" "}
            <a href="https://jakebouma.substack.com/" target="_blank" rel="noopener noreferrer" className="link-underline text-ink">Neon Parentheses</a>,
            and I&rsquo;ve published a series of modern parables on Medium. I&rsquo;m a
            husband, a father, and someone who still wants to be a writer when he
            grows up.
          </p>

          <hr className="border-rule my-8" />

          <p className="font-sans text-xs tracking-[0.15em] uppercase text-ink-faint mb-3">
            Get in touch
          </p>
          <p className="text-sm text-ink-muted">
            The best way to reach me is on{" "}
            <a href="https://x.com/jakebouma" target="_blank" rel="noopener noreferrer" className="link-underline text-ink-light">Twitter/X</a>{" "}
            or via{" "}
            <a href="mailto:jakebouma@gmail.com" className="link-underline text-ink-light">email</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
