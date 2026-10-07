// Guides: helpful, sourced articles for learners in Hamilton. Facts are paraphrased from ontario.ca,
// drivetest.ca, fsrao.ca and hamilton.ca (checked 2026-10-06); quotes come from her Google reviews.
import { review, abs, plain, UPDATED, BIZ } from './core.mjs';
import { bizRef } from './layout.mjs';
import { GUIDE_LIST } from './guide-list.mjs';
import { crumbs, sec, toc, callout, inlineCta, sources, faq, guideCards, ctaBand, quote, quotes, chips } from './ui.mjs';
import { signIcon, artGuides } from './art.mjs';
import { mountainGuide } from './guide-mountain.mjs';

export const SRC = {
  getG: ['Get a G driver&rsquo;s licence: new drivers (ontario.ca)', 'https://www.ontario.ca/page/get-g-drivers-licence-new-drivers'],
  roadTests: ['Road tests for cars (drivetest.ca)', 'https://drivetest.ca/tests/road-tests-cars/'],
  vehicle: ['Road test vehicle requirements (drivetest.ca)', 'https://drivetest.ca/tests/road-test-vehicle-requirements/'],
  booking: ['Book a road test (drivetest.ca)', 'https://drivetest.ca/book-a-road-test/overview/'],
  centres: ['Find a DriveTest centre (drivetest.ca)', 'https://drivetest.ca/find-a-drivetest-centre/alphabetical_list/'],
  handbookLicence: ['Driver&rsquo;s Handbook: getting your driver&rsquo;s licence (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/getting-your-drivers-licence'],
  handbookRoadTest: ['Driver&rsquo;s Handbook: the Level Two road test (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/level-two-road-test'],
  handbookParking: ['Driver&rsquo;s Handbook: parking along roadways (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/parking-along-roadways'],
  handbookFreeway: ['Driver&rsquo;s Handbook: freeway driving (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/freeway-driving'],
  handbookWeather: ['Driver&rsquo;s Handbook: driving at night and in bad weather (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/driving-night-and-bad-weather'],
  winter: ['Winter driving (ontario.ca)', 'https://www.ontario.ca/page/winter-driving'],
  fsra: ['How to save on auto insurance (fsrao.ca)', 'https://www.fsrao.ca/consumers/auto-insurance/purchasing-your-policy/how-save-auto-insurance'],
  exchange: ['Exchange an out-of-province driver&rsquo;s licence (ontario.ca)', 'https://www.ontario.ca/page/exchange-out-province-drivers-licence'],
  exchangeDT: ['Licence exchanges for cars, trucks and vans (drivetest.ca)', 'https://drivetest.ca/licences/exchanges-foreign-licences/licence-exchanges-cars-trucks-vans/'],
  credits: ['Foreign licence experience credits (drivetest.ca)', 'https://drivetest.ca/licences/exchanges-foreign-licences/foreign-licence-experience-credits/'],
  rhvp: ['Red Hill Valley Parkway speed limit (hamilton.ca)', 'https://www.hamilton.ca/city-council/news-notices/news-releases/speed-limit-reduction-red-hill-valley-parkway-beginning'],
};

const words = (html) => plain(html).split(/\s+/).length;
const longDate = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });

export function guidePage(g) {
  const meta = GUIDE_LIST.find((x) => x.slug === g.slug);
  const path = `/guides/${g.slug}/`;
  const trail = [['Home', '/'], ['Guides', '/guides/'], [meta.short, path]];
  const body = g.sections.map((s) => (typeof s === 'string' ? s : `<section id="${s.id}" aria-labelledby="${s.id}-h"><h2 id="${s.id}-h" data-reveal>${s.h}</h2>${s.html}</section>`)).join('\n');
  const minutes = Math.max(3, Math.round(words(g.intro + body) / 220));
  const tocItems = g.sections.filter((s) => typeof s !== 'string').map((s) => [s.id, s.toc || plain(s.h)]);
  const main = `<div class="read-road" aria-hidden="true"><span class="read-road__fill"></span><span class="read-road__car"><svg viewBox="-32 -16 64 32" focusable="false"><use href="#i-car"/></svg></span></div>
<article class="guide" aria-labelledby="page-title">
<header class="phero ghero">
  <div class="container phero-grid">
    <div class="phero-copy">
      ${crumbs(trail)}
      <p class="script phero-script"><span>${g.script}</span></p>
      <h1 class="phero-title" id="page-title" data-letters>${meta.title}</h1>
      <p class="phero-lede">${g.dek}</p>
      <p class="ghero-meta"><span>Updated <time datetime="${g.updated || UPDATED}">${longDate(g.updated || UPDATED)}</time></span><span>${minutes} min read</span><span>By Mrs. Akbar Driving Instructor</span></p>
    </div>
    <div class="ghero-sign" aria-hidden="true">${signIcon(meta.sign)}</div>
  </div>
</header>
<div class="article band band--white">
  <div class="container article-grid">
    ${toc(tocItems)}
    <div class="article-body">
      <p class="article-intro" data-reveal>${g.intro}</p>
      ${body}
      ${sources(g.sources)}
      ${g.faqs?.length ? `<section class="article-faq" id="questions" aria-labelledby="questions-h"><h2 id="questions-h" data-reveal>Quick answers</h2>${faq(g.faqs, g.slug)}</section>` : ''}
    </div>
  </div>
</div>
</article>
${sec({ id: 'next', tone: 'paper', script: 'keep reading', title: 'More guides', body: guideCards(g.related) + (g.lessons ? `<div class="more-lessons" data-reveal><p class="more-lessons__title">Related lessons</p>${chips(g.lessons)}</div>` : '') })}
${ctaBand({ title: g.cta[0], text: g.cta[1] })}`;
  return {
    type: 'guide', path, trail, name: meta.short, h1: meta.title, title: g.title, description: g.description, faqs: g.faqs, main,
    ogScript: g.script, published: g.published || UPDATED, updated: g.updated || UPDATED,
    webPageType: 'WebPage',
    about: { '@id': `${abs(path)}#article` },
    ld: [{
      '@type': 'Article',
      '@id': `${abs(path)}#article`,
      headline: plain(meta.title),
      description: plain(g.description),
      image: [abs(`/og/${g.slug}.jpg`)],
      datePublished: g.published || UPDATED,
      dateModified: g.updated || UPDATED,
      inLanguage: 'en-CA',
      author: { '@type': 'Organization', '@id': bizRef['@id'], name: BIZ.name, url: abs('/') },
      publisher: bizRef,
      mainEntityOfPage: { '@id': `${abs(path)}#webpage` },
      wordCount: words(g.intro + body),
    }],
  };
}

const lessonsChips = (...slugs) => slugs.map(([href, label]) => ({ href, label }));
const ul = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
const ol = (items) => `<ol>${items.map((i) => `<li>${i}</li>`).join('')}</ol>`;
const p = (...paras) => paras.map((x) => `<p>${x}</p>`).join('');

export function guidePages() {
  return [
    /* ---------- 1. Passing the G2 ---------- */
    guidePage({
      slug: 'how-to-pass-the-g2-road-test',
      title: 'How to Pass the G2 Road Test in Ontario (Hamilton Guide) | Mrs. Akbar',
      description: 'What the G2 road test checks, the habits examiners watch for, how to practise in the last few weeks, and what to bring on the day. A Hamilton instructor’s guide.',
      script: 'road tests',
      dek: 'What the examiner is watching for, the small habits that cost people marks, and how to use the weeks before your test.',
      intro: 'The G2 road test is short, and nothing on it should surprise you. Plenty of people who don&rsquo;t pass know how to do every skill on it. What catches them is doing one of them carelessly, once, with an examiner watching. This guide is about making the right habits automatic.',
      sections: [
        { id: 'what', h: 'What the G2 road test is', html: p(
          'It&rsquo;s the first of Ontario&rsquo;s two road tests. You take it on your G1, after holding that licence for 12 months, or 8 months if you finish a government-approved beginner driver education course.',
          'DriveTest calls it the city test, and it usually takes about 20 minutes. The examiner gives you directions as you go, so you don&rsquo;t need to know the route. What they&rsquo;re checking is basic driving, done safely and the same way every time:') +
          ul(['Left and right turns', 'Stopping, at lights, stop signs and yield signs', 'Lane changes', 'One-way streets', 'Residential streets', 'Parallel parking', 'Three-point turns']) +
          callout('local', 'Testing in Hamilton', p('Hamilton&rsquo;s DriveTest centre is at 370 Kenora Avenue North in the east end. The <a href="/guides/hamilton-drivetest-centre/">Hamilton DriveTest centre guide</a> covers booking, the car check and what happens after.')) },
        { id: 'habits', h: 'The habits examiners watch for', html: p('None of these are tricks. They&rsquo;re the things Ontario&rsquo;s Driver&rsquo;s Handbook asks for, done on purpose so the examiner can see them.') +
          `<h3>Shoulder checks, every time</h3>${p('Mirrors don&rsquo;t show your blind spots. Before you pull away from the curb or change lanes, turn your head and look. Check again right after you signal, just before you move over.')}` +
          `<h3>Stops that are actually stops</h3>${p('Come to a full stop behind the stop line, or before the crosswalk if there&rsquo;s no line. A slow roll through a stop sign is one of the easiest ways to lose marks.')}` +
          `<h3>Space in front of you</h3>${p('Keep at least two to three seconds behind the car ahead. Pick a sign or a pole, and count when the car in front passes it.')}` +
          `<h3>Signals that start early and end on time</h3>${p('Signal before you brake for a turn, not halfway through it, and make sure the signal switches off afterwards.')}` +
          `<h3>Three-point turns and parallel parking</h3>${p('For a three-point turn, use the whole width of the road and reverse only once. When you parallel park, the Handbook suggests leaving at least 60 cm between you and the car you park behind.')}` },
        { id: 'practice', h: 'A practice plan for the last few weeks', html: ol([
          '<strong>Make a list of your weak spots.</strong> Be honest. Most people have one or two skills that only work on a good day.',
          '<strong>Practise without a backup camera.</strong> Cameras and parking aids aren&rsquo;t allowed during the test, so learn to park with mirrors and shoulder checks.',
          '<strong>Drive one-way streets.</strong> They&rsquo;re on the test, and downtown Hamilton has plenty to practise on.',
          '<strong>Do a mock test.</strong> Have someone give you directions without warning, the way an examiner would, and talk through what you&rsquo;re checking.',
          '<strong>Book a lesson close to the date.</strong> A warm-up shortly before the test settles nerves and catches small habits.',
        ]) + quote(review('Prasad Patil', 'In that short time, she explained everything I needed to know about the test', 'Thanks to her class, I passed my test!'), 'one lesson, two hours before the test') },
        inlineCta('Want help with your G2? Call or text Mrs. Akbar.'),
        { id: 'day', h: 'On the day', html: p('Arrive at least 30 minutes early. Bring:') +
          ul(['Your current driver&rsquo;s licence', 'Glasses or contacts, if you drive with them', 'A printout of your road test confirmation email', 'A car in good working order, with enough gas for the test']) +
          p('DriveTest doesn&rsquo;t supply cars. Yours can be owned, borrowed or rented, as long as it&rsquo;s plated, insured and working. The examiner checks it first: signals, brake lights, horn, speedometer, and wipers or defroster if the weather calls for them. A damaged windshield or a temporary spare tire can get the test cancelled, and you&rsquo;d lose half the fee. Turn off any dash camera before you start.',
            'Nobody rides along with you, instructors included. With your permission, an instructor can help at check-in and at the debrief afterwards.') },
        { id: 'after', h: 'If it doesn&rsquo;t go your way', html: p('It happens, and it isn&rsquo;t the end of anything. You can test again while your licence is valid, though DriveTest generally asks you to wait at least 10 days between tests, and you pay the fee again.',
          'Your scoresheet is the most useful thing you&rsquo;ll get that day. It shows exactly where marks went, which tells you what to practise before the next attempt.') },
      ],
      sources: [SRC.getG, SRC.roadTests, SRC.vehicle, SRC.handbookRoadTest],
      faqs: [
        ['How long is the G2 road test?', 'Usually about 20 minutes.'],
        ['Can my driving instructor ride with me during the test?', 'No. Nobody rides along during a road test. With your consent, an instructor can help at check-in and at the debrief afterwards.'],
        ['What happens if my car fails the examiner&rsquo;s check?', 'The test is declared out of order and you lose half of the road test fee. Common problems are a turn signal, brake light or horn that doesn&rsquo;t work, a damaged windshield and a temporary spare tire.'],
      ],
      related: ['hamilton-drivetest-centre', 'how-to-parallel-park', 'nervous-driver-tips'],
      lessons: lessonsChips(['/g2-road-test-preparation/', 'G2 road test prep'], ['/parallel-parking-lessons/', 'Parallel parking']),
      cta: ['Get ready for your G2', 'Tell her your test date and which skills feel shaky. Lessons start there.'],
    }),

    /* ---------- 2. Hamilton DriveTest centre ---------- */
    guidePage({
      slug: 'hamilton-drivetest-centre',
      title: 'Hamilton DriveTest Centre on Kenora Ave: Road Test Guide | Mrs. Akbar',
      description: 'Everything to know before a road test at the Hamilton DriveTest centre on Kenora Avenue: booking, what to bring, the car check, and what happens after.',
      script: 'road tests',
      dek: 'Where it is, how booking works, what to bring, and what happens before and after the drive.',
      intro: 'Most road test stress is about the unknown. Where do I park? What do they check? What happens if the car has a problem? Here&rsquo;s how the day works at Hamilton&rsquo;s DriveTest centre, using DriveTest&rsquo;s own rules.',
      sections: [
        { id: 'where', h: 'Where it is', html: p('The Hamilton DriveTest centre is at <strong>370 Kenora Avenue North, Hamilton, L8E 2W2</strong>, in the east end near Barton Street. It offers both the G2 and the G road tests, along with knowledge tests and licence services.',
          'When we checked in October 2026, DriveTest listed road tests running Monday to Saturday. Hours change, so check the centre&rsquo;s listing on drivetest.ca before you go.') },
        { id: 'booking', h: 'Booking your test', html: p('You can book, move or cancel a road test online, by phone, or in person at any DriveTest centre. You&rsquo;ll need your licence number with its expiry date, a first choice of location plus two backups, and a preferred date and time.') +
          ul(['Online booking needs a Visa or Mastercard, and online slots can be booked up to 24 hours ahead.', 'To cancel or reschedule without losing the fee, do it at least 48 hours before the test.', 'You can&rsquo;t book a test for a date after your licence expires.']) },
        { id: 'bring', h: 'What to bring', html: ul(['Your current driver&rsquo;s licence', 'Glasses or contacts, if you need them to drive', 'A printout of your road test confirmation email', 'A car that passes the check below, with enough gas for the test', 'Payment, only if you&rsquo;re hoping for a standby appointment']) +
          callout('tip', 'Arrive early', p('DriveTest asks you to arrive at least 30 minutes before your test. Tests go ahead in any weather unless DriveTest tells you otherwise.')) },
        { id: 'car', h: 'The car, and the check before you drive', html: p('DriveTest doesn&rsquo;t provide cars. Yours can be owned, borrowed or rented, and it doesn&rsquo;t have to be a driving instructor&rsquo;s. It must be plated, insured and in proper working order.',
          'Before the test, the examiner checks it. These problems can get the test declared out of order, which costs you half the fee:') +
          ul(['A turn signal, brake light, horn or speedometer that doesn&rsquo;t work', 'Wipers or defroster that don&rsquo;t work when the weather needs them', 'A damaged windshield', 'A flat or temporary spare tire', 'Passengers or pets in the car']) +
          p('Dash cameras and phones that record must be switched off, and driving aids such as backup cameras, parking assist, lane monitoring and cruise control can&rsquo;t be used. If you&rsquo;re on a G1, someone who meets the accompanying driver rules has to drive with you to the centre.') },
        inlineCta('Need lessons before a test at Kenora? Call or text Mrs. Akbar.'),
        { id: 'during', h: 'During and after the test', html: p('You drive alone with the examiner. The G2 test usually takes about 20 minutes and the G test about 30, which includes highway driving. With your consent, a driving instructor or translator can help you at check-in and at the debrief.',
          'If you pass, you go back inside to apply the result and get a temporary paper licence that&rsquo;s valid for 90 days. Results you don&rsquo;t apply within 12 months expire.',
          'If you don&rsquo;t pass, DriveTest generally asks you to wait at least 10 days before testing again. Your scoresheet shows what to work on.') },
        { id: 'other', h: 'Knowledge tests and licence exchanges', html: p('The G1 knowledge test is walk-in, with no appointment needed, and takes about 30 minutes. If you&rsquo;re exchanging a licence from another province or country, Hamilton offers bookable appointments for exchanges, and any DriveTest centre accepts walk-ins. The <a href="/guides/new-to-ontario-drivers-licence/">newcomer&rsquo;s licence guide</a> has the details.') },
      ],
      sources: [SRC.centres, SRC.roadTests, SRC.vehicle, SRC.booking],
      faqs: [
        ['Where is the Hamilton DriveTest centre?', 'At 370 Kenora Avenue North, Hamilton, L8E 2W2, in the city&rsquo;s east end.'],
        ['Does the Hamilton DriveTest centre do G2 and G road tests?', 'Yes. DriveTest lists both the G2 and the G road test at the Hamilton centre.'],
        ['Can I use my driving instructor&rsquo;s car for the test?', 'You can use any car that&rsquo;s plated, insured and in proper working order, whether it&rsquo;s yours, borrowed or rented. It doesn&rsquo;t have to belong to an instructor.'],
      ],
      related: ['how-to-pass-the-g2-road-test', 'g-road-test-tips', 'ontario-g1-g2-g-licence-explained'],
      lessons: lessonsChips(['/g2-road-test-preparation/', 'G2 road test prep'], ['/g-road-test-preparation/', 'G test and highway'], ['/driving-lessons-hamilton/', 'Lessons in Hamilton']),
      cta: ['Testing in Hamilton soon?', 'Call with your test date. Lessons can include the kind of driving you&rsquo;ll do around the east end.'],
    }),

    /* ---------- 3. The G road test ---------- */
    guidePage({
      slug: 'g-road-test-tips',
      title: 'The G Road Test in Ontario: What Changes After the G2 | Mrs. Akbar',
      description: 'The G road test explained: the highway declaration, what full-time DriveTest centres test right now, and how to merge, change lanes and exit with confidence.',
      script: 'road tests',
      dek: 'The highway declaration, what the test covers at full-time centres right now, and how to merge without drama.',
      intro: 'The G test is the last step to a full licence, and it&rsquo;s a different kind of test from the G2. Less about manoeuvres, more about reading traffic at speed. Here&rsquo;s what to expect and how to get ready.',
      sections: [
        { id: 'when', h: 'When you can take it', html: p('You can take the G road test once you&rsquo;ve held your G2 for 12 months. You have five years from getting your G1 to finish the whole graduated licensing system, so don&rsquo;t leave the G until the last minute. The test usually takes about 30 minutes.') },
        { id: 'declaration', h: 'The highway declaration', html: p('Before the test you sign a Declaration of Highway Driving Experience. It asks how often you&rsquo;ve driven on freeways and fast highways in the three months before the test, and how long those trips usually were.') +
          callout('rule', 'Five trips in three months', p('DriveTest asks for at least five trips in the last three months on a 400-series highway, a freeway such as the QEW, or a highway with a speed limit of 80 km/h or more. If your experience falls short, the test is cancelled and you lose half the fee.')) +
          p('Around Hamilton, Highway 403 and the QEW are both on the declaration&rsquo;s list of freeways. If you&rsquo;re short of trips, lessons on those roads count, and they&rsquo;re a calmer way to build experience than heading out alone.') },
        { id: 'covers', h: 'What the test covers right now', html: p('Until further notice, full-time DriveTest centres give a modified G test. It leaves out parallel parking, the roadside stop, the three-point turn and residential driving. It still covers:') +
          ul(['Major roads and expressways: merging on and off, speed and space, signalling', 'Turns, curves and lane changes', 'Intersections', 'Business areas']) +
          p('Part-time Travel Point locations still give the standard G test, so check which kind of centre you&rsquo;ve booked.') },
        { id: 'merging', h: 'Merging without drama', html: ol([
          '<strong>Look early.</strong> On the ramp, check ahead, your mirrors and your blind spot for a gap in the nearest lane.',
          '<strong>Signal as soon as highway traffic can see you.</strong>',
          '<strong>Use the whole acceleration lane.</strong> Speed up to match the traffic you&rsquo;re joining. Merging slowly is harder and less safe than merging at speed.',
          '<strong>Leave two to three seconds of space</strong> to the car ahead once you&rsquo;re in, and don&rsquo;t settle into another driver&rsquo;s blind spot.',
          '<strong>Move into the middle of the lane, then cancel your signal.</strong>',
        ]) },
        inlineCta('Want highway time with an instructor beside you? Call or text Mrs. Akbar.'),
        { id: 'exits', h: 'Changing lanes and getting off', html: p('Lane changes at highway speed are the same routine as in the city, done earlier and more smoothly: mirror, signal, shoulder check, then a gradual move. Plan exits well ahead. Get into the right lane early, signal, and do most of your slowing on the exit ramp rather than on the highway itself.') },
        { id: 'hamilton', h: 'Practising around Hamilton', html: p('Hamilton has a good spread of practice roads. Highway 403 runs west through Ancaster and north through the west end. The QEW runs along the lake through Stoney Creek. The Lincoln Alexander Parkway crosses the Mountain, and the Red Hill Valley Parkway, posted at 80 km/h for most of its length, connects it to the QEW.') +
          quote(review('Maher Ahmad', 'She helped me prepare for the G test', 'pass on the first try!'), 'passed the G, first try') },
      ],
      sources: [SRC.roadTests, SRC.getG, SRC.handbookFreeway, SRC.handbookRoadTest, SRC.rhvp],
      faqs: [
        ['How long after my G2 can I take the G road test?', 'After you&rsquo;ve held your G2 for 12 months.'],
        ['Is parallel parking on the G test?', 'Not at full-time DriveTest centres right now. Their G test is a modified version that leaves out parallel parking, the roadside stop, the three-point turn and residential driving. Part-time Travel Points still give the standard test.'],
        ['How much highway driving do I need before the G test?', 'DriveTest asks for at least five trips in the three months before the test on 400-series highways, freeways like the QEW, or highways with limits of 80 km/h or more.'],
      ],
      related: ['hamilton-drivetest-centre', 'winter-driving-in-hamilton', 'how-to-pass-the-g2-road-test'],
      lessons: lessonsChips(['/g-road-test-preparation/', 'G test and highway'], ['/driving-lessons-stoney-creek/', 'Lessons in Stoney Creek']),
      cta: ['Get your highway trips in', 'Tell her when your G test is booked. Lessons on the 403 and the QEW can count toward your declaration.'],
    }),

    /* ---------- 4. G1, G2 and G explained ---------- */
    guidePage({
      slug: 'ontario-g1-g2-g-licence-explained',
      title: 'G1, G2 and G Licences in Ontario Explained (2026) | Mrs. Akbar',
      description: 'Ontario’s graduated licensing in plain words: how to get a G1, the G1 and G2 rules, when you can take each road test, and how long it all takes.',
      script: 'getting started',
      dek: 'How each level works, the rules that come with it, and how long the whole thing takes.',
      intro: 'Ontario licenses new drivers in three steps: G1, then G2, then a full G. Each step comes with its own rules, and each one ends with a test. It sounds like a lot, but it&rsquo;s simple once it&rsquo;s laid out.',
      sections: [
        { id: 'overview', h: 'The short version', html: ol([
          '<strong>G1:</strong> pass a vision test and a knowledge test. Practise with an experienced driver beside you.',
          '<strong>G2:</strong> after 12 months on your G1 (8 with an approved driver education course), pass the G2 road test.',
          '<strong>G:</strong> after 12 months on your G2, pass the G road test.',
        ]) + p('The fastest route takes at least 20 months, and DriveTest says most people take about 20 to 24. You have five years from your G1 to finish.') },
        { id: 'g1', h: 'Getting your G1', html: p('You need to be at least 16 and an Ontario resident. At a DriveTest centre you pass a vision test and a knowledge test on the rules of the road and traffic signs. The knowledge test is walk-in, with no appointment, and takes about 30 minutes. Since May 11, 2026, applicants also declare that Ontario is their primary residence and that they are legally present in Canada.') },
        { id: 'g1-rules', h: 'G1 rules', html: ul([
          'A fully licensed driver with at least four years of experience sits beside you, and they&rsquo;re the only other person in the front seat.',
          'Their blood alcohol must be under .05, or zero if they&rsquo;re 21 or under. Yours must be zero.',
          'No driving between midnight and 5&nbsp;a.m.',
          'No more passengers than working seatbelts.',
          'No 400-series highways, such as the 403, and no high-speed expressways, such as the QEW.',
        ]) + callout('rule', 'The instructor exception', p('If the person beside you is a driving instructor licensed in Ontario, the highway rule doesn&rsquo;t apply, so you can practise on any road. That&rsquo;s why many learners get their first highway time in lessons.')) },
        { id: 'g2', h: 'G2 and its rules', html: p('Pass the G2 road test and you can drive on your own, on any road. A few rules still apply:') +
          ul(['Zero blood alcohol.', 'No more passengers than working seatbelts.', 'If you&rsquo;re 19 or under, between midnight and 5&nbsp;a.m.: one passenger aged 19 or under in your first six months, then up to three, until you get your G or turn 20. Family members and a fully licensed driver in the front seat are exceptions.']) },
        inlineCta('Starting your G1, or ready for the G2? Call or text Mrs. Akbar.'),
        { id: 'g', h: 'The full G', html: p('After 12 months on your G2, the G road test is your last step. It includes highway driving, and you&rsquo;ll sign a declaration of your recent highway experience first. The <a href="/guides/g-road-test-tips/">G road test guide</a> explains both.',
          'One rule doesn&rsquo;t go away with a full licence: every driver aged 21 or under must keep their blood alcohol at zero, whatever licence they hold.') },
        { id: 'bde', h: 'What about driver education courses?', html: p('A government-approved beginner driver education course takes four months off the time you must spend on your G1, so you can take the G2 test after eight months instead of twelve. Approved courses run at least 40 hours and are offered by driving schools. Ask any school you&rsquo;re considering whether its course is ministry-approved.') },
      ],
      sources: [SRC.getG, SRC.handbookLicence, SRC.roadTests],
      faqs: [
        ['How long does it take to get a full G licence in Ontario?', 'At least 20 months: 8 months on a G1 with an approved course (or 12 without), then 12 months on a G2. DriveTest says most people take about 20 to 24 months, and you have five years in total.'],
        ['Can a G1 driver drive on the highway?', 'Not on 400-series highways or high-speed expressways like the QEW, unless the accompanying driver is a driving instructor licensed in Ontario.'],
        ['Can I drive alone on a G1?', 'No. A fully licensed driver with at least four years of experience must always sit beside you.'],
      ],
      related: ['how-many-driving-lessons-do-you-need', 'how-to-pass-the-g2-road-test', 'new-to-ontario-drivers-licence'],
      lessons: lessonsChips(['/beginner-driving-lessons/', 'Beginner lessons'], ['/g2-road-test-preparation/', 'G2 road test prep'], ['/g-road-test-preparation/', 'G test and highway']),
      cta: ['Whatever level you&rsquo;re on', 'Tell her if you&rsquo;re on a G1 or a G2, and what you&rsquo;re aiming for next.'],
    }),

    /* ---------- 5. How many lessons ---------- */
    guidePage({
      slug: 'how-many-driving-lessons-do-you-need',
      title: 'How Many Driving Lessons Do You Need? An Honest Answer | Mrs. Akbar',
      description: 'There’s no magic number of driving lessons. What changes how many you need, real examples from her Google reviews, and how to make each lesson count.',
      script: 'getting started',
      dek: 'There&rsquo;s no magic number. Here&rsquo;s what actually changes it, with real examples.',
      intro: 'Anyone who gives you an exact number before they&rsquo;ve seen you drive is guessing. The honest answer is &ldquo;it depends,&rdquo; so here&rsquo;s what it depends on.',
      sections: [
        { id: 'factors', h: 'What changes the number', html: ul([
          '<strong>Where you&rsquo;re starting.</strong> Someone who has never driven needs more time than someone with a year of practice on their G1.',
          '<strong>How much you practise in between.</strong> Lessons teach the skill; practice with a family member or friend makes it stick.',
          '<strong>What you&rsquo;re aiming for.</strong> Getting ready for the G2 is different from getting ready for the G and its highway driving.',
          '<strong>Nerves.</strong> Anxiety is normal, and it&rsquo;s worth building in time to get comfortable.',
          '<strong>Your test date.</strong> A test in two weeks means a focused plan; a test in three months leaves room to build slowly.',
        ]) },
        { id: 'examples', h: 'Real examples from her reviews', html: p('These are from her Google reviews, so they&rsquo;re real, but they&rsquo;re not a promise. Everyone&rsquo;s starting point is different.') +
          quotes([
            quote(review('Karen Zhang', 'Very clear, patient, and considerate.', 'Learned a lot within two lessons.'), 'two lessons'),
            quote(review('Durga Ram', 'I\'ve had close to 8 driving lessons with Mrs. Akbar.', 'less or no driving experience.'), 'about eight lessons'),
          ]) +
          p('And at the far end: one student, Prasad, booked a single one-hour lesson two hours before their test, and passed. That works when the basics are already there and the test is the only thing left to polish.') },
        inlineCta('Want an honest estimate for you? Call or text Mrs. Akbar.'),
        { id: 'count', h: 'How to make every lesson count', html: ol([
          '<strong>Practise between lessons.</strong> Even short drives with an eligible driver beside you lock in what you learned.',
          '<strong>Say what scares you.</strong> Lessons spent on your weak spots are worth more than lessons on what you can already do.',
          '<strong>Book with a goal.</strong> &ldquo;Parallel parking&rdquo; or &ldquo;highway merges&rdquo; gives a lesson a clear focus.',
          '<strong>Tell her your test date early.</strong> Lessons can be spaced out sensibly instead of crammed into the last week.',
        ]) },
        { id: 'bde', h: 'A note on driver education courses', html: p('Ministry-approved beginner driver education courses are a separate thing. They run at least 40 hours and take four months off your G1 waiting period. If you only want lessons to build skills or prepare for a test, you don&rsquo;t need a full course.') },
      ],
      sources: [SRC.handbookLicence, SRC.getG],
      faqs: [
        ['How many driving lessons does a beginner need?', 'There&rsquo;s no fixed number. It depends on your starting point, how much you practise between lessons and your goal. One of her reviewers mentioned close to eight lessons; another wrote that they learned a lot within two.'],
        ['Can one lesson before my road test help?', 'It can, if the basics are already solid. One student booked a single lesson two hours before their test and passed.'],
      ],
      related: ['ontario-g1-g2-g-licence-explained', 'nervous-driver-tips', 'how-to-pass-the-g2-road-test'],
      lessons: lessonsChips(['/beginner-driving-lessons/', 'Beginner lessons'], ['/g2-road-test-preparation/', 'G2 road test prep']),
      cta: ['Ask for an honest estimate', 'Tell her where you&rsquo;re starting and when your test is. She&rsquo;ll tell you what she thinks it&rsquo;ll take.'],
    }),

    /* ---------- 6. Nervous drivers ---------- */
    guidePage({
      slug: 'nervous-driver-tips',
      title: 'Nervous About Driving? Practical Tips That Actually Help | Mrs. Akbar',
      description: 'Driving anxiety is common. Practical things that help before and during a drive, how to build up gradually, and how to handle test-day nerves.',
      script: 'getting started',
      dek: 'Practical things that help before and during a drive, and how to build up without overwhelming yourself.',
      intro: 'Being nervous behind the wheel doesn&rsquo;t mean you&rsquo;ll be a bad driver. Often it just means you take driving seriously, which is a good start. The goal isn&rsquo;t to stop caring. It&rsquo;s to stop the nerves from making decisions for you.',
      sections: [
        { id: 'common', h: 'You&rsquo;re not the only one', html: p('Words like anxious, nervous and test anxiety come up again and again in Mrs. Akbar&rsquo;s reviews, usually from people who went on to pass.') +
          quote(review('priyanka saha', 'As a nervous driver, her calm and reassuring approach', 'build confidence behind the wheel.')) },
        { id: 'before', h: 'Before you drive', html: ul([
          '<strong>Eat, sleep and give yourself time.</strong> Rushing to a lesson or a test starts the drive with your heart already racing.',
          '<strong>Set the car up properly.</strong> Seat, mirrors and steering wheel adjusted before you move. Feeling in control of the car is half the battle.',
          '<strong>Know the plan.</strong> Ask where you&rsquo;re going and what you&rsquo;ll practise. Surprises are what make nervous drivers tense.',
        ]) },
        { id: 'during', h: 'While you&rsquo;re driving', html: ul([
          '<strong>Breathe slowly at stops.</strong> Four seconds in, four seconds out, at red lights.',
          '<strong>Talk it through.</strong> Saying what you see (&ldquo;light&rsquo;s turning, car pulling out on the right&rdquo;) keeps your attention on the road instead of on the worry.',
          '<strong>Look far ahead.</strong> Staring at the bumper in front makes everything feel faster. Looking further up the road gives you more time.',
          '<strong>Pull over when you need to.</strong> Find somewhere safe, stop and reset. That&rsquo;s good driving, not failure.',
        ]) },
        inlineCta('Want calm lessons with no rush? Call or text Mrs. Akbar.'),
        { id: 'layers', h: 'Build up in layers', html: ol(['Quiet streets and empty parking lots', 'Residential streets with a bit of traffic', 'Busier roads with traffic lights and turning lanes', 'Faster roads, then the highway']) +
          p('Move to the next layer when the current one feels a little boring. Boring means your brain has stopped treating it as a threat.') },
        { id: 'specific', h: 'When the fear is about something specific', html: `<h3>Left turns</h3>${p('While you wait to turn left across traffic, keep your wheels pointing straight ahead until it&rsquo;s clear. If someone hits you from behind, straight wheels won&rsquo;t push you into oncoming traffic.')}` +
          `<h3>Merging</h3>${p('The scary part is usually going too slowly. Use the whole ramp to get up to speed; the <a href="/guides/g-road-test-tips/">G road test guide</a> walks through it.')}` +
          `<h3>Parking</h3>${p('It&rsquo;s a method, not a talent. The <a href="/guides/how-to-parallel-park/">parallel parking guide</a> breaks it into steps.')}` },
        { id: 'test', h: 'Test-day nerves', html: p('Practise in test conditions: someone giving directions without warning, no backup camera, and the full routine of mirror, signal and shoulder check. A lesson close to the test can help too.') +
          quote(review('Stephanie', 'She completely helped me overcome my test anxiety', 'until i felt 100% confident.'), 'passed the G2, first try') +
          p('If anxiety about driving is affecting your day-to-day life, it&rsquo;s worth mentioning to your doctor as well. That&rsquo;s a normal thing to do.') },
      ],
      sources: [SRC.handbookRoadTest, SRC.getG],
      faqs: [
        ['Is it normal to be scared of driving?', 'Very. Nervous drivers come up again and again in her reviews, and many of them went on to pass.'],
        ['What helps with driving anxiety during a lesson?', 'Slow breathing at stops, talking through what you see, looking further ahead, and pulling over somewhere safe when you need a minute.'],
      ],
      related: ['how-many-driving-lessons-do-you-need', 'how-to-pass-the-g2-road-test', 'how-to-parallel-park'],
      lessons: lessonsChips(['/driving-lessons-for-nervous-drivers/', 'Nervous drivers'], ['/beginner-driving-lessons/', 'Beginner lessons']),
      cta: ['One calm lesson at a time', 'Tell her you&rsquo;re nervous when you call. It&rsquo;s useful to know, and she&rsquo;s heard it plenty of times.'],
    }),

    /* ---------- 7. Newcomers ---------- */
    guidePage({
      slug: 'new-to-ontario-drivers-licence',
      title: 'New to Ontario? Getting Your Driver’s Licence | Mrs. Akbar',
      description: 'Moving to Ontario with a foreign licence: the 60-day rule, which countries can exchange, experience credit rules from July 2026, and documents to bring.',
      script: 'getting started',
      dek: 'The 60-day rule, licence exchanges, experience credit, and the documents DriveTest will ask for.',
      intro: 'If you&rsquo;ve just moved to Ontario with a licence from somewhere else, the path to an Ontario licence depends mostly on where your licence is from and how long you&rsquo;ve been driving.',
      sections: [
        { id: 'sixty', h: 'You have 60 days', html: p('New residents can drive on a valid licence from another province, state or country for 60 days. After that, you need an Ontario licence.') },
        { id: 'exchange', h: 'If your licence can be exchanged', html: p('Ontario has exchange agreements with every Canadian province and territory, the Canadian Armed Forces, U.S. states, and these countries: Australia, Austria, Belgium, Croatia, Denmark, France, Germany, Great Britain, Hungary, the Isle of Man, Japan, Kosovo, New Zealand, Northern Ireland, the Republic of Ireland, South Korea, Switzerland, Taiwan and Ukraine.') +
          ul(['<strong>Two or more years of experience</strong> in the last three years: you exchange for a full G, with no road test.', '<strong>Less than two years:</strong> you get a G2, and take the G road test once your total experience reaches two years.']) +
          p('Learner&rsquo;s permits can&rsquo;t be exchanged, from anywhere. Everyone exchanging takes a vision test.') },
        { id: 'credit', h: 'If it can&rsquo;t be exchanged', html: p('You go through graduated licensing: a vision test, a knowledge test, then the G2 road test, and the G road test at least 12 months later.') +
          callout('rule', 'New since July 1, 2026', p('You can be credited with up to 12 months of driving experience from the past three years. With the full 12 months, you can take the G2 road test right away. With less, you wait out the rest of the 12 months, or 8 months in total with an approved driver education course.')) +
          p('If your licence was issued more recently than you actually started driving, you&rsquo;ll need a letter of authentication to get credit for the extra time.') },
        inlineCta('Want to learn how Ontario&rsquo;s roads and tests work? Call or text Mrs. Akbar.'),
        { id: 'documents', h: 'What to bring to DriveTest', html: ul([
          'Original identity documents showing your legal name and date of birth',
          'Your original, valid foreign licence',
          'Original proof of your driving experience, in English or French',
          'Payment for fees',
        ]) + p('A licence that isn&rsquo;t in English or French needs a recent translation from an approved translator. A letter or abstract of authentication must be issued within the last six months, come from the licensing authority, an embassy, consulate or high commission, and show when you were first licensed, the class, the status and the expiry date. DriveTest doesn&rsquo;t accept letters from insurance companies or third-party websites.',
          'You can apply at any DriveTest centre as a walk-in, and Hamilton&rsquo;s centre also offers bookable appointments for exchanges.') },
        { id: 'different', h: 'What can feel different here', html: ul([
          'You can turn right on a red light after a full stop, unless a sign says otherwise.',
          'When a school bus has its red lights flashing, traffic in both directions stops, unless the road has a median.',
          'At pedestrian crossovers and school crossings, you wait until people have completely crossed the road.',
          'When you see an emergency vehicle or tow truck stopped with its lights flashing, slow down and move over if you safely can.',
          'Winter. If you&rsquo;ve never driven on snow and ice, the <a href="/guides/winter-driving-in-hamilton/">winter driving guide</a> is worth a read.',
        ]) + quote(review('Manasa Nandikonda', 'I was nervous about driving in new Country.', 'comfortable throughout the lessons.'), 'new to Canada, passed the G2') },
      ],
      sources: [SRC.exchange, SRC.exchangeDT, SRC.credits, SRC.handbookLicence],
      faqs: [
        ['How long can I drive in Ontario on a foreign licence?', 'For 60 days after becoming a resident, as long as the licence is valid.'],
        ['Can I exchange my licence for a full G?', 'If it&rsquo;s from a province, U.S. state or a country with an exchange agreement, and you have at least two years of driving experience in the last three years, yes, without a road test.'],
        ['How much foreign experience can count if my country has no exchange agreement?', 'Since July 1, 2026, up to 12 months of experience from the past three years can be credited.'],
      ],
      related: ['ontario-g1-g2-g-licence-explained', 'hamilton-drivetest-centre', 'winter-driving-in-hamilton'],
      lessons: lessonsChips(['/g2-road-test-preparation/', 'G2 road test prep'], ['/g-road-test-preparation/', 'G test and highway']),
      cta: ['New to Hamilton&rsquo;s roads?', 'Tell her where you learned to drive and what you need next. Lessons start from there.'],
    }),

    /* ---------- 8. Parallel parking ---------- */
    guidePage({
      slug: 'how-to-parallel-park',
      title: 'How to Parallel Park Step by Step (Ontario Method) | Mrs. Akbar',
      description: 'Parallel parking broken into simple steps that follow Ontario’s Driver’s Handbook, plus hill parking rules and fixes for the most common mistakes.',
      script: 'skills',
      dek: 'A simple, repeatable method, plus hill parking and fixes for the usual mistakes.',
      intro: 'Parallel parking feels impossible right up until the moment it clicks, and then it&rsquo;s just a routine. These steps follow the method in Ontario&rsquo;s Driver&rsquo;s Handbook, written as plainly as we could manage.',
      sections: [
        { id: 'space', h: 'Pick a space that fits', html: p('Look for a gap about one and a half times the length of your car. Smaller than that and you&rsquo;ll be doing a lot of back and forth; bigger is fine while you learn.') },
        { id: 'steps', h: 'The steps', html: ol([
          '<strong>Check traffic and signal</strong> toward the curb.',
          '<strong>Pull up beside the car in front of the space,</strong> about a metre away from it. Stop when your back bumper lines up with its back bumper.',
          '<strong>Reverse slowly, turning the wheel all the way toward the curb.</strong> Look over your shoulder and check around you as you go.',
          '<strong>Watch for the back corner of the car in front of your space.</strong> Once you can see its outside rear corner, straighten your wheels and keep reversing slowly.',
          '<strong>Turn the wheel all the way toward the road.</strong> The front of your car swings in, and the car straightens up beside the curb.',
          '<strong>Fix it if it&rsquo;s not straight.</strong> Pull forward a little and adjust. Nobody is marked down for a small correction.',
          '<strong>Park properly.</strong> Parking brake on, shift to park, engine off. Check for traffic and cyclists before you open your door.',
        ]) + callout('tip', 'On the road test', p('Leave some space to the car you park behind. The Handbook&rsquo;s road test chapter suggests at least 60 cm. And practise without your backup camera, because it can&rsquo;t be used during the test.')) },
        { id: 'fixes', h: 'Fixing the usual mistakes', html: `<h3>You end up too far from the curb</h3>${p('You probably straightened out too early, or started too far from the car beside you. Try turning toward the curb a moment longer.')}` +
          `<h3>Your back tire hits the curb</h3>${p('You turned toward the curb for too long. Straighten the wheels a little sooner, as soon as that rear corner appears.')}` +
          `<h3>The front of the car sticks out</h3>${p('You turned toward the road too late, or not far enough. Turn the wheel fully, and do it a touch earlier next time.')}` },
        inlineCta('Want parking to finally click? Call or text Mrs. Akbar.'),
        { id: 'hills', h: 'Parking on a hill', html: ul([
          '<strong>Facing downhill, curb or no curb:</strong> turn your front wheels toward the curb or the right shoulder.',
          '<strong>Facing uphill with a curb:</strong> turn your wheels toward the road. If the car rolls back, the tire catches the curb.',
          '<strong>Facing uphill with no curb:</strong> turn your wheels sharply right, so a rolling car goes off the road, not into traffic.',
        ]) + p('Every time: parking brake on and shift to park. Hamilton gives you plenty of hills to practise on, especially in Dundas and Ancaster.') },
        { id: 'practise', h: 'Practise somewhere quiet', html: p('An empty parking lot with two markers, like recycling bins or pylons, is the perfect place to start. Set them a little more than one and a half car lengths apart and repeat until the steps are automatic. Then try it on a quiet street.') +
          quotes([quote(review('Rose Nyarko', 'She made parallel parking and reverse parking easy to learn and understand.')), quote(review('Malaika J', 'She makes parallel parking and reverse parking so easy.'), 'passed on the first try')]) },
      ],
      sources: [SRC.handbookParking, SRC.handbookRoadTest, SRC.roadTests],
      faqs: [
        ['How big a space do I need to parallel park?', 'About one and a half times the length of your car.'],
        ['Which way do I turn my wheels when parking downhill?', 'Toward the curb or the right shoulder, whether or not there&rsquo;s a curb.'],
        ['Is parallel parking on the Ontario road test?', 'It&rsquo;s one of the skills DriveTest lists for the G2 road test. The modified G test at full-time DriveTest centres currently leaves it out.'],
      ],
      related: ['how-to-pass-the-g2-road-test', 'driving-the-hamilton-mountain-accesses', 'nervous-driver-tips'],
      lessons: lessonsChips(['/parallel-parking-lessons/', 'Parallel parking lessons'], ['/g2-road-test-preparation/', 'G2 road test prep']),
      cta: ['Make parking the easy part', 'Tell her which kind of parking you dread most, and that&rsquo;s where the lesson starts.'],
    }),

    mountainGuide(),

    /* ---------- 10. Winter ---------- */
    guidePage({
      slug: 'winter-driving-in-hamilton',
      title: 'Winter Driving in Hamilton: Tips for New Drivers | Mrs. Akbar',
      description: 'Winter driving tips for new drivers in Hamilton: winter tires and the insurance discount, where ice forms first, skids, the Mountain in snow and winter road tests.',
      script: 'hamilton roads',
      dek: 'Tires, ice, skids, the Mountain in snow, and what happens to road tests in bad weather.',
      intro: 'Your first winter behind the wheel changes how you drive. Everything takes longer: stopping, turning, even seeing. The good news is that most winter driving comes down to a few habits.',
      sections: [
        { id: 'tires', h: 'Start with the tires', html: p('Winter tires make the biggest single difference. Ontario says they can shorten braking distances by as much as 25%. The Driver&rsquo;s Handbook recommends four winter or all-weather tires with the same tread pattern, rather than a pair.') +
          callout('tip', 'Ask about the discount', p('Ontario requires every auto insurer to offer a discount for winter tires on private passenger policies, a rule in place since January 1, 2016. The amount varies, so ask your insurer.')) },
        { id: 'before', h: 'Before you pull away', html: ul([
          'Clear every window, mirror and light. A peephole in the windshield isn&rsquo;t enough.',
          'Brush the snow off the roof too, so it doesn&rsquo;t slide down over your windshield the first time you brake.',
          'Give yourself extra time. Rushing is when winter mistakes happen.',
        ]) },
        { id: 'driving', h: 'On the road', html: ul([
          '<strong>Slow down,</strong> and make every movement gentle: steering, braking and speeding up.',
          '<strong>Leave far more than two seconds</strong> behind the car ahead. Two seconds is for dry, ideal roads.',
          '<strong>Don&rsquo;t use cruise control</strong> in snow or bad weather.',
          '<strong>Expect ice first</strong> on bridges, overpasses and shaded spots. Asphalt that looks shiny and black may be black ice.',
        ]) },
        inlineCta('Want winter lessons before your first snowfall? Call or text Mrs. Akbar.'),
        { id: 'skids', h: 'If the car starts to slide', html: p('Look and steer where you want the car to go, not at what you&rsquo;re afraid of hitting. Ease off the gas. If your car has anti-lock brakes and you need to stop, press the brake firmly and keep pressure on; the pulsing you feel is the system working.') },
        { id: 'hamilton', h: 'Hamilton in winter', html: p('The escarpment is the big one. The Mountain accesses are steep and some are shaded, so they can be icy when the rest of the city is just wet. Take them slowly, leave lots of room, and avoid stopping on the hill if you can. The <a href="/guides/driving-the-hamilton-mountain-accesses/">Mountain accesses guide</a> covers each one.',
          'The Linc and the Red Hill Valley Parkway have plenty of bridges and overpasses, which freeze before the road around them.') },
        { id: 'tests', h: 'Road tests in winter', html: p('DriveTest runs road tests in any weather unless it tells you otherwise. In extreme weather, check the service disruptions page on drivetest.ca before you leave. If your test is in winter, make sure the car&rsquo;s wipers and defroster work, because the examiner checks them when the weather calls for it.') },
      ],
      sources: [SRC.winter, SRC.handbookWeather, SRC.fsra, SRC.roadTests],
      faqs: [
        ['Do Ontario insurers give a discount for winter tires?', 'Yes. Every Ontario auto insurer must offer one for private passenger policies issued or renewed since January 1, 2016. The amount varies by insurer.'],
        ['Do road tests get cancelled for snow?', 'Road tests go ahead in any weather unless DriveTest tells you otherwise. Check DriveTest&rsquo;s service disruptions page in extreme weather.'],
        ['Where does ice form first?', 'On bridges, overpasses and shaded parts of the road. Shiny black pavement can be black ice.'],
      ],
      related: ['driving-the-hamilton-mountain-accesses', 'g-road-test-tips', 'nervous-driver-tips'],
      lessons: lessonsChips(['/g-road-test-preparation/', 'G test and highway'], ['/driving-lessons-hamilton/', 'Lessons in Hamilton']),
      cta: ['Get some winter practice in', 'A lesson or two in winter conditions takes a lot of the fear out of the first snowfall.'],
    }),
  ];
}

/* ---------- Guides hub ---------- */
export function guidesHub() {
  const path = '/guides/';
  const trail = [['Home', '/'], ['Guides', path]];
  const desc = {
    'how-to-pass-the-g2-road-test': 'What examiners watch for, a practice plan for the last few weeks, and what to bring on the day.',
    'hamilton-drivetest-centre': 'Booking, the car check, and what happens before and after a test at Kenora Avenue.',
    'g-road-test-tips': 'The highway declaration, what the test covers right now, and merging without drama.',
    'ontario-g1-g2-g-licence-explained': 'How each licence level works, the rules that come with it, and how long it takes.',
    'how-many-driving-lessons-do-you-need': 'What changes the number, with real examples from her reviews.',
    'nervous-driver-tips': 'Practical things that help before and during a drive.',
    'new-to-ontario-drivers-licence': 'The 60-day rule, licence exchanges and experience credit.',
    'how-to-parallel-park': 'A simple, repeatable method, plus hill parking.',
    'driving-the-hamilton-mountain-accesses': 'The escarpment roads, one by one, and how to drive them.',
    'winter-driving-in-hamilton': 'Tires, ice, skids and the Mountain in snow.',
  };
  const featured = GUIDE_LIST[0];
  const groups = [...new Set(GUIDE_LIST.map((g) => g.cat))];
  const main = `<section class="phero" aria-labelledby="page-title">
  <div class="container phero-grid">
    <div class="phero-copy">
      ${crumbs(trail)}
      <p class="script phero-script"><span>read before you drive</span></p>
      <h1 class="phero-title" id="page-title" data-letters>Driving guides for Hamilton learners</h1>
      <p class="phero-lede">Plain answers about Ontario&rsquo;s licences, road tests and the roads around Hamilton. Checked against ontario.ca and DriveTest, and written for people who are still learning.</p>
    </div>
    <div class="phero-art" aria-hidden="true" data-play>${artGuides()}</div>
  </div>
</section>
${sec({
  id: 'all', tone: 'white', script: 'start here', title: 'Every guide',
  body: `<a class="ghub-feature" href="/guides/${featured.slug}/" data-reveal><span><span class="gcard-cat">${featured.cat}</span><span class="gcard-title" style="display:block">${featured.title}</span><span class="gcard-desc" style="display:block">${desc[featured.slug]}</span><span class="gcard-go">Read the guide<svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></span></span><span class="gcard-sign" aria-hidden="true">${signIcon(featured.sign)}</span></a>` +
    groups.map((cat) => `<div class="ghub-group"><h3 class="ghub-group-title" data-reveal>${cat.toLowerCase()}</h3>${guideCards(GUIDE_LIST.filter((g) => g.cat === cat && g.slug !== featured.slug).map((g) => g.slug), desc)}</div>`).join(''),
})}
${ctaBand({ title: 'Rather ask in person?', text: 'Call or text Mrs. Akbar with your question. If it&rsquo;s about your licence or your test, she&rsquo;s probably been asked it before.' })}`;
  return {
    type: 'hub', path, trail, name: 'Guides', h1: 'Driving guides for Hamilton learners',
    title: 'Driving Guides for Ontario Learners in Hamilton | Mrs. Akbar',
    description: 'Guides for learner drivers in Hamilton: passing the G2 and G road tests, the Hamilton DriveTest centre, parallel parking, the Mountain accesses and winter driving.',
    main, webPageType: 'CollectionPage', ogScript: 'read before you drive',
    ld: [{
      '@type': 'ItemList',
      '@id': `${abs(path)}#list`,
      itemListElement: GUIDE_LIST.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/guides/${g.slug}/`), name: g.title.replace(/’/g, '’') })),
    }],
  };
}
