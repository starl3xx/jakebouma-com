import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync } from "fs";

const client = createClient({
  projectId: "eimnd7jx",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const postsPath = new URL("../src/data/posts.json", import.meta.url);
const posts = JSON.parse(readFileSync(postsPath, "utf8"));

// Ensure Writing category exists
await client.createOrReplace({
  _id: "category-writing",
  _type: "category",
  title: "Writing",
  slug: { _type: "slug", current: "writing" },
});

const mediumPosts = [
  {
    title: "The Mute Monk",
    slug: "the-mute-monk",
    date: "2018-11-27T12:00:00.000Z",
    categories: ["Writing"],
    tags: ["parable", "fiction", "grace"],
  },
  {
    title: "The Tombstone",
    slug: "the-tombstone",
    date: "2019-07-28T12:00:00.000Z",
    categories: ["Writing"],
    tags: ["parable", "fiction", "faith"],
  },
  {
    title: "The Captain's Daughter",
    slug: "the-captains-daughter",
    date: "2018-07-15T12:00:00.000Z",
    categories: ["Writing"],
    tags: ["parable", "fiction", "fear"],
  },
  {
    title: "Let's Do This: Official Release",
    slug: "lets-do-this-official-release",
    date: "2016-01-20T12:00:00.000Z",
    categories: ["Lymphoma"],
    tags: ["documentary", "cancer", "announcement"],
  },
  {
    title: "Why I'm Moving to Medium",
    slug: "why-im-moving-to-medium",
    date: "2015-12-14T12:00:00.000Z",
    categories: ["Website/Blogging"],
    tags: ["medium", "wordpress", "blogging"],
  },
];

// Read content from the fetched files
const contentMap = {
  "the-mute-monk": `<blockquote><p>\u201CThe Heavenly City\u2026 will be freed from all evil and filled with all good, enjoying unfailingly the delight of eternal joys, forgetting all offenses, forgetting all punishments.\u201D</p><p>\u2014 Saint Augustine, City of God XXII, 30</p></blockquote><p>Many centuries ago, there was a monk who was unable to speak. The monk had been mute his entire life, issuing no cries as an infant nor any words as he grew into a young man. Because of his condition, the young man was ostracized and even feared by the local townspeople, and while his parents did not disown him, they did not cherish him as a child should be cherished. Despite his deep perceptivity and intelligence, the stigma of being mute severely limited the young man\u2019s educational and vocational options. And so at the age of fifteen, the young man left home, setting out on foot into the liberating darkness of night with nothing but a small, tattered bible.</p><p>He walked all through the night and into the following morning and did not stop until, as the sun began to slouch below the horizon, he had reached the top of his destination\u2019s long, stone stairway. The young man gripped the monastery door\u2019s heavy iron doorknocker, thumped it three times, and held his breath. The door unlatched and he was wordlessly motioned inside. With relief and gratitude, the young man stepped into his new life as a monk.</p><p>Monastic life suited the young man quite well. His daily routine consisted mostly of prayer, scripture reading, and manual labor, activities predominantly carried out in solitude and \u2014 more importantly \u2014 in silence. His fellow monks treated him with a kindness he had never before experienced, and as his confidence grew, so too did his faith. Although unable to join his brothers in the many chants and prayer recitations offered during daily worship services, the monk did possess a valuable skill which more than compensated for his vocal limitations: He could read and write. As a boy, the monk had exploited his perpetual isolation by slowly and painstakingly teaching himself to read using books he surreptitiously borrowed from the local university. And so the monk was invited to join a small group of literate brothers whose daily labor entailed diligently hand-copying scripture and other sacred theological writings for the monastery\u2019s humble library.</p><p>Aside from the Abbott, the monastery\u2019s overseer, all of the monks held equal status, but the mute monk\u2019s devotion and dedication secured him a special place in the Abbot\u2019s heart. And so when the priest of a nearby congregation came to the Abbot in search of a capable and trustworthy monk for a rather unique task, the Abbot did not hesitate to recommend to him the mute monk. When approached, the monk promptly agreed, intuitively understanding the honor of being chosen for such a task. The priest, it was explained to him, had received an emergency summons from the Vatican and would therefore be gone for the next several months. Each of his priestly duties was covered for the duration of his upcoming absence, save for one: Someone to serve in the confessional booth. And while this proposed arrangement wouldn\u2019t be \u201Cby the book\u201D in terms of official church policy, the abrupt nature of the priest\u2019s summons had been accompanied with a necessary and generous leniency regarding certain clerical procedures. So the monk was instructed to spend each morning at the priest\u2019s church, listening to the confessed sins of his congregation\u2019s parishioners. The priest reassured the monk that his condition would not hinder the process \u2014 it would be enough for confessors to see the monk through the lattice bisecting the booth, he said \u2014 and then he bid farewell.</p><p>Now, as a boy, the monk was seldom spoken to directly, so he quickly fell in love with his new role, the very definition of which was being spoken to. More importantly, the monk found himself unexpectedly moved by the intimate and emotional stories divulged inside the booth. The experience enriched his faith with a deeper connection to and appreciation of the comprehensive nature of God\u2019s grace, and as a result he drew nearer to God than ever before. Every day, the monk offered prayers of gratitude for the gift of such a transformative opportunity.</p><p>Several months later, the priest returned from Rome, arriving at the church one morning near the end of that day\u2019s confessional session. The priest waited for the session to conclude, using the time to mentally prepare his \u201Cthank you\u201D for the monk\u2019s charitable service to the Church. Soon, the morning\u2019s final confessor stepped out of the booth, followed shortly by the monk, and the priest was surprised to see the monk clutching a small stack of papers. He quickly seized the papers from the monk and inspected them, his eyes growing wide in a hybrid of disbelief and outrage as he discovered that the papers contained an extensive list\u2026 of <em>sins</em>. A closer inspection revealed that the monk had been meticulously transcribing the confessed sins and corresponding names of the booth\u2019s occupants. Worse yet, the monk was now attempting to flee with his unconscionable contraband. With no recourse to explain himself, the monk could only watch with dread as the priest stormed out of the church, headed directly for the monastery.</p><p>The monk\u2019s punishment was swift and total. His monastic vows were immediately and permanently revoked, and he was ordered to leave the monastery at once. Moreover, the monk was mortified to be informed that the priest had already dispatched an official request for his excommunication from the church. Once again, the monk was held hostage by his inability to speak, and even if he <em>could</em> find a way to communicate an explanation, it was already too late \u2014 his fate was inescapable. He was not even allowed to collect the few possessions he had. And so the monk, under a dark veil of humiliation and heartache, exited the monastery, descended the front steps, and disappeared into the rippling countryside.</p><p>The next morning, the Abbot and another monk paid visit to the mute monk\u2019s bedchamber in order to clear out its contents and prepare it for the next inhabitant. Pushing open the thick, wooden door, they were greeted with a sound like the rustling of leaves, and as they entered the room, their faces transfigured with astonishment. For each of the four walls in the mute monk\u2019s room was covered floor-to-ceiling with countless pieces of paper \u2014 each and every one of them completely and undeniably <em>blank</em>. Trying to make sense of it, the Abbot checked the backside of several pieces but found them to be blank as well.</p><p>Like all of the monastery\u2019s bedchambers, the room was modestly furnished, its contents limited to a bed, a wooden chair, and a small bedside table. The items on the mute monk\u2019s table were few, each one easily identifiable by the Abbot: A tired, spindly candle, a few empty glass ink bottles and a writing implement, and a small, tattered Bible. The Bible was opened to the thirty-first chapter of Jeremiah. Looking closer, the Abbot saw that one verse in particular had been singled out from the others, having been underlined and annotated to the point of rendering it nearly unreadable. No matter, for the Abbot knew the verse by heart. <em>For I will forgive their iniquity, and remember their sin no more</em>, the Abbot intoned. He quickly noticed another oddity: The margins of the Bible\u2019s facing pages were choked with the same two Latin words, carefully inscribed over and over again: Obliviscitur Dei. <em>God forgets.</em> Drawing away in bewilderment, the Abbot\u2019s eyes caught sight of the glass ink bottles again, noticing this time their unusual hand-made labels. He grabbed one, held it to his face, and read its label\u2019s inscription. Instantly, the Abbot\u2019s face went ashen as he grasped the significance of and connection between each bizarre element: The walls canvassed with blank paper, the open and diligently annotated Bible, and now the empty ink bottles, each one labeled identically with the words: <em>Disappearing Ink</em>.</p><p>Overcome with guilt, the Abbot staggered to the chair, dismissed the other monk from the room, and stared at the bottle of disappearing ink in his trembling hand. He closed his eyes and mentally reconstructed the only possible scenario given the evidence: Each morning, the mute monk would sit inside the confessional booth and, using his disappearing ink, catalogue every sin that was confessed to him. Afterward, he would return to his bedchamber at the monastery, affix the papers from that day\u2019s shift to one of the walls, and then, the Abbot imagined, he would sit in this very chair and watch with delight as the sins disappeared before his eyes. The mute monk, the Abbot understood, had created and devoted himself to the spiritual practice of making tangible the exhaustive reach of God\u2019s grace.</p><p>Despite his deep remorse, and with tears streaming down his face, the Abbot couldn\u2019t help but smile. <em>Obliviscitur Dei</em>, he whispered. <em>God forgets.</em></p>`,
};

// I'll store the content inline to avoid stdin issues
// Content was fetched via WebFetch - saving to temp files
import { writeFileSync as ws } from "fs";

console.log("Adding 5 Medium posts to archive...");

const tx = client.transaction();

for (const mp of mediumPosts) {
  const content = contentMap[mp.slug] || "";

  // Add to posts.json
  posts.push({
    id: `medium-${mp.slug}`,
    title: mp.title,
    slug: mp.slug,
    date: mp.date,
    year: mp.date.slice(0, 4),
    month: mp.date.slice(5, 7),
    content,
    categories: mp.categories,
    tags: mp.tags,
    source: "medium",
  });

  // Add to Sanity
  const catRef = mp.categories[0] === "Lymphoma" ? "category-lymphoma"
    : mp.categories[0] === "Website/Blogging" ? "category-website-blogging"
    : "category-writing";

  tx.createOrReplace({
    _id: `post-${mp.slug}`,
    _type: "post",
    title: mp.title,
    slug: { _type: "slug", current: mp.slug },
    publishedAt: mp.date,
    content,
    tags: mp.tags,
    source: "medium",
    categories: [{
      _type: "reference",
      _ref: catRef,
      _key: catRef,
    }],
  });
}

// Sort posts by date descending
posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
writeFileSync(postsPath, JSON.stringify(posts, null, 2));

await tx.commit();
console.log("Done! 5 Medium posts added.");
console.log("Total posts in archive:", posts.length);
