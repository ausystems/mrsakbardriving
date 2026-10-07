// Small building blocks for guide content: paragraphs, lists, tables, practice questions and road signs.
import { plain } from './core.mjs';

export const p = (...paras) => paras.map((x) => `<p>${x}</p>`).join('');
export const ul = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
export const ol = (items) => `<ol>${items.map((i) => `<li>${i}</li>`).join('')}</ol>`;
export const h3 = (text) => `<h3>${text}</h3>`;
export const lessonsChips = (...links) => links.map(([href, label]) => ({ href, label }));

// The first cell of each row is the row's header. Wide tables scroll sideways on small phones,
// so the wrapper is a labelled, keyboard-focusable section.
export function table({ caption, head, rows }) {
  const label = plain(caption).replace(/"/g, '&quot;');
  return `<section class="table-wrap" aria-label="${label}" tabindex="0" data-reveal><table><caption>${caption}</caption>` +
    `<thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>` +
    `<tbody>${rows.map((r) => `<tr><th scope="row">${r[0]}</th>${r.slice(1).map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></section>`;
}

// Practice questions: the question and options are always visible; the answer sits behind a toggle.
export function quiz(items) {
  return `<ol class="quiz">${items.map((it) => {
    if (it.answer < 0 || it.answer >= it.options.length) throw new Error(`Bad answer index: ${it.q}`);
    const sign = it.svg ? `<svg class="rsign rsign--quiz" viewBox="0 0 100 100" role="img" aria-label="${it.alt}" focusable="false">${it.svg}</svg>` : '';
    return `<li data-reveal><p class="quiz-ask">${it.q}</p>${sign}<ol class="quiz-opts">${it.options.map((o) => `<li>${o}</li>`).join('')}</ol>` +
      `<details class="quiz-a"><summary>Show the answer</summary><p><strong>${'ABCD'[it.answer]}. ${it.options[it.answer]}${/[.!?]$/.test(it.options[it.answer]) ? '' : '.'}</strong> ${it.why}</p></details></li>`;
  }).join('')}</ol>`;
}

// Road sign gallery: drawn signs with a name and a plain-language meaning.
export function rsigns(items) {
  return `<ul class="rsigns">${items.map((s) => `<li data-reveal><figure><svg class="rsign" viewBox="0 0 100 100" aria-hidden="true" focusable="false">${s.svg}</svg><figcaption><strong>${s.name}</strong>${s.text}</figcaption></figure></li>`).join('')}</ul>`;
}
