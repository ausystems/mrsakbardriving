// Road test guides: booking a road test and why people fail the G2. Facts checked 2026-10-07 against
// drivetest.ca (read in a browser; it blocks automated requests), ontario.ca, the Official MTO Driver's
// Handbook and O. Reg. 340/94; paraphrased, never copied.
import { guidePage } from './pages-guides.mjs';
import { callout, inlineCta, quote } from './ui.mjs';
import { review } from './core.mjs';
import { p, ul, ol, h3, table, lessonsChips } from './guide-kit.mjs';

const DATE = '2026-10-07';
const S = {
  newBooking: ['Booking help: make a new booking (drivetest.ca)', 'https://drivetest.ca/book-a-road-test/help-new-booking/'],
  overview: ['Booking help: overview (drivetest.ca)', 'https://drivetest.ca/book-a-road-test/help-overview-booking/'],
  bookingFaq: ['Booking help: frequently asked questions (drivetest.ca)', 'https://drivetest.ca/book-a-road-test/help-faqs/'],
  editBooking: ['Booking help: change a booking (drivetest.ca)', 'https://drivetest.ca/book-a-road-test/help-edit-booking/'],
  payments: ['Payments, cancellations and refunds (drivetest.ca)', 'https://drivetest.ca/book-a-road-test/payments-cancellations-refunds/'],
  roadTests: ['Road tests for cars (drivetest.ca)', 'https://drivetest.ca/tests/road-tests-cars/'],
  vehicle: ['Road test vehicle requirements (drivetest.ca)', 'https://drivetest.ca/tests/road-test-vehicle-requirements/'],
  fees: ['Fees (drivetest.ca)', 'https://drivetest.ca/tests/fees/'],
  centres: ['Find a DriveTest centre (drivetest.ca)', 'https://drivetest.ca/find-a-drivetest-centre/alphabetical_list/'],
  disruptions: ['Service disruptions (drivetest.ca)', 'https://drivetest.ca/find-a-drivetest-centre/service-disruptions/'],
  news: ['DriveTest news (drivetest.ca)', 'https://drivetest.ca/home/news/'],
  getG: ['Get a G driver&rsquo;s licence: new drivers (ontario.ca)', 'https://www.ontario.ca/page/get-g-drivers-licence-new-drivers'],
  reg340: ['O. Reg. 340/94, Drivers&rsquo; Licences (ontario.ca/laws)', 'https://www.ontario.ca/laws/regulation/940340'],
  checklist: ['Driver&rsquo;s Handbook: the road test checklist (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/level-two-road-test'],
  hbLicence: ['Driver&rsquo;s Handbook: getting your driver&rsquo;s licence (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/getting-your-drivers-licence'],
  testsOverview: ['Tests overview (drivetest.ca)', 'https://drivetest.ca/tests/tests-overview/'],
  dtFaqs: ['DriveTest frequently asked questions (drivetest.ca)', 'https://drivetest.ca/home/faqs/'],
  carLicences: ['Driver&rsquo;s licences for cars (drivetest.ca)', 'https://drivetest.ca/licences/drivers-licences-cars/'],
  auditor: ['Auditor General of Ontario, 2023 report on driver training and testing, Appendix 2 (auditor.on.ca, PDF)', 'https://www.auditor.on.ca/en/content/annualreports/arreports/en23/AR_drivertraining_en23.pdf'],
  brokerlink: ['How do I pass my G2 road test on the first try? (brokerlink.ca)', 'https://www.brokerlink.ca/blog/how-do-i-pass-my-g2-road-test-on-the-first-try'],
  belair: ['Driving instructors on common driving exam mistakes (belairdirect.com)', 'https://www.belairdirect.com/blog/driving-instructors-driving-exam-mistakes'],
};

export function testGuides() {
  return [
    /* ---------- Booking a road test ---------- */
    guidePage({
      slug: 'how-to-book-a-road-test-ontario',
      published: DATE, updated: DATE,
      title: 'Booking a Road Test in Ontario: Earlier Dates and Rules | Mrs. Akbar',
      description: 'How to book your G2 or G road test with DriveTest, find an earlier date, use the standby list, and avoid losing your fee when you need to change or cancel.',
      script: 'road tests',
      dek: 'Booking online, by phone or in person, how to find an earlier date, and the rules that can cost you your fee.',
      intro: 'Booking a road test takes about ten minutes once you know what you need. Getting a date you actually want can take longer. Here&rsquo;s how DriveTest&rsquo;s booking works, what it says about finding earlier dates, and the rules that can cost you your fee.',
      sections: [
        { id: 'when', h: 'When you can book', html: ul([
          '<strong>G2 road test:</strong> after 12 months on your G1, or 8 months if you finished a ministry-approved driver education course. The 8-month date only shows up once your driving school has entered your course results.',
          '<strong>G road test:</strong> after 12 months on your G2.',
          '<strong>Your licence must be valid on test day.</strong> You can&rsquo;t book a road test for a date after your licence expires. The <a href="/guides/g1-g2-licence-expiry-ontario/">licence expiry guide</a> explains what to do if that&rsquo;s getting close.',
        ]) + p('The calendar starts at the date you&rsquo;re eligible, so you can book ahead for a date on or after it.') },
        { id: 'how', h: 'Three ways to book', html: table({ caption: 'Ways to book a road test with DriveTest', head: ['How', 'What to know'], rows: [
            ['Online, any time', 'At drivetest.ca. Pay with Visa, Mastercard, Visa Debit or Mastercard Debit.'],
            ['By phone', '647-776-0331 or 1-888-570-6110. It&rsquo;s automated; press 0 for a live agent during business hours.'],
            ['In person', 'At any DriveTest centre. You can also pay with cash, debit, a certified cheque or a money order.'],
          ] }) + p('Availability is the same whichever way you book. Your first G2 road test is usually already paid for, because it&rsquo;s part of the $159.75 G1 package.') },
        { id: 'online', h: 'Booking online, step by step', html: ol([
          '<strong>Have these ready:</strong> an email address, your licence number, the expiry date on your licence card, and a payment card.',
          '<strong>Create an account</strong> on DriveTest&rsquo;s booking site and verify your email.',
          '<strong>Choose your test</strong> and a centre. ontario.ca suggests having a first, second and third choice of location.',
          '<strong>Pick a date.</strong> In the calendar, white dates have openings and grey dates are full. You can go back and try another centre.',
          '<strong>Pick a time and pay,</strong> unless your test is already paid for. Your confirmation comes by email, and showing it on your phone is fine.',
        ]) + ul([
          'You have 45 minutes to finish once you start.',
          'You can only hold one booking at a time, and the earliest slot you can book online is 24 hours away.',
          'DriveTest expects one email and one payment card per licence number, which matters if you&rsquo;re booking for more than one family member.',
        ]) + callout('rule', 'Book only with DriveTest', p('DriveTest warns that third-party booking sites can add fees and collect your personal and payment information, and that it doesn&rsquo;t have to honour tests booked through them. DriveTest itself charges no booking fee.')) },
        { id: 'earlier', h: 'How to get an earlier date', html: p('DriveTest&rsquo;s own advice is simple:') + ul([
          '<strong>Check back often.</strong> Openings appear throughout the month as other people cancel.',
          '<strong>Look at more than one centre.</strong> The same week can be full in one city and open in the next.',
          '<strong>Book early.</strong> Tests are posted up to six months ahead, and DriveTest adds more dates within that window over time.',
          '<strong>Ask about standby.</strong> Your DriveTest centre can put you on its standby list. It&rsquo;s first come, first served and not guaranteed, so bring payment if you&rsquo;re hoping to be taken.',
        ]) + p('DriveTest says it aims to have road tests available within 42 days at every full-time centre. Road tests are by appointment only; there are no walk-ins.') +
          callout('tip', 'Keep a date while you look', p('Book the best date you can find, then keep checking. Moving a booking is free with at least 48 hours&rsquo; notice. Just don&rsquo;t overdo it: after three or more changes or cancellations in six months, you can only book by phone or in person.')) },
        { id: 'hamilton', h: 'Testing in Hamilton and nearby', html: p('Hamilton&rsquo;s DriveTest centre is at <strong>370 Kenora Avenue North</strong>. When we checked, it ran road tests Monday to Saturday from 8&nbsp;a.m. to 5&nbsp;p.m., and it&rsquo;s closed on statutory holidays. It gives both the G2 and the G road test. The <a href="/guides/hamilton-drivetest-centre/">Hamilton DriveTest centre guide</a> covers the day itself.') +
          p('If Hamilton is booked up, the nearest other full-time centres that give both tests include Burlington (1250 Brant Street), Oakville (2370 Wyecroft Road) and St. Catharines (285 Bunting Road). There&rsquo;s no part-time Travel Point near Hamilton.') },
        inlineCta('Booked your test? Call or text Mrs. Akbar to get ready for it.'),
        { id: 'change', h: 'Changing or cancelling a test', html: ul([
          '<strong>48 hours&rsquo; notice</strong> to change or cancel without losing the fee. With less notice, the fee is gone, and rebooking means paying again.',
          '<strong>Arriving late or not showing up</strong> also costs you the fee.',
          '<strong>Exceptions, with proof:</strong> severe weather (ask to rebook within three days), a death or illness in your immediate family, jury duty, incarceration, or an unscheduled call in to work.',
          '<strong>If DriveTest posts a service disruption,</strong> don&rsquo;t cancel yourself. DriveTest cancels for you, and you keep your fee.',
          '<strong>Changing the licence class</strong> of a test means a new booking and a new fee.',
        ]) + p('If you cancel a slot by mistake, you can&rsquo;t simply take it back: cancelled slots are pulled from every booking channel for a while.') },
        { id: 'day', h: 'On the day', html: ul([
          'Arrive at least 30 minutes early with your licence, and your glasses or contacts if you need them.',
          'Bring a car that passes the examiner&rsquo;s check. If the car or anything else doesn&rsquo;t meet the requirements, the test is declared out of order and you lose half the fee.',
          'For a G test, you need at least five trips on a qualifying highway in the past three months. Without them, the test is cancelled and you lose half the fee.',
        ]) },
        { id: 'fail', h: 'If you don&rsquo;t pass', html: p('You can book again after 24 hours, but there must generally be at least 10 days between tests, and you pay the full fee each time: $53.75 for the G2 and $91.25 for the G. There&rsquo;s no limit on attempts while your licence is valid. The <a href="/guides/why-people-fail-the-g2-road-test/">guide to why people fail the G2</a> covers what to work on.') +
          quote(review('Hawa Drammeh', 'Just passed my G2 road test today!', 'she teaches so so well.'), 'passed the G2') },
      ],
      sources: [S.newBooking, S.overview, S.bookingFaq, S.editBooking, S.payments, S.roadTests, S.vehicle, S.fees, S.centres, S.disruptions, S.news, S.getG, S.reg340],
      faqs: [
        ['How do I book my G2 road test online in Ontario?', 'At drivetest.ca. Create an account, then have your licence number, the expiry date on your licence card and a Visa, Mastercard, Visa Debit or Mastercard Debit card ready.'],
        ['How far in advance can you book a road test in Ontario?', 'DriveTest posts tests up to six months ahead and adds more dates within that window over time.'],
        ['How do I get an earlier road test date?', 'Check back often, because cancellations open up slots throughout the month. Look at more than one centre, and ask your DriveTest centre about its standby list.'],
        ['Can I book my G2 test before my 12 months are up?', 'You can&rsquo;t take it early. The booking calendar starts at the date you become eligible: 12 months on your G1, or 8 months with an approved driver education course.'],
        ['Is there a standby list for road tests?', 'Yes. Ask your DriveTest centre to add you. It&rsquo;s first come, first served and not guaranteed.'],
        ['What happens if I cancel my road test less than 48 hours before?', 'You lose the fee, unless you can show proof of an exception such as severe weather, a family death or illness, jury duty or an unscheduled call in to work.'],
        ['Can I pay for my road test with a debit card online?', 'Yes. DriveTest&rsquo;s booking pages accept Visa Debit and Mastercard Debit, as well as Visa and Mastercard.'],
        ['Are road test booking websites legit?', 'Book only through drivetest.ca. DriveTest warns that third-party sites can add fees and collect your information, and it doesn&rsquo;t have to honour their bookings.'],
        ['How long do I have to wait to rebook after failing?', 'You can book again after 24 hours, but there must generally be at least 10 days between road tests.'],
      ],
      related: ['hamilton-drivetest-centre', 'how-to-pass-the-g2-road-test', 'drivers-licence-cost-ontario'],
      lessons: lessonsChips(['/g2-road-test-preparation/', 'G2 road test prep'], ['/g-road-test-preparation/', 'G test and highway']),
      cta: ['Got your test date?', 'Tell her when it is. Lessons can be planned so you&rsquo;re ready on the day.'],
    }),

    /* ---------- Why people fail the G2 ---------- */
    guidePage({
      slug: 'why-people-fail-the-g2-road-test',
      published: DATE, updated: DATE,
      title: 'Why People Fail the G2 Road Test (and What to Do Next) | Mrs. Akbar',
      description: 'The mistakes that most often fail the G2 road test in Ontario, the truth about automatic fails, and what to do after a fail: your scoresheet, the wait and the fee.',
      script: 'road tests',
      dek: 'The mistakes that cost people the test, what &ldquo;automatic fail&rdquo; really means, and a plan for your next attempt.',
      intro: 'Most people who fail the G2 road test can drive. They lose it on one or two habits that slip under pressure: a rolling stop, a missed shoulder check, a nervous pause at a left turn. The good news is that these are some of the most fixable mistakes there are. Here&rsquo;s what the examiner marks, the errors that come up again and again, and what to do if your test didn&rsquo;t go your way.',
      sections: [
        { id: 'marking', h: 'How the G2 road test is marked', html: p(
          'The examiner gives you directions as you drive and marks you on a scoresheet against set criteria. DriveTest uses set routes, set driving tasks and the same marking standards at every centre.',
          'Each task is broken into small checks. For a left turn at a light, that means things like checking traffic, choosing the right lane, signalling, controlling your speed, keeping your wheels straight while you wait, and finishing in the correct lane.') +
          callout('rule', 'The closest thing to an official fail rule', p('The Driver&rsquo;s Handbook says you haven&rsquo;t properly checked traffic if a vehicle or pedestrian with the right-of-way has to take action to avoid you. DriveTest also says an examiner can end a test if your skills aren&rsquo;t good enough to finish it without risking safety.')) },
        { id: 'mistakes', h: 'The mistakes that fail the most tests', html: p('Driving instructors and insurers report the same handful of mistakes again and again. Here&rsquo;s each one next to the standard in the Handbook&rsquo;s road test checklist.') +
          table({ caption: 'Common G2 road test mistakes and what the examiner wants to see', head: ['Mistake', 'What the examiner wants to see'], rows: [
            ['Rolling stops', 'A complete stop, with no rolling, at the stop line. With no line, stop at the crosswalk; with no crosswalk, at the edge of the sidewalk.'],
            ['Missed shoulder checks', 'A look over your shoulder before you pull away from the curb or change lanes, and a check for cyclists before a right turn. In a lane change, check again after you signal.'],
            ['Too few mirror checks', 'Mirrors every 5 to 10 seconds, and before you slow down or stop.'],
            ['Not yielding', 'No pedestrian or driver with the right-of-way ever has to brake or swerve because of you.'],
            ['Speed', 'Within the limit, and not unreasonably slow either.'],
            ['Following too closely', 'At least two to three seconds behind the vehicle ahead.'],
            ['Late or forgotten signals', 'A signal before you slow down for a turn, switched off once you&rsquo;re through it.'],
            ['Sloppy turns', 'Wheels straight while you wait to turn left, no cutting across lane markings or bumping the curb, and finishing in the correct lane.'],
            ['Hesitation', 'Once it&rsquo;s safe, moving off within four to five seconds.'],
            ['Roadside stops and turnarounds', 'Stopping within about 30 cm of the curb, and reversing only once in a three-point turn.'],
          ] }) +
          p('Almost nothing on that list is about skill. It&rsquo;s about doing the right thing every single time, including the moments when you&rsquo;re nervous. The <a href="/guides/how-to-check-your-blind-spot/">blind spot guide</a>, the <a href="/guides/how-to-do-a-three-point-turn/">three-point turn guide</a> and the <a href="/guides/how-to-parallel-park/">parallel parking guide</a> cover the trickiest ones.') },
        { id: 'automatic', h: 'Are there automatic fails?', html: p('You&rsquo;ll find long lists of &ldquo;automatic fails&rdquo; online. DriveTest doesn&rsquo;t publish one, and it doesn&rsquo;t publish a pass mark or a limit on minor mistakes either. Here&rsquo;s what it does say:') + ul([
            'The examiner can stop the test, or refuse to start it, if the car isn&rsquo;t safe, you seem impaired, or your driving can&rsquo;t finish the test without risking safety.',
            'You won&rsquo;t be asked to do anything illegal, and the examiner can&rsquo;t coach you during the drive, so ask any questions before you start.',
            'If someone with the right-of-way has to react to avoid you, the Handbook counts it as not checking traffic properly.',
          ]) + p('The lists online usually include an examiner having to step in, breaking a traffic law such as running a red light, and causing a collision. They aren&rsquo;t official, but treat them as fails anyway: each one breaks the rule the whole test is built on, which is to drive safely and legally every time.') },
        { id: 'cancelled', h: 'Tests that end before they start', html: p('Some tests never get going. If the car, or something else, doesn&rsquo;t meet DriveTest&rsquo;s rules, the test is declared out of order and you lose half the fee. The other half stays as a credit, and you pay the missing half to rebook. Common reasons:') + ul([
            'A signal light, brake light or horn that doesn&rsquo;t work',
            'A cracked windshield, or a temporary spare tire',
            'A passenger or a pet in the car',
            'Not wearing glasses or contacts that your licence requires',
            'A phone, dash camera or other recording device left on',
            'Testing early on a BDE course your driving school hasn&rsquo;t reported yet',
          ]) + p('Arriving late or not showing up costs the whole fee. If the car develops a problem partway through, you become ill, or you&rsquo;re in a collision that isn&rsquo;t your fault, the test can be rescheduled at no charge.') +
          callout('tip', 'What about backup cameras?', p('The Handbook says back cameras and other driving aids may not be used during the road test. DriveTest&rsquo;s FAQ says you can test in a car that has a rear camera, but you still have to show good observation. Either way, practise reversing and parking with your mirrors and shoulder checks.')) },
        inlineCta('Failed your G2? Call or text Mrs. Akbar to work on exactly what your scoresheet shows.'),
        { id: 'after', h: 'What to do after a fail', html: ol([
          '<strong>Get your scoresheet.</strong> The examiner goes over the result with you, and with your consent an instructor or translator can join that talk. If your test was marked on a tablet, you can download the results from DriveTest for 15 days. After that, or for a paper copy, ask at a DriveTest centre.',
          '<strong>Read it for patterns.</strong> One mark is a slip. The same mark three times is a habit, and habits are what you practise.',
          '<strong>Book again.</strong> Online booking reopens 24 hours after your test, and there must generally be at least 10 days between tests. Each G2 attempt after the first costs $53.75, and there&rsquo;s no limit on attempts while your licence is valid. The <a href="/guides/how-to-book-a-road-test-ontario/">booking guide</a> explains how to find an earlier date.',
          '<strong>Check your expiry date.</strong> You can&rsquo;t book a test for a date after your licence expires. The <a href="/guides/g1-g2-licence-expiry-ontario/">licence expiry guide</a> explains your options if time is short.',
          '<strong>Practise the marks, not just the drive.</strong> Work on each item on the sheet until you do it without thinking, then do a mock test with someone giving you directions.',
        ]) + p('You&rsquo;re still on a G1 after a failed G2 test, so you need a qualified accompanying driver to drive home. If you think the result was wrong, raise it with the examiner first, then ask to speak to a supervisor at that centre.') +
          quote(review('Francis Daniels', 'Very patient instructor, she practiced with me until I got it right.', 'she will teach you that.')) },
        { id: 'common', h: 'Failing is more common than you think', html: p('In 2022, 66% of G2 road tests at the Hamilton DriveTest centre were passes, out of almost 11,000 tests, compared with 74% at Burlington, according to the Auditor General of Ontario. That means about one in three Hamilton G2 tests that year didn&rsquo;t pass. If it happens to you, you&rsquo;re in large company, and you go into the next attempt knowing exactly what to expect.') +
          callout('rule', 'Be wary of guarantees', p('The Handbook warns against anyone who promises to guarantee road test results. Nobody can. What a good instructor can do is find the habits that cost you marks and fix them.')) },
        { id: 'retest', h: 'How to pass next time', html: ul([
          '<strong>Practise in different places and conditions:</strong> busy and quiet roads, different times of day, rain and darkness. DriveTest suggests exactly that.',
          '<strong>Drive the test&rsquo;s skills on purpose:</strong> stops, turns at lights and stop signs, lane changes, one-way streets, residential streets, parallel parking and three-point turns.',
          '<strong>Make your checks visible.</strong> Examiners can&rsquo;t see your eyes, only your head turning.',
          '<strong>Do a mock test.</strong> Have someone give you directions without warning, the way the examiner will.',
          '<strong>Book a lesson before the retest.</strong> An instructor who knows what examiners mark can spot the habit that cost you the test.',
        ]) + quote(review('Sughra Abid', 'Her clear feedback and guidance', 'on the first attempt'), 'passed the G2, first try') +
          p('The <a href="/guides/how-to-pass-the-g2-road-test/">G2 road test guide</a> covers the test from start to finish.') },
      ],
      sources: [S.roadTests, S.vehicle, S.checklist, S.hbLicence, S.testsOverview, S.dtFaqs, S.overview, S.payments, S.fees, S.carLicences, S.getG, S.auditor, S.brokerlink, S.belair],
      faqs: [
        ['How many times can you fail the G2 test in Ontario?', 'There&rsquo;s no limit while your licence is valid. You pay the fee each time, and there must generally be at least 10 days between tests.'],
        ['How long do you have to wait to retake the G2?', 'Generally at least 10 days between tests. Online booking reopens 24 hours after your attempt.'],
        ['Do you have to pay again if you fail your G2?', 'Yes, $53.75 for each new attempt. The first G2 road test is included in the $159.75 G1 package.'],
        ['What are automatic fails on the G2 road test?', 'DriveTest doesn&rsquo;t publish a list. An examiner can end the test if continuing would risk safety, and the Handbook says that if someone with the right-of-way has to react to avoid you, you didn&rsquo;t check traffic properly.'],
        ['How many mistakes can you make on the G2 and still pass?', 'DriveTest doesn&rsquo;t publish a pass mark or a mistake limit. Examiners mark set tasks against fixed criteria, so the safest plan is to make every habit automatic.'],
        ['Can you fail the G2 for a rolling stop?', 'It&rsquo;s one of the most commonly reported reasons people fail. The Handbook&rsquo;s standard is a complete stop, with no rolling, at the stop line.'],
        ['Can you fail the G2 for driving too slowly?', 'It can cost you marks. The Handbook&rsquo;s standard is to stay within the limit without driving unreasonably slowly.'],
        ['Can I drive home after failing my G2?', 'Only with a qualified accompanying driver, because you&rsquo;re still on a G1.'],
        ['How do I get my G2 scoresheet online?', 'If your test was marked on a tablet, DriveTest lets you download the results for 15 days. After that, or for a paper copy, ask at a DriveTest centre.'],
        ['Is it normal to fail the G2 the first time?', 'Yes. In 2022, about one in three G2 road tests at the Hamilton DriveTest centre didn&rsquo;t pass, according to the Auditor General of Ontario.'],
        ['Can I use my backup camera on the G2 road test?', 'The Handbook says back cameras may not be used during the test. DriveTest says you can test in a car that has one, but you must still show good observation, so practise without it.'],
      ],
      related: ['how-to-pass-the-g2-road-test', 'how-to-book-a-road-test-ontario', 'hamilton-drivetest-centre'],
      lessons: lessonsChips(['/g2-road-test-preparation/', 'G2 road test prep'], ['/parallel-parking-lessons/', 'Parallel parking']),
      cta: ['Turn your scoresheet into a plan', 'Call or text with what your scoresheet says. Lessons start with the marks you lost.'],
    }),
  ];
}
