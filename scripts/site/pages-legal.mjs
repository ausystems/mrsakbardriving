// Privacy Policy and Terms and Conditions. Written to match exactly how this site works (no forms,
// no cookies, no analytics, no third-party scripts) and what the rest of the site says. Business-specific
// details that aren't known here (prices, cancellation terms) are left to what's agreed at booking.
import { BIZ, abs, plain } from './core.mjs';
import { crumbs, toc } from './ui.mjs';
import { signIcon } from './art.mjs';

export const LEGAL_UPDATED = '2026-10-06';
const longDate = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
const p = (...paras) => paras.map((x) => `<p>${x}</p>`).join('');
const ul = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
// The mailing address appears only in the Privacy Policy: privacy law expects the person accountable
// for personal information to have an address for complaints. Lessons never happen there.
const contactBlock = (mailing = false) => `<address class="nap legal-contact">
<strong>${BIZ.name}</strong>
<span>Attention: Nuzhat Akbar</span>
<span>Phone or text: <a href="${BIZ.tel}" data-call="legal">${BIZ.phone}</a></span>
${mailing ? `<span>Mail: ${BIZ.street}, ${BIZ.locality}, ${BIZ.region} ${BIZ.postal}</span>\n` : ''}</address>`;

function legalPage({ slug, name, h1, script, sign, title, description, intro, sections }) {
  const path = `/${slug}/`;
  const trail = [['Home', '/'], [name, path]];
  const body = sections.map((s, i) => `<section id="${s.id}" aria-labelledby="${s.id}-h"><h2 id="${s.id}-h" data-reveal><span class="legal-num">${String(i + 1).padStart(2, '0')}</span> ${s.h}</h2>${s.html}</section>`).join('\n');
  const main = `<div class="read-road" aria-hidden="true"><span class="read-road__fill"></span><span class="read-road__car"><svg viewBox="-32 -16 64 32" focusable="false"><use href="#i-car"/></svg></span></div>
<article class="guide legal" aria-labelledby="page-title">
<header class="phero ghero">
  <div class="container phero-grid">
    <div class="phero-copy">
      ${crumbs(trail)}
      <p class="script phero-script"><span>${script}</span></p>
      <h1 class="phero-title" id="page-title" data-letters>${h1}</h1>
      <p class="phero-lede">${intro}</p>
      <p class="ghero-meta"><span>Effective <time datetime="${LEGAL_UPDATED}">${longDate(LEGAL_UPDATED)}</time></span><span>Last updated <time datetime="${LEGAL_UPDATED}">${longDate(LEGAL_UPDATED)}</time></span></p>
    </div>
    <div class="ghero-sign" aria-hidden="true">${signIcon(sign)}</div>
  </div>
</header>
<div class="article band band--white">
  <div class="container article-grid">
    ${toc(sections.map((s) => [s.id, s.toc || plain(s.h)]), 'On this page')}
    <div class="article-body">
      ${body}
    </div>
  </div>
</div>
</article>`;
  return {
    type: 'legal', path, trail, name, h1, title, description, main, ogScript: script, updated: LEGAL_UPDATED,
    webPageType: 'WebPage',
  };
}

export function privacyPage() {
  return legalPage({
    slug: 'privacy-policy', name: 'Privacy Policy', h1: 'Privacy Policy', script: 'your information', sign: 'lock',
    title: 'Privacy Policy | Mrs. Akbar Driving Instructor',
    description: 'How Mrs. Akbar Female Certified Driving Instructor collects, uses, protects and shares personal information from calls, texts, lessons and this website.',
    intro: 'What personal information we collect when you visit this website, call, text or take lessons, why we collect it, and the choices you have. Plain words, no tricks.',
    sections: [
      { id: 'who', h: 'Who we are', html: p(
        `This Privacy Policy explains how ${BIZ.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) collects, uses, discloses and protects personal information. We give driving lessons across Hamilton, Ontario. Our instructor drives to each student, so a lesson starts at the place agreed when you book.`,
        'It applies to personal information we receive through this website, by phone and text message, and in connection with booking and taking driving lessons.',
        'Nuzhat Akbar is the person responsible for how we handle personal information, and for answering questions or requests about it. You can reach her using the contact details at the end of this policy.') },
      { id: 'law', h: 'The law we follow', html: p(
        'We collect, use and disclose personal information in the course of commercial activity in Ontario, so we follow the <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA), Canada&rsquo;s federal private-sector privacy law, and the fair information principles it sets out. In practice, that means we:') +
        ul(['are accountable for the personal information we hold', 'tell you why we collect it, at or before the time we collect it', 'collect, use and disclose it only with your consent, except where the law allows otherwise', 'collect only what we need, and use it only for the purposes we told you about', 'keep it accurate, protect it, and keep it only as long as we need it', 'are open about our practices, and let you see and correct your information']) },
      { id: 'website', h: 'What this website collects', toc: 'This website', html: p(
        'Very little. This website has no forms, accounts, comments, newsletter sign-ups or chat tools, so you never type personal information into it.') +
        ul([
          '<strong>No cookies from us.</strong> We don&rsquo;t use cookies to track you, remember you or show you ads. A website host can use a strictly necessary security cookie to protect a site from abuse; if ours ever does, it isn&rsquo;t used for tracking or advertising.',
          '<strong>No analytics or advertising trackers.</strong> We don&rsquo;t use website analytics, advertising pixels or tracking tools.',
          '<strong>No third-party scripts, fonts or images.</strong> The fonts, images, map and code on this site are served from this website itself, so loading a page doesn&rsquo;t send information about you to other companies.',
          '<strong>Nothing stored in your browser.</strong> The site doesn&rsquo;t save information in your browser&rsquo;s storage.',
        ]) +
        p('Like any website, the servers that host this site may automatically record basic technical information when a page is requested, such as your IP address, browser type, the date and time, and the page requested. Website hosts keep these server logs to deliver pages, keep the service secure and fix problems. We don&rsquo;t use server logs to identify visitors.',
          'If we ever decide to add website analytics or any tool that uses cookies or collects information about visitors, we will update this policy before we do.') },
      { id: 'calls', h: 'When you call or text us', toc: 'Calls and texts', html: p(
        'The call and text buttons on this site open your own phone&rsquo;s calling or messaging app. Nothing is sent until you place the call or press send. The text button may fill in a short greeting for you, which you can change or delete before sending.',
        'When you call, text or leave a voicemail, we receive your phone number and anything you choose to tell us, for example your name, your licence level, the area you live in, your availability and your road test date. Call logs, voicemails and messages are kept on our phone.',
        'Your phone company, and ours, keep their own records of calls and messages under their own privacy policies.') },
      { id: 'lessons', h: 'When you book or take lessons', toc: 'Lessons', html: p('To arrange and give lessons, we may collect and keep:') +
        ul([
          'your name and phone number',
          'where a lesson starts or ends, if you give us an address or meeting point',
          'your driver&rsquo;s licence class, number and expiry date, so we can confirm you&rsquo;re allowed to drive during a lesson',
          'your road test date and DriveTest location, if you tell us',
          'notes about your progress and what to practise next',
          'records of payments',
          'the name and phone number of a parent, guardian or emergency contact, if you give us one',
          'information you choose to share that affects how you drive safely, such as needing glasses or contacts',
        ]) +
        p('We only ask for what we need to teach you safely and run the business. You can choose not to share something, though some information, such as a valid licence, is required before you can drive in a lesson.') },
      { id: 'why', h: 'Why we use your information', toc: 'Why we use it', html: ul([
        'to reply to your calls and messages',
        'to book, confirm, change and give lessons',
        'to plan lessons around your goals and your road test date',
        'to confirm that you hold a valid licence for the driving you&rsquo;re doing',
        'to keep you and other road users safe during lessons',
        'to keep business and tax records',
        'to respond if there is a collision, insurance claim or legal matter connected with a lesson',
        'to meet our legal obligations',
      ]) + p('We won&rsquo;t use your personal information for any other purpose without your consent, unless the law requires or allows it.') },
      { id: 'consent', h: 'Consent, and students under 18', toc: 'Consent', html: p(
        'When you contact us or book lessons, you consent to us collecting and using your information for the purposes described in this policy. You can withdraw your consent at any time by telling us, subject to legal or contractual restrictions. If you do, we may no longer be able to give you lessons, and we&rsquo;ll explain why.',
        'In Ontario you can start driving lessons at 16. Students aged 16 and 17 often contact us themselves, and parents or guardians often call on their behalf. If a parent or guardian books or pays for a student&rsquo;s lessons, we may discuss scheduling, payment and progress with that parent or guardian.') },
      { id: 'messages', h: 'Text messages and marketing', toc: 'Messages', html: p(
        'We use your phone number to reply to you and to arrange your lessons. We don&rsquo;t send marketing texts or emails without your consent, as Canada&rsquo;s anti-spam legislation requires. We don&rsquo;t make marketing calls, and we don&rsquo;t add you to any mailing list. If you ask us to stop texting you, we will, except for messages you need about a lesson you&rsquo;ve already booked.') },
      { id: 'sharing', h: 'When we share information', toc: 'Sharing', html: p('We don&rsquo;t sell, rent or trade personal information. We only share it:') +
        ul([
          '<strong>With service providers</strong> who help us run the business, such as our phone and messaging providers, a cloud backup service for our phone, and accounting or tax professionals. They may only use it to provide their service to us.',
          '<strong>When the law requires or allows it,</strong> for example in response to a court order, or to an authority entitled to it.',
          '<strong>With insurers, police or other authorities</strong> if a collision or incident happens during a lesson, as needed to deal with it.',
          '<strong>With your consent,</strong> in any other situation.',
        ]) +
        p('You book your own road tests with DriveTest, and DriveTest handles that information under its own privacy practices.') },
      { id: 'reviews', h: 'Reviews and photos on this site', toc: 'Reviews and photos', html: p(
        'The reviews quoted on this site are public reviews that students posted on our Google Business Profile. We quote them word for word (sometimes shortened, which we mark with an ellipsis), show the reviewer&rsquo;s first name and, where there is one, the first letter of their last name, and link to the original review on Google. Google&rsquo;s privacy policy applies to reviews posted on Google.',
        'If you wrote a review that we quote and you&rsquo;d like it removed from this website, contact us and we will remove it. The same goes for any photo on this website that shows you.') },
      { id: 'security', h: 'How we protect and keep information', toc: 'Security and retention', html: p(
        'We protect personal information with safeguards suited to how sensitive it is, such as a passcode and screen lock on our phone and secure storage for business records, and we limit access to people who need it to run the business.',
        'We keep personal information only as long as we need it for the purposes in this policy, and for as long as the law requires. For example, the Canada Revenue Agency generally requires businesses to keep financial records for six years from the end of the tax year they relate to. When we no longer need information, we delete it or destroy it securely.') },
      { id: 'breach', h: 'If something goes wrong', toc: 'Privacy breaches', html: p(
        'If personal information we hold is lost, stolen or accessed without permission, and that creates a real risk of significant harm to you, we will tell you as soon as we can and report it to the Office of the Privacy Commissioner of Canada, as the law requires. We also keep a record of any such breach.') },
      { id: 'outside', h: 'Information stored outside Canada', toc: 'Outside Canada', html: p(
        'Some of our service providers, such as phone, messaging and cloud backup providers, may store or process information outside Canada, including in the United States. When information is outside Canada, it is subject to the laws of that country, and authorities there may be able to access it under those laws.') },
      { id: 'rights', h: 'Your rights', html: p('You can ask us at any time:') +
        ul(['what personal information we hold about you, how we use it and who we&rsquo;ve shared it with', 'to correct information that&rsquo;s inaccurate or incomplete', 'to withdraw your consent, as described above', 'to delete information we no longer need to keep']) +
        p('Contact us using the details below. We may need to confirm who you are before we share or change anything. We&rsquo;ll respond within 30 days, and we won&rsquo;t charge you for a reasonable request. If we can&rsquo;t give you access to something, we&rsquo;ll tell you why, unless the law prevents us.',
          'If you&rsquo;re not satisfied with how we handle a concern, you can contact the <a href="https://www.priv.gc.ca/" target="_blank" rel="noopener">Office of the Privacy Commissioner of Canada</a>.') },
      { id: 'links', h: 'Links to other websites', toc: 'Other websites', html: p(
        'This site links to other websites, such as Google Maps, ontario.ca, drivetest.ca and OpenStreetMap. When you follow a link, the other website&rsquo;s own privacy policy applies. We&rsquo;re not responsible for how other websites handle your information.') },
      { id: 'changes', h: 'Changes to this policy', toc: 'Changes', html: p(
        'We may update this policy to reflect changes in how we work or in the law. When we do, we&rsquo;ll post the new version here and change the &ldquo;Last updated&rdquo; date at the top. If a change affects how we use information we already hold, we&rsquo;ll ask for your consent where the law requires it.') },
      { id: 'contact', h: 'Contact us', html: p('Questions, requests or concerns about privacy can go to:') + contactBlock(true) },
    ],
  });
}

export function termsPage() {
  return legalPage({
    slug: 'terms-and-conditions', name: 'Terms and Conditions', h1: 'Terms and Conditions', script: 'the fine print', sign: 'doc',
    title: 'Terms and Conditions | Mrs. Akbar Driving Instructor',
    description: 'The terms for using this website and for booking driving lessons with Mrs. Akbar Female Certified Driving Instructor in Hamilton, Ontario.',
    intro: 'The terms for using this website and for booking and taking driving lessons with us. Written as plainly as we could, because fine print shouldn&rsquo;t be hard to read.',
    sections: [
      { id: 'about', h: 'About these terms', toc: 'About these terms', html: p(
        `These Terms and Conditions apply to your use of this website and to driving lessons provided by ${BIZ.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) in Hamilton, Ontario. We drive to our students, so lessons start wherever we agree when you book.`,
        'By using this website or booking a lesson, you agree to these terms. If you&rsquo;re booking for a student under 18, you agree to them on the student&rsquo;s behalf.',
        'Some details, such as the price, length and starting point of a lesson and any cancellation arrangements, are agreed with you when you book. If anything agreed at booking differs from these terms, what was agreed at booking applies to that booking.') },
      { id: 'booking', h: 'Booking lessons', html: p(
        `You can book by calling or texting ${BIZ.phone}. A lesson is booked once we confirm the date and time with you. Lessons are available seven days a week, by appointment, subject to availability.`,
        'All lessons are one-on-one. When you book, please tell us your licence level, where you&rsquo;d like the lesson to start, and your road test date if you have one, so we can plan the lesson properly.') },
      { id: 'prices', h: 'Prices and payment', html: p(
        'We tell you the price before you book. You pay in the way and at the time we agree when you book. Our prices may change from time to time, but a price we&rsquo;ve confirmed for a lesson you&rsquo;ve already booked won&rsquo;t change.') },
      { id: 'changes', h: 'Changing or cancelling a lesson', toc: 'Changes and cancellations', html: p(
        'If you need to change or cancel a lesson, tell us as early as you can by phone or text. Any notice period or charge for late cancellations or missed lessons will be explained to you when you book, before you pay anything.',
        'Sometimes we may need to change or cancel a lesson ourselves, for example because of severe weather, illness, a problem with the vehicle, or road conditions that make a lesson unsafe. If that happens, we&rsquo;ll tell you as soon as we can and offer another time. If you&rsquo;ve paid for a lesson that we cancel and you don&rsquo;t want to rebook, we&rsquo;ll refund what you paid for that lesson.') },
      { id: 'before', h: 'What we need from you', toc: 'Your responsibilities', html: p('For every lesson, you agree to:') +
        ul([
          'hold a valid driver&rsquo;s licence that allows you to drive in Ontario, of the right class for the driving you&rsquo;ll do (for most students, an Ontario G1 or higher), and bring it to the lesson',
          'wear glasses or contact lenses if your licence requires them',
          'be fit to drive: no alcohol, cannabis or other drugs, and no medication that affects your ability to drive. G1 and G2 drivers, and every driver aged 21 or under, must have a blood alcohol level of zero',
          'tell us about any condition that could affect your ability to drive safely',
          'wear shoes that let you control the pedals properly; flat, comfortable shoes are best',
          'follow the law and the safety directions your instructor gives you during the lesson',
        ]) +
        p('If you can&rsquo;t meet these requirements, we can&rsquo;t give you a driving lesson that day.') },
      { id: 'safety', h: 'Safety during lessons', html: p(
        'Your safety, and the safety of everyone else on the road, comes first. During a lesson you must follow your instructor&rsquo;s safety directions straight away, including directions to slow down, stop or pull over.',
        'We may shorten or end a lesson if continuing would be unsafe, for example if a student appears impaired, doesn&rsquo;t hold a valid licence, ignores safety directions, or if weather or road conditions become dangerous. How any payment for a lesson ended for those reasons is handled is explained when you book.') },
      { id: 'tests', h: 'Road tests', html: p(
        'You book your own road tests with DriveTest, and road test fees are paid to DriveTest, not to us. DriveTest&rsquo;s own rules apply to road tests, including its requirements for the vehicle you use.',
        'We can help you prepare, but we can&rsquo;t guarantee that you&rsquo;ll pass. A road test result depends on your driving on the day and on the DriveTest examiner&rsquo;s assessment. Under DriveTest&rsquo;s rules, instructors can&rsquo;t ride along during a road test.') },
      { id: 'incidents', h: 'If there&rsquo;s a collision or incident', toc: 'Collisions and incidents', html: p(
        'If a collision or other incident happens during a lesson, you agree to stay at the scene, follow your instructor&rsquo;s directions, and provide the information the law, the police and insurers require. We may need to share information about the lesson with insurers or authorities, as described in our <a href="/privacy-policy/">Privacy Policy</a>.') },
      { id: 'website', h: 'Using this website', toc: 'This website', html: p(
        'The guides and other information on this website are general information to help learner drivers. They are not legal advice. Licensing rules, road test procedures and DriveTest&rsquo;s practices can change, so always check the official sources we link to, such as ontario.ca and drivetest.ca, before relying on anything for a decision. Each guide shows the date it was last updated.',
        'We work to keep this website accurate and available, but we don&rsquo;t promise that it will always be complete, current or free of errors, or that it will always be available.',
        'You agree not to misuse this website, for example by trying to disrupt it, gain unauthorized access to it, or copy it in a way these terms don&rsquo;t allow.') },
      { id: 'reviews', h: 'Reviews and testimonials', html: p(
        'The reviews quoted on this website are real reviews that students posted on our Google Business Profile. We quote them word for word, sometimes shortened with an ellipsis, and link to the original review on Google. They describe individual students&rsquo; experiences. Every student is different, and a review is not a promise that you&rsquo;ll get the same result, need the same number of lessons, or pass on your first try.') },
      { id: 'ip', h: 'Intellectual property', html: p(
        `The content of this website, including its text, illustrations and design, belongs to ${BIZ.name} unless noted otherwise. You&rsquo;re welcome to read it, share links to it and print pages for your own personal use. Please don&rsquo;t copy it for commercial purposes without our written permission.`,
        'Some content belongs to others and is used under their licences:') +
        ul([
          'Map data &copy; OpenStreetMap contributors, available under the Open Database Licence.',
          'Terrain data from Mapzen Terrain Tiles, which contains information licensed under the Open Government Licence (Canada).',
          'The Big Shoulders Display, Figtree and Caveat typefaces, used under the SIL Open Font License.',
          'Reviews quoted from Google remain their authors&rsquo;. Google, Google Maps and DriveTest are names and trademarks of their respective owners, and we&rsquo;re not affiliated with them.',
        ]) },
      { id: 'links', h: 'Links to other websites', toc: 'Other websites', html: p(
        'This website links to other websites, such as Google Maps, ontario.ca and drivetest.ca, for your convenience. We don&rsquo;t control them and aren&rsquo;t responsible for their content, accuracy or privacy practices.') },
      { id: 'liability', h: 'Limitation of liability', toc: 'Liability', html: p(
        'To the extent the law allows, we&rsquo;re not liable for any indirect or consequential loss arising from your use of this website or from relying on the general information on it.',
        'Nothing in these terms limits or excludes any liability that can&rsquo;t be limited or excluded by law, or takes away any rights you have under Ontario&rsquo;s consumer protection laws or other laws that apply to you.') },
      { id: 'privacy', h: 'Privacy', html: p('Our <a href="/privacy-policy/">Privacy Policy</a> explains how we collect, use and protect personal information, and forms part of these terms.') },
      { id: 'accessibility', h: 'Accessibility', html: p(
        'We want this website to be easy for everyone to use, and we built it to follow the Web Content Accessibility Guidelines (WCAG) as closely as we can. If anything on the site is hard to use, or you need information in another way, call or text us and we&rsquo;ll help.') },
      { id: 'severability', h: 'If part of these terms doesn&rsquo;t apply', toc: 'Severability', html: p(
        'If a court decides that any part of these terms can&rsquo;t be enforced, that part will be limited or removed as little as necessary, and the rest of these terms will still apply.') },
      { id: 'law', h: 'Governing law', html: p('These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply there. Any dispute about them will be dealt with by the courts of Ontario, unless the law gives you the right to bring it somewhere else.') },
      { id: 'updates', h: 'Changes to these terms', toc: 'Changes to these terms', html: p(
        'We may update these terms from time to time. When we do, we&rsquo;ll post the new version here and change the &ldquo;Last updated&rdquo; date at the top. Lessons you&rsquo;ve already booked stay under the terms that applied when you booked them.') },
      { id: 'contact', h: 'Contact us', html: p('Questions about these terms can go to:') + contactBlock() },
    ],
  });
}
