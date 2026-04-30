export interface Project {
  name: string;
  description: string;
  url: string;
  language: string;
  tags: string[];
}

export const projects: Record<'en' | 'ja', Project[]> = {
  en: [
    {
      name: 'minify',
      description:
        'A compact workflow builder that composes PDF processing, text formatting, and LLM inference as DAG nodes. React-based node editor + async FastAPI backend, with unified switching across OpenAI / Anthropic / Gemini.',
      url: 'https://github.com/Yuto729/minify',
      language: 'Python / TypeScript',
      tags: ['LLM', 'FastAPI', 'React', 'DAG'],
    },
    {
      name: 'tidy-sessions.wezterm',
      description:
        'A WezTerm plugin for workspace session management. Save and restore tabs, panes, and working directories across restarts; auto-save, fuzzy selector, and configurable process restoration.',
      url: 'https://github.com/Yuto729/tidy-sessions.wezterm',
      language: 'Lua',
      tags: ['WezTerm', 'Plugin', 'CLI'],
    },
    {
      name: 'my-shell',
      description:
        'A minimal Unix shell written in C, built to learn OS fundamentals hands-on — fork / exec / wait, file descriptors, I/O redirection, pipes, and signal handling.',
      url: 'https://github.com/Yuto729/my-shell',
      language: 'C',
      tags: ['OS', 'Systems', 'CS Basics'],
    },
  ],
  ja: [
    {
      name: 'minify',
      description:
        'PDF処理・テキスト整形・LLM推論をノードとして組み合わせるワークフロービルダー。Reactベースのノードエディタで DAG を構築し、FastAPI バックエンドで非同期実行。OpenAI / Anthropic / Gemini を統一インターフェースで切替可能。',
      url: 'https://github.com/Yuto729/minify',
      language: 'Python / TypeScript',
      tags: ['LLM', 'FastAPI', 'React', 'DAG'],
    },
    {
      name: 'tidy-sessions.wezterm',
      description:
        'WezTerm のワークスペース・セッション管理プラグイン。タブ・ペイン・作業ディレクトリの保存と復元、自動保存、ファジー検索によるセレクタ、プロセス復元の設定をサポート。',
      url: 'https://github.com/Yuto729/tidy-sessions.wezterm',
      language: 'Lua',
      tags: ['WezTerm', 'プラグイン', 'CLI'],
    },
    {
      name: 'my-shell',
      description:
        'OS の基礎概念を学ぶために手を動かして書いた最小限の Unix シェル。fork/exec/wait、ファイルディスクリプタ、I/Oリダイレクション、パイプ、シグナル処理を C で実装。',
      url: 'https://github.com/Yuto729/my-shell',
      language: 'C',
      tags: ['OS', 'システム', 'CS基礎'],
    },
  ],
};
