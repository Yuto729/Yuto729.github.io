// ビルド後の各 HTML について、埋め込まれた <style> からそのページで使われないルールを削る。
// ページ内のインライン <script>（ターミナルが動的に付けるクラス）も走査対象に含まれる。
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { PurgeCSS } from 'purgecss';

const DIST = new URL('../dist/', import.meta.url).pathname;
const STYLE_RE = /<style>([\s\S]*?)<\/style>/g;

// Tailwind の `text-fg/85` や `md:py-20`、`grid-cols-[16rem_minmax(0,1fr)]` を1トークンとして拾う。
// `<hr/>` の `hr/` のように `/` で区切られた部分も別トークンとして加える。
const extractor = (content) => {
  const tokens = content.match(/[\w\-/:.%[\](),]+(?<!:)/g) || [];
  return [...tokens, ...tokens.flatMap((t) => t.split('/'))];
};

async function* htmlFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

for await (const file of htmlFiles(DIST)) {
  const html = await readFile(file, 'utf8');
  const styles = [...html.matchAll(STYLE_RE)].map((m) => m[1]);
  if (styles.length === 0) continue;
  const content = html.replace(STYLE_RE, '');
  const [result] = await new PurgeCSS().purge({
    content: [{ raw: content, extension: 'html' }],
    css: [{ raw: styles.join('\n') }],
    defaultExtractor: extractor,
    keyframes: true,
    variables: true,
  });
  const out = content.replace('</head>', `<style>${result.css}</style></head>`);
  await writeFile(file, out);
  console.log(`${file.replace(DIST, '')}: ${html.length} -> ${out.length} bytes`);
}
