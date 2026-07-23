import { getCollection } from 'astro:content';

export interface Publication {
  title: string;
  summary?: string;
  url: string;
  source: 'Zenn' | 'Sansan Builders Box' | string;
  date: string;
  tags: string[];
}

const ZENN_USERNAME = 'techliberty';

interface ZennArticle {
  title: string;
  slug: string;
  published_at: string;
  emoji?: string;
  user: { username: string };
  topics?: { name: string; display_name?: string }[];
}

async function fetchZennArticles(username: string): Promise<Publication[]> {
  try {
    const res = await fetch(
      `https://zenn.dev/api/articles?username=${username}&order=latest&count=96`,
      { headers: { 'User-Agent': 'portfolio-site-build' } }
    );
    if (!res.ok) {
      console.warn(`[publications] Zenn API returned ${res.status}`);
      return [];
    }
    const json: { articles: ZennArticle[] } = await res.json();
    return json.articles.map((a) => ({
      title: a.title,
      url: `https://zenn.dev/${a.user.username}/articles/${a.slug}`,
      source: 'Zenn' as const,
      date: a.published_at?.slice(0, 10) ?? '',
      tags: (a.topics ?? []).map((t) => t.display_name ?? t.name).filter(Boolean),
    }));
  } catch (err) {
    console.warn('[publications] Failed to fetch Zenn articles:', err);
    return [];
  }
}

// --- Manually maintained entries (non-Zenn sources), authored as Markdown ---

async function loadManualEntries(lang: 'en' | 'ja'): Promise<Publication[]> {
  const entries = await getCollection('publications', (e) => e.slug.startsWith(`${lang}/`));
  return entries.map((e) => ({
    title: e.data.title,
    summary: e.body?.trim(),
    url: e.data.url,
    source: e.data.source,
    date: e.data.date,
    tags: e.data.tags,
  }));
}

// --- Compose -----------------------------------------------------------

const zennArticles = await fetchZennArticles(ZENN_USERNAME);
const manualEn = await loadManualEntries('en');
const manualJa = await loadManualEntries('ja');

function sortByDateDesc(list: Publication[]): Publication[] {
  return [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const publications: Record<'en' | 'ja', Publication[]> = {
  en: sortByDateDesc([...zennArticles, ...manualEn]),
  ja: sortByDateDesc([...zennArticles, ...manualJa]),
};
