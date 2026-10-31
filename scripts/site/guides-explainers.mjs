// Plain-language explainers: dashboard warning lights and stopping distance. Written 2026-10-31.
// Warning-light advice follows the Official MTO Driver's Handbook (getting ready to drive,
// maintaining your vehicle); symbol meanings are the common ones, and every car's owner's manual
// has the final word. Stopping distances are worked out from physics with the assumptions stated
// on the page (1.5 s to react, firm braking at about 7 m/s² on dry pavement), not measured.
import { guidePage } from './pages-guides.mjs';
import { callout, inlineCta, quote } from './ui.mjs';
import { review } from './core.mjs';
import { p, ul, ol, h3, table, lessonsChips } from './guide-kit.mjs';

const DATE = '2026-10-31';
const S = {
  hbReady: ['Driver&rsquo;s Handbook: getting ready to drive (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/getting-ready-drive'],
  hbMaintain: ['Driver&rsquo;s Handbook: maintaining your vehicle (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/maintaining-your-vehicle'],
  hbEmergencies: ['Driver&rsquo;s Handbook: dealing with emergencies (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/dealing-emergencies'],
  hbNight: ['Driver&rsquo;s Handbook: driving at night and in bad weather (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/driving-night-and-bad-weather'],
  hbAlong: ['Driver&rsquo;s Handbook: driving along (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/driving-along'],
  vehicle: ['Road test vehicle requirements (drivetest.ca)', 'https://drivetest.ca/tests/road-test-vehicle-requirements/'],
};

// A row of dashboard lamps: colour, name and what to do
const lights = (items) => `<ul class="dash-lights" data-reveal>${items.map(([tone, name, what]) =>
  `<li class="dash-light dash-light--${tone}"><span class="dash-light__lamp" aria-hidden="true"></span><span class="dash-light__name">${name}</span><span class="dash-light__what">${what}</span></li>`).join('')}</ul>`;

export function explainerGuides() {
  return [
    /* ---------- Dashboard warning lights ---------- */
    guidePage({
      slug: 'dashboard-warning-lights',
      published: DATE, updated: DATE,
      title: 'Dashboard Warning Lights: What Each Colour and Symbol Means',
      description: 'Dashboard warning lights in plain words: what red, yellow, green and blue mean, the lights that mean stop now, the ones that can wait, and what to do for each.',
      script: 'know your car',
      dek: 'Your car talks to you in colours. Here&rsquo;s how to tell &ldquo;pull over now&rdquo; from &ldquo;book a check-up&rdquo; from &ldquo;all good.&rdquo;',
      intro: 'A light pops up on the dashboard and your stomach drops. Is the car about to die? Can you finish the drive? Most of the time the answer is in one detail: its colour. Dashboards work a lot like traffic lights, and once you know the code, a surprise light stops being scary and starts being useful.',
      sections: [
        { id: 'colours', h: 'The colour code', html: p('Car makers use the same basic idea:') +
          lights([
            ['red', 'Red: stop soon', 'A safety problem or something that can damage the car. Find a safe place to pull over and check it.'],
            ['amber', 'Yellow or orange: check soon', 'Something needs attention, but it usually isn&rsquo;t an emergency. Drive carefully and get it looked at.'],
            ['green', 'Green or blue: information', 'A system is on and working, like your headlights, signals or cruise control.'],
          ]) +
          p('Your owner&rsquo;s manual has the exact meaning of every light in your car. Keep it in the glovebox, or find the digital version on the maker&rsquo;s website.') },
        { id: 'start', h: 'Why they all light up when you start the car', toc: 'At start-up', html: p('Turn the key or press the start button and the dashboard lights up like a birthday cake. That&rsquo;s normal: the car is checking its bulbs and systems. They should go out within a few seconds.',
          'Ontario&rsquo;s Driver&rsquo;s Handbook says to check that your warning lights and gauges work before you drive, and to watch for one that stays on after you pull away, because it could mean a serious problem.') +
          callout('tip', 'A two-second habit', p('Before you put the car in gear, glance at the dashboard. Anything still lit after start-up is something to deal with before the drive, not halfway down the highway.')) },
        { id: 'red', h: 'Red lights: pull over safely', toc: 'Red lights', html: lights([
            ['red', 'Oil pressure (an old-fashioned oil can)', 'The engine may not be getting enough oil. Pull over and turn the engine off. Driving on can wreck an engine fast.'],
            ['red', 'Engine temperature (a thermometer in waves)', 'The engine is overheating. Pull over, switch off, and let it cool. Never open the radiator cap on a hot engine.'],
            ['red', 'Brake system (a circle with an exclamation mark)', 'Check that the parking brake is fully off. If it stays on, the brakes may have a problem. Don&rsquo;t keep driving on it.'],
            ['red', 'Battery or charging (a battery shape)', 'The car isn&rsquo;t charging its battery. It can run for a while on what&rsquo;s left, then stop. Head somewhere safe and get help.'],
            ['red', 'Airbag (a seated person with a circle)', 'The airbag system has a fault and may not work in a crash. Get it checked as soon as you can.'],
            ['red', 'Seatbelt (a person wearing a belt)', 'Someone isn&rsquo;t buckled up. Easy fix.'],
          ]) },
        { id: 'amber', h: 'Yellow lights: get it checked', toc: 'Yellow lights', html: lights([
            ['amber', 'Check engine (an engine outline)', 'The engine computer has found a fault. Steady: book a check soon. Flashing, in many cars: a more serious problem, so ease off and get it looked at right away.'],
            ['amber', 'ABS (the letters ABS in a circle)', 'The anti-lock part of your brakes has a fault. Normal braking still works, but leave extra space and get it fixed.'],
            ['amber', 'Tire pressure (a horseshoe shape with an exclamation mark)', 'One or more tires is low. Check the pressures when you can and top them up. Low tires grip and brake worse.'],
            ['amber', 'Traction or stability control (a car with wavy lines)', 'Flashing while you drive: the system is helping on a slippery road, so slow down. Staying on: the system is off or has a fault.'],
            ['amber', 'Low fuel (a fuel pump)', 'You&rsquo;re running low. Don&rsquo;t push it; running out on a busy road is a hazard.'],
          ]) },
        { id: 'green', h: 'Green and blue lights: all good', toc: 'Green and blue', html: lights([
            ['green', 'Turn signals (flashing arrows)', 'Your signal is on. If it&rsquo;s still blinking after a turn, switch it off; leftover signals confuse other drivers. Blinking much faster than usual often means a bulb is out.'],
            ['green', 'Headlights', 'Your lights are on. The <a href="/guides/driving-at-night-and-in-the-rain/">night and rain guide</a> covers when Ontario requires them.'],
            ['blue', 'High beams (a blue headlight)', 'High beams are on. Dim them within 150 metres of an oncoming car, or when you&rsquo;re within 60 metres behind one.'],
            ['green', 'Cruise control', 'Cruise is set. The Handbook says not to use it in snow or other bad weather.'],
          ]) },
        inlineCta('New to driving, and the dashboard still looks like a cockpit? Call or text Mrs. Akbar.'),
        { id: 'what-to-do', h: 'A red light just came on: what to do', toc: 'What to do', html: ol([
            '<strong>Don&rsquo;t panic, and don&rsquo;t slam the brakes.</strong> Check your mirrors first.',
            '<strong>Signal and pull over somewhere safe,</strong> off the road if you can: a side street, a parking lot or, on a highway, the shoulder.',
            '<strong>Turn on your hazard lights</strong> if you&rsquo;re stopped near traffic.',
            '<strong>Look the light up</strong> in the owner&rsquo;s manual.',
            '<strong>Call for help</strong> if the light means the car shouldn&rsquo;t be driven, like oil pressure, overheating or brakes.',
          ]) + p('On a highway, the Handbook&rsquo;s advice is to start pulling over at the first sign of trouble rather than waiting for the car to stall, and never to stop in a driving lane. The <a href="/guides/how-to-drive-on-the-highway/">highway guide</a> has the details.') },
        { id: 'test', h: 'Warning lights and your road test', toc: 'On test day', html: p('Before a road test, the examiner checks that the car is in proper working order: signals, brake lights, horn and more. A car with a problem can get the test declared out of order, and you lose half the fee. So if a warning light is on, get it fixed before test day, and do the start-up glance in the parking lot.',
          'The <a href="/guides/hamilton-drivetest-centre/">Hamilton DriveTest centre guide</a> lists what the car check looks for.') +
          quote(review('Francis Daniels', 'Very knowledgeable instructor, she knows what the ministry require you to do and she will teach you that.')) },
      ],
      sources: [S.hbReady, S.hbMaintain, S.hbEmergencies, S.hbNight, S.vehicle],
      faqs: [
        ['What do the colours of dashboard warning lights mean?', 'Red usually means a safety problem or possible damage, so pull over safely. Yellow or orange means get it checked soon. Green or blue means a system is on and working.'],
        ['Is it normal for all the warning lights to come on when I start the car?', 'Yes. The car checks its lights and systems at start-up, and they should go out within a few seconds. One that stays on needs attention.'],
        ['Can I keep driving with the check engine light on?', 'If it&rsquo;s steady, usually for a short time, but book a check soon. If it&rsquo;s flashing, many cars are signalling a more serious problem, so ease off and get it looked at right away.'],
        ['What should I do if the oil light comes on?', 'Pull over somewhere safe and turn off the engine. Low oil pressure can damage an engine quickly, so check the oil level and get help before driving on.'],
        ['What does the tire pressure light mean?', 'At least one tire is low. Check all four pressures and top them up to the number on the tire sticker, usually inside the driver&rsquo;s door frame.'],
        ['Why is my traction control light flashing?', 'The system is working to stop your wheels from spinning on a slippery road. Ease off and slow down.'],
        ['Why is my turn signal blinking fast?', 'Often a bulb is out somewhere in the signal. Check the front and back lights on that side.'],
      ],
      related: ['how-to-drive-a-car', 'hamilton-drivetest-centre', 'stopping-distance'],
      lessons: lessonsChips(['/beginner-driving-lessons/', 'Beginner lessons'], ['/driving-lessons-for-nervous-drivers/', 'Nervous drivers']),
      cta: ['Get comfortable in the driver&rsquo;s seat', 'Lessons start with the car itself: controls, mirrors and what the dashboard is telling you.'],
    }),

    /* ---------- Stopping distance ---------- */
    guidePage({
      slug: 'stopping-distance',
      published: DATE, updated: DATE,
      title: 'Stopping Distance: How Far a Car Travels Before It Stops',
      description: 'How far a car travels before it stops at 40, 50, 80 and 100 km/h, why doubling your speed quadruples your braking distance, and what it means for following distance.',
      script: 'the physics of stopping',
      dek: 'At 50&nbsp;km/h you cover 14 metres every second. Here&rsquo;s what that means when something steps out in front of you.',
      intro: 'Most new drivers think a car stops when you hit the brake. It doesn&rsquo;t. First you have to notice the problem and move your foot, and the car keeps going the whole time. Then the brakes take a while to bring it down. Add the two together and you get your stopping distance, and it&rsquo;s almost always longer than people guess.',
      sections: [
        { id: 'two-parts', h: 'Stopping happens in two parts', toc: 'The two parts', html: ol([
            '<strong>Reaction distance:</strong> how far you travel between seeing the problem and pressing the brake. A typical figure is about a second and a half. During that time, you&rsquo;re still going full speed.',
            '<strong>Braking distance:</strong> how far the car travels once the brakes are on, until it stops.',
          ]) + p('Stopping distance is the two added together. You control the first part with your attention, and the second part with your speed.') },
        { id: 'per-second', h: 'How far you travel in one second', toc: 'One second at speed', html: p('This part isn&rsquo;t an estimate. It&rsquo;s just your speed in metres per second:') +
          table({ caption: 'Distance covered every second', head: ['Speed', 'Metres every second', 'That&rsquo;s about'], rows: [
            ['40&nbsp;km/h', '11 metres', 'two car lengths'],
            ['50&nbsp;km/h', '14 metres', 'three car lengths'],
            ['80&nbsp;km/h', '22 metres', 'four or five car lengths'],
            ['100&nbsp;km/h', '28 metres', 'six car lengths'],
          ] }) +
          callout('tip', 'Try this as a passenger', p('Next time you&rsquo;re in a car at 50&nbsp;km/h, count &ldquo;one thousand and one&rdquo; as you pass a pole. Watch how far you&rsquo;ve gone by the time you finish saying it. Glancing at a phone for two seconds at that speed means driving about 28 metres without looking.')) },
        { id: 'table', h: 'Stopping distances at common speeds', toc: 'The numbers', html: p('Here&rsquo;s how it adds up, using simple physics: 1.5 seconds to react, then firm braking on dry pavement in a car with good tires. Real distances vary with the car, the road and the driver, so treat these as a rough guide, not a promise.') +
          table({ caption: 'Estimated stopping distance on a dry road', head: ['Speed', 'Reaction', 'Braking', 'Total'], rows: [
            ['30&nbsp;km/h', '12&nbsp;m', '5&nbsp;m', 'about 17&nbsp;m'],
            ['40&nbsp;km/h', '17&nbsp;m', '9&nbsp;m', 'about 25&nbsp;m'],
            ['50&nbsp;km/h', '21&nbsp;m', '14&nbsp;m', 'about 35&nbsp;m'],
            ['60&nbsp;km/h', '25&nbsp;m', '20&nbsp;m', 'about 45&nbsp;m'],
            ['80&nbsp;km/h', '33&nbsp;m', '35&nbsp;m', 'about 69&nbsp;m'],
            ['100&nbsp;km/h', '42&nbsp;m', '55&nbsp;m', 'about 97&nbsp;m'],
            ['110&nbsp;km/h', '46&nbsp;m', '67&nbsp;m', 'about 113&nbsp;m'],
          ] }) +
          p('Look at 100&nbsp;km/h: nearly a hundred metres, about the length of a football field, on a dry road with an alert driver.') },
        { id: 'squared', h: 'Why a little more speed costs a lot more distance', toc: 'Why speed matters', html: p('Reaction distance grows in step with your speed: twice as fast, twice as far. Braking distance doesn&rsquo;t. It grows with the square of your speed, so doubling your speed makes your braking distance about four times longer.',
          'That&rsquo;s why the table jumps the way it does. Going from 50 to 100&nbsp;km/h doubles your speed, but braking distance goes from about 14 metres to about 55.') +
          callout('local', 'School zones in Hamilton', p('Some Hamilton streets near schools are posted at 40 or even 30&nbsp;km/h. On the numbers above, a car at 40 stops about 10 metres sooner than one at 50. That can be the difference between stopping before a crosswalk and stopping in it.')) },
        inlineCta('Want to practise smooth, early braking with an instructor? Call or text Mrs. Akbar.'),
        { id: 'longer', h: 'What makes it longer', html: ul([
            '<strong>Wet roads.</strong> Water cuts grip, and the first few minutes of rain are especially slippery. Braking distance grows.',
            '<strong>Snow and ice.</strong> Braking distance can grow many times over. Slow down well before you need to stop.',
            '<strong>Worn or under-inflated tires.</strong> Less grip means more distance. Ontario&rsquo;s Handbook says to replace tires once the tread is under 1.5&nbsp;millimetres.',
            '<strong>Distraction or tiredness.</strong> A slower reaction adds metres before you even touch the brake: about 14 more for every extra second at 50&nbsp;km/h.',
            '<strong>Going downhill,</strong> or carrying a heavy load.',
          ]) + p('And one surprise: anti-lock brakes (ABS) help you keep steering while you brake hard, but the Handbook notes they don&rsquo;t shorten your stopping distance.') },
        { id: 'following', h: 'What this means for following distance', toc: 'Following distance', html: p('The Handbook&rsquo;s rule is to stay at least two seconds behind the vehicle ahead. Why two seconds and not the full stopping distance? Because the car ahead has to stop too. The gap mostly has to cover your reaction time, and two seconds gives you that plus a little to spare, in ideal conditions.',
          'In rain, snow, at night, or behind a truck, leave more. The Handbook calls two seconds a minimum, not a target.') +
          h3('How to measure it') + ol([
            'Pick a fixed point ahead, like a sign or a shadow on the road.',
            'When the back of the car ahead passes it, count &ldquo;one thousand and one, one thousand and two.&rdquo;',
            'If you reach the point before you finish counting, ease off.',
          ]) },
        { id: 'night', h: 'Stopping distance at night', toc: 'At night', html: p('Low beams light up a limited stretch of road. If your stopping distance is longer than what you can see, you can&rsquo;t stop in time for something that appears in your lights. The Handbook calls this overdriving your headlights. The fix is simple: slow down on dark roads. The <a href="/guides/driving-at-night-and-in-the-rain/">night and rain guide</a> covers the rest.') +
          quote(review('Mila Alieva', 'With your guidance and patience you taught me the skills to become a safe driver.')) },
      ],
      sources: [S.hbAlong, S.hbNight, S.hbMaintain],
      faqs: [
        ['What is stopping distance?', 'The total distance your car travels from the moment you see a hazard to the moment it stops: your reaction distance plus your braking distance.'],
        ['How long does it take to stop at 50 km/h?', 'Roughly 35 metres on a dry road with an alert driver: about 21 metres while you react, and about 14 more while the brakes stop the car.'],
        ['How long does it take to stop at 100 km/h?', 'Roughly 97 metres on a dry road, about the length of a football field. Rain, snow, worn tires or a slow reaction make it longer.'],
        ['Does doubling your speed double your stopping distance?', 'No, it&rsquo;s worse. Reaction distance doubles, but braking distance roughly quadruples, because it grows with the square of your speed.'],
        ['What is the two-second rule?', 'Stay at least two seconds behind the vehicle ahead: count from when it passes a fixed point to when you reach it. Leave more in bad weather or behind a truck.'],
        ['Do anti-lock brakes stop the car faster?', 'Not usually. ABS helps you keep steering during hard braking, but it doesn&rsquo;t shorten your stopping distance.'],
        ['How much longer is stopping distance in the rain?', 'It depends on the road and your tires, but braking distance grows on wet pavement, and much more on snow or ice. Slow down and leave more space.'],
      ],
      related: ['defensive-driving-tips', 'driving-at-night-and-in-the-rain', 'ontario-speed-limits-and-speeding-tickets'],
      lessons: lessonsChips(['/beginner-driving-lessons/', 'Beginner lessons'], ['/g-road-test-preparation/', 'G test and highway']),
      cta: ['Learn to brake early and smoothly', 'Smooth, early stops are one of the habits examiners look for. Call or text to book a lesson.'],
    }),
  ];
}
