// Lesson pages. Rules are paraphrased from ontario.ca and drivetest.ca (checked 2026-10-06);
// every quote comes from her Google reviews through review(), which rejects anything not word for word.
import { review, REVIEWS_COUNT, SERVICES, abs, plain } from './core.mjs';
import { bizRef } from './layout.mjs';
import { pageHero, sec, facts, lead, prose, checks, steps, quote, quotes, notes, faq, chips, guideCards, ctaBand, sources } from './ui.mjs';
import { artBeginner, artNervous, artG2, artHighway, artParking, artAdult } from './art.mjs';

const ONTARIO_G = ['Get a G driver&rsquo;s licence: new drivers (ontario.ca)', 'https://www.ontario.ca/page/get-g-drivers-licence-new-drivers'];
const DT_ROAD = ['Road tests for cars (drivetest.ca)', 'https://drivetest.ca/tests/road-tests-cars/'];
const HANDBOOK_PARK = ['Driver&rsquo;s Handbook: parking along roadways (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/parking-along-roadways'];
const HANDBOOK_FREEWAY = ['Driver&rsquo;s Handbook: freeway driving (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/freeway-driving'];
const EXCHANGE = ['Exchange an out-of-province driver&rsquo;s licence (ontario.ca)', 'https://www.ontario.ca/page/exchange-out-province-drivers-licence'];

const otherLessons = (slug) => chips(SERVICES.filter((s) => s.slug !== slug).map((s) => ({ href: `/${s.slug}/`, label: s.label })));
const ratingFacts = [
  { num: '5.0', label: 'average on Google' },
  { num: REVIEWS_COUNT, count: REVIEWS_COUNT, label: 'Google reviews in Hamilton' },
  { num: '7', count: 7, label: 'days a week, by appointment' },
];

function servicePage(p) {
  const path = `/${p.slug}/`;
  const trail = [['Home', '/'], [p.crumb, path]];
  const main = [
    pageHero({ trail, script: p.script, h1: p.h1, lede: p.lede, art: p.art }),
    ...p.sections,
    sec({ id: 'questions', tone: 'paper', script: 'good questions', title: p.faqTitle || 'Questions people ask', center: true, body: faq(p.faqs, p.slug) }),
    sec({
      id: 'more', tone: 'white', script: 'keep reading', title: 'Guides and other lessons',
      body: `${guideCards(p.guides)}<div class="more-lessons" data-reveal><p class="more-lessons__title">Other lessons</p>${otherLessons(p.slug)}</div>`,
    }),
    ctaBand({ title: p.cta[0], text: p.cta[1] }),
  ].join('\n');
  return {
    type: 'service', path, trail, name: p.name, h1: p.h1, title: p.title, description: p.description, faqs: p.faqs, main,
    ogScript: p.script,
    about: { '@id': `${abs(path)}#service` },
    ld: [{
      '@type': 'Service',
      '@id': `${abs(path)}#service`,
      name: plain(p.h1),
      serviceType: p.serviceType,
      description: plain(p.description),
      url: abs(path),
      provider: bizRef,
      areaServed: [{ '@type': 'City', name: 'Hamilton', sameAs: 'https://en.wikipedia.org/wiki/Hamilton,_Ontario' }],
      audience: p.audience ? { '@type': 'Audience', audienceType: p.audience } : undefined,
    }],
  };
}

export function servicePages() {
  return [
    /* ---------------- Beginner ---------------- */
    servicePage({
      slug: 'beginner-driving-lessons', crumb: 'Beginner lessons', name: 'Beginner driving lessons',
      title: 'Beginner Driving Lessons in Hamilton | Mrs. Akbar',
      description: 'Never driven before? One-on-one beginner driving lessons in Hamilton with a patient female instructor who comes to you. G1 basics at your pace. Call 416-457-5778.',
      script: 'first time behind the wheel',
      h1: 'Beginner driving lessons in Hamilton',
      lede: 'Just passed your G1 knowledge test, and the driver&rsquo;s seat still feels like someone else&rsquo;s? Start here. One-on-one, in the car, at your pace.',
      art: artBeginner(), serviceType: 'Beginner driving lessons', audience: 'New drivers with a G1 licence',
      sections: [
        sec({
          id: 'start', tone: 'white', script: 'where you start', title: 'Never driven? That&rsquo;s fine',
          body: lead('Some of her students had never sat behind the wheel before their first lesson. Gurleen wrote that they had never driven a car before, and they passed the G2. <em>Nobody expects you to know anything yet.</em>') + facts(ratingFacts),
        }),
        sec({
          id: 'cover', tone: 'paper', script: 'lesson by lesson', title: 'What the first lessons cover',
          meta: 'The basics, in a sensible order, with no skipping ahead.',
          body: checks([
            'Setting up your seat, mirrors and steering wheel so you can see and reach everything',
            'Smooth starts and gentle stops, before there&rsquo;s much traffic around',
            'Left and right turns without swinging wide or cutting the corner',
            'Full stops at stop signs, and taking your turn at a four-way stop',
            'Mirror and shoulder checks every time you pull away or change lanes',
            'Keeping at least two seconds of space behind the car ahead',
          ]),
        }),
        sec({
          id: 'how', tone: 'white', script: 'the usual route', title: 'How the first few lessons go',
          body: steps([
            { title: 'You call and say where you&rsquo;re at', text: 'G1 for a week or a year, some practice with family or none at all. Every answer is normal, and it decides where lesson one starts.' },
            { title: 'The car first, then the road', text: 'Mirrors, signals, and how the brake and gas actually feel under your foot. Small things, but everything else is built on them.' },
            { title: 'Repeat until it&rsquo;s boring', text: 'Turns, stops and keeping your lane, practised until they stop feeling like a big deal.' },
            { title: 'Busier roads when you&rsquo;re ready', text: 'More traffic comes once the basics happen without you thinking about them. Not before.' },
          ]),
        }),
        sec({
          id: 'reviews', tone: 'sand', script: 'from her reviews', title: 'From people who started at zero',
          body: quotes([
            quote(review('gurleen kaur', 'I recently passed my G2 licence', 'I passed it today.'), 'passed the G2'),
            quote(review('Durga Ram', 'I would definitely recommend her for beginners', 'driving experience.'), 'about 8 lessons in'),
          ]),
        }),
        sec({
          id: 'g1-rules', tone: 'white', script: 'good to know', title: 'G1 rules, in plain words',
          body: prose(`<p>A G1 is a learner&rsquo;s licence, so Ontario attaches a few conditions to it. The ones that matter most while you learn:</p>
<ul>
<li>A fully licensed driver with at least four years of experience sits beside you, and nobody else rides in the front.</li>
<li>No driving between midnight and 5&nbsp;a.m.</li>
<li>Zero alcohol in your blood, every time.</li>
<li>No 400-series highways, such as the 403, and no QEW, unless the person beside you is a licensed driving instructor.</li>
</ul>
<p>That last rule is why lessons are a common way to get highway practice early. The <a href="/guides/ontario-g1-g2-g-licence-explained/">G1, G2 and G guide</a> walks through all three levels.</p>`) + sources([ONTARIO_G]),
        }),
      ],
      faqs: [
        ['I&rsquo;ve never driven at all. Can I still book?', 'Yes. Some of her students started from zero. One reviewer, Gurleen, wrote that they had never driven a car before their lessons, and they passed the G2.'],
        ['Do I need my G1 first?', 'Yes. The G1 is the learner&rsquo;s licence that lets you practise on Ontario roads. You get it by passing a vision test and a knowledge test on the rules of the road and traffic signs at a DriveTest centre. The knowledge test is walk-in, no appointment needed.'],
        ['How many lessons will I need?', 'It depends on where you&rsquo;re starting. One student mentioned having close to 8 lessons; another wrote that they learned a lot within two. Once Mrs. Akbar knows your starting point, she can give you an honest idea.'],
        ['Can a parent or friend help me practise between lessons?', 'Yes, as long as they meet the G1 rules for the person beside you: fully licensed, at least four years of driving experience, and a blood alcohol level under .05 (zero if they&rsquo;re 21 or under). Practising what you covered in a lesson helps it stick.'],
      ],
      guides: ['ontario-g1-g2-g-licence-explained', 'how-many-driving-lessons-do-you-need', 'nervous-driver-tips'],
      cta: ['Book your first lesson', 'Tell her you&rsquo;re a beginner, where you live and when you&rsquo;re free. She&rsquo;ll take it from there.'],
    }),

    /* ---------------- Nervous drivers ---------------- */
    servicePage({
      slug: 'driving-lessons-for-nervous-drivers', crumb: 'Nervous drivers', name: 'Driving lessons for nervous drivers',
      title: 'Driving Lessons for Nervous Drivers in Hamilton | Mrs. Akbar',
      description: 'Anxious about driving? Calm, patient one-on-one lessons in Hamilton with a female instructor whose reviews keep mentioning nerves. Call 416-457-5778.',
      script: 'no rush, ever',
      h1: 'Driving lessons for nervous drivers',
      lede: 'Sweaty hands at every left turn. A knot in your stomach on the highway. One bad drive you can&rsquo;t shake. Plenty of her students started out exactly like that.',
      art: artNervous(), serviceType: 'Driving lessons for anxious and nervous drivers', audience: 'Nervous and anxious drivers',
      sections: [
        sec({
          id: 'you', tone: 'white', script: 'you&rsquo;re in good company', title: 'Nerves come up a lot in her reviews',
          body: lead('Anxious driver, nervous driver, test anxiety. Those words show up again and again in her Google reviews, and <em>most of those reviews end with a pass.</em>') + facts(ratingFacts),
        }),
        sec({
          id: 'difference', tone: 'paper', script: 'what helps', title: 'What makes it easier',
          body: notes([
            { claim: 'She doesn&rsquo;t rush you.', r: review('priyanka saha', 'She explained everything clearly, never rushed me', 'always made me feel comfortable.') },
            { claim: 'Mistakes don&rsquo;t get a reaction.', r: review('Aleena Khan', 'even told me not to worry when I made mistakes', 'she is very reassuring') },
            { claim: 'She listens first.', r: review('Oeindrila Chaudhuri', 'she took the time to understand my concerns about driving.') },
            { claim: 'You practise until it feels normal.', r: review('Stephanie', 'She completely helped me overcome my test anxiety', 'until i felt 100% confident.') },
          ]),
        }),
        sec({
          id: 'tips', tone: 'white', script: 'between lessons', title: 'Small things that help',
          body: steps([
            { title: 'Breathe on purpose', text: 'At red lights, breathe in for four seconds and out for four. It sounds too simple, but slow breathing really does settle your body.' },
            { title: 'Start at quiet times', text: 'Weekend mornings are calmer than weekday rush hour. Easy drives early make the busy roads less scary later.' },
            { title: 'Name the thing that scares you', text: 'Left turns across traffic? Merging? Say it out loud at the start of a lesson. A specific fear is much easier to practise than a vague one.' },
            { title: 'Drive the same route twice', text: 'Repeating a route takes the guessing out of it, so your attention goes to the driving instead of the directions.' },
          ]) + `<p class="more-link" data-reveal><a href="/guides/nervous-driver-tips/">More in the nervous driver guide</a></p>`,
        }),
        sec({
          id: 'reviews', tone: 'sand', script: 'in their words', title: 'From people who were nervous too',
          body: quotes([
            quote(review('Sarah', 'Mrs. Akbar is so patient and kind, especially helpful for anxious drivers.'), 'passed the G2, first try'),
            quote(review('Manasa Nandikonda', 'I was nervous about driving in new Country.', 'comfortable throughout the lessons.'), 'passed the G2, first try'),
          ]),
        }),
      ],
      faqs: [
        ['What if I panic during a lesson?', 'Say so. You can pull over somewhere safe and take a minute. A lesson isn&rsquo;t a test, and nobody is marking you.'],
        ['I failed my road test and lost my confidence. Can lessons help?', 'Yes. Tell her what happened on the test when you call, so the lessons can go straight at it instead of starting over. DriveTest generally asks you to wait at least 10 days before testing again, which is a useful window for practice.'],
        ['Does it help that she&rsquo;s a woman?', 'For some people it does. Aleena wrote about wanting a female instructor due to personal preference and comfort, as someone who can be an anxious driver, and passed the G2 on the first try.'],
        ['How long until I feel confident?', 'Everyone is different. One student, Katherine, wrote: &ldquo;After just a few lessons, I already feel much more confident behind the wheel.&rdquo;'],
      ],
      guides: ['nervous-driver-tips', 'how-many-driving-lessons-do-you-need', 'how-to-pass-the-g2-road-test'],
      cta: ['Start with one calm lesson', 'Tell her you&rsquo;re nervous when you call. It&rsquo;s useful to know, and it&rsquo;s nothing she hasn&rsquo;t heard before.'],
    }),

    /* ---------------- G2 ---------------- */
    servicePage({
      slug: 'g2-road-test-preparation', crumb: 'G2 road test prep', name: 'G2 road test preparation',
      title: 'G2 Road Test Preparation in Hamilton | Mrs. Akbar',
      description: 'Get ready for your G2 road test in Hamilton: turns, lane changes, one-way streets, parallel parking and three-point turns. Call 416-457-5778.',
      script: 'test day, sorted',
      h1: 'G2 road test preparation in Hamilton',
      lede: 'The G2 road test takes about 20 minutes, and the examiner is watching for specific things. Lessons go straight at those, so the test feels like one more drive.',
      art: artG2(), serviceType: 'G2 road test preparation', audience: 'G1 drivers preparing for the G2 road test',
      sections: [
        sec({
          id: 'timing', tone: 'white', script: 'the basics', title: 'When you can take the G2',
          body: lead('You can take the G2 road test once you&rsquo;ve held your G1 for 12 months, or <em>8 months if you finish a government-approved driver education course.</em> Book through DriveTest, then call Mrs. Akbar with your date so the lessons can work back from it.') +
            facts([
              { num: '12', count: 12, unit: 'months', label: 'on a G1 before the G2 road test' },
              { num: '8', count: 8, unit: 'months', label: 'with an approved driver education course' },
              { num: '20', count: 20, unit: 'min', label: 'roughly how long the G2 test takes' },
            ]),
        }),
        sec({
          id: 'focus', tone: 'paper', script: 'on the test', title: 'What lessons focus on',
          meta: 'DriveTest lists these as the basic skills the G2 test checks.',
          body: checks([
            'Left and right turns at lights and stop signs',
            'Stopping fully, and in the right place',
            'Lane changes, with mirror and shoulder checks',
            'One-way streets, which Hamilton has plenty of',
            'Traffic lights, stop signs and yield signs',
            'Residential streets',
            'Parallel parking',
            'Three-point turns',
          ]) + quote(review('Gaurav Singh', 'Each lesson was well planned', 'defensive driving.'), 'passed the G2, first try'),
        }),
        sec({
          id: 'plan', tone: 'white', script: 'the plan', title: 'How lessons fit around your test date',
          body: steps([
            { title: 'Tell her your test date', text: 'And which DriveTest centre you booked. Lessons get planned backwards from there.' },
            { title: 'A first drive to find the gaps', text: 'Most people are solid on some things and shaky on others. The first lesson shows which is which.' },
            { title: 'Practise the test skills', text: 'Turns, lane changes, parking and three-point turns, repeated until they&rsquo;re boring.' },
            { title: 'A last lesson close to the test', text: 'Some students book a warm-up right before. Prasad booked a one-hour lesson two hours before their test, and passed.' },
          ]),
        }),
        sec({
          id: 'reviews', tone: 'sand', script: 'from her reviews', title: 'Passed, and said so',
          body: quotes([
            quote(review('Gazali Fauzan', 'The lessons were structured and focused on what the examiner looks for.'), 'passed the G2'),
            quote(review('Sarah', 'She taught me proper driving techniques', 'which I did in first attempt.'), 'passed the G2, first try'),
          ]),
        }),
        sec({
          id: 'centre', tone: 'white', script: 'on test day', title: 'Testing at the Hamilton DriveTest centre',
          body: prose(`<p>Hamilton&rsquo;s DriveTest centre is at 370 Kenora Avenue North, in the east end near Barton Street. A few things that catch people out:</p>
<ul>
<li>DriveTest doesn&rsquo;t supply cars. You bring one that&rsquo;s plated, insured and in good working order, with enough gas for the test.</li>
<li>Arrive at least 30 minutes early, with your licence and glasses or contacts if you drive with them.</li>
<li>Backup cameras and parking aids can&rsquo;t be used during the test, so practise without them.</li>
<li>To cancel or move your test without losing the fee, give at least 48 hours&rsquo; notice.</li>
</ul>
<p>The <a href="/guides/hamilton-drivetest-centre/">Hamilton DriveTest centre guide</a> has the rest, from booking to what happens after you pass.</p>`) + sources([DT_ROAD, ONTARIO_G]),
        }),
      ],
      faqs: [
        ['When can I take my G2 road test?', 'After 12 months on your G1, or 8 months if you complete a government-approved beginner driver education course.'],
        ['What does the G2 road test check?', 'Basic skills: left and right turns, stopping, lane changes, one-way streets, traffic lights and stop and yield signs, residential driving, parallel parking and three-point turns. It usually takes about 20 minutes.'],
        ['Can I book a lesson right before my test?', 'Sometimes, yes. One student, Prasad, booked a one-hour lesson two hours before their test, and passed. Her schedule changes day to day, so call as early as you can.'],
        ['What if I don&rsquo;t pass?', 'You can test again while your licence is valid. DriveTest generally asks you to wait at least 10 days between tests, and your scoresheet shows exactly what to work on in the meantime.'],
      ],
      guides: ['how-to-pass-the-g2-road-test', 'hamilton-drivetest-centre', 'how-to-parallel-park'],
      cta: ['Got a test date? Call her', 'Tell her the date and which DriveTest centre you booked, and lessons can be planned around it.'],
    }),

    /* ---------------- G / highway ---------------- */
    servicePage({
      slug: 'g-road-test-preparation', crumb: 'G test and highway', name: 'G road test and highway driving lessons',
      title: 'G Test & Highway Driving Lessons in Hamilton | Mrs. Akbar',
      description: 'Prepare for the G road test in Hamilton with highway lessons on the 403, the QEW, the Linc and the Red Hill. Merging, lane changes and exits. Call 416-457-5778.',
      script: 'the full licence',
      h1: 'G test and highway driving lessons',
      lede: 'The G road test adds the highway: merging at speed, changing lanes with traffic all around you, and getting off at the right exit. Hamilton has all of it: the Linc, the Red Hill, the 403 and the QEW.',
      art: artHighway(), serviceType: 'G road test preparation and highway driving lessons', audience: 'G2 drivers preparing for the G road test',
      sections: [
        sec({
          id: 'roads', tone: 'white', script: 'close to home', title: 'Highways around Hamilton',
          body: `<ol class="spots">
<li class="spot" data-reveal><h3 class="spot-name"><span>Highway 403</span></h3><p>West through Ancaster toward Brantford, and north through the west end toward Burlington. It&rsquo;s one of the roads the G test&rsquo;s highway declaration counts.</p></li>
<li class="spot" data-reveal style="--d:80ms"><h3 class="spot-name"><span>The QEW</span></h3><p>Fast and busy along the lake through Stoney Creek, with Burlington one way and Niagara the other. Also on the declaration list.</p></li>
<li class="spot" data-reveal><h3 class="spot-name"><span>The Linc</span></h3><p>The Lincoln Alexander Parkway runs across the Mountain, from the 403 to the Red Hill. A good first taste of merging and keeping pace.</p></li>
<li class="spot" data-reveal style="--d:80ms"><h3 class="spot-name"><span>Red Hill Valley Parkway</span></h3><p>Carries on from the Linc down to the QEW, with curves through the valley. Most of it is posted at 80 km/h.</p></li>
</ol>`,
        }),
        sec({
          id: 'focus', tone: 'paper', script: 'on the G test', title: 'What lessons focus on',
          meta: 'At full-time DriveTest centres, the G test is currently a shorter version focused on these.',
          body: checks([
            'Merging on and off the highway at the speed of traffic',
            'Speed and space: at least two seconds behind the car ahead',
            'Lane changes at highway speed, with shoulder checks',
            'Curves, turns and busy intersections',
            'Driving through business areas',
            'Signalling early, and cancelling the signal after',
          ]),
        }),
        sec({
          id: 'declaration', tone: 'white', script: 'before you book', title: 'The highway declaration',
          body: lead('Before the G road test, you sign a declaration of your highway driving. <em>DriveTest asks for at least five trips in the last three months</em> on a 400-series highway, a freeway like the QEW, or a highway signed at 80 km/h or more.') +
            prose(`<p>If you can&rsquo;t honestly sign it, the test is cancelled and you lose half the fee. Lessons on the 403 and the QEW count toward those trips, and they&rsquo;re a calmer way to build them than your first solo merge.</p>
<p>On a G1, you can only use those highways with a licensed driving instructor beside you, so lessons are also how many people get their first highway time.</p>`) + sources([DT_ROAD, HANDBOOK_FREEWAY]),
        }),
        sec({
          id: 'reviews', tone: 'sand', script: 'from her reviews', title: 'Passed the G, and said so',
          body: quotes([
            quote(review('Maher Ahmad', 'She helped me prepare for the G test', 'pass on the first try!'), 'passed the G, first try'),
            quote(review('Tega Edwin', 'She made every lesson clear', 'explained step-by-step.')),
          ]),
        }),
      ],
      faqs: [
        ['When can I take the G road test?', 'After you&rsquo;ve held your G2 for 12 months. You have five years in total to finish graduated licensing.'],
        ['Do I need highway experience before the G test?', 'Yes. You sign a declaration of highway driving experience, and DriveTest asks for at least five trips in the three months before the test on 400-series highways, freeways like the QEW, or highways signed at 80 km/h or more.'],
        ['Is parallel parking on the G test?', 'Not at the moment at full-time DriveTest centres. The G test there is currently a modified version that leaves out parallel parking, the roadside stop, the three-point turn and residential driving. Part-time Travel Point locations still give the standard test.'],
        ['Can I practise on the highway with a G1?', 'Only with a licensed driving instructor. G1 drivers can&rsquo;t use 400-series highways like the 403, or the QEW, unless the person beside them is a driving instructor.'],
      ],
      guides: ['g-road-test-tips', 'hamilton-drivetest-centre', 'winter-driving-in-hamilton'],
      cta: ['Ready for the full licence?', 'Tell her when your G test is and how much highway driving you&rsquo;ve done. She&rsquo;ll plan the lessons around both.'],
    }),

    /* ---------------- Parking ---------------- */
    servicePage({
      slug: 'parallel-parking-lessons', crumb: 'Parallel parking', name: 'Parallel parking lessons',
      title: 'Parallel Parking Lessons in Hamilton | Mrs. Akbar',
      description: 'Parallel parking, reverse parking, three-point turns and hill parking, practised until they feel easy. One-on-one lessons in Hamilton. Call 416-457-5778.',
      script: 'the bit everyone dreads',
      h1: 'Parallel parking lessons',
      lede: 'Parking comes up in her reviews more than any other skill. It isn&rsquo;t a talent. It&rsquo;s a method, and once it clicks, it stays.',
      art: artParking(), serviceType: 'Parallel parking and parking manoeuvre lessons',
      sections: [
        sec({
          id: 'cover', tone: 'white', script: 'all of it', title: 'Everything that involves parking',
          body: checks([
            'Parallel parking between two cars',
            'Reversing into a parking spot',
            'Three-point turns on narrow streets',
            'Parking uphill and downhill, wheels turned the right way',
            'Tight spaces in busy plaza parking lots',
            'Doing it all without leaning on a backup camera',
          ]) + quote(review('Malaika J', 'She makes parallel parking and reverse parking so easy.'), 'passed on the first try'),
        }),
        sec({
          id: 'method', tone: 'paper', script: 'the method', title: 'Parallel parking, in short',
          meta: 'The same steps as Ontario&rsquo;s Driver&rsquo;s Handbook, in plain words.',
          body: steps([
            { title: 'Find a space that fits', text: 'About one and a half times the length of your car. Check traffic and signal.' },
            { title: 'Line up beside the car in front', text: 'Stop about a metre away from it, with your back bumper level with its back bumper.' },
            { title: 'Reverse and turn toward the curb', text: 'Back up slowly with the wheel turned all the way toward the curb. Once you can see the back corner of the car in front of your space, straighten the wheels and keep going.' },
            { title: 'Swing the front in', text: 'Turn the wheel all the way toward the road to bring the car parallel. Not quite straight? Pull forward a little and fix it.' },
          ]) + `<p class="more-link" data-reveal><a href="/guides/how-to-parallel-park/">The full step-by-step guide</a></p>` + sources([HANDBOOK_PARK]),
        }),
        sec({
          id: 'reviews', tone: 'sand', script: 'from her reviews', title: 'It gets easy. Really.',
          body: quotes([
            quote(review('Rose Nyarko', 'She made parallel parking and reverse parking easy to learn and understand.')),
            quote(review('Oeindrila Chaudhuri', 'She helped me build confidence on the road', 'park in tight spaces.')),
          ]),
        }),
      ],
      faqs: [
        ['Is parallel parking on the road test?', 'It&rsquo;s one of the basic skills DriveTest lists for the G2 road test. The G test at full-time DriveTest centres currently leaves it out.'],
        ['Which way do I turn the wheels when I park on a hill?', 'Facing downhill, turn the front wheels toward the curb or the right shoulder. Facing uphill with a curb, turn them toward the road, so the tires catch the curb if the car rolls back. Facing uphill with no curb, turn them sharply right. Then set the parking brake.'],
        ['Can I use my backup camera on the test?', 'No. DriveTest doesn&rsquo;t allow backup cameras or parking aids during the road test, so lessons practise parking with mirrors and shoulder checks.'],
        ['How long does it take to get good at it?', 'Usually less time than people fear. Reviewers like Malaika and Rose wrote that she made parallel parking easy, and it&rsquo;s the skill her reviews mention most.'],
      ],
      guides: ['how-to-parallel-park', 'how-to-pass-the-g2-road-test', 'hamilton-drivetest-centre'],
      cta: ['Make parking the easy part', 'Tell her which kind of parking scares you most, and that&rsquo;s where the lesson starts.'],
    }),

    /* ---------------- Adults ---------------- */
    servicePage({
      slug: 'adult-driving-lessons', crumb: 'Adult lessons', name: 'Adult driving lessons',
      title: 'Adult Driving Lessons in Hamilton | Mrs. Akbar',
      description: 'Learning to drive as an adult, new to Canada, or back after years off the road? Patient one-on-one lessons in Hamilton, 7 days a week. Call 416-457-5778.',
      script: 'never too late',
      h1: 'Driving lessons for adults',
      lede: 'Learning later is more common than people think. Some of her students are new to Canada. Others just never needed a car until now.',
      art: artAdult(), serviceType: 'Adult driving lessons', audience: 'Adults, newcomers to Canada and returning drivers',
      sections: [
        sec({
          id: 'who', tone: 'white', script: 'who comes to her', title: 'Who these lessons are for',
          body: `<ol class="spots">
<li class="spot" data-reveal><h3 class="spot-name"><span>New to Canada</span></h3><p>The rules, the signs and the habits here may be different from home. Manasa wrote about being nervous driving in a new country, and passed the G2 on the first try.</p></li>
<li class="spot" data-reveal style="--d:80ms"><h3 class="spot-name"><span>Starting later</span></h3><p>Some adults never needed to drive until a new job, a move or a new baby changed that. Lessons start from wherever you are.</p></li>
<li class="spot" data-reveal><h3 class="spot-name"><span>Coming back to it</span></h3><p>Years away from driving can make even a familiar road feel new. A few refresher lessons can bring the confidence back.</p></li>
<li class="spot" data-reveal style="--d:80ms"><h3 class="spot-name"><span>Fitting it around work</span></h3><p>Lessons run seven days a week, by appointment, so weekends are worth asking about.</p></li>
</ol>`,
        }),
        sec({
          id: 'schedule', tone: 'paper', script: 'busy weeks', title: 'Lessons that fit your week',
          body: notes([
            { claim: 'A flexible schedule.', r: review('Heremela Molla', 'She has very flexible schedule for students and working professionals.') },
            { claim: 'Confidence comes quickly.', r: review('Katherine Yashchenko', 'After just a few lessons, I already feel much more confident behind the wheel.') },
          ]),
        }),
        sec({
          id: 'licence', tone: 'white', script: 'licensed somewhere else?', title: 'If you drove in another country',
          body: prose(`<p>New Ontario residents can drive on a valid licence from another province, state or country for 60 days. After that you need an Ontario licence, and how you get one depends on where yours is from.</p>
<ul>
<li><strong>From a place with an exchange agreement</strong> (every Canadian province, U.S. states, and countries such as Great Britain, France, Germany, Japan, South Korea and Australia): with at least two years of experience you can exchange for a full G without a road test. With less, you get a G2 and take the G test later.</li>
<li><strong>From anywhere else:</strong> you take the vision and knowledge tests, then the road tests. Since July 1, 2026, you can be credited with up to 12 months of foreign driving experience from the past three years, which can let you take the G2 road test right away.</li>
</ul>
<p>Either way, Ontario&rsquo;s rules and what examiners look for may be new to you. The <a href="/guides/new-to-ontario-drivers-licence/">newcomer&rsquo;s licence guide</a> covers documents and steps in more detail.</p>`) + sources([EXCHANGE]),
        }),
        sec({
          id: 'reviews', tone: 'sand', script: 'from her reviews', title: 'Adults who did it',
          body: quotes([
            quote(review('Fareha Hamid', 'She was very patient, supportive, and professional throughout my lessons.', 'confident behind the wheel.')),
            quote(review('Manasa Nandikonda', 'Her patience, calm presence and clear instructions', 'throughout the lessons.'), 'new to Canada'),
          ]),
        }),
      ],
      faqs: [
        ['Am I too old to learn?', 'No. Adult lessons are one of the services her Google reviewers tag most often, and plenty of her students started as adults.'],
        ['I have a licence from another country. Do I still need lessons?', 'Not always, but many people book a few. Ontario&rsquo;s rules, signs and road tests can be quite different from what you&rsquo;re used to, and a lesson or two shows you what examiners expect.'],
        ['Can lessons fit around a full-time job?', 'Often, yes. Lessons are seven days a week, by appointment, and one reviewer wrote about her flexible schedule for students and working professionals.'],
        ['I&rsquo;m nervous about starting at my age. Is that normal?', 'Completely. There&rsquo;s a whole page on <a href="/driving-lessons-for-nervous-drivers/">lessons for nervous drivers</a>, and nerves come up in a lot of her reviews.'],
      ],
      guides: ['new-to-ontario-drivers-licence', 'how-many-driving-lessons-do-you-need', 'nervous-driver-tips'],
      cta: ['It&rsquo;s not too late', 'Tell her where you&rsquo;re starting from and when you&rsquo;re free. Weekends included.'],
    }),
  ];
}
