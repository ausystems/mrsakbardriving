// Splits the text of any element marked data-letters (optionally data-letters="12" to continue the
// count from an earlier line) into word and letter spans for the letter-by-letter entrance.
// Headings keep their full text as an accessible name; the letter spans are hidden from screen readers.
const plain = (s) => s.replace(/&amp;/g, '&').replace(/&rsquo;/g, '’').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

export function splitLetters(html) {
  return html.replace(/<(h[1-6]|span|p)(\s[^>]*?)\sdata-letters(?:="(\d*)")?([^>]*)>([^<]+)<\/\1>/g, (_, tag, before, start, after, text) => {
    let i = Number(start) || 0;
    const words = text.trim().split(/\s+/).map((word) =>
      `<span class="w">${word.match(/&[#\w]+;|./gu).map((ch) => `<span class="c" style="--i:${i++}">${ch}</span>`).join('')}</span>`);
    const label = /^h[1-6]$/.test(tag) ? ` aria-label="${plain(text).replace(/"/g, '&quot;')}"` : '';
    return `<${tag}${before}${after} data-lettered${label}><span class="letters" aria-hidden="true">${words.join(' ')}</span></${tag}>`;
  });
}
