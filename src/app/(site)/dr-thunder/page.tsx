"use client";

import { useState } from "react";
import Link from "next/link";

type Tab = "home" | "music" | "pictures";

const songs = {
  new: [
    { title: "Confession 2004", size: "4.4mb" },
    { title: "English Major in England (Leaving)", size: "3.9mb" },
    { title: "Jetlag", size: "2.8mb" },
    { title: "The Song About Anything", size: "2.9mb" },
  ],
  standards: [
    { title: "The Cheeze-It Song", size: "2.6mb" },
    { title: "DTGS 4 America (Give Us the Country)", size: "2.4mb" },
    { title: "Sara Lee (Don't Leave Me)", size: "2.3mb" },
    { title: "Backup Vocalists (This One's 4 U)", size: "4.7mb" },
    { title: "Paideia (2 Many Deadlines)", size: "3.2mb" },
    { title: "Texas Jack", size: "2.3mb" },
    { title: "Hotornot.com (3)", size: "3.8mb" },
    { title: "R-h-o-n-d-a", size: "3.7mb" },
    { title: "Pirate Joe Meets Texas Jack", size: "5.0mb" },
    { title: "Shawn (We Need U in the Band)", size: "2.5mb" },
    { title: "Sophomore Blues in E", size: "4.7mb" },
    { title: "Serious", size: "4.4mb" },
    { title: "Illegitimate Goat Child", size: "6.0mb" },
    { title: "Love Lard", size: "3.9mb" },
    { title: "Smooth Criminal", size: "4.1mb" },
    { title: "The Ballad of Yo-Yo Jones", size: "3.9mb" },
    { title: "Yellow & Blue Make Green", size: "4.6mb" },
  ],
};

const photos = [
  {
    thumb: "/dr-thunder/mp3com.jpg",
    full: "/dr-thunder/main-big.jpg",
    caption: "Yes. We are in the shower.",
  },
  {
    thumb: "/dr-thunder/live1-small.jpg",
    full: "/dr-thunder/live1-big.jpg",
    caption:
      "From left: Brad White (guest appearance), Shawn, Jeff, Jake",
  },
  {
    thumb: "/dr-thunder/handwash-small.jpg",
    full: "/dr-thunder/handwash-big.jpg",
    caption: "The sodas washing their respective hands.",
  },
];

function songToFilename(title: string) {
  return `Dr. Thunder & the Generic Sodas - ${title}.mp3`;
}

function Arrow() {
  return (
    <span
      className="inline-block w-[5px] h-[5px] bg-[#CCFF00] mr-1.5"
      style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
    />
  );
}

export default function DrThunder() {
  const [tab, setTab] = useState<Tab>("home");
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      {/* Override the site's cream background */}
      <style>{`
        body { background-color: #C0C0C0 !important; }
        .dt-link { color: #fff; text-decoration: none; }
        .dt-link:hover { color: #CCFF00; }
        .dt-link-dark { color: #333; text-decoration: none; }
        .dt-link-dark:hover { color: #888; }
      `}</style>

      <div className="max-w-[770px] mx-auto font-[Verdana,sans-serif] text-xs text-white">
        {/* Header */}
        <div className="bg-[#800000]">
          <div className="pt-3 pb-1 px-3">
            <span
              className="text-[#F1F1C2] font-[Trebuchet_MS,sans-serif]"
              style={{ fontSize: "15pt" }}
            >
              Dr. Thunder &amp; the Generic Sodas
            </span>
          </div>
          <div className="px-5 pb-1">
            <span className="text-[#F1F1C2] font-[Trebuchet_MS,sans-serif] text-xs">
              &quot;that&apos;s one hot grandma.&quot;
            </span>
          </div>
          <div className="text-right pr-3 pb-1">
            <span className="text-[#F1F1C2] font-[Trebuchet_MS,sans-serif] text-[10px] font-bold">
              www.drthunderonline.tk
            </span>
          </div>
        </div>

        {/* Three-column layout */}
        <div className="flex min-h-[460px]">
          {/* Left nav */}
          <div
            className="w-[150px] shrink-0 bg-[#666] p-4 font-[Trebuchet_MS,sans-serif]"
            style={{
              backgroundImage: "linear-gradient(135deg, #555 0%, #777 100%)",
            }}
          >
            <div className="text-[10px] font-bold text-[#ccc] uppercase tracking-wider mb-3">
              Navigation
            </div>
            <nav className="space-y-1.5 text-[13px]">
              {(["home", "music", "pictures"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`block w-full text-left transition-colors ${
                    tab === t ? "text-[#CCFF00]" : "text-white hover:text-[#CCFF00]"
                  }`}
                >
                  <Arrow />
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </nav>

            {/* News section */}
            <div className="mt-8 font-[Trebuchet_MS,sans-serif]">
              <div className="underline text-white text-sm mb-1">News</div>
              <div className="text-[9pt] text-[#333] leading-snug">
                <span className="text-[#333]">9/3/04: </span>
                Dr. Thunder (Jeff) is leaving for England next week, so we
                recorded the last 4 songs for an <em>entire year</em>. Eat them
                up. It&apos;ll be a while until he returns.
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 bg-white text-black p-6 font-[Trebuchet_MS,sans-serif]">
            {tab === "home" && <HomeContent />}
            {tab === "music" && <MusicContent />}
            {tab === "pictures" && (
              <PicturesContent onOpen={setLightbox} />
            )}
          </div>

          {/* Right sidebar */}
          <div
            className="w-[150px] shrink-0 bg-[#666] p-4 font-[Trebuchet_MS,sans-serif]"
            style={{
              backgroundImage: "linear-gradient(135deg, #777 0%, #555 100%)",
            }}
          >
            <div className="text-[10px] font-bold text-[#ccc] uppercase tracking-wider mb-3">
              Links
            </div>
            <div className="text-sm">
              <Arrow />
              <a
                href="https://web.archive.org/web/20050414/http://www.lcundeclared.tk/"
                target="_blank"
                rel="noopener noreferrer"
                className="dt-link"
              >
                Undeclared
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#800000] text-center py-3 px-4">
          <div className="text-[10px] text-[#F1F1C2] font-[Trebuchet_MS,sans-serif] font-bold">
            Website &copy; 2004, Jadabo Web Design.
          </div>
          <div className="text-[10px] text-[#F1F1C2] font-[Trebuchet_MS,sans-serif] font-bold mt-0.5">
            Dr. Thunder &amp; the Generic Sodas is in no way affiliated with the
            Dr. Thunder&trade; beverage.
          </div>
        </div>

        {/* Back to main site */}
        <div className="text-center py-4">
          <Link
            href="/"
            className="font-sans text-xs text-[#666] hover:text-[#333] transition-colors"
          >
            &larr; Back to jakebouma.com
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  );
}

function HomeContent() {
  return (
    <div className="text-center">
      <h2 className="text-lg mb-4">Welcome!</h2>
      <div className="mb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/dr-thunder/mp3com.jpg"
          alt="Dr. Thunder & the Generic Sodas"
          width={270}
          height={203}
          className="mx-auto border border-[#ccc]"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
      <div className="text-left space-y-3 text-sm">
        <p>Welcome to the homepage of the best band. Ever.</p>
        <p>Dr. Thunder &amp; the Generic Sodas.</p>
        <p>
          You&apos;re probably here for one reason and one reason only. To hear
          our songs. Click on the &quot;Music&quot; link to go to the mp3
          download page. You can see some pictures of the band on the
          &quot;Pictures&quot; page, and you can even post your comments about us
          on our shiny new message board!
        </p>
        <p>
          No, thank <em>you</em>.
        </p>
      </div>
    </div>
  );
}

function MusicContent() {
  return (
    <div>
      <h2 className="text-lg mb-4 text-center">Music</h2>
      <p className="text-sm mb-6">
        Here they are, folks. All of the songs which we aren&apos;t too ashamed
        to post online. They are all 100% free in mp3 format. Download them.
        Burn CDs of them. Spread the Dr. Thunder love.
      </p>

      {/* New songs */}
      <div className="mb-6">
        <h3 className="text-sm font-bold mb-2">
          <span className="text-red-600 animate-pulse">*NEW*</span> 9/3/04
        </h3>
        <table className="w-full text-sm">
          <tbody>
            {songs.new.map((song, i) => (
              <tr
                key={song.title}
                className={i % 2 === 0 ? "bg-[#f5f5f5]" : ""}
              >
                <td className="py-1.5 px-2 w-6 text-[#999]">{i + 1}.</td>
                <td className="py-1.5 px-2">
                  <a
                    href={`/dr-thunder/mp3/${songToFilename(song.title)}`}
                    className="dt-link-dark underline"
                  >
                    {song.title}
                  </a>
                </td>
                <td className="py-1.5 px-2 text-right text-[#999] text-xs">
                  {song.size}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Standards */}
      <div className="mb-6">
        <h3 className="text-sm font-bold mb-2">Standards</h3>
        <table className="w-full text-sm">
          <tbody>
            {songs.standards.map((song, i) => (
              <tr
                key={song.title}
                className={i % 2 === 0 ? "bg-[#f5f5f5]" : ""}
              >
                <td className="py-1.5 px-2 w-6 text-[#999]">{i + 1}.</td>
                <td className="py-1.5 px-2">
                  <a
                    href={`/dr-thunder/mp3/${songToFilename(song.title)}`}
                    className="dt-link-dark underline"
                  >
                    {song.title}
                  </a>
                </td>
                <td className="py-1.5 px-2 text-right text-[#999] text-xs">
                  {song.size}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-[#999] italic">
        More to come <s>soon</s> sooner or later.
      </p>
    </div>
  );
}

function PicturesContent({
  onOpen,
}: {
  onOpen: (src: string) => void;
}) {
  return (
    <div>
      <h2 className="text-lg mb-4 text-center">Pictures</h2>
      <p className="text-sm mb-6">Click the pictures to see a larger version.</p>
      <div className="space-y-6">
        {photos.map((photo) => (
          <div key={photo.caption} className="text-center">
            <button onClick={() => onOpen(photo.full)} className="cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.thumb}
                alt={photo.caption}
                width={270}
                height={203}
                className="mx-auto border border-[#ccc] hover:border-[#800000] transition-colors"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = 'none';
                  el.parentElement!.insertAdjacentHTML('afterbegin',
                    '<div class="w-[270px] h-[203px] bg-[#ddd] flex items-center justify-center text-[#999] text-xs mx-auto border border-[#ccc]">Image coming soon</div>'
                  );
                }}
              />
            </button>
            <p className="text-xs text-[#666] mt-2 italic">{photo.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
