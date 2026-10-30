// Licence rule guides: what G1 and G2 drivers can and can't do. Rules checked 2026-10-30 against
// O. Reg. 340/94 ss. 5 and 6 (e-Laws) and ontario.ca's new drivers page (updated 2026-09-11);
// suspension rules match the demerit points guide. Paraphrased, never copied.
import { guidePage } from './pages-guides.mjs';
import { callout, inlineCta, quote } from './ui.mjs';
import { review } from './core.mjs';
import { p, ul, h3, table, lessonsChips } from './guide-kit.mjs';

const DATE = '2026-10-30';
const S = {
  getG: ['Get a G driver&rsquo;s licence: new drivers (ontario.ca)', 'https://www.ontario.ca/page/get-g-drivers-licence-new-drivers'],
  reg340: ['O. Reg. 340/94, Drivers&rsquo; Licences, sections 5 and 6 (ontario.ca/laws)', 'https://www.ontario.ca/laws/regulation/940340'],
  accompanying: ['The accompanying driver (drivetest.ca)', 'https://drivetest.ca/licences/accompanying-driver/'],
  hbLicence: ['Driver&rsquo;s Handbook: getting your driver&rsquo;s licence (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/getting-your-drivers-licence'],
  hbFreeway: ['Driver&rsquo;s Handbook: freeway driving (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/freeway-driving'],
  hbKeeping: ['Driver&rsquo;s Handbook: keeping your driver&rsquo;s licence (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/keeping-your-drivers-licence'],
  impaired: ['Impaired driving (ontario.ca)', 'https://www.ontario.ca/page/impaired-driving'],
  roadTests: ['Road tests for cars (drivetest.ca)', 'https://drivetest.ca/tests/road-tests-cars/'],
};

// The escalating suspensions for breaking a G1 or G2 condition (same rule as the demerit points guide)
const escalating = ul(['<strong>First conviction:</strong> 30-day suspension', '<strong>Second:</strong> 90-day suspension', '<strong>Third:</strong> your licence is cancelled, and you start again at G1']);

export function licenceGuides() {
  return [
    /* ---------- G1 rules ---------- */
    guidePage({
      slug: 'g1-licence-rules-ontario',
      published: DATE, updated: DATE,
      title: 'G1 Rules in Ontario: What a G1 Driver Can and Can&rsquo;t Do',
      description: 'Every G1 rule in Ontario in plain words: night driving, which highways, passengers, who can sit beside you, alcohol, and what happens if you break a rule.',
      script: 'getting started',
      dek: 'Night driving, highways, passengers and who can sit beside you, answered one question at a time.',
      intro: 'A G1 lets you practise on real roads, under conditions set by Ontario&rsquo;s licensing regulation. Most of them are simple. The questions people actually ask are specific, though: can I drive at 11 at night? On the Linc? With my cousin who has a G2? Here are the answers, from the regulation itself and ontario.ca.',
      sections: [
        { id: 'glance', h: 'The G1 rules at a glance', toc: 'At a glance', html: table({ caption: 'G1 licence conditions in Ontario', head: ['Rule', 'What it means'], rows: [
            ['Who sits beside you', 'A fully licensed driver who has been licensed for at least four years. They&rsquo;re the only other person allowed in the front seat.'],
            ['Their blood alcohol', 'Under .05, or zero if they&rsquo;re 21 or under.'],
            ['Your alcohol and drugs', 'Zero alcohol and zero drugs, including cannabis.'],
            ['Hours', 'No driving between midnight and 5&nbsp;a.m.'],
            ['Passengers', 'No more people in the car than working seatbelts.'],
            ['Highways', 'No 400-series highways or high-speed expressways such as the QEW, unless your accompanying driver is a licensed driving instructor.'],
            ['How long', 'At least 12 months before the G2 road test, or 8 months with an approved driver education course.'],
          ] }) +
          p('These conditions come from section 5 of Ontario Regulation 340/94, the regulation behind graduated licensing. Breaking one isn&rsquo;t a small thing: it can suspend your licence, as explained below.') },
        { id: 'beside', h: 'Who can sit beside you', html: p('Your accompanying driver must:') + ul([
            'hold a full licence that covers the car, such as a G',
            'have been licensed for at least four years. Years licensed in another province or country count.',
            'have a blood alcohol level under .05, or zero if they&rsquo;re 21 or under',
            'sit in the front passenger seat, with nobody else in the front',
          ]) +
          p('So a parent, an older brother or sister, or a friend who has held a full licence long enough can supervise you. A G2 driver can&rsquo;t, however experienced they feel.') },
        { id: 'night', h: 'Can you drive at night on a G1?', toc: 'Driving at night', html: p('Yes, until midnight. The only time rule is that G1 drivers can&rsquo;t drive between midnight and 5&nbsp;a.m. Evening practice in the dark is allowed, and in an Ontario winter it&rsquo;s dark by late afternoon, so it&rsquo;s worth doing with your accompanying driver.',
          'The midnight rule stays in place even with a driving instructor beside you. The instructor exception covers highways, not hours. The <a href="/guides/driving-at-night-and-in-the-rain/">night and rain driving guide</a> covers headlights, glare and what changes after dark.') },
        { id: 'roads', h: 'Which roads you can and can&rsquo;t use', toc: 'Highways and roads', html: p('The highway rule names specific roads. On a G1, without a driving instructor, you can&rsquo;t drive on:') + ul([
            'the 400-series highways, such as the 401, the 403 and the 410, wherever they&rsquo;re posted over 80&nbsp;km/h',
            'all of Highway 407 and Highway 407 East',
            'the QEW',
            'the Don Valley Parkway, the Gardiner Expressway, the E.C. Row Expressway in Windsor, and part of the Conestoga Parkway in Waterloo Region',
          ]) +
          p('Every other road is open to you with a qualified accompanying driver, including fast roads that aren&rsquo;t on that list. Around Hamilton:') +
          table({ caption: 'Hamilton-area roads on a G1', head: ['Road', 'On a G1?'], rows: [
            ['Highway 403', 'Only with a licensed driving instructor'],
            ['The QEW', 'Only with a licensed driving instructor'],
            ['The Lincoln Alexander Parkway (the Linc)', 'Yes. It&rsquo;s posted at 90&nbsp;km/h, but it isn&rsquo;t on the list.'],
            ['The Red Hill Valley Parkway', 'Yes, but leave it before the QEW ramps at its north end.'],
            ['Highway 6', 'Yes. It&rsquo;s a provincial highway, but not a 400-series one.'],
            ['City roads at 60, 70 or 80&nbsp;km/h', 'Yes'],
          ] }) +
          callout('local', 'Good first fast roads', p('With your accompanying driver beside you, the Linc and the Red Hill are a sensible step up from city streets before the 403. The <a href="/guides/how-to-drive-on-the-highway/">highway driving guide</a> covers merging, lane changes and exits.')) },
        { id: 'passengers', h: 'Passengers', html: p('You can carry passengers in the back seat, as long as there&rsquo;s a working seatbelt for every person in the car. Only your accompanying driver can sit in the front.',
          'A G1 has no rule about passengers&rsquo; ages, and a passenger who has been drinking doesn&rsquo;t break a G1 rule. Only the person beside you has an alcohol limit. Young children still need the car seat or booster seat the law requires for their age and size.') },
        inlineCta('On a G1 and want to practise on the highway? Call or text Mrs. Akbar.'),
        { id: 'instructor', h: 'What changes with a driving instructor', toc: 'With an instructor', html: p('With a driving instructor licensed in Ontario beside you, the highway rule doesn&rsquo;t apply, so you can practise on the 403, the QEW and any other road. Everything else still does: no driving between midnight and 5&nbsp;a.m., zero alcohol and drugs, and a seatbelt for everyone.',
          'That&rsquo;s why many learners get their first highway time in lessons. It also means the 403 isn&rsquo;t brand new the first time you drive it on your own, on a G2.') +
          quote(review('Cole Balton', 'She made me feel completely comfortable behind the wheel from day one', 'throughout every lesson.'), 'from day one') },
        { id: 'cars', h: 'Cars, insurance and driving outside Ontario', toc: 'Cars and insurance', html: ul([
            '<strong>The car</strong> has to be registered, plated and insured, like any car on Ontario roads. If you&rsquo;re learning in a family member&rsquo;s car, they should tell their insurance company that you&rsquo;re driving it.',
            '<strong>Rentals and car-sharing</strong> companies set their own licence and age rules, so ask before you book.',
            '<strong>Other provinces and the U.S.</strong> set their own rules for learner drivers. A G1 is an Ontario learner&rsquo;s licence, so check the rules where you&rsquo;re going before you drive there.',
          ]) },
        { id: 'penalties', h: 'What happens if you break a G1 rule', toc: 'Penalties', html: p('Driving alone, driving after midnight, or taking a G1 onto the 403 without an instructor all count as breaking a G1 condition. G1 and G2 drivers convicted of breaking a condition face escalating suspensions:') +
          escalating +
          p('The same suspensions apply to G1 and G2 drivers convicted of distracted driving or of any offence worth four or more demerit points. The <a href="/guides/demerit-points-ontario/">demerit points guide</a> and the <a href="/guides/distracted-driving-ontario/">distracted driving guide</a> have the details.') },
        { id: 'moving-up', h: 'Moving up to a G2', html: p('You can take the G2 road test once you&rsquo;ve held your G1 for 12 months, or 8 months if you finish a government-approved driver education course. You have five years from your G1 to finish graduated licensing.',
          'The <a href="/guides/how-to-pass-the-g2-road-test/">G2 road test guide</a> covers the test itself, and the <a href="/guides/g2-licence-rules-ontario/">G2 rules guide</a> explains what changes once you pass.') },
      ],
      sources: [S.reg340, S.getG, S.accompanying, S.hbFreeway, S.hbLicence, S.hbKeeping, S.impaired],
      faqs: [
        ['Can a G1 driver drive at night in Ontario?', 'Yes, until midnight. G1 drivers can&rsquo;t drive between midnight and 5&nbsp;a.m., but driving in the dark before midnight is allowed with a qualified accompanying driver.'],
        ['What time can G1 drivers drive until?', 'Midnight. Driving between midnight and 5&nbsp;a.m. isn&rsquo;t allowed on a G1, even with a driving instructor.'],
        ['Can a G1 driver drive on the highway?', 'Not on 400-series highways, Highway 407 or high-speed expressways like the QEW, unless the person beside you is a licensed driving instructor. Other highways, such as Highway 6, are allowed with a qualified accompanying driver.'],
        ['Can G1 drivers drive on the Lincoln Alexander Parkway or the Red Hill Valley Parkway?', 'Yes, with a qualified accompanying driver. Neither is on the list of highways closed to G1 drivers, but leave the Red Hill before its QEW ramps.'],
        ['Can a G1 driver drive alone?', 'No. A fully licensed driver who has been licensed for at least four years must always sit beside you.'],
        ['Can a G1 driver drive with a G2 driver?', 'No. Your accompanying driver needs a full licence and at least four years of being licensed. A G2 driver doesn&rsquo;t qualify.'],
        ['How many passengers can a G1 driver have?', 'As many as there are working seatbelts. Only your accompanying driver can sit in the front; everyone else rides in the back.'],
        ['Can a G1 driver have kids in the car?', 'Yes, in the back seat, each with a working seatbelt and any car seat or booster seat the law requires for their age and size.'],
        ['Can I drink any alcohol before driving on a G1?', 'No. G1 and G2 drivers must have zero alcohol and zero drugs, including cannabis, in their system.'],
        ['Does my accompanying driver have to be sober?', 'Their blood alcohol must be under .05, or zero if they&rsquo;re 21 or under.'],
        ['Can I drive on the 403 with my driving instructor on a G1?', 'Yes. With a driving instructor licensed in Ontario beside you, the highway rule doesn&rsquo;t apply.'],
        ['What happens if I get caught driving alone on a G1?', 'It&rsquo;s a conviction for breaking a G1 condition. The first brings a 30-day suspension, the second 90 days, and a third cancels your licence so you start again at G1.'],
        ['Can a G1 driver drive in another province or the U.S.?', 'Other provinces and U.S. states set their own rules for learner drivers. Check the rules where you&rsquo;re going before you drive there.'],
      ],
      related: ['ontario-g1-g2-g-licence-explained', 'g2-licence-rules-ontario', 'how-to-pass-the-g1-test'],
      lessons: lessonsChips(['/beginner-driving-lessons/', 'Beginner lessons'], ['/g-road-test-preparation/', 'G test and highway'], ['/driving-lessons-for-nervous-drivers/', 'Nervous drivers']),
      cta: ['Practise with a licensed instructor', 'On a G1, lessons are your way onto the 403 and the QEW. Call or text to book, 7 days a week.'],
    }),

    /* ---------- G2 rules ---------- */
    guidePage({
      slug: 'g2-licence-rules-ontario',
      published: DATE, updated: DATE,
      title: 'G2 Rules in Ontario: Night Driving, Passengers and Highways',
      description: 'Ontario G2 rules in plain words: highways, zero alcohol, the late-night passenger limit for drivers 19 and under, and what changes after six months.',
      script: 'getting started',
      dek: 'Highways, night driving, the passenger limit for drivers 19 and under, and the few things a G2 still can&rsquo;t do.',
      intro: 'Passing the G2 road test changes a lot. You can drive alone, on any road, at any hour. A few rules still apply, and one of them, the late-night passenger limit, only applies to some drivers. Here&rsquo;s exactly how it all works, from Ontario&rsquo;s licensing regulation and ontario.ca.',
      sections: [
        { id: 'can', h: 'What a G2 lets you do', html: ul([
            'Drive without anyone beside you.',
            'Drive on every Ontario road, including the 400-series highways and the QEW.',
            'Drive at any time of day or night.',
          ]) + p('Two rules apply to every G2 driver, and a late-night passenger limit applies if you&rsquo;re 19 or under.') },
        { id: 'rules', h: 'The G2 rules', html: table({ caption: 'G2 licence conditions in Ontario', head: ['Rule', 'Who it applies to'], rows: [
            ['Zero alcohol and zero drugs, including cannabis', 'Every G2 driver'],
            ['No more passengers than working seatbelts', 'Every G2 driver'],
            ['Between midnight and 5&nbsp;a.m., no more than one passenger aged 19 or under', 'Drivers aged 19 or under, in their first six months on a G2'],
            ['Between midnight and 5&nbsp;a.m., no more than three passengers aged 19 or under', 'Drivers aged 19 or under, after six months on a G2'],
          ] }) +
          p('The passenger limit stops applying when you turn 20, and your immediate family never counts toward it. It also doesn&rsquo;t apply when a fully licensed driver who has been licensed for at least four years sits beside you, with a blood alcohol level under .05 and nobody else in the front.') },
        { id: 'night', h: 'The midnight passenger rule, with examples', toc: 'Passenger examples', html: p('This is the G2 rule people get wrong most often, so here it is in real situations. All of them are between midnight and 5&nbsp;a.m.:') +
          table({ caption: 'Is it allowed? G2 passengers between midnight and 5 a.m.', head: ['Situation', 'Allowed?'], rows: [
            ['You&rsquo;re 18, three months into your G2, driving two friends aged 17 and 18 home', 'No. That&rsquo;s two passengers aged 19 or under in your first six months.'],
            ['The same trip, but you&rsquo;ve had your G2 for eight months', 'Yes. After six months, the limit is three.'],
            ['You&rsquo;re 19, driving your 16-year-old sister and one of her friends', 'Yes. Your sister is immediate family, so only her friend counts.'],
            ['You&rsquo;re 18, three months in, with one friend aged 17 and two aged 22', 'Yes. Passengers aged 20 or older don&rsquo;t count toward the limit.'],
            ['You&rsquo;re 18, with three friends in the back and your mom, licensed for more than four years, beside you', 'Yes, as long as she&rsquo;s under .05 and nobody else is in the front.'],
            ['You&rsquo;re 20 or older, with four friends aged 18', 'Yes, with a seatbelt for each of them. The limit stops at 20.'],
          ] }) +
          p('Immediate family includes your parents or guardian, your brothers and sisters, and anyone related to you by blood, marriage, a common-law relationship or adoption.') },
        { id: 'alcohol', h: 'Zero alcohol, and why it lasts past your G2', toc: 'Alcohol and drugs', html: p('As a G2 driver, you can&rsquo;t have any alcohol or drugs, including cannabis, in your system when you drive. Being the designated driver works well on a G2, as long as you&rsquo;ve had nothing yourself and, if you&rsquo;re 19 or under, you stick to the late-night passenger limit.',
          'A full G doesn&rsquo;t end the zero rule if you&rsquo;re young: every driver aged 21 or under must keep their blood alcohol at zero, whatever licence they hold. The <a href="/guides/impaired-driving-rules-ontario/">impaired driving guide</a> explains the penalties.') },
        inlineCta('Working toward your full G? Call or text Mrs. Akbar about highway lessons.'),
        { id: 'highways', h: 'Highways on a G2', html: p('A G2 lets you drive the 403, the QEW and every other highway on your own. If your first time on one is coming up, the <a href="/guides/how-to-drive-on-the-highway/">highway driving guide</a> walks through merging, lane changes and exits.',
          'Highway time matters for your next step, too. Before the G road test, you sign a declaration of your highway driving, and DriveTest asks for at least five trips in the last three months on a 400-series highway, a freeway like the QEW, or a highway signed at 80&nbsp;km/h or more.') +
          quote(review('Hawa Drammeh', 'I definitely recommend doing lessons with her for G2 or G!'), 'passed the G2') },
        { id: 'cant', h: 'What a G2 driver still can&rsquo;t do', toc: 'What you still can&rsquo;t do', html: ul([
            '<strong>Supervise a G1 driver.</strong> The person beside a G1 driver needs a full licence and at least four years of being licensed.',
            '<strong>Drive after any alcohol, cannabis or other drugs.</strong>',
            '<strong>Carry more people than there are working seatbelts.</strong>',
            '<strong>Ignore the late-night passenger limit</strong> while you&rsquo;re 19 or under.',
          ]) +
          p('Rental companies, car-sharing services and delivery or ride-hailing apps set their own licence and experience requirements, so check with them directly. Other provinces and U.S. states decide how they treat an Ontario G2, so check before a road trip.') },
        { id: 'penalties', h: 'What happens if you break a G2 rule', toc: 'Penalties', html: p('Breaking a G2 condition is treated the same way as on a G1. A conviction brings an escalating suspension:') +
          escalating +
          h3('Demerit points on a G2') + ul(['<strong>2 to 5 points:</strong> a warning letter', '<strong>6 to 8 points:</strong> a second warning, and the Ministry can call you to an interview', '<strong>9 or more points:</strong> a 60-day suspension']) +
          p('The <a href="/guides/demerit-points-ontario/">demerit points guide</a> explains how points add up and how long they last.') },
        { id: 'full-g', h: 'Getting your full G', html: p('After 12 months on your G2, you can take the G road test. At full-time DriveTest centres it&rsquo;s currently a shorter version focused on highways and major roads, turns, lane changes and intersections. The <a href="/guides/g-road-test-tips/">G road test guide</a> covers it.',
          'Keep an eye on the clock: you have five years from your G1 to finish. If your G2 is about to expire, you can take the G2 road test (the G1 exit test) again to get five more years on a G2. The <a href="/guides/g1-g2-licence-expiry-ontario/">licence expiry guide</a> explains the deadlines.') },
      ],
      sources: [S.reg340, S.getG, S.roadTests, S.hbLicence, S.hbKeeping, S.impaired],
      faqs: [
        ['Can G2 drivers drive at night in Ontario?', 'Yes. A G2 has no curfew. If you&rsquo;re 19 or under, a passenger limit applies between midnight and 5&nbsp;a.m.'],
        ['How many passengers can a G2 driver have?', 'As many as there are working seatbelts. If you&rsquo;re 19 or under, between midnight and 5&nbsp;a.m. you can carry only one passenger aged 19 or under in your first six months, then up to three.'],
        ['What changes after six months on a G2?', 'If you&rsquo;re 19 or under, the late-night limit goes from one passenger aged 19 or under to three.'],
        ['Do the G2 passenger rules apply if I&rsquo;m 20 or older?', 'No. The late-night passenger limit only applies to G2 drivers aged 19 or under.'],
        ['Do family members count toward the G2 passenger limit?', 'No. Immediate family, including your parents or guardian and your brothers and sisters, don&rsquo;t count.'],
        ['Can G2 drivers drive on the 400-series highways?', 'Yes. A G2 lets you drive every Ontario road, including the 401, the 403 and the QEW, without anyone beside you.'],
        ['Is there a curfew for G2 drivers?', 'No. G2 drivers can drive at any hour. The only late-night rule is the passenger limit for drivers aged 19 or under.'],
        ['Can a G2 driver drink alcohol and drive?', 'No. G2 drivers must have zero alcohol and zero drugs, including cannabis, in their system.'],
        ['Can a G2 driver supervise a G1 driver?', 'No. A G1 driver&rsquo;s accompanying driver must have a full licence and at least four years of being licensed.'],
        ['When can I take my G road test?', 'After you&rsquo;ve held your G2 for 12 months.'],
        ['What happens if my G2 is about to expire?', 'You can take the G2 road test again to get five more years on a G2. The licence expiry guide explains the deadlines.'],
        ['Can G2 drivers drive in the U.S.?', 'Other provinces and U.S. states decide how they treat an Ontario G2 and its conditions, so check the rules where you&rsquo;re going before a trip.'],
      ],
      related: ['g1-licence-rules-ontario', 'g-road-test-tips', 'how-to-drive-on-the-highway'],
      lessons: lessonsChips(['/g-road-test-preparation/', 'G test and highway'], ['/driving-lessons-for-nervous-drivers/', 'Nervous drivers']),
      cta: ['On your G2 and aiming for the G?', 'Highway lessons count toward the trips the G test asks about. Call or text to book.'],
    }),
  ];
}
