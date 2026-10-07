// Contact page: call, text, scan-to-call on a computer, and the business details (same name and phone
// as everywhere else on the site). She drives to her students, so there is no address to visit.
import { BIZ, AREAS, abs } from './core.mjs';
import { bizRef, icon } from './layout.mjs';
import { pageHero, sec, steps, faq, chips, ctaRow } from './ui.mjs';
import { artContact } from './art.mjs';

export function contactPage() {
  const path = '/contact/';
  const trail = [['Home', '/'], ['Contact', path]];
  const faqs = [
    ['How do I book a driving lesson?', `Call or text ${BIZ.phone}. Mention your licence level, where you live and your road test date if you have one.`],
    ['What if she doesn&rsquo;t answer?', 'She&rsquo;s often in the car with a student and can&rsquo;t pick up. Leave a message with your name and area, or send a text.'],
    ['When are lessons available?', 'Seven days a week, by appointment.'],
    ['Do I need to get to her for lessons?', 'No. She drives to you, so your lesson starts where you are.'],
    ['Which areas does she cover?', 'All of Hamilton, including Mount Hope, Hamilton Mountain, Downtown, East and West Hamilton, Westdale, Ancaster, Dundas, Stoney Creek, Binbrook and Glanbrook, plus Caledonia.'],
  ];
  const main = [
    pageHero({
      trail, script: 'say hi', h1: 'Book a driving lesson',
      lede: 'The quickest way to book is a call or a text. If she&rsquo;s in the car with a student she can&rsquo;t pick up, so leave a message or send a text.',
      art: artContact(),
    }),
    `<section class="psec band band--white" id="ways" data-callbar-end aria-labelledby="ways-title">
  <div class="container">
    <header class="section-head">
      <div class="section-head__title">
        <p class="script" data-reveal>two ways</p>
        <h2 class="section-title" id="ways-title" data-split>Call or text</h2>
      </div>
      <p class="section-head__meta" data-reveal>Same number for both. Lessons are seven days a week, by appointment.</p>
    </header>
    <div class="contact-ways">
      <div class="way way--dark" data-reveal>
        <p class="way-kind">call</p>
        <a class="way-big" href="${BIZ.tel}" data-call="contact-number"><span class="visually-hidden">Call Mrs. Akbar at </span>${BIZ.phone}</a>
        <p>Talk it through. Good if you have questions about your licence, your test or where lessons start.</p>
        <a class="btn btn--amber" href="${BIZ.tel}" data-call="contact-button">${icon('phone')}<span>Call Mrs. Akbar</span></a>
        <div class="way-qr"><!--#include file="src/partials/call-qr.svg"--><p>On a computer? Scan with your phone to call.</p></div>
      </div>
      <div class="way" data-reveal style="--d:90ms">
        <p class="way-kind">text</p>
        <a class="way-big" href="${BIZ.sms}" data-text="contact-number"><span class="visually-hidden">Text Mrs. Akbar at </span>${BIZ.phone}</a>
        <p>Handy if you&rsquo;d rather not call. Say hi, then add your licence level and where you live.</p>
        <a class="btn btn--primary" href="${BIZ.sms}" data-text="contact-button">${icon('chat')}<span>Send a text</span></a>
        <div class="way-qr"><!--#include file="src/partials/msg-qr.svg"--><p>On a computer? Scan with your phone and the text is ready to send.</p></div>
      </div>
    </div>
  </div>
</section>`,
    sec({
      id: 'mention', tone: 'paper', script: 'when you get through', title: 'What to mention',
      body: steps([
        { title: 'Your licence', text: 'G1 or G2, and roughly how much driving you&rsquo;ve done.' },
        { title: 'Where you live', text: 'She drives to you, so she&rsquo;ll need to know where your lesson starts.' },
        { title: 'Your road test date', text: 'If you&rsquo;ve booked one, and at which DriveTest centre.' },
        { title: 'What you want to work on', text: 'Parking, highways, nerves, or everything from the start. All fine.' },
      ]) + ctaRow({ where: 'contact-mention', text: 'Got all that? Call or text her.' }),
    }),
    sec({
      id: 'details', tone: 'white', script: 'the details', title: 'She comes to you',
      body: `<div class="contact-details" data-reveal>
<address class="nap">
<strong>${BIZ.name}</strong>
<span>Driving lessons across Hamilton, Ontario</span>
<span>Lessons start where you are</span>
<span><a href="${BIZ.tel}" data-call="contact-nap">${BIZ.phone}</a></span>
<span>Open 7 days, by appointment</span>
</address>
<p class="contact-links"><a class="link-arrow" href="${BIZ.gbp}" target="_blank" rel="noopener">Google Business Profile${icon('out')}<span class="visually-hidden"> (opens in a new tab)</span></a></p>
</div>
<div class="more-lessons" data-reveal><p class="more-lessons__title">Areas she covers</p>${chips(AREAS.map((a) => ({ href: `/${a.slug}/`, label: a.label })))}</div>`,
    }),
    sec({ id: 'questions', tone: 'paper', script: 'good questions', title: 'Before you call', center: true, body: faq(faqs, 'contact') + ctaRow({ where: 'contact-faq', text: 'Ready when you are.', stars: true }) }),
  ].join('\n');
  return {
    type: 'contact', path, trail, name: 'Contact', h1: 'Book a driving lesson',
    title: 'Contact Mrs. Akbar | Book a Driving Lesson in Hamilton',
    description: 'Call or text 416-457-5778 to book a driving lesson with Mrs. Akbar, a female instructor who comes to you anywhere in Hamilton. Lessons 7 days a week.',
    faqs, main, webPageType: 'ContactPage', ogScript: 'say hi',
    ld: [{
      '@type': 'ContactPoint',
      '@id': `${abs(path)}#contact`,
      telephone: '+1-416-457-5778',
      contactType: 'customer service',
      areaServed: 'CA-ON',
      availableLanguage: 'English',
    }],
  };
}
