// Edit this list to add new posts. Each post links to its own HTML file.
const POSTS = [
  {
    title: "Keyword Research for Beginners: A Free Step-by-Step Guide",
    slug: "posts/keyword-research-for-beginners.html",
    category: "Marketing",
    emoji: "🔎",
    color: "linear-gradient(135deg,#e0e7ff,#c7d2fe)",
    date: "2026-10-23",
    read: "3 min read",
    excerpt: "Learn how to find blog keywords people actually search for, judge search intent and pick low-competition topics using free tools."
  },
  {
    title: "On-Page SEO Checklist: 15 Things to Check Before You Publish",
    slug: "posts/on-page-seo-checklist.html",
    category: "Marketing",
    emoji: "✅",
    color: "linear-gradient(135deg,#dcfce7,#bbf7d0)",
    date: "2026-10-23",
    read: "3 min read",
    excerpt: "A practical on-page SEO checklist covering titles, headings, URLs, images, internal links and page speed to review before every post goes live."
  },
  {
    title: "How to Write SEO Titles and Meta Descriptions That Get Clicks",
    slug: "posts/seo-titles-and-meta-descriptions.html",
    category: "Writing",
    emoji: "🏷️",
    color: "linear-gradient(135deg,#fce7f3,#fbcfe8)",
    date: "2026-10-23",
    read: "3 min read",
    excerpt: "Write better title tags and meta descriptions with simple formulas, length guidelines and real examples that help your blog posts earn more clicks."
  },
  {
    title: "How to Get Backlinks to a New Website Without Spending Money",
    slug: "posts/get-backlinks-to-a-new-website.html",
    category: "Marketing",
    emoji: "🔗",
    color: "linear-gradient(135deg,#ffedd5,#fed7aa)",
    date: "2026-10-23",
    read: "3 min read",
    excerpt: "Seven ethical ways to earn backlinks to a new blog: guest posts, original data, helpful resources, directories, outreach and more, with no paid links."
  },
  {
    title: "How to Make Money Blogging: 7 Realistic Ways to Earn From Your Blog",
    slug: "posts/how-to-make-money-blogging.html",
    category: "Business",
    emoji: "💰",
    color: "linear-gradient(135deg,#fef9c3,#fde68a)",
    date: "2026-10-23",
    read: "3 min read",
    excerpt: "Discover seven realistic ways to earn money from a blog, including affiliate links, ads, digital products and services, plus what to do first."
  },
  {
    title: "How to Start a Blog That People Actually Read",
    slug: "posts/start-a-blog.html",
    category: "Writing",
    emoji: "✍️",
    color: "linear-gradient(135deg,#dbeafe,#bfdbfe)",
    date: "2026-10-20",
    read: "5 min read",
    excerpt: "Pick a niche, write for one reader, and publish on a schedule you can keep. A simple playbook for your first 90 days."
  },
  {
    title: "SEO Basics: Rank Higher Without Tricks",
    slug: "posts/seo-basics.html",
    category: "Marketing",
    emoji: "🔍",
    color: "linear-gradient(135deg,#dcfce7,#bbf7d0)",
    date: "2026-10-14",
    read: "6 min read",
    excerpt: "Search intent, clear titles, fast pages and useful content. The few things that matter most for organic traffic."
  },
  {
    title: "Build and Host a Free Website on GitHub Pages",
    slug: "posts/github-pages-guide.html",
    category: "Tech",
    emoji: "🚀",
    color: "linear-gradient(135deg,#fef3c7,#fde68a)",
    date: "2026-10-08",
    read: "4 min read",
    excerpt: "From an empty repository to a live site at username.github.io in about ten minutes, at no cost."
  }
];

const $ = (s, el = document) => el.querySelector(s);
const fmt = d => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
const prefix = document.body.dataset.root || "";

// Theme
(function () {
  const saved = localStorage.getItem("theme");
  const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = dark ? "dark" : "light";
})();
const themeBtn = $("#themeBtn");
if (themeBtn) {
  const sync = () => themeBtn.textContent = document.documentElement.dataset.theme === "dark" ? "☀️" : "🌙";
  sync();
  themeBtn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    sync();
  });
}

// Mobile menu
const menuBtn = $("#menuBtn"), links = $("#navLinks");
if (menuBtn) menuBtn.addEventListener("click", () => links.classList.toggle("open"));

// Post grid with search + category filter
const grid = $("#grid");
if (grid) {
  let cat = "All", q = "";
  const cats = ["All", ...new Set(POSTS.map(p => p.category))];
  const chips = $("#chips");
  chips.innerHTML = cats.map(c => `<button class="chip ${c === "All" ? "active" : ""}" data-c="${c}">${c}</button>`).join("");
  const render = () => {
    const list = POSTS.filter(p =>
      (cat === "All" || p.category === cat) &&
      (p.title + p.excerpt + p.category).toLowerCase().includes(q));
    grid.innerHTML = list.length ? list.map(p => `
      <article class="card">
        <div class="card-img" style="background:${p.color}">${p.emoji}</div>
        <div class="card-body">
          <div class="tag">${p.category}</div>
          <h3><a href="${prefix}${p.slug}">${p.title}</a></h3>
          <p>${p.excerpt}</p>
          <div class="meta">${fmt(p.date)} · ${p.read}</div>
        </div>
      </article>`).join("") : `<p class="empty">No posts match your search.</p>`;
  };
  chips.addEventListener("click", e => {
    if (!e.target.dataset.c) return;
    cat = e.target.dataset.c;
    chips.querySelectorAll(".chip").forEach(b => b.classList.toggle("active", b === e.target));
    render();
  });
  $("#search").addEventListener("input", e => { q = e.target.value.toLowerCase().trim(); render(); });
  render();
}

// Reading progress bar on articles
const bar = $("#progress");
if (bar) addEventListener("scroll", () => {
  const h = document.documentElement;
  bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
});

// Newsletter demo handler (replace with a real service such as Buttondown or Formspree)
const form = $("#newsletter");
if (form) form.addEventListener("submit", e => {
  e.preventDefault();
  form.innerHTML = "<p>Thanks for subscribing! 🎉</p>";
});

// Footer year
const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
