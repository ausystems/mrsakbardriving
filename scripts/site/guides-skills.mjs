// Skills guides: three-point turns and the roadside stop, roundabouts, mirrors and blind spots,
// reverse parking and defensive driving. Facts checked 2026-10-07 against the Official MTO Driver's
// Handbook, drivetest.ca and the Highway Traffic Act; paraphrased, never copied.
import { guidePage } from './pages-guides.mjs';
import { callout, inlineCta, quote } from './ui.mjs';
import { review } from './core.mjs';
import { p, ul, ol, h3, table, lessonsChips } from './guide-kit.mjs';

const DATE = '2026-10-07';
const S = {
  roadTest: ['Driver&rsquo;s Handbook: the road test checklist (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/level-two-road-test'],
  directions: ['Driver&rsquo;s Handbook: changing directions (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/changing-directions'],
  parking: ['Driver&rsquo;s Handbook: parking along roadways (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/parking-along-roadways'],
  getG: ['Get a G driver&rsquo;s licence: new drivers (ontario.ca)', 'https://www.ontario.ca/page/get-g-drivers-licence-new-drivers'],
  roadTests: ['Road tests for cars (drivetest.ca)', 'https://drivetest.ca/tests/road-tests-cars/'],
  faqs: ['DriveTest frequently asked questions (drivetest.ca)', 'https://drivetest.ca/home/faqs/'],
  hta: ['Highway Traffic Act, sections 143 and 157 (ontario.ca/laws)', 'https://www.ontario.ca/laws/statute/90h08'],
  hamRoundabouts: ['Roundabouts (hamilton.ca)', 'https://www.hamilton.ca/home-neighbourhood/getting-around/driving-traffic/vision-zero-roadway-safety/roundabouts'],
  signs: ['Driver&rsquo;s Handbook: signs (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/signs'],
  osm: ['Local roundabout locations: map data &copy; OpenStreetMap contributors (openstreetmap.org)', 'https://www.openstreetmap.org/copyright'],
  ready: ['Driver&rsquo;s Handbook: getting ready to drive (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/getting-ready-drive'],
  along: ['Driver&rsquo;s Handbook: driving along (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/driving-along'],
  positions: ['Driver&rsquo;s Handbook: changing positions (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/changing-positions'],
  share: ['Driver&rsquo;s Handbook: sharing the road with other road users (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/sharing-road-other-road-users'],
  freeway: ['Driver&rsquo;s Handbook: freeway driving (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/freeway-driving'],
  licence: ['Driver&rsquo;s Handbook: getting your driver&rsquo;s licence (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/getting-your-drivers-licence'],
  safe: ['Driver&rsquo;s Handbook: safe and responsible driving (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/safe-and-responsible-driving'],
  situations: ['Driver&rsquo;s Handbook: dealing with particular situations (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/dealing-particular-situations'],
  weather: ['Driver&rsquo;s Handbook: driving at night and in bad weather (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/driving-night-and-bad-weather'],
  nhtsaMirrors: ['Blind zone and glare elimination mirror settings (nhtsa.gov, U.S.)', 'https://www.nhtsa.gov/sites/nhtsa.gov/files/blindzoneglaremirrormethod.pdf'],
  icbc: ['Tuning Up for Drivers (icbc.com, British Columbia)', 'https://icbc.com/assets/en/7piwqMyGnoxb1F6ONZSMqr/tuneup-complete.pdf'],
  sgi: ['Driver&rsquo;s handbook: parking (sgi.sk.ca, Saskatchewan)', 'https://sgi.sk.ca/handbook/-/knowledge_base/drivers/parking'],
  nhtsaKids: ['Child safety around vehicles (nhtsa.gov, U.S.)', 'https://www.nhtsa.gov/road-safety/child-safety'],
  tcAssist: ['What you need to know about driver assistance technologies (tc.canada.ca)', 'https://tc.canada.ca/en/road-transportation/driver-assistance-technologies/what-you-need-know-about-driver-assistance-technologies'],
  orsar: ['Ontario Road Safety Annual Report 2022 (ontario.ca)', 'https://www.ontario.ca/files/2026-02/mto-orsar-annual-report-en-2022-2026-02-05.pdf'],
  tcStats: ['Canadian motor vehicle traffic collision statistics 2023 (tc.canada.ca)', 'https://tc.canada.ca/en/road-transportation/statistics-data/canadian-motor-vehicle-traffic-collision-statistics/2023/canadian-motor-vehicle-traffic-collision-statistics-2023'],
  htaFull: ['Highway Traffic Act (ontario.ca/laws)', 'https://www.ontario.ca/laws/statute/90h08'],
};

export function skillGuides() {
  return [
    /* ---------- Mirrors and blind spots ---------- */
    guidePage({
      slug: 'how-to-check-your-blind-spot',
      published: DATE, updated: DATE,
      title: 'How to Adjust Your Mirrors and Check Your Blind Spot | Mrs. Akbar',
      description: 'How to set your mirrors the Ontario Handbook way, where your blind spots are, when to shoulder check, the wider mirror setting, and why cameras aren&rsquo;t enough.',
      script: 'skills',
      dek: 'Setting your seat and mirrors, finding your blind spots, and the moments you always turn your head.',
      intro: 'Every car has blind spots: areas beside and behind you that none of your mirrors show. A car, a cyclist or a pedestrian can disappear into one. Setting your mirrors well makes them smaller, and a quick shoulder check covers the rest. Here&rsquo;s how, following Ontario&rsquo;s Driver&rsquo;s Handbook.',
      sections: [
        { id: 'seat', h: 'Start with your seat', html: p('Mirrors are set for one driving position, so adjust the seat first:') + ul([
          'You can see over the steering wheel and the hood, and see the ground about 4 m in front of the car.',
          'Your elbows are slightly bent when you hold the wheel, and your feet reach the pedals easily.',
          'The head restraint is centred behind your head.',
        ]) },
        { id: 'mirrors', h: 'Setting your mirrors', html: ol([
          '<strong>Inside mirror:</strong> centre it on the rear window, so you see straight back.',
          '<strong>Left mirror:</strong> lean your head toward the driver&rsquo;s window, then set the mirror so you can just see the back of your car.',
          '<strong>Right mirror:</strong> lean toward the centre of the car, then set it the same way.',
          '<strong>Check for overlap.</strong> The side mirrors shouldn&rsquo;t repeat what the inside mirror already shows.',
        ]) + callout('tip', 'Find your own blind spots', p('Sit in the driver&rsquo;s seat and have someone walk slowly around the car. Watch them in each mirror. Wherever they disappear is a blind spot, and that&rsquo;s where your shoulder checks go.')) },
        { id: 'wider', h: 'The wider mirror setting', html: p('Leaning toward the window as you set the mirror turns it further out than many people expect, and that&rsquo;s the point. Safety agencies outside Ontario describe the same idea: the U.S. National Highway Traffic Safety Administration suggests angling each side mirror about 15 degrees further out than the setting where you see your own car, and British Columbia&rsquo;s driver guide teaches a similar wide setting.',
          'The test is simple: a car passing you should appear in the side mirror before it leaves the inside mirror. Some drivers prefer seeing a sliver of their own car, which makes distances easier to judge. Either way, Ontario still expects you to shoulder check.') },
        { id: 'where', h: 'Where your blind spots are', html: p('In most cars, the blind spots are beside you and slightly behind, on both sides. On some cars they&rsquo;re big enough to hide a whole vehicle, a cyclist or a pedestrian. Side mirrors only show a narrow strip of road, so turning your head is the only sure check.') },
        { id: 'when', h: 'When to shoulder check', html: ul([
          '<strong>Changing lanes:</strong> check your mirrors, shoulder check toward the new lane (watch for cyclists), signal, check again, then steer over gradually without slowing down.',
          '<strong>Turning:</strong> before a right turn, check your right-rear blind spot for cyclists coming up in a bike lane, on the sidewalk or on a trail. Before a left turn, check your left side.',
          '<strong>Pulling away from the curb:</strong> check your mirrors and blind spot just before you move.',
          '<strong>Backing up or turning around:</strong> mirrors, then look over your shoulder.',
          '<strong>Merging onto a freeway:</strong> keep switching your eyes between the road ahead, your mirrors and your blind spot until there&rsquo;s a gap.',
          '<strong>Opening your door:</strong> the Handbook recommends the &ldquo;Dutch reach&rdquo;: open your door with the hand furthest from it, which turns your body so you look back for cyclists. Opening a door into traffic costs $300 to $1,000.',
        ]) },
        { id: 'how', h: 'How to shoulder check without drifting', html: p('Keep it quick: a short look over your shoulder, then eyes back to the front. Your hands should stay still on the wheel, because the Handbook expects you to steer straight while you check. Practise in an empty lot until the car stays in its lane while you look.',
          'Between checks, look at your mirrors often. The Handbook suggests about every five seconds, and more often in heavy traffic.') },
        inlineCta('Want shoulder checks to become automatic before your test? Call or text Mrs. Akbar.'),
        { id: 'trucks', h: 'Blind spots around trucks and buses', html: p('Large vehicles have big blind spots on both sides, and the driver can&rsquo;t see directly behind them. Ontario&rsquo;s rule of thumb: if you can&rsquo;t see the driver&rsquo;s face in their side mirror, they can&rsquo;t see you. Don&rsquo;t linger beside a truck, don&rsquo;t follow closely behind one, and after passing, don&rsquo;t cut back in until there&rsquo;s plenty of room.') },
        { id: 'tech', h: 'Blind-spot monitors and cameras', html: p('Blind-spot warnings and backup cameras help, but they don&rsquo;t replace looking. Transport Canada notes they may not work in bad weather or poor visibility, and the Handbook reminds you that you stay responsible for every part of driving.') +
          callout('rule', 'On the road test', p('Driving aids such as back cameras, lane monitoring and automatic parking may not be used during a road test. You can take the test in a car with a rear camera, but the examiner expects you to turn your head and check your mirrors.')) },
        { id: 'test', h: 'Why examiners watch your head', html: p('Examiners can&rsquo;t see your eyes, but they can see your head turn. On the road test checklist, a lane change includes one more blind-spot check after you signal, and pulling away from the curb needs a check just before you move. The <a href="/guides/how-to-pass-the-g2-road-test/">G2 road test guide</a> covers the rest.') +
          quote(review('Gaurav Singh', 'Each lesson was well planned', 'defensive driving.'), 'passed the G2, first try') },
      ],
      sources: [S.ready, S.along, S.positions, S.directions, S.parking, S.share, S.freeway, S.licence, S.roadTest, S.faqs, S.tcAssist, S.nhtsaMirrors, S.icbc, S.htaFull],
      faqs: [
        ['How do I adjust my side mirrors to reduce blind spots?', 'Lean toward the driver&rsquo;s window and set the left mirror so you can just see the back of your car; lean to the centre of the car and set the right mirror the same way. A passing car should then appear in the side mirror before it leaves the inside mirror.'],
        ['Should I be able to see my car in my side mirrors?', 'Only just. Set up the Handbook way, you see a sliver of your car from the leaned position, so the mirror points further out when you sit normally.'],
        ['Where are the blind spots on a car?', 'Beside you and slightly behind, on both sides. They can hide a whole car, a cyclist or a pedestrian.'],
        ['How often should I check my mirrors while driving?', 'The Handbook suggests about every five seconds, and more often in heavy traffic.'],
        ['When do I need to shoulder check?', 'Before changing lanes, turning, pulling away from the curb, backing up, merging, and opening your door.'],
        ['What&rsquo;s the right order for a lane change?', 'Mirrors, shoulder check, signal, check again, then steer over gradually without slowing down.'],
        ['Do I still need to shoulder check if my car has blind spot monitoring?', 'Yes. Monitors can miss things, especially in bad weather, and on the road test you&rsquo;re expected to turn your head.'],
        ['How do I know if I&rsquo;m in a truck&rsquo;s blind spot?', 'If you can&rsquo;t see the driver&rsquo;s face in their side mirror, they can&rsquo;t see you.'],
      ],
      related: ['defensive-driving-tips', 'how-to-pass-the-g2-road-test', 'how-to-reverse-park'],
      lessons: lessonsChips(['/beginner-driving-lessons/', 'Beginner lessons'], ['/g2-road-test-preparation/', 'G2 road test prep']),
      cta: ['Make checks a habit', 'The right checks at the right moments are what examiners look for. Call or text to book.'],
    }),

    /* ---------- Defensive driving ---------- */
    guidePage({
      slug: 'defensive-driving-tips',
      published: DATE, updated: DATE,
      title: 'Defensive Driving Tips for New Drivers (Ontario) | Mrs. Akbar',
      description: 'Defensive driving habits from Ontario&rsquo;s Driver&rsquo;s Handbook: the 2-second rule, scanning 12 to 15 seconds ahead, space cushions, tailgaters, fatigue and distraction.',
      script: 'skills',
      dek: 'See trouble early, keep space around you, and make sure others see you: the habits that prevent collisions.',
      intro: 'Defensive driving means spotting danger before it happens and responding quickly and well. Ontario&rsquo;s Driver&rsquo;s Handbook builds it on three ideas: visibility, space and communication. It matters most for new drivers, who the Handbook says are far more likely than experienced drivers to be in serious or fatal collisions.',
      sections: [
        { id: 'why', h: 'Why it matters for new drivers', html: p('Ontario&rsquo;s own collision numbers show the pattern. In 2022, younger drivers were the most likely to be involved in a reported collision:') +
          table({ caption: 'Licensed drivers involved in a reported collision, Ontario, 2022', head: ['Driver age', 'Share involved'], rows: [
            ['18', '3.92%'], ['20', '4.11%'], ['21 to 24', '4.22%'], ['35 to 44', '3.04%'], ['45 to 54', '2.87%'], ['55 to 64', '2.44%'], ['All ages', '3.26%'],
          ] }) +
          p('The Handbook also makes a point worth remembering: you can be found responsible for a collision you could have avoided, even if the other driver made the first mistake.') },
        { id: 'see', h: 'See: look far ahead and keep your eyes moving', html: ul([
          '<strong>Look ahead</strong> to where you&rsquo;ll be in the next 12 to 15 seconds in town, and 15 to 20 seconds, or as far as you can see, at highway speeds.',
          '<strong>Check your mirrors</strong> about every five seconds.',
          '<strong>Scan intersections.</strong> Before a right turn: ahead, left, right, left again, then your right-rear blind spot. Before a left turn: ahead, behind, left, right, left again, plus your blind spots. Check sidewalks and paths too.',
          '<strong>Expect mistakes.</strong> Watch for people in parked cars who might pull out or open a door, and assume other drivers might not stop.',
        ]) },
        { id: 'space', h: 'Space: keep a cushion all around you', html: p('The biggest collision risk is in front of you, so following distance matters most.') +
          ol([
            'Pick a marker ahead, like a sign or a pole.',
            'When the car in front passes it, count &ldquo;one thousand and one, one thousand and two.&rdquo;',
            'If you reach the marker before you finish, you&rsquo;re too close.',
          ]) +
          p('Two seconds is the minimum, and only in ideal conditions. Leave more in rain, snow or fog, behind motorcycles and large trucks, or with a heavy load. The road test checklist asks for two to three seconds.') +
          ul(['Keep space on both sides, and stay out of other drivers&rsquo; blind spots.', 'When you stop behind another car, stop where you can see its rear tires on the road. That leaves room to pull around it, and room to spare if you&rsquo;re hit from behind.']) },
        { id: 'seen', h: 'Be seen and communicate', html: ul(['Signal every move, early.', 'Make eye contact with drivers and pedestrians at intersections.', 'Use your headlights whenever visibility drops, not just at night.', 'Use your horn when you need to warn someone.']) },
        { id: 'tailgaters', h: 'Tailgaters and aggressive drivers', html: p('If someone is following too closely, give yourself more room in front, or change lanes and let them pass. Don&rsquo;t speed up and don&rsquo;t brake-check. If another driver threatens you, stay in your car with the doors locked, call police, and drive to a police station or a busy public place.') },
        inlineCta('Want to drive with confidence and calm? Call or text Mrs. Akbar.'),
        { id: 'speed', h: 'Match your speed to the conditions', html: ul([
          'Drive at a speed that lets you stop safely, which often means below the limit in bad weather, heavy traffic or a construction zone.',
          'In rain, drive slowly enough to stop within the distance you can see. Most skids happen because a driver is going too fast for the conditions.',
          'At night, don&rsquo;t out-drive your headlights.',
          'Skip cruise control on wet or icy roads, in heavy traffic, or when you&rsquo;re tired.',
        ]) + p('The <a href="/guides/ontario-speed-limits-and-speeding-tickets/">speed limits guide</a> covers the limits themselves.') },
        { id: 'you', h: 'You: tired, distracted or impaired', html: ul([
          '<strong>Tired:</strong> the Handbook says tired drivers can be as impaired as drunk drivers, and drowsy collisions cluster between 2 and 6 a.m. and 2 and 4 p.m. Coffee and loud music don&rsquo;t replace sleep.',
          '<strong>Distracted:</strong> holding a phone is illegal even at a red light. The <a href="/guides/distracted-driving-ontario/">distracted driving guide</a> explains the rules.',
          '<strong>Impaired:</strong> G1 and G2 drivers, and every driver 21 or under, must have zero alcohol, and zero tolerance covers cannabis too. See the <a href="/guides/impaired-driving-rules-ontario/">alcohol and cannabis guide</a>.',
        ]) },
        { id: 'factors', h: 'What&rsquo;s behind fatal collisions', html: p('Transport Canada&rsquo;s 2023 estimates of the factors involved in fatal collisions, from the provinces that report them (one collision can have several):') +
          table({ caption: 'Factors in fatal collisions, Canada, 2023 (estimates)', head: ['Factor', 'Share of fatal collisions'], rows: [
            ['Speed', '24.8%'], ['Impairment', '21.9%'], ['Distraction', '17.8%'], ['Fatigue', '3.3%'],
          ] }) + p('Every one of them is something a defensive driver controls.') },
        { id: 'practise', h: 'Practising defensive driving', html: p('Try commentary driving: say out loud what you see and what you&rsquo;d do about it. &ldquo;Kids near the park, covering the brake. Car waiting to pull out on the right.&rdquo; It trains your eyes to look for the next problem instead of the last one.') +
          quote(review('SARANYAJIT NANDI', 'She focuses on safety, proper techniques', 'easy to understand.')) },
      ],
      sources: [S.safe, S.along, S.directions, S.roadTest, S.freeway, S.weather, S.situations, S.orsar, S.tcStats, S.htaFull],
      faqs: [
        ['What is defensive driving?', 'Spotting danger before it happens and responding quickly and well. Ontario&rsquo;s Handbook builds it on visibility, space and communication.'],
        ['Is it the 2-second or 3-second rule in Ontario?', 'The Handbook says at least two seconds in ideal conditions, and more in bad weather. The road test checklist asks for two to three seconds.'],
        ['How do I measure my following distance?', 'When the car ahead passes a fixed marker, count &ldquo;one thousand and one, one thousand and two.&rdquo; If you reach the marker before you finish, you&rsquo;re too close.'],
        ['How far ahead should I look when driving?', 'To where you&rsquo;ll be in the next 12 to 15 seconds in town, and 15 to 20 seconds or as far as you can see at highway speeds.'],
        ['How often should I check my mirrors?', 'About every five seconds, and more often in heavy traffic.'],
        ['What should I do if someone is tailgating me?', 'Give yourself more space in front, or change lanes and let them pass. Don&rsquo;t speed up or brake suddenly.'],
        ['How much space should I leave when stopped behind another car?', 'Enough to see the rear tires of the car ahead touching the road, which leaves room to pull around it.'],
        ['Why are new drivers more likely to crash?', 'Experience. The Handbook says new drivers of every age are far more likely than experienced drivers to be in serious or fatal collisions, and in Ontario&rsquo;s 2022 data, younger drivers had the highest collision involvement.'],
      ],
      related: ['how-to-check-your-blind-spot', 'distracted-driving-ontario', 'winter-driving-in-hamilton'],
      lessons: lessonsChips(['/beginner-driving-lessons/', 'Beginner lessons'], ['/g-road-test-preparation/', 'G test and highway']),
      cta: ['Learn to drive defensively', 'Good habits are easiest to build from the start. Call or text to book. She comes to you.'],
    }),

    /* ---------- Reverse parking ---------- */
    guidePage({
      slug: 'how-to-reverse-park',
      published: DATE, updated: DATE,
      title: 'How to Reverse Park (Back Into a Parking Spot) | Mrs. Akbar',
      description: 'How to back into a parking spot step by step: where to look, when to turn the wheel, fixing a crooked park, parking lot safety, and whether it&rsquo;s on the G2 test.',
      script: 'skills',
      dek: 'Backing into a parking spot, step by step, where to look, and how to leave safely.',
      intro: 'Backing into a parking spot feels backwards at first, and then it becomes the easiest way to park. You reverse into a space you&rsquo;ve just seen is clear, and later you drive out with a full view of the lot. Here&rsquo;s how, along with the reversing basics from Ontario&rsquo;s Driver&rsquo;s Handbook.',
      sections: [
        { id: 'why', h: 'Why back in?', html: p('When you back in, you reverse into a space you&rsquo;ve already checked is empty. When you leave, you drive forward with a clear view of the aisle, instead of backing out blind between other cars. Saskatchewan&rsquo;s driver&rsquo;s handbook recommends backing into ordinary 90-degree stalls for exactly that reason, unless signs say not to.') },
        { id: 'basics', h: 'Reversing basics', html: ul([
          'Before you start, make sure the way behind is clear, especially of children and cyclists.',
          'Move slowly. Reverse gear can be faster than it feels.',
          'Hold the wheel firmly, turn sideways in your seat, and look over your shoulder in the direction you&rsquo;re moving: your right shoulder when backing straight or to the right, your left when backing to the left. Check the other side too.',
          'When you turn while reversing, the front of the car swings out. Make sure it won&rsquo;t hit anything.',
        ]) + p('The Handbook allows you to unbuckle your seatbelt if you need to turn to see while reversing, as long as you buckle up before moving forward.') },
        { id: 'steps', h: 'Backing into a spot on your right, step by step', html: ol([
          '<strong>Check your mirrors and signal right.</strong>',
          '<strong>Drive slowly past the space</strong> and stop when your car is a little past it. Angling the car slightly to the left can make the turn easier.',
          '<strong>Look all around:</strong> mirrors, both shoulders and behind you.',
          '<strong>Reverse slowly, wheels straight,</strong> looking over your right shoulder.',
          '<strong>Turn the wheel to the right</strong> when your back bumper lines up with the edge of the space next to yours.',
          '<strong>Straighten the wheel gradually</strong> as the car comes into line with the space, and keep reversing slowly until you&rsquo;re in.',
          '<strong>Stop,</strong> shift into park and set the parking brake.',
        ]) + p('Ontario&rsquo;s Handbook doesn&rsquo;t give a step-by-step for parking lots; this follows the method taught in British Columbia&rsquo;s driver guide.') },
        { id: 'fix', h: 'Fixing a crooked park', html: p('If you end up at an angle or too close to one side, stop, pull forward a little while straightening the wheel, then reverse again. Small corrections are normal. What matters is doing them slowly, with the same checks every time.') },
        { id: 'angle', h: 'Angle parking', html: p('Angled stalls are designed to be driven into forward and backed out of. Backing out of an angled stall is the risky part, so shoulder check both sides and behind before and while you move. On streets, Ontario&rsquo;s Handbook says to park parallel to the curb unless signs call for angle parking.') },
        inlineCta('Want parking to finally click? Call or text Mrs. Akbar.'),
        { id: 'leaving', h: 'Pulling out of a space', html: ul([
          '<strong>If you backed in,</strong> drive straight out first, then turn.',
          '<strong>If you parked nose-in,</strong> back out slowly, looking both ways and behind, and yield to people and cars in the aisle.',
          '<strong>Leaving a spot on the street,</strong> signal, check your mirrors and blind spot just before you move, and pull out only when it&rsquo;s safe.',
        ]) },
        { id: 'safety', h: 'Parking lot safety', html: ul([
          'Walk around your car before you back out. Small children are easy to miss from the driver&rsquo;s seat.',
          'Back up slowly with your windows down, so you can hear as well as see.',
          'Don&rsquo;t rely on a backup camera. Snow, dirt or sun glare can hide what&rsquo;s behind you, so use your mirrors and look over your shoulder.',
        ]) + callout('rule', 'Careless driving counts in parking lots', p('Since December 4, 2024, Ontario&rsquo;s careless driving law also applies in parking lots, parking garages and driveways, public or private. The penalty is a fine of $400 to $2,000, up to six months in jail, and a licence suspension of up to two years.')) },
        { id: 'law', h: 'Where you can&rsquo;t reverse', html: ul([
          'On the road or shoulder of a divided highway with a speed limit over 80 km/h. Missed your exit? Take the next one.',
          'Back across a stop line you&rsquo;ve passed. The Handbook says to stay put.',
        ]) },
        { id: 'test', h: 'Is reverse parking on the G2 road test?', html: p('Backing into a parking stall isn&rsquo;t on Ontario&rsquo;s list of G2 skills, which includes parallel parking and three-point turns. But the Handbook says road tests check reversing, and DriveTest tells test-takers to practise parking, reversing and three-point turns. So reversing well is worth the practice either way. The <a href="/guides/how-to-parallel-park/">parallel parking guide</a> and the <a href="/guides/how-to-do-a-three-point-turn/">three-point turn guide</a> cover the test manoeuvres.') +
          quote(review('Rose Nyarko', 'She made parallel parking and reverse parking easy to learn and understand.')) },
      ],
      sources: [S.directions, S.parking, S.roadTest, S.getG, S.roadTests, S.freeway, S.htaFull, S.sgi, S.icbc, S.nhtsaKids, S.faqs],
      faqs: [
        ['How do you reverse park step by step?', 'Signal, drive a little past the space, look all around, reverse slowly with the wheels straight, turn the wheel when your back bumper lines up with the edge of the space beside yours, then straighten as the car comes into line.'],
        ['When do I turn the steering wheel when backing into a parking spot?', 'When your back bumper lines up with the edge of the space next to the one you want. Then straighten gradually as the car comes into line.'],
        ['Is it better to back into a parking spot or pull in forward?', 'Backing in usually makes leaving safer, because you drive out with a clear view of the aisle instead of backing out between other cars.'],
        ['Is reverse parking on the G2 road test in Ontario?', 'Backing into a stall isn&rsquo;t on Ontario&rsquo;s list of G2 skills, but parallel parking is, and road tests check reversing.'],
        ['Where should I look when reversing?', 'Over your shoulder in the direction you&rsquo;re moving, with quick checks of your mirrors and the other side. A camera helps, but it isn&rsquo;t enough.'],
        ['Do I have to wear a seatbelt while reversing in Ontario?', 'You may unbuckle if you need to turn to see while reversing, but buckle up before you move forward.'],
        ['Is it illegal to reverse on a highway in Ontario?', 'Yes, on the road or shoulder of a divided highway with a speed limit over 80 km/h. If you miss an exit, take the next one.'],
        ['Can you get a careless driving charge in a parking lot in Ontario?', 'Yes. Since December 4, 2024, careless driving applies in parking lots and garages too.'],
      ],
      related: ['how-to-parallel-park', 'how-to-check-your-blind-spot', 'how-to-do-a-three-point-turn'],
      lessons: lessonsChips(['/parallel-parking-lessons/', 'Parking lessons'], ['/beginner-driving-lessons/', 'Beginner lessons']),
      cta: ['Park without the panic', 'Tell her which kind of parking you dread most, and that&rsquo;s where the lesson starts.'],
    }),

    /* ---------- Roundabouts ---------- */
    guidePage({
      slug: 'how-to-drive-a-roundabout',
      published: DATE, updated: DATE,
      title: 'How to Drive a Roundabout in Ontario (2-Lane Guide) | Mrs. Akbar',
      description: 'How to drive single and two-lane roundabouts in Ontario: who yields, which lane to choose, when to signal, trucks and emergency vehicles, and Hamilton&rsquo;s roundabouts.',
      script: 'skills',
      dek: 'Who yields, which lane to pick, when to signal, and what to do about trucks, cyclists and ambulances.',
      intro: 'Roundabouts look complicated the first time and feel easy by the fifth. They run on one rule: traffic already in the roundabout goes first. Here&rsquo;s how to approach, enter, go around and exit, following Ontario&rsquo;s Driver&rsquo;s Handbook and the City of Hamilton&rsquo;s own advice.',
      sections: [
        { id: 'basics', h: 'The rule that makes it work', html: ul([
          'Traffic moves <strong>counter-clockwise</strong>, keeping to the right of the central island.',
          '<strong>Traffic already in the roundabout has the right-of-way.</strong> Every entrance has a yield sign.',
          'Once you&rsquo;re in, you have the right-of-way over cars waiting to enter, and you shouldn&rsquo;t stop except to avoid a collision.',
        ]) },
        { id: 'enter', h: 'Approaching and entering', html: ol([
          '<strong>Read the signs early.</strong> A &ldquo;roundabout ahead&rdquo; warning sign shows arrows going counter-clockwise, and a guide sign shows the exits. Decide on your exit and your lane before you get close.',
          '<strong>Slow down</strong> and watch for pedestrians crossing on your way up to the yield line.',
          '<strong>Look left.</strong> Slow down or stop at the yield sign as needed.',
          '<strong>Enter only when there&rsquo;s a real gap.</strong> Don&rsquo;t pull in right beside a car that&rsquo;s already going around; it may be about to exit across your path.',
        ]) },
        { id: 'lanes', h: 'Choosing a lane in a two-lane roundabout', html: table({ caption: 'Which lane to use in a two-lane roundabout', head: ['Where you&rsquo;re going', 'Lane'], rows: [
            ['Turning right', 'Right lane'],
            ['Going straight', 'Either lane'],
            ['Turning left', 'Left lane'],
          ] }) +
          p('Choose your lane the way you would at any intersection, and follow the signs and the arrows painted on the road. Never enter from the right lane if you want to turn left.') +
          callout('rule', 'No lane changes inside', p('Stay in your lane all the way around. Never pass another vehicle. If you&rsquo;re in the inside lane and miss your exit, go around again.')) },
        { id: 'exit', h: 'Signalling and exiting', html: ul([
          'Turn on your right signal once you&rsquo;ve passed the exit before the one you want.',
          'Leave in the same lane you were in: from the left lane into the left exit lane, from the right lane into the right.',
          'Exiting from the left lane? Watch for vehicles on your right that are still going around.',
          'Watch for pedestrians at the crosswalk on your way out.',
        ]) },
        inlineCta('Want to practise roundabouts with a calm instructor beside you? Call or text Mrs. Akbar.'),
        { id: 'trucks', h: 'Trucks and buses', html: p('Give large vehicles extra room. They may swing wide on the way in or while going around, and they can use the full width of the roundabout, including the apron: the raised, mountable ring around the central island that a trailer&rsquo;s back wheels can ride over. A truck may need both lanes before it even enters. Never drive beside a truck in a roundabout, and never pass one.') },
        { id: 'emergency', h: 'If an ambulance or fire truck comes', html: ul([
          '<strong>If you&rsquo;re already in the roundabout,</strong> keep going to your exit, drive past the traffic island, then pull over.',
          '<strong>If you haven&rsquo;t entered yet,</strong> pull over to the right if you can and wait.',
          'Never stop inside the roundabout to let it by.',
        ]) },
        { id: 'others', h: 'Pedestrians and cyclists', html: p('Pedestrians cross at the entrances and exits, never through the central island, and the splitter islands give them a place to wait halfway. Hamilton&rsquo;s advice for two-lane roundabouts is to watch for pedestrians and stop for them.',
          'Cyclists either ride through like a car, keeping to the middle of the right lane, or get off and walk their bike across like a pedestrian. Give them the whole lane; don&rsquo;t try to squeeze past.') },
        { id: 'circle', h: 'Roundabouts vs. old traffic circles', html: p('Older traffic circles are bigger and faster, and drivers have to merge and weave across each other. Modern roundabouts are smaller, use islands at each entrance to slow traffic down, and work on a simple yield-to-the-left rule: whoever is already going around goes first.') },
        { id: 'hamilton', h: 'Where to practise around Hamilton', html: ul([
          '<strong>Binbrook</strong> has some of the most roundabouts close together: on Bradley Avenue at Whitwell Way, Magnificent Way and Windwood Drive, and where Binbrook Road meets Fall Fair Way. The <a href="/driving-lessons-binbrook/">Binbrook lessons page</a> covers them.',
          '<strong>Ancaster</strong> has two-lane roundabouts on Wilson Street West, including at Shaver Road, and gentler single-lane ones on Stonehenge Drive in the Meadowlands. See <a href="/driving-lessons-ancaster/">lessons in Ancaster</a>.',
          '<strong>Caledonia</strong> has a roundabout on McClung Road at MacLachlan Avenue and Thompson Road.',
        ]) + callout('local', 'More are coming', p('Hamilton looks at building a roundabout wherever it&rsquo;s considering new traffic lights, so expect to meet more of them. Single-lane roundabouts are the place to start; save the two-lane ones on Wilson Street West for when the basics feel natural.')) },
      ],
      sources: [S.directions, S.signs, S.hamRoundabouts, S.osm],
      faqs: [
        ['Who has the right-of-way in a roundabout in Ontario?', 'Traffic already in the roundabout. Drivers entering must yield, and once you&rsquo;re in, you have the right-of-way over cars waiting to enter.'],
        ['Which lane do I use in a two-lane roundabout?', 'The right lane to turn right, the left lane to turn left, and either lane to go straight. Follow the signs and the arrows painted on the road.'],
        ['When do you signal in a roundabout?', 'Turn on your right signal once you&rsquo;ve passed the exit before the one you want to take.'],
        ['Can you change lanes in a roundabout?', 'No. Stay in your lane, and don&rsquo;t pass. If you miss your exit, go around again.'],
        ['What do I do if an ambulance comes while I&rsquo;m in a roundabout?', 'Keep going to your exit, drive past the traffic island, then pull over. Never stop inside the roundabout.'],
        ['Why do trucks drive over the middle of a roundabout?', 'Large vehicles need the extra room. The raised apron around the central island is there for a trailer&rsquo;s back wheels, and a truck may also use both lanes.'],
        ['What is the difference between a roundabout and a traffic circle?', 'Traffic circles are larger and faster, with merging and weaving. Roundabouts are smaller and slower, and traffic entering yields to traffic already going around.'],
      ],
      related: ['right-of-way-rules-ontario', 'nervous-driver-tips', 'how-to-pass-the-g2-road-test'],
      lessons: lessonsChips(['/driving-lessons-binbrook/', 'Lessons in Binbrook'], ['/driving-lessons-ancaster/', 'Lessons in Ancaster'], ['/driving-lessons-for-nervous-drivers/', 'Nervous drivers']),
      cta: ['Roundabouts, minus the panic', 'A lesson or two on Binbrook&rsquo;s or Ancaster&rsquo;s roundabouts takes the mystery out of them. Call or text to book.'],
    }),

    /* ---------- Three-point turn and roadside stop ---------- */
    guidePage({
      slug: 'how-to-do-a-three-point-turn',
      published: DATE, updated: DATE,
      title: 'How to Do a Three-Point Turn (Ontario G2 Road Test) | Mrs. Akbar',
      description: 'The three-point turn and roadside stop, step by step: the checks the G2 examiner looks for, where turning around is illegal in Ontario, and the usual mistakes.',
      script: 'skills',
      dek: 'Two short, slow G2 manoeuvres, broken into simple steps, with the exact checks the examiner looks for.',
      intro: 'The three-point turn and the roadside stop are both slow, quiet manoeuvres, and both are part of the G2 road test. When people lose marks on them, it&rsquo;s rarely the steering. It&rsquo;s a missed mirror, a skipped shoulder check or a signal at the wrong moment. Here&rsquo;s each one, step by step, following the road test checklist in Ontario&rsquo;s Driver&rsquo;s Handbook.',
      sections: [
        { id: 'what', h: 'What a three-point turn is', html: p(
          'A three-point turn gets your car facing the other way on a road that&rsquo;s too narrow for a U-turn: forward across the road, reverse once, then forward again. On the road test, it starts when the examiner asks you to stop and turn around.',
          'Outside the test, the Handbook says the simplest and safest way to turn around is usually to drive around the block. A three-point turn is for when that isn&rsquo;t possible.') },
        { id: 'where', h: 'Where you can&rsquo;t turn around', html: p('Ontario&rsquo;s Highway Traffic Act bans turning to go the opposite way in places where other drivers can&rsquo;t see you in time. That covers U-turns and three-point turns alike:') +
          ul([
            'On a curve where you can&rsquo;t see approaching traffic within <strong>150 m</strong>.',
            'On a railway crossing, or within <strong>30 m</strong> of one.',
            'Near the top of a hill, or on the approach to it, where approaching drivers can&rsquo;t see your car within <strong>150 m</strong>.',
            'Within <strong>150 m</strong> of a bridge, viaduct or tunnel that blocks the view.',
          ]) +
          callout('rule', 'Check for signs too', p('A &ldquo;no U-turn&rdquo; sign bans turning around at that spot, and Hamilton&rsquo;s traffic by-law lists stretches of road where it isn&rsquo;t allowed. The Handbook adds a simple rule of thumb: don&rsquo;t turn around unless you can see at least 150 m in both directions.')) },
        { id: 'steps', h: 'The three-point turn, step by step', html: ol([
          '<strong>Pull over on the right.</strong> Check traffic in front and behind, and your right blind spot if someone could be beside you. Signal right before you slow down, slow steadily, and stop parallel to the curb, no more than 30 cm from it.',
          '<strong>Check before you move.</strong> Mirrors and your left blind spot, just before you start. Wait until the road is clear, or until traffic has stopped for you.',
          '<strong>Signal left.</strong>',
          '<strong>Go forward, turning sharply left.</strong> Move slowly and smoothly across the road and stop just short of the far side.',
          '<strong>Look both ways again.</strong> Every time you stop during the turn, check traffic in both directions.',
          '<strong>Reverse, turning sharply right.</strong> Look over your right shoulder in the direction you&rsquo;re moving, and back up until the car points the new way. Stop before the edge or curb. The Handbook&rsquo;s chapter on changing directions also says to signal right before backing up.',
          '<strong>Check both ways, shift into drive, and go.</strong> Straighten up, check your mirrors, and speed up smoothly to blend with traffic.',
        ]) + callout('tip', 'One reverse, whole road', p('The checklist&rsquo;s own words: use the whole road to make your turn, reversing only once. Don&rsquo;t reverse over the edge or shoulder of the road, or into the curb.')) },
        inlineCta('Want to nail your three-point turn before the test? Call or text Mrs. Akbar.'),
        { id: 'mistakes', h: 'The usual mistakes, and how to fix them', html: p('DriveTest doesn&rsquo;t publish a scoresheet, but these are the slips the Handbook&rsquo;s checklist is built to catch.') +
          h3('Skipping the checks between moves') + p('Each stop in a three-point turn is a fresh start. Look both ways every time, even on a quiet street. Examiners watch your head, not just the car.') +
          h3('Needing a second reverse') + p('Start right beside the curb so you have the whole width of the road. Turn the wheel fully left as you begin rolling, and fully right as you begin reversing. A slow crawl with lots of steering beats a faster move with too little.') +
          h3('Touching the curb') + p('Stop a little short of each side. You can always creep forward a few centimetres; you can&rsquo;t undo bumping the curb.') +
          h3('Reversing by the mirrors alone') + p('Turn your body and look back over your shoulder in the direction you&rsquo;re moving. Mirrors help, but they&rsquo;re not enough on their own.') +
          h3('Rushing it') + p('There&rsquo;s no time limit you can see. Slow and controlled is exactly what the checklist asks for: move slowly and smoothly.') },
        { id: 'roadside', h: 'The roadside stop, step by step', html: p('The examiner may ask you to pull over and stop, then carry on. It&rsquo;s a small manoeuvre with a long list of checks.') +
          h3('Pulling over') + ol([
            'Check your mirrors before slowing down, and make sure stopping there is legal. Look for signs.',
            'Scan ahead and behind. The Handbook says a gap of 150 m in both directions gives you enough space.',
            'Check your right blind spot if a cyclist, pedestrian or car could pass you on the right.',
            'Signal right before slowing down, and slow steadily.',
            'Stop parallel to the curb and no more than about 30 cm from it. With no curb, stop as far off the road as you can. Don&rsquo;t block a driveway, an entrance or traffic.',
          ]) +
          h3('Once you&rsquo;re stopped') + ul([
            'Turn your signal off and your hazard lights on.',
            'Shift into park and set the parking brake.',
            'On a hill, turn your wheels against the curb so the car can&rsquo;t roll into traffic. The <a href="/guides/how-to-parallel-park/">parallel parking guide</a> explains which way.',
          ]) +
          h3('Pulling back out') + ol([
            'Release the parking brake and shift into drive.',
            'Hazard lights off, left signal on.',
            'Check your mirrors and your left blind spot just before you move.',
            'Speed up smoothly to blend with traffic, and cancel your signal once you&rsquo;re back in the lane.',
          ]) },
        { id: 'reversing', h: 'Reversing safely', html: ul([
          '<strong>Go slowly,</strong> and check the way is clear before you start. Watch especially for children and cyclists.',
          '<strong>Look where you&rsquo;re going.</strong> Turn sideways and look over your shoulder: your right shoulder when backing straight or to the right, your left when backing to the left. Check the other side too.',
          '<strong>Watch the front of the car.</strong> When you turn while reversing, the front swings out the other way.',
          '<strong>Never reverse on a fast divided highway.</strong> Backing up on the road or shoulder of a highway with a median and a limit over 80 km/h is illegal. Missed your exit? Take the next one.',
          '<strong>Stopped past the stop line?</strong> The Handbook says not to back up. Wait where you are.',
        ]) },
        { id: 'tests', h: 'Is it on the G2 and G road tests?', html: p('Yes for the G2: ontario.ca lists three-point turns among the G2 skills, and DriveTest describes the roadside stop and three-point turn as already covered in the G2 road test.',
          'Not at the moment for most G tests. Until further notice, the G road test at full-time DriveTest centres, including Hamilton&rsquo;s, leaves out the three-point turn, the roadside stop, parallel parking and residential driving. Part-time Travel Point locations still give the standard G test.') +
          callout('rule', 'About backup cameras', p('You can take your test in a car that has a backup camera, but you can&rsquo;t lean on it. The Handbook says driving aids such as back cameras may not be used during the road test, and DriveTest expects you to turn your head, check your mirrors and look around while backing.')) },
        { id: 'practise', h: 'How to practise', html: p('Find a wide, quiet residential street with a clear view both ways and no driveways right where you&rsquo;ll turn. Do five or six turns in a row, then a few roadside stops, saying each check out loud. Then switch off the backup camera and do it all again.') +
          quote(review('Gaurav Singh', 'Each lesson was well planned', 'defensive driving.'), 'passed the G2, first try') },
      ],
      sources: [S.roadTest, S.directions, S.parking, S.hta, S.getG, S.roadTests, S.faqs],
      faqs: [
        ['Is the three-point turn on the G2 road test in Ontario?', 'Yes. Three-point turns are one of the G2 skills on ontario.ca. The G test at full-time DriveTest centres currently leaves it out, though part-time Travel Points still give the standard test.'],
        ['How many times can you reverse in a three-point turn?', 'Once. The Driver&rsquo;s Handbook&rsquo;s road test checklist says to use the whole road and reverse only once.'],
        ['Which signal do you use for a three-point turn?', 'Signal left before you start across the road. The Handbook&rsquo;s chapter on changing directions also says to signal right before you back up.'],
        ['How close to the curb do you stop for a roadside stop?', 'Parallel to the curb and no more than about 30 cm from it. With no curb, stop as far off the road as you can.'],
        ['Do you put your hazards on for a roadside stop?', 'Yes. Once you&rsquo;re stopped, turn your signal off and your hazard lights on, then turn them off and signal left before pulling back out.'],
        ['Can I use my backup camera on the road test?', 'Your car can have one, but you can&rsquo;t rely on it. The Handbook says driving aids like back cameras may not be used, and you must turn your head and check your mirrors while backing.'],
        ['Where are U-turns illegal in Ontario?', 'On curves and near hilltops where other drivers can&rsquo;t see you within 150 m, on or within 30 m of a railway crossing, within 150 m of a bridge or tunnel that blocks the view, and anywhere a sign forbids it.'],
      ],
      related: ['how-to-pass-the-g2-road-test', 'how-to-parallel-park', 'hamilton-drivetest-centre'],
      lessons: lessonsChips(['/g2-road-test-preparation/', 'G2 road test prep'], ['/parallel-parking-lessons/', 'Parallel parking']),
      cta: ['Practise it before your test', 'Tell her which manoeuvre feels shaky. A quiet street and a few tries usually sort it out.'],
    }),
  ];
}
