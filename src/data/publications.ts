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

// --- Manually maintained entries (non-Zenn sources) -----------------

const sansanEn: Publication[] = [
  {
    title:
      'Redesigning the async fan-out infrastructure for Sansan Bizcard Maker',
    summary:
      'How we replaced a Cloud Tasks-only design with a Pub/Sub × Cloud Tasks BufferTask hybrid to handle 3,000+ card bulk distributions without dead-letter failures.',
    url: 'https://buildersbox.corp-sansan.com/entry/2026/03/31/100000',
    source: 'Sansan Builders Box',
    date: '2026-03-31',
    tags: ['GCP', 'Pub/Sub', 'Cloud Tasks', 'Async'],
  },
];

const sansanJa: Publication[] = [
  {
    title: '名刺メーカーの非同期連携基盤の再設計',
    summary:
      '3,000件規模の一括支給で詰まっていた Cloud Tasks 統一案を、Pub/Sub × Cloud Tasks BufferTask のハイブリッド構成に再設計し、デッドレターと手動リカバリ運用を解消した話。',
    url: 'https://buildersbox.corp-sansan.com/entry/2026/03/31/100000',
    source: 'Sansan Builders Box',
    date: '2026-03-31',
    tags: ['GCP', 'Pub/Sub', 'Cloud Tasks', '非同期処理'],
  },
];

// --- Compose -----------------------------------------------------------

const zennArticles = await fetchZennArticles(ZENN_USERNAME);

function sortByDateDesc(list: Publication[]): Publication[] {
  return [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const publications: Record<'en' | 'ja', Publication[]> = {
  en: sortByDateDesc([...zennArticles, ...sansanEn]),
  ja: sortByDateDesc([...zennArticles, ...sansanJa]),
};
