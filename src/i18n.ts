export type Lang = 'en' | 'ja';

export const t = {
  en: {
    nav: {
      overview: 'overview',
      writing: 'writing',
    },
    education: 'Education',
    links: 'Links',
    skills: 'Tech Skills',
    publications: 'Publications',
    projects: 'Personal Projects',
    work: 'Work Experience',
    all: 'all →',
    back: '← back',
    writingTitle: 'Writing',
    writingIntro: 'Technical articles and paper explainers, mostly published on',
    experienceTitle: 'Work Experience',
    experienceIntro: 'Internships and engineering projects, sorted by recency.',
    source: 'source',
    skillLabels: {
      Languages: 'Languages',
      Frameworks: 'Frameworks',
      Cloud: 'Cloud',
      Tools: 'Tools',
      Spoken: 'Spoken',
    },
    spokenValue: 'Japanese (Native) · English (TOEFL iBT 84)',
    universities: [
      {
        name: 'The University of Tokyo',
        degree: 'M.Eng. in Precision Engineering',
        period: 'Apr. 2026 – Mar. 2028',
      },
      {
        name: 'The University of Tokyo',
        degree: 'B.Eng. in Precision Engineering',
        period: 'Apr. 2022 – Mar. 2026',
      },
    ],
    hero: {
      title: 'Yuto Mitomi — Software Engineer',
      cmds: ['whoami', 'cat about.txt'],
    },
    bio: [
      "I'm drawn to products that improve how people work, and to products that can become infrastructure for society. If people can spend their time on meaningful, interesting work and have their individual capabilities empowered, I think more of us will actually enjoy working.",
      "At the same time, I'm fascinated by how technology has historically rewritten how society itself works — payment infrastructure, Web3, generative AI — and I want to keep working on the side that treats technology not as a mere tool but as a force that reshapes society.",
    ],
    resumeLabel: 'Resume',
    langSwitchTo: '日本語',
  },
  ja: {
    nav: {
      overview: '概要',
      writing: '記事',
    },
    education: 'Education',
    links: 'Links',
    skills: 'Tech Skills',
    publications: 'Publications',
    projects: 'Personal Projects',
    work: 'Work Experience',
    all: 'すべて見る →',
    back: '← 戻る',
    writingTitle: 'Writing',
    writingIntro: '主に',
    experienceTitle: 'Work Experience',
    experienceIntro: 'これまでに参画したインターン・プロジェクト。',
    source: 'ソース',
    skillLabels: {
      Languages: 'Languages',
      Frameworks: 'Frameworks',
      Cloud: 'Cloud',
      Tools: 'Tools',
      Spoken: 'Spoken',
    },
    spokenValue: '日本語（母語）・英語（TOEFL iBT 84）',
    universities: [
      {
        name: '東京大学',
        degree: '工学系研究科 精密工学専攻 修士課程',
        period: '2026年4月 – 2028年3月（予定）',
      },
      {
        name: '東京大学',
        degree: '工学部 精密工学科',
        period: '2022年4月 – 2026年3月',
      },
    ],
    hero: {
      title: '三富 佑人 — Software Engineer',
      cmds: ['whoami', 'cat about.txt'],
    },
    bio: [
      '人々のWork Experienceを向上させるプロダクト、社会のインフラとなりうるプロダクトが好きです。本質的な仕事・面白い仕事に時間を使えるようにし、個人の能力をエンパワーメントすることで、働くことを楽しいと感じる人が増えると良いなと思っています。',
      '同時に、決済インフラ・Web3・生成AIのように、技術が社会のあり方そのものを書き換えてきた歴史に強い興味があり、技術を「手段」ではなく「社会を再構成する力」として扱える側に立ち続けたいと考えています。',
    ],
    resumeLabel: 'レジュメ',
    langSwitchTo: 'EN',
  },
} as const;

/** Build the alternate-locale path for the current pathname. */
export function altLangPath(pathname: string, currentLang: Lang): string {
  const clean = pathname.replace(/\/$/, '') || '/';
  if (currentLang === 'en') {
    return clean === '/' ? '/ja/' : `/ja${clean}/`;
  }
  // currentLang === 'ja'
  if (clean === '/ja') return '/';
  return clean.replace(/^\/ja/, '') + '/';
}

export function navHref(lang: Lang, key: 'overview' | 'writing'): string {
  const base = lang === 'ja' ? '/ja' : '';
  if (key === 'overview') return `${base}/`;
  return `${base}/writing/`;
}
