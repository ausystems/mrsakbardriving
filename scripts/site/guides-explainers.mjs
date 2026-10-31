// Plain-language explainers: dashboard warning lights and stopping distance. Written 2026-10-31.
// Warning-light advice follows the Official MTO Driver's Handbook (getting ready to drive,
// maintaining your vehicle); symbol meanings are the common ones, and every car's owner's manual
// has the final word. Stopping distances are worked out from physics with the assumptions stated
// on the page (1.5 s to react, firm braking at about 7 m/s² on dry pavement), not measured.
import { guidePage } from './pages-guides.mjs';
import { callout, inlineCta, quote } from './ui.mjs';
import { review } from './core.mjs';
import { p, ul, ol, h3, table, lessonsChips } from './guide-kit.mjs';
import { dashIcon, dashChart } from './dash-icons.mjs';

const DATE = '2026-10-31';
const S = {
  hbReady: ['Driver&rsquo;s Handbook: getting ready to drive (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/getting-ready-drive'],
  hbMaintain: ['Driver&rsquo;s Handbook: maintaining your vehicle (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/maintaining-your-vehicle'],
  hbEmergencies: ['Driver&rsquo;s Handbook: dealing with emergencies (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/dealing-emergencies'],
  hbNight: ['Driver&rsquo;s Handbook: driving at night and in bad weather (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/driving-night-and-bad-weather'],
  hbAlong: ['Driver&rsquo;s Handbook: driving along (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/driving-along'],
  vehicle: ['Road test vehicle requirements (drivetest.ca)', 'https://drivetest.ca/tests/road-test-vehicle-requirements/'],
};

// Every light: [colour, icon, name, looks like, what it means, what to do, chart label]
const DASH = {
  red: [
    ['red', 'brake', 'Brake system warning light', 'An exclamation mark in a circle, with brackets on both sides. Some cars show the word BRAKE.', 'The parking brake is on, the brake fluid is low, or the brake system has a fault.', 'Make sure the parking brake is fully off. If the light stays on, pull over safely and get help. Don&rsquo;t drive on brakes that might fail.', 'Brake system'],
    ['red', 'oil', 'Oil pressure warning light', 'An old-fashioned oil can with a drip.', 'The engine isn&rsquo;t getting enough oil pressure. Without it, an engine can be badly damaged quickly.', 'Pull over safely and turn the engine off. Once it has cooled, check the oil level with the dipstick, and get help before driving on.', 'Oil pressure'],
    ['red', 'temp', 'Engine temperature warning light', 'A thermometer floating in waves.', 'The engine is overheating. In some cars, a blue version of this light just means the engine is still cold.', 'Pull over safely, turn the engine off and let it cool. Never open the radiator cap on a hot engine: the coolant is under pressure and can burn you.', 'Engine temperature'],
    ['red', 'battery', 'Battery or charging warning light', 'A car battery with plus and minus signs.', 'The car isn&rsquo;t charging its battery, usually because of a problem in the charging system. The car runs on what&rsquo;s left in the battery, then stops.', 'Turn off things you don&rsquo;t need, like the radio and seat heaters, and drive straight to somewhere safe or a garage. Switching off may mean the car won&rsquo;t restart.', 'Battery'],
    ['red', 'steering', 'Power steering warning light', 'A steering wheel with an exclamation mark beside it.', 'The power steering has a fault. You can still steer, but the wheel may suddenly feel much heavier, especially at low speed.', 'Hold the wheel firmly, slow down and pull over somewhere safe. Get it checked before you drive on.', 'Power steering'],
    ['red', 'airbag', 'Airbag warning light', 'A seated person with a big circle in front of them. Some cars show SRS.', 'The airbag system has a fault, so the airbags may not work in a crash.', 'The car still drives normally, but get it checked as soon as you can. Your seatbelt matters even more until it&rsquo;s fixed.', 'Airbag'],
    ['red', 'seatbelt', 'Seatbelt reminder light', 'A seated person wearing a seatbelt.', 'You or a passenger isn&rsquo;t buckled up. Many cars chime as well.', 'Buckle up. In Ontario, the driver and every passenger must wear a seatbelt.', 'Seatbelt'],
    ['red', 'door', 'Door open warning light', 'A car seen from above, with its doors open.', 'A door, the trunk or the hood isn&rsquo;t fully closed.', 'Stop somewhere safe and close it properly before you drive on.', 'Door open'],
  ],
  amber: [
    ['amber', 'engine', 'Check engine light (engine management light)', 'An outline of an engine. Some cars show the words CHECK ENGINE.', 'The engine computer has found a problem. It can be minor, like a loose fuel cap, or more serious.', 'If it&rsquo;s steady, book a check soon. If it&rsquo;s flashing, many cars are warning of a serious problem: slow down, avoid hard acceleration and get it checked right away.', 'Check engine'],
    ['amber', 'powertrain', 'Powertrain or transmission warning light', 'A gear, like a cog, with an exclamation mark inside.', 'In many cars, a fault in the powertrain: the parts that send power to the wheels, usually the transmission. The car may limit its power to protect itself.', 'Drive gently to a garage. If the car shifts strangely, slips or loses power, pull over safely and get help.', 'Powertrain'],
    ['amber', 'throttle', 'Electronic throttle control light', 'A lightning bolt between two brackets.', 'A fault in the electronic throttle, the system that connects your gas pedal to the engine. The car may switch to a reduced-power mode.', 'Drive carefully to a garage, and expect less power when you speed up. Get it checked soon.', 'Throttle control'],
    ['amber', 'abs', 'ABS warning light', 'The letters ABS in a circle, between brackets.', 'The anti-lock braking system has a fault. Your normal brakes still work, but the wheels can lock up if you brake hard.', 'Leave extra space, brake early and gently, and get it checked soon. If the red brake light comes on too, stop driving and get help.', 'ABS'],
    ['amber', 'tpms', 'Tire pressure warning light (TPMS)', 'A tire seen from the side, like a horseshoe, with an exclamation mark.', 'One or more tires is under-inflated. Low tires grip, steer and brake worse, and wear out faster.', 'Check all four tires with a gauge and fill them to the pressure on the tire sticker, usually inside the driver&rsquo;s door frame.', 'Tire pressure'],
    ['amber', 'traction', 'Traction control or stability control light', 'A car with two wavy skid marks under it.', 'Flashing while you drive: the system is working, stopping your wheels from spinning on a slippery road. Staying on: the system is switched off or has a fault.', 'If it&rsquo;s flashing, ease off the gas and slow down. If it stays on, check you haven&rsquo;t switched it off by accident, then get it checked.', 'Traction control'],
    ['amber', 'master', 'Master warning light', 'An exclamation mark in a triangle.', 'A general warning: the car has a message for you, usually shown on the screen between your gauges.', 'Read the message on the dashboard screen, or look it up in the owner&rsquo;s manual. Some cars show this light in red for urgent problems.', 'Master warning'],
    ['amber', 'bulb', 'Bulb failure warning light', 'A light bulb with rays around it.', 'A bulb on the outside of the car is out: a headlight, brake light, turn signal or another light.', 'Walk around the car with the lights on, and ask someone to watch while you press the brake. Replace the bulb soon; an examiner checks your lights before a road test.', 'Bulb failure'],
    ['amber', 'fuel', 'Low fuel warning light', 'A gas pump.', 'You&rsquo;re running low on fuel. Most cars keep a small reserve, but how far it lasts varies.', 'Fill up soon. Running out on a busy road or highway is a hazard for you and everyone around you. On many gauges, a small arrow beside the pump shows which side your fuel door is on.', 'Low fuel'],
    ['amber', 'glow', 'Glow plug light (diesel engines)', 'A coil, like a spring.', 'Only in diesel cars. When you turn the key, the glow plugs are warming the engine so it can start, especially in cold weather. The light should go out after a few seconds.', 'Wait for it to go out before you start the engine. If it flashes or comes on while you&rsquo;re driving, many diesels are warning of an engine fault, so get it checked.', 'Glow plug (diesel)'],
  ],
  info: [
    ['green', 'signals', 'Turn signal indicators', 'Two green arrows, pointing left and right.', 'Your turn signal or your hazard lights are on.', 'Switch it off once your turn is done; a leftover signal confuses other drivers. If it blinks much faster than usual, a bulb is probably out.', 'Turn signals'],
    ['green', 'lowBeam', 'Headlight indicator (low beams)', 'A headlight with lines sloping down.', 'Your low-beam headlights are on.', 'Ontario requires your lights from half an hour before sunset to half an hour after sunrise, and whenever you can&rsquo;t see clearly 150 metres ahead.', 'Low beams'],
    ['blue', 'highBeam', 'High beam indicator', 'A blue headlight with straight lines.', 'Your high beams are on.', 'Switch to low beams within 150 metres of an oncoming vehicle, and when you&rsquo;re within 60 metres behind another one.', 'High beams'],
    ['green', 'frontFog', 'Front fog light indicator', 'A headlight with sloping lines crossed by a wavy line.', 'Your front fog lights are on.', 'Use them in fog together with your low beams, and turn them off once you can see clearly again.', 'Front fog lights'],
    ['amber', 'rearFog', 'Rear fog light indicator', 'A lamp facing the other way, with straight lines crossed by a wavy line. Usually yellow or orange.', 'Your rear fog light is on: a very bright red light at the back of the car.', 'Use it only in thick fog, and switch it off as soon as you can see properly, because it can dazzle the driver behind you.', 'Rear fog light'],
    ['red', 'hazard', 'Hazard lights indicator', 'A red triangle inside a triangle.', 'Your hazard lights, the four-way flashers, are on: all your turn signals flash together.', 'Use them when you&rsquo;re stopped or broken down where you could be a hazard, like on a highway shoulder. Switch them off once you&rsquo;re moving normally again.', 'Hazard lights'],
    ['green', 'cruise', 'Cruise control indicator', 'A speedometer with an arrow.', 'Cruise control is on or set, and the car is holding your speed.', 'Ontario&rsquo;s Handbook says not to use cruise control in snow or other bad weather. Your foot on the brake switches it off.', 'Cruise control'],
    ['green', 'eco', 'ECO mode indicator', 'The letters ECO, often in green.', 'The car&rsquo;s fuel-saving mode is on, or you&rsquo;re driving in a fuel-efficient way.', 'Nothing to do. It&rsquo;s good news, and smooth, gentle driving keeps it lit.', 'ECO mode'],
    ['amber', 'defrost', 'Rear window defroster indicator', 'A rectangle, the back window, with wavy arrows pointing up.', 'The rear window defroster is heating the glass to clear fog, frost or ice.', 'Many cars switch it off by themselves after a few minutes. Clear every window properly before you drive, not just a little peephole.', 'Rear defroster'],
    ['amber', 'childLock', 'Child lock indicator', 'A padlock, sometimes with a child symbol inside.', 'In cars with electric child locks, the rear doors can&rsquo;t be opened from inside, and often the rear windows are locked too.', 'Keep it on with young children in the back, and remember to switch it off when adults ride there.', 'Child lock'],
  ],
};

// The colour code: a glowing dot, a title and a line
const keys = (items) => `<ul class="dash-keys" data-reveal>${items.map(([tone, name, what]) =>
  `<li class="dash-key dash-key--${tone}"><span class="dash-key__lamp" aria-hidden="true"></span><span class="dash-key__name">${name}</span><span class="dash-key__what">${what}</span></li>`).join('')}</ul>`;

// One card per light: its symbol in its colour, then what it looks like, means and what to do
const cards = (items) => `<ul class="dash-lights">${items.map(([tone, icon, name, looks, means, todo]) =>
  `<li class="dash-light dash-light--${tone}" data-reveal><span class="dash-light__icon">${dashIcon(icon, `${name} symbol`)}</span><div class="dash-light__body"><h3 class="dash-light__name">${name}</h3><p class="dash-light__looks">Looks like: ${looks}</p><p><strong>What it means:</strong> ${means}</p><p><strong>What to do:</strong> ${todo}</p></div></li>`).join('')}</ul>`;

// The printable chart of every symbol (written to public/img by build.mjs)
export const dashChartSvg = () => dashChart([...DASH.red, ...DASH.amber, ...DASH.info].map(([tone, icon, , , , , label]) => [tone, icon, label]));

export function explainerGuides() {
  return [
    /* ---------- Dashboard warning lights ---------- */
    guidePage({
      slug: 'dashboard-warning-lights',
      published: DATE, updated: DATE,
      title: 'Dashboard Warning Lights: Every Symbol and Meaning (Chart)',
      description: 'What every dashboard warning light means, with pictures of 28 car symbols: check engine, oil, brake, battery, ABS, tire pressure and more, and what to do.',
      script: 'know your car',
      dek: 'Pictures of 28 dashboard symbols, what each one means, and whether you can keep driving. Red means stop, yellow means check, green and blue mean all good.',
      intro: 'A light pops up on your dashboard and your stomach drops. Is the car about to die? Can you finish the drive? This guide shows every common dashboard warning light with a picture, says what it means in plain words, and tells you exactly what to do. Start with the colour, because it tells you most of what you need to know.',
      sections: [
        { id: 'colours', h: 'Dashboard warning light colours: the quick answer', toc: 'The colour code', html: p('Car dashboard symbols work like traffic lights:') +
          keys([
            ['red', 'Red: stop soon', 'A serious problem or a safety issue. Pull over as soon as it&rsquo;s safe and check what it means.'],
            ['amber', 'Yellow or orange: check soon', 'Something needs attention, but it usually isn&rsquo;t an emergency. Drive carefully and get it looked at.'],
            ['green', 'Green or blue: a system is on', 'Nothing is wrong. A feature is switched on, like your headlights, turn signals or cruise control.'],
          ]) +
          p('A few lights that only mean &ldquo;this is switched on&rdquo; are yellow or red too, like the rear fog light and the hazard lights. They&rsquo;re in the indicator section below. Your owner&rsquo;s manual has the exact meaning of every light in your own car.') },
        { id: 'chart', h: 'Dashboard symbols chart', toc: 'Symbols chart', html: `<figure class="dash-chart" data-reveal><a href="/img/dashboard-warning-lights-chart.svg"><img src="/img/dashboard-warning-lights-chart.svg" width="1436" height="938" loading="lazy" decoding="async" alt="Chart of 28 car dashboard warning lights and indicator symbols, grouped by colour: red warning lights, yellow warning lights, and green and blue indicators"></a><figcaption>All 28 dashboard symbols in one chart. Tap it to open it full size, or save it to your phone.</figcaption></figure>` +
          p('Each symbol is explained below with a bigger picture, grouped by colour.') },
        { id: 'start', h: 'Why every light comes on when you start the car', toc: 'At start-up', html: p('Turn the key or press the start button and the dashboard lights up like a birthday cake. That&rsquo;s normal: the car is testing its bulbs and systems. They should go out within a few seconds.',
          'Ontario&rsquo;s Driver&rsquo;s Handbook says to check that your warning lights and gauges work before you drive, and to watch for a light that stays on after you pull away, because it could mean a serious problem.') +
          callout('tip', 'A two-second habit', p('Before you put the car in gear, glance at the dashboard. Anything still lit after start-up is something to deal with before the drive, not halfway down the highway.')) },
        { id: 'red', h: 'Red warning lights: stop as soon as it&rsquo;s safe', toc: 'Red warning lights', html: p('A red light means a problem that can hurt you or the car. Don&rsquo;t ignore it, and don&rsquo;t keep driving to &ldquo;see what happens.&rdquo;') + cards(DASH.red) },
        { id: 'yellow', h: 'Yellow and orange warning lights: get it checked soon', toc: 'Yellow warning lights', html: p('A yellow or orange light means something isn&rsquo;t right, but you can usually drive carefully to a garage. If a yellow light starts flashing, or the car feels different, treat it like a red one.') + cards(DASH.amber) },
        inlineCta('New to driving, and the dashboard still looks like a cockpit? Call or text Mrs. Akbar.'),
        { id: 'indicators', h: 'Green, blue and other indicator lights: a system is on', toc: 'Indicator lights', html: p('These lights don&rsquo;t mean anything is wrong. They tell you a feature is switched on, so you can check it&rsquo;s the one you wanted.') + cards(DASH.info) },
        { id: 'flashing', h: 'Steady or flashing: what the difference means', toc: 'Steady or flashing', html: p('The same light can mean different things depending on whether it&rsquo;s steady or flashing:') + ul([
            '<strong>Check engine light flashing:</strong> in many cars, a more serious engine problem than a steady light. Slow down and get it checked right away.',
            '<strong>Traction control light flashing:</strong> the system is working on a slippery road. Ease off the gas.',
            '<strong>Tire pressure light flashing at start-up, then staying on:</strong> in many cars, the tire monitoring system itself has a fault.',
            '<strong>Turn signal flashing fast:</strong> a bulb is probably out on that side.',
            '<strong>Glow plug light flashing while you drive:</strong> in many diesels, an engine fault. Get it checked.',
          ]) },
        { id: 'what-to-do', h: 'A red light just came on: what to do', toc: 'What to do', html: ol([
            '<strong>Don&rsquo;t panic, and don&rsquo;t slam on the brakes.</strong> Check your mirrors first.',
            '<strong>Signal and pull over somewhere safe,</strong> off the road if you can: a side street, a parking lot or, on a highway, the shoulder.',
            '<strong>Turn on your hazard lights</strong> if you&rsquo;re stopped near traffic.',
            '<strong>Look the light up</strong> here or in the owner&rsquo;s manual.',
            '<strong>Call for help</strong> if the light means the car shouldn&rsquo;t be driven, like oil pressure, overheating or brakes.',
          ]) + p('On a highway, the Handbook&rsquo;s advice is to start pulling over at the first sign of trouble rather than waiting for the car to stall, and never to stop in a driving lane. The <a href="/guides/how-to-drive-on-the-highway/">highway guide</a> has the details.') },
        { id: 'test', h: 'Warning lights and your road test', toc: 'On test day', html: p('Before a road test, the examiner checks that the car is in proper working order: signals, brake lights, horn and more. A car with a problem can get the test declared out of order, and you lose half the fee. So if a warning light is on, or a bulb is out, get it fixed before test day, and do the start-up glance in the parking lot.',
          'The <a href="/guides/hamilton-drivetest-centre/">Hamilton DriveTest centre guide</a> lists what the car check looks for.') +
          quote(review('Francis Daniels', 'Very knowledgeable instructor, she knows what the ministry require you to do and she will teach you that.')) },
      ],
      sources: [S.hbReady, S.hbMaintain, S.hbEmergencies, S.hbNight, S.vehicle],
      faqs: [
        ['What do the colours of dashboard warning lights mean?', 'Red means a serious problem or a safety issue, so stop as soon as it&rsquo;s safe. Yellow or orange means something needs checking soon. Green and blue mean a system is on and working.'],
        ['What does the exclamation mark in a circle mean on my dashboard?', 'It&rsquo;s the brake system warning light. The parking brake may be on, the brake fluid may be low, or the brakes may have a fault. If it stays on with the parking brake off, pull over and get help.'],
        ['What does the triangle with an exclamation mark mean?', 'It&rsquo;s the master warning light. The car has a message for you, usually shown on the screen between the gauges.'],
        ['What does the check engine light mean?', 'The engine computer has found a problem, from something small like a loose fuel cap to something more serious. Steady means book a check soon; flashing, in many cars, means get it checked right away.'],
        ['Can I drive with the check engine light on?', 'If it&rsquo;s steady and the car drives normally, usually for a short time, but book a check soon. If it&rsquo;s flashing, slow down and get it looked at right away.'],
        ['What does the oil light mean?', 'Low oil pressure. Pull over safely and turn off the engine, because driving without oil pressure can quickly damage it.'],
        ['What does the battery light mean while driving?', 'The car isn&rsquo;t charging its battery. It runs on what&rsquo;s left in the battery and then stops, so head straight somewhere safe or to a garage.'],
        ['What does the tire pressure light mean?', 'At least one tire is low. Check all four and fill them to the pressure on the tire sticker, usually inside the driver&rsquo;s door frame.'],
        ['What does the car with squiggly lines mean?', 'It&rsquo;s traction or stability control. Flashing means it&rsquo;s helping on a slippery road; staying on means it&rsquo;s switched off or has a fault.'],
        ['What does the gear with an exclamation mark mean?', 'In many cars, a powertrain or transmission fault. Drive gently to a garage, and pull over if the car shifts strangely or loses power.'],
        ['What does the coil light on my dashboard mean?', 'It&rsquo;s the glow plug light in a diesel car. Wait for it to go out before starting the engine. If it flashes while you drive, get the engine checked.'],
        ['What does the steering wheel warning light mean?', 'The power steering has a fault. You can still steer, but it may feel much heavier, so slow down and pull over somewhere safe.'],
        ['What does the blue light on my dashboard mean?', 'Usually that your high beams are on. In some cars, a blue thermometer means the engine is still cold, which is normal for the first few minutes.'],
        ['Is it normal for all the warning lights to come on when I start the car?', 'Yes. The car tests its lights at start-up, and they should go out within a few seconds. One that stays on needs attention.'],
        ['Why is my turn signal blinking fast?', 'A bulb is probably out on that side. Check the front and rear signal lights.'],
      ],
      related: ['how-to-drive-a-car', 'hamilton-drivetest-centre', 'stopping-distance'],
      lessons: lessonsChips(['/beginner-driving-lessons/', 'Beginner lessons'], ['/driving-lessons-for-nervous-drivers/', 'Nervous drivers']),
      cta: ['Get comfortable in the driver&rsquo;s seat', 'Lessons start with the car itself: the controls, the mirrors and what the dashboard is telling you.'],
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
