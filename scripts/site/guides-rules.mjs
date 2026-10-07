// Rules of the road guides: road signs, right-of-way, speed limits and tickets, distracted driving,
// demerit points, impaired driving and what to do after a collision. Facts checked 2026-10-07 against
// ontario.ca, the Official MTO Driver's Handbook, ontario.ca/laws (current to 2026-10-02), the Ontario
// Court of Justice set fines, FSRA and hamilton.ca; paraphrased, never copied.
import { guidePage } from './pages-guides.mjs';
import { callout, inlineCta, quote } from './ui.mjs';
import { review } from './core.mjs';
import { p, ul, ol, h3, table, rsigns, lessonsChips } from './guide-kit.mjs';
import { SIGN } from './road-signs.mjs';

const DATE = '2026-10-07';
const S = {
  demerit: ['Understanding demerit points (ontario.ca)', 'https://www.ontario.ca/page/understanding-demerit-points'],
  reg339: ['O. Reg. 339/94, Demerit Point System (ontario.ca/laws)', 'https://www.ontario.ca/laws/regulation/940339'],
  reg340: ['O. Reg. 340/94, Drivers&rsquo; Licences (ontario.ca/laws)', 'https://www.ontario.ca/laws/regulation/940340'],
  keeping: ['Driver&rsquo;s Handbook: keeping your driver&rsquo;s licence (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/keeping-your-drivers-licence'],
  reinstate: ['Reinstate a suspended driver&rsquo;s licence (ontario.ca)', 'https://www.ontario.ca/page/reinstate-suspended-drivers-licence'],
  record: ['Get a driving record (ontario.ca)', 'https://www.ontario.ca/page/get-driving-record'],
  fsraRate: ['What determines your auto insurance rate (fsrao.ca)', 'https://www.fsrao.ca/consumers/auto-insurance/understanding-auto-insurance-rates/what-determines-your-auto-insurance-rate'],
  fsraSave: ['How to save on auto insurance (fsrao.ca)', 'https://www.fsrao.ca/consumers/auto-insurance/purchasing-your-policy/how-save-auto-insurance'],
  hamSafety: ['Roadway safety tools: red light and speed cameras (hamilton.ca)', 'https://www.hamilton.ca/home-neighbourhood/getting-around/driving-traffic/vision-zero-roadway-safety/roadway-safety-tools'],
  distracted: ['Distracted driving (ontario.ca)', 'https://www.ontario.ca/page/distracted-driving'],
  situations: ['Driver&rsquo;s Handbook: dealing with particular situations (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/dealing-particular-situations'],
  reg366: ['O. Reg. 366/09, Display Screens and Hand-Held Devices (ontario.ca/laws)', 'https://www.ontario.ca/laws/regulation/090366'],
  hta: ['Highway Traffic Act (ontario.ca/laws)', 'https://www.ontario.ca/laws/statute/90h08'],
  setFines: ['Set fines, Highway Traffic Act, Schedule 43 (ontariocourts.ca)', 'https://www.ontariocourts.ca/ocj/provincial-offences/set-fines/set-fines-i/schedule-43/'],
  speeding: ['Speeding and aggressive driving (ontario.ca)', 'https://www.ontario.ca/page/speeding-and-aggressive-driving'],
  drivingAlong: ['Driver&rsquo;s Handbook: driving along (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/driving-along'],
  limits110: ['Raising speed limits on Ontario highways (ontario.ca)', 'https://www.ontario.ca/page/raising-speed-limits-ontario-highways'],
  reg619: ['O. Reg. 619, Speed Limits (ontario.ca/laws)', 'https://www.ontario.ca/laws/regulation/900619'],
  stuntReg: ['O. Reg. 455/07, Races, Contests and Stunts (ontario.ca/laws)', 'https://www.ontario.ca/laws/regulation/070455'],
  hamSlow: ['Speeding: slow down (hamilton.ca)', 'https://www.hamilton.ca/home-neighbourhood/getting-around/driving-traffic/vision-zero-roadway-safety/speeding-slow-down'],
  hamSchool: ['Back to school safety (hamilton.ca)', 'https://www.hamilton.ca/home-neighbourhood/getting-around/school-zones-safety-tips/back-school-safety'],
  hamTickets: ['Provincial offences notices (hamilton.ca)', 'https://www.hamilton.ca/home-neighbourhood/tickets-fines-penalties/provincial-offences-notice'],
  tickets: ['Check the status of traffic tickets, or request a meeting (ontario.ca)', 'https://www.ontario.ca/page/check-status-traffic-tickets-and-fines-online-or-request-meeting-resolve-your-case'],
  hbSigns: ['Driver&rsquo;s Handbook: signs (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/signs'],
  hbLights: ['Driver&rsquo;s Handbook: traffic lights (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/traffic-lights'],
  hbPedSignals: ['Driver&rsquo;s Handbook: pedestrian signals (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/pedestrian-signals'],
  hbMarkings: ['Driver&rsquo;s Handbook: pavement markings (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/pavement-markings'],
  hbShare: ['Driver&rsquo;s Handbook: sharing the road with other road users (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/sharing-road-other-road-users'],
  hbIntersections: ['Driver&rsquo;s Handbook: driving through intersections (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/driving-through-intersections'],
  hbDirections: ['Driver&rsquo;s Handbook: changing directions (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/changing-directions'],
  hbStopping: ['Driver&rsquo;s Handbook: stopping (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/stopping'],
  hbFreeway: ['Driver&rsquo;s Handbook: freeway driving (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/freeway-driving'],
  pxo: ['Driving near pedestrian crossovers and school crossings (ontario.ca)', 'https://www.ontario.ca/page/driving-near-pedestrian-crossovers-and-school-crossings'],
  hamPxo: ['Pedestrian crossovers (hamilton.ca)', 'https://www.hamilton.ca/home-neighbourhood/getting-around/driving-traffic/vision-zero-roadway-safety/pedestrian-crossovers'],
  schoolBus: ['School bus safety (ontario.ca)', 'https://www.ontario.ca/page/school-bus-safety'],
  hamStopping: ['Safe stopping and right turns on red (hamilton.ca)', 'https://www.hamilton.ca/home-neighbourhood/getting-around/driving-traffic/vision-zero-roadway-safety/safe-stopping'],
  impaired: ['Impaired driving (ontario.ca)', 'https://www.ontario.ca/page/impaired-driving'],
  cannabisDriving: ['Cannabis and driving (ontario.ca)', 'https://www.ontario.ca/page/cannabis-and-driving'],
  cannabisLaws: ['Cannabis laws (ontario.ca)', 'https://www.ontario.ca/page/cannabis-laws'],
  interlock: ['Ignition interlock program (ontario.ca)', 'https://www.ontario.ca/page/ignition-interlock-program'],
  getG: ['Get a G driver&rsquo;s licence: new drivers (ontario.ca)', 'https://www.ontario.ca/page/get-g-drivers-licence-new-drivers'],
  hbLicence: ['Driver&rsquo;s Handbook: getting your driver&rsquo;s licence (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/getting-your-drivers-licence'],
  ccImpaired: ['Criminal Code, section 320.19: impaired driving penalties (laws-lois.justice.gc.ca)', 'https://laws-lois.justice.gc.ca/eng/acts/c-46/section-320.19.html'],
  justice: ['Impaired driving laws (justice.gc.ca)', 'https://www.justice.gc.ca/eng/cj-jp/sidl-rlcfa/'],
  bot: ['Back on Track remedial measures program (remedial.net)', 'https://www.remedial.net/'],
  llca: ['Liquor Licence and Control Act, 2019 (ontario.ca/laws)', 'https://www.ontario.ca/laws/statute/19l15b'],
  cca: ['Cannabis Control Act, 2017 (ontario.ca/laws)', 'https://www.ontario.ca/laws/statute/17c26'],
  reg596: ['O. Reg. 596, General: reporting collisions (ontario.ca/laws)', 'https://www.ontario.ca/laws/regulation/900596'],
  hbEmergencies: ['Driver&rsquo;s Handbook: dealing with emergencies (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/dealing-emergencies'],
  hpsReport: ['Collision reporting (hamiltonpolice.on.ca)', 'https://hamiltonpolice.on.ca/road-safety/accident-reporting'],
  accHamilton: ['Hamilton collision reporting centres (accsupport.com)', 'https://accsupport.com/locations/hamilton/'],
  opp: ['Online reporting (opp.ca)', 'https://www.opp.ca/index.php?id=132'],
  ccFail: ['Criminal Code, section 320.16: failure to stop after an accident (laws-lois.justice.gc.ca)', 'https://laws-lois.justice.gc.ca/eng/acts/c-46/section-320.16.html'],
  tow: ['Know your rights when getting a tow (ontario.ca)', 'https://www.ontario.ca/page/know-your-rights-when-getting-tow'],
  towZone: ['Tow zone pilot program (ontario.ca)', 'https://www.ontario.ca/page/tow-zone-pilot-program'],
  fsraAfter: ['What to do after an accident (fsrao.ca)', 'https://www.fsrao.ca/consumers/auto-insurance/protect-yourself/what-do-after-accident'],
  fsraClaims: ['After an accident: understanding the claims process (fsrao.ca)', 'https://www.fsrao.ca/consumers/auto-insurance/protect-yourself/after-accident-understanding-claims-process'],
  insAct: ['Insurance Act (ontario.ca/laws)', 'https://www.ontario.ca/laws/statute/90i08'],
  sabs: ['O. Reg. 34/10, Statutory Accident Benefits Schedule (ontario.ca/laws)', 'https://www.ontario.ca/laws/regulation/100034'],
  reg664: ['O. Reg. 664, Automobile Insurance (ontario.ca/laws)', 'https://www.ontario.ca/laws/regulation/900664'],
};

export function ruleGuides() {
  return [
    /* ---------- Road signs ---------- */
    guidePage({
      slug: 'ontario-road-signs',
      published: DATE, updated: DATE,
      title: 'Ontario Road Signs: Meanings, Shapes and Colours | Mrs. Akbar',
      description: 'Ontario road signs explained: what each shape and colour means, the signs new drivers mix up, traffic lights like the flashing green, and pavement markings.',
      script: 'rules of the road',
      dek: 'Shapes, colours, traffic lights and pavement markings: what you need for the G1 test and your first drives.',
      intro: 'Road signs are designed to be understood at a glance, before you can even read them. Their shape and colour tell you what kind of message is coming. Learn that system and most signs explain themselves, which also makes it the fastest way to study for the G1 test.',
      sections: [
        { id: 'system', h: 'The system: shape and colour', html: p('Ontario&rsquo;s Driver&rsquo;s Handbook sorts signs into four main kinds: regulatory signs, warning signs, temporary condition signs and information and direction signs. Shape and colour tell them apart:') +
          table({ caption: 'What sign shapes and colours mean in Ontario', head: ['Shape and colour', 'What it means'], rows: [
            ['Red octagon', 'Stop'],
            ['White triangle with a red border, pointing down', 'Yield'],
            ['Rectangle or square, usually white or black', 'A rule you must follow'],
            ['Yellow diamond', 'A warning: a hazard ahead'],
            ['Orange diamond', 'A temporary condition, usually construction'],
            ['Five-sided, fluorescent yellow-green', 'A school zone'],
            ['White X with a red outline', 'A railway crossing'],
            ['Green rectangle with white letters', 'Information and directions'],
            ['Orange triangle with a red border', 'A slow-moving vehicle'],
          ] }) +
          p('Inside regulatory signs, a green circle means you may, or must, do what&rsquo;s shown, and a red circle with a line through it means it isn&rsquo;t allowed.') },
        { id: 'know', h: 'Signs every new driver should know', html: rsigns([
          { svg: SIGN.stop, name: 'Stop', text: 'Come to a complete stop at the stop line. With no line, stop at the crosswalk; with no crosswalk, at the edge of the sidewalk; with neither, at the edge of the intersection.' },
          { svg: SIGN.yield, name: 'Yield', text: 'Slow down, stop if you need to, and let traffic in or near the intersection go first.' },
          { svg: SIGN.school, name: 'School zone', text: 'Slow down and watch for children. On a school zone speed sign, the lower limit applies when the yellow lights flash.' },
          { svg: SIGN.railway, name: 'Railway crossing', text: 'When a train is coming or the signals flash, stop at least 5 m from the nearest rail. Never go around a lowered gate.' },
          { svg: SIGN.curve, name: 'Warning: curve ahead', text: 'Yellow diamonds warn of a hazard ahead. Slow down before the curve, not in it.' },
          { svg: SIGN.construction, name: 'Construction', text: 'Orange signs mean roadwork. Speeding fines double in a construction zone when workers are present.' },
          { svg: SIGN.noLeft, name: 'No left turn', text: 'The red circle and line mean the turn shown isn&rsquo;t allowed here.' },
          { svg: SIGN.oneWay, name: 'One way', text: 'Traffic on this road moves only in the direction of the arrow.' },
          { svg: SIGN.safetyZone, name: 'Community safety zone', text: 'The community has flagged a special risk to pedestrians. Speeding fines double during the posted times.' },
          { svg: SIGN.slowVehicle, name: 'Slow-moving vehicle', text: 'On the back of farm equipment and other vehicles that travel at 40 km/h or less. Be ready to slow down.' },
          { svg: SIGN.guide, name: 'Information and direction', text: 'Green signs show directions, distances and destinations.' },
          { svg: SIGN.hospital, name: 'Services', text: 'Other colours point to services and attractions, like this hospital sign.' },
        ]) },
        { id: 'regulatory', h: 'Regulatory signs: the rules', html: ul([
          '<strong>No stopping, no standing, no parking.</strong> Between a pair of signs, &ldquo;no stopping&rdquo; means not even for a moment. &ldquo;No standing&rdquo; allows only picking up or dropping off passengers, and &ldquo;no parking&rdquo; allows only loading or unloading passengers or goods.',
          '<strong>High-occupancy vehicle (HOV) lanes</strong> are for buses and vehicles carrying a minimum number of people. On provincial highways the minimum is two, the lanes run all day, every day, and crossing the striped buffer is illegal.',
          '<strong>Reserved lanes</strong> are kept for buses, taxis, vehicles with three or more people, or bicycles, all the time or at posted hours.',
          '<strong>Pedestrian crossover signs</strong> mean be ready to stop and yield. In Hamilton, crossovers range from signs and road markings only to ones with flashing lights and overhead signs. Wait until the pedestrian is completely off the road.',
          '<strong>School bus signs</strong> remind you to stop for a school bus when its signals are flashing, including, on multi-lane roads with no median, traffic coming the other way.',
        ]) },
        { id: 'warning', h: 'Warning and construction signs', html: p('Yellow diamonds warn about what&rsquo;s ahead: curves, hills, merging traffic, lane reductions, animals and more. The warning sign before a railway crossing is also a yellow diamond, and it shows the angle at which the tracks cross the road.') +
          h3('In a construction zone') + ul([
            'Orange signs mark temporary conditions. Obey them even if you can&rsquo;t see any workers.',
            'When a traffic-control person shows a <strong>STOP</strong> paddle, stop and stay stopped until it&rsquo;s turned. On <strong>SLOW</strong>, go past slowly and carefully. Disobeying either is 3 demerit points.',
            'An automatic flagger device works the same way: a red light with the arm down means stop; a flashing amber light means go slowly.',
          ]) },
        { id: 'info', h: 'Information and direction signs', html: p('Green signs with white letters give directions, distances and destinations. Other colours point to services and attractions. Emergency detour route markers lead drivers around a closed provincial highway and back onto it.') },
        inlineCta('Want help putting signs into practice on real roads? Call or text Mrs. Akbar.'),
        { id: 'lights', h: 'Traffic lights', html: table({ caption: 'Ontario traffic lights and what to do', head: ['Signal', 'What to do'], rows: [
            ['Green', 'Go, after yielding to vehicles and pedestrians already in the intersection.'],
            ['Amber', 'Stop if you can do it safely; otherwise go through with caution.'],
            ['Red', 'Come to a complete stop. You may turn right after stopping unless a sign forbids it, and turn left only from a one-way road onto another one-way road.'],
            ['Flashing green, or a green left arrow with a green light', 'An advance green: turn left, go straight or turn right. Oncoming traffic is facing a red.'],
            ['Green left arrow with a red light', 'A left turn only, while oncoming traffic is stopped. If a yellow arrow follows, don&rsquo;t start your turn.'],
            ['Flashing red', 'Stop completely, then go when it&rsquo;s safe.'],
            ['Flashing yellow', 'Drive with caution.'],
            ['White vertical bar', 'A transit signal for buses. Other traffic and pedestrians must yield to the transit vehicle.'],
            ['Lights out', 'Treat the intersection like an all-way stop: yield to vehicles already in it and to those coming from your right.'],
          ] }) +
          p('Pedestrian signals matter to drivers too: a walking figure means people may cross; a flashing or steady orange hand means don&rsquo;t start crossing, but anyone already crossing still has the right-of-way.',
            'Running a red light is 3 demerit points and a fine of $200 to $1,000. Going through on an amber you could have stopped for can cost $150 to $500.') },
        { id: 'markings', h: 'Pavement markings', html: ul([
          '<strong>Yellow lines</strong> separate traffic going in opposite directions. <strong>White lines</strong> separate traffic going the same way.',
          '<strong>Solid line on your side:</strong> it&rsquo;s unsafe to pass. <strong>Broken line:</strong> you may pass when the way is clear.',
          '<strong>Continuity lines</strong>, wider broken lines spaced closer together, mark lanes that end or exit. On your left, your lane is ending or exiting; on your right, your lane continues.',
          '<strong>Stop lines</strong> are single white lines; <strong>crosswalks</strong> are two parallel white lines, though not every crosswalk is marked.',
          '<strong>White arrows</strong> in a lane mean you may only go the way the arrow points.',
          '<strong>Bike lanes</strong> are usually marked by a solid white line; enter one only when it&rsquo;s safe, to turn right. A <strong>bike box</strong> is where you stop behind cyclists at a red light, and a <strong>sharrow</strong>, two chevrons above a bicycle, marks a lane shared with cyclists.',
        ]) },
        { id: 'mixups', h: 'Signs and signals people mix up', html: h3('Flashing green vs. a green arrow') + p('Both let you turn left while oncoming traffic is stopped. A green arrow with a red light means left turns only; a flashing green lets you go any direction.') +
          h3('Crosswalk vs. pedestrian crossover') + p('At an ordinary crosswalk, you can go once the pedestrian is safely past your path, unless a school crossing guard is there. At a pedestrian crossover, you must wait until the pedestrian is completely off the road.') +
          h3('Stop vs. yield') + p('A stop sign always means a full stop. A yield sign only means stop if you need to.') +
          h3('School zone vs. community safety zone') + p('The five-sided school sign warns of children; a community safety zone sign tells you fines are higher. You&rsquo;ll often see both near schools.') },
        { id: 'study', h: 'Studying signs for the G1 test', html: ol([
          'Learn the categories first: shape, then colour, then the symbol.',
          'Read the signs chapter of the Driver&rsquo;s Handbook.',
          'Test yourself with the <a href="/guides/g1-practice-test/">G1 practice test</a>, which has 20 questions on signs and signals.',
          'Name the signs out loud the next time you&rsquo;re a passenger.',
        ]) + quote(review('salami eniola', 'She gives relatable tips to understand the signs and rules of driving.', 'rules of driving.')) },
      ],
      sources: [S.hbSigns, S.hbLights, S.hbPedSignals, S.hbMarkings, S.hbShare, S.pxo, S.hamPxo, S.hta],
      faqs: [
        ['What are the main types of road signs in Ontario?', 'Regulatory signs (rules), warning signs (hazards ahead), temporary condition signs (usually construction) and information and direction signs.'],
        ['What do the colours of road signs mean?', 'Red means stop or yield, or that something isn&rsquo;t allowed. Yellow diamonds warn of hazards, orange means construction or another temporary condition, fluorescent yellow-green marks school zones, and green gives directions.'],
        ['What does a five-sided sign mean?', 'A school zone. Slow down and watch for children.'],
        ['What does a red circle with a line through it mean?', 'The activity shown isn&rsquo;t allowed. A green circle means you may, or must, do it.'],
        ['What does a flashing green light mean in Ontario?', 'It&rsquo;s an advance green: you may turn left, go straight or turn right, while oncoming traffic faces a red light.'],
        ['What do you do when the traffic lights are out?', 'Treat the intersection like an all-way stop. Yield to vehicles already in it and to vehicles coming from your right.'],
        ['What does a white vertical bar traffic light mean?', 'It&rsquo;s a transit signal for buses. Other traffic and pedestrians must yield to the transit vehicle.'],
        ['When can you pass on a solid yellow line?', 'A solid line on your side means it&rsquo;s unsafe to pass. A broken line means you may pass if the way is clear.'],
        ['What does an orange triangle on the back of a vehicle mean?', 'It&rsquo;s a slow-moving vehicle, travelling at 40 km/h or less, like farm equipment.'],
      ],
      related: ['g1-practice-test', 'right-of-way-rules-ontario', 'how-to-pass-the-g1-test'],
      lessons: lessonsChips(['/beginner-driving-lessons/', 'Beginner lessons'], ['/g2-road-test-preparation/', 'G2 road test prep']),
      cta: ['See them on real roads', 'Lessons turn the signs you studied into habits. Call or text Mrs. Akbar to book. She comes to you.'],
    }),

    /* ---------- Right-of-way ---------- */
    guidePage({
      slug: 'right-of-way-rules-ontario',
      published: DATE, updated: DATE,
      title: 'Right-of-Way Rules in Ontario: 4-Way Stops and More | Mrs. Akbar',
      description: 'Who goes first at a 4-way stop, uncontrolled intersections, left turns, pedestrian crossovers, school buses and emergency vehicles, with Ontario&rsquo;s fines and points.',
      script: 'rules of the road',
      dek: 'Four-way stops, uncontrolled intersections, left turns, pedestrians, school buses and emergency vehicles, in plain words.',
      intro: 'Right-of-way rules decide who goes first when two road users want the same space. They&rsquo;re a big part of the G1 test, and in real traffic they come down to one habit: be ready to wait, even when it&rsquo;s your turn. Here&rsquo;s what Ontario&rsquo;s rules actually say.',
      sections: [
        { id: 'four-way', h: 'Four-way stops', html: table({ caption: 'Who goes first at a four-way stop', head: ['Situation', 'Who goes'], rows: [
            ['Cars arrive one after another', 'The first car to come to a complete stop goes first.'],
            ['Two cars stop at the same time', 'The driver on the left lets the driver on the right go first.'],
            ['Two cars facing each other, one turning left', 'The left-turning driver waits for the oncoming car to go through or turn.'],
          ] }) +
          p('Stop at the stop line. With no line, stop at the crosswalk; with no crosswalk, at the edge of the sidewalk; with neither, at the edge of the intersection. Then make eye contact: other drivers don&rsquo;t always follow the rules.') },
        { id: 'uncontrolled', h: 'Uncontrolled intersections', html: p('With no signs or lights at all, yield to any vehicle already in the intersection. If two vehicles arrive at about the same time, the driver on the left yields to the vehicle on the right. Failing to yield is 3 demerit points.') },
        { id: 'signs', h: 'Stop signs and yield signs', html: ul([
          '<strong>Stop sign:</strong> come to a full stop, then go only when the way is clear of traffic in the intersection and traffic close enough to be a hazard.',
          '<strong>Yield sign:</strong> slow down, stop if you need to, and let traffic in the intersection or on the road you&rsquo;re joining go first.',
        ]) + p('Rolling through a stop sign is 3 demerit points, and it&rsquo;s one of the easiest ways to lose marks on a road test.') },
        { id: 'left', h: 'Left turns', html: ul([
          'Wait for oncoming traffic and for pedestrians crossing where you&rsquo;re turning. Your signal doesn&rsquo;t give you the right-of-way.',
          'Keep your wheels pointing straight while you wait. If you&rsquo;re hit from behind, turned wheels can push you into oncoming traffic.',
          'Watch for oncoming cyclists, and don&rsquo;t pull up beside a bicycle or motorcycle that&rsquo;s turning left.',
        ]) + p('Not yielding to a pedestrian at a signalized crosswalk costs $300 to $1,000 and 4 demerit points.') },
        { id: 'right', h: 'Right turns and turning right on red', html: ul([
          'Wait for pedestrians crossing where you&rsquo;re turning.',
          'Shoulder check for cyclists coming up beside you in a bike lane, on the sidewalk or on a trail.',
          'Turning right on a red light is allowed after a complete stop, once the way is clear, unless a sign forbids it.',
        ]) + callout('local', 'Hamilton note', p('Right turns on red are banned at a number of intersections along Main Street and King Street downtown. Watch for the signs.')) },
        { id: 'lights', h: 'Flashing lights and lights that are out', html: ul([
          '<strong>Flashing red:</strong> stop completely, yield, then go when it&rsquo;s safe.',
          '<strong>Flashing yellow:</strong> go through with caution.',
          '<strong>Lights out:</strong> treat the intersection like an all-way stop, yielding to vehicles in it and to those coming from your right.',
        ]) },
        { id: 'driveways', h: 'Leaving a driveway or private road', html: p('Yield to vehicles on the road and to pedestrians on the sidewalk before you pull out.') },
        inlineCta('Intersections making you nervous? Call or text Mrs. Akbar for calm, patient lessons.'),
        { id: 'pedestrians', h: 'Pedestrians, crosswalks and crossovers', html: p('Not every crosswalk is marked, but nearly every intersection has one. Never pass a vehicle that&rsquo;s stopped at a crosswalk; it may be stopped for someone you can&rsquo;t see.') +
          h3('Pedestrian crossovers') + ul([
            'Look for the signs, the &ldquo;ladder&rdquo; crosswalk markings and a row of triangles, called &ldquo;shark teeth&rdquo;, marking the yield line. Some crossovers also have flashing lights, overhead signs or push buttons.',
            'Stop and wait until the pedestrian is completely off the road. Don&rsquo;t pass a vehicle stopped at the crossover.',
            'Don&rsquo;t pass any vehicle within 30 m of a crossover.',
          ]) +
          h3('School crossing guards') + p('When a guard shows their stop sign, stop and stay stopped until everyone, including the guard, has cleared the road.') +
          table({ caption: 'Penalties for pedestrian offences', head: ['Offence', 'Fine', 'Demerit points'], rows: [
            ['Not yielding at a pedestrian crossover', '$300 to $1,000 ($500 to $1,000 for a repeat within five years)', '4'],
            ['Not stopping for a school crossing guard', '$300 to $1,000 ($500 to $1,000 for a repeat within five years)', '4'],
            ['Not yielding to a pedestrian at a signal', '$300 to $1,000', '4'],
          ] }) },
        { id: 'school-bus', h: 'School buses', html: ul([
          '<strong>Amber lights flashing:</strong> the bus is about to stop. Slow down and get ready to stop.',
          '<strong>Red lights flashing or stop arm out:</strong> stop, whether you&rsquo;re behind the bus or coming toward it. Only on a road with a median can oncoming traffic keep going.',
          '<strong>From behind,</strong> stop at least 20 m back, and wait until the bus moves or the lights stop.',
        ]) + p('It applies on every road, whatever the speed limit or number of lanes, at any time of day. A first offence costs $400 to $2,000 and 6 demerit points, and a repeat within five years can mean $1,000 to $4,000 and jail.') },
        { id: 'emergency', h: 'Emergency vehicles and the Move Over law', html: h3('One coming toward you, lights or siren on') + p('Stop right away, as close as you can to the right edge of the road, parallel to it and clear of any intersection. On a one-way road with more than two lanes, pull toward the nearest edge. If you&rsquo;re already turning in an intersection, go straight through, then pull over. And never follow a fire truck answering an alarm within 150 m.') +
          h3('One stopped at the roadside') + p('When an emergency vehicle with its lights flashing, or a tow truck with amber lights flashing, is stopped on your side of the road, slow down and pass carefully. With two or more lanes in your direction, move over a lane if it&rsquo;s safe. Breaking the Move Over law costs $400 to $2,000 and 3 demerit points, and a court can suspend your licence for up to two years. From January 1, 2027, the law will also cover stopped work vehicles with amber lights.') },
        { id: 'buses', h: 'Buses pulling out of a bus bay', html: p('If you&rsquo;re in the lane next to a bus bay and a bus signals to pull back into traffic, let it in. The rule covers large transit buses with a yield sign on the back.') },
        { id: 'merging', h: 'Merging and changing lanes', html: ul([
          'When your lane ends, it&rsquo;s your job to merge safely. Where two roads join into one, drivers on both are equally responsible for a smooth merge.',
          'Signalling doesn&rsquo;t give you the right-of-way: other drivers expect you to wait for a safe gap.',
          'On a freeway ramp, use the acceleration lane to match the speed of traffic, signal, and merge smoothly. Drivers already on the freeway should move over if it&rsquo;s safe.',
        ]) },
        { id: 'cyclists', h: 'Cyclists', html: ul([
          'When you pass a cyclist, leave at least 1 m where practical, measured from the widest part of your car, mirrors included. Not doing so is 2 demerit points.',
          'Before you or a passenger opens a door, check your mirror and blind spot. Opening a door into traffic costs $300 to $1,000 and 3 demerit points.',
        ]) + quote(review('Aiden Webster', 'she helped me learn the rules of the road', 'in the Hamilton area to her')) },
      ],
      sources: [S.hbIntersections, S.hbDirections, S.hbLights, S.hbStopping, S.hbShare, S.situations, S.hbFreeway, S.pxo, S.hamPxo, S.schoolBus, S.hamStopping, S.hta, S.reg339],
      faqs: [
        ['Who goes first at a 4-way stop in Ontario?', 'The first vehicle to come to a complete stop goes first. If two stop at the same time, the driver on the left yields to the driver on the right.'],
        ['At a 4-way stop, who goes first if one car is turning left and the other is going straight?', 'The left-turning driver waits for the oncoming car to go through or turn.'],
        ['Who has the right-of-way at an uncontrolled intersection?', 'A vehicle already in the intersection. If two arrive at about the same time, the driver on the left yields to the vehicle on the right.'],
        ['Do you have to wait for pedestrians to fully cross the road in Ontario?', 'At a pedestrian crossover, yes: wait until they&rsquo;re completely off the road. You must also wait for everyone to clear when a school crossing guard is there. At an ordinary crosswalk, you can go once they&rsquo;re safely past your path.'],
        ['What is the fine for not stopping at a pedestrian crossover?', '$300 to $1,000 and 4 demerit points for a first offence.'],
        ['Do you have to stop for a school bus on a four-lane road?', 'Yes, in both directions, unless the road has a median. Then only traffic behind the bus has to stop.'],
        ['What is the Move Over law in Ontario?', 'When an emergency vehicle or tow truck is stopped with its lights flashing on your side, slow down, and move over a lane if you have two or more lanes and it&rsquo;s safe. A first offence costs $400 to $2,000 and 3 demerit points.'],
        ['Should your wheels be straight when waiting to turn left?', 'Yes. If you&rsquo;re hit from behind with your wheels turned, you could be pushed into oncoming traffic.'],
        ['How much room do you give a cyclist when passing in Ontario?', 'At least 1 m where practical.'],
      ],
      related: ['ontario-road-signs', 'how-to-drive-a-roundabout', 'g1-practice-test'],
      lessons: lessonsChips(['/beginner-driving-lessons/', 'Beginner lessons'], ['/g2-road-test-preparation/', 'G2 road test prep']),
      cta: ['Practise intersections with her', 'Four-way stops and left turns get easy with practice. Call or text Mrs. Akbar to book. She comes to you.'],
    }),

    /* ---------- Speed limits, tickets and stunt driving ---------- */
    guidePage({
      slug: 'ontario-speed-limits-and-speeding-tickets',
      published: DATE, updated: DATE,
      title: 'Ontario Speed Limits, Speeding Tickets and Stunt Driving | Mrs. Akbar',
      description: 'Ontario speed limits in 2026, what a speeding ticket costs, demerit points by km/h over, when speeding becomes stunt driving, and what G1 and G2 drivers risk.',
      script: 'rules of the road',
      dek: 'Default limits, the new 110 km/h highways, what a ticket costs, the points it carries, and the line where speeding becomes stunt driving.',
      intro: 'Speed is part of every drive, and a speeding ticket can cost a lot more than the fine, especially on a G1 or G2. Here&rsquo;s how Ontario&rsquo;s limits work, what tickets cost, and exactly where speeding turns into stunt driving, with notes for Hamilton drivers.',
      sections: [
        { id: 'limits', h: 'Speed limits when there&rsquo;s no sign', html: p('A posted sign always wins. Where there isn&rsquo;t one, Ontario&rsquo;s defaults apply:') +
          table({ caption: 'Ontario&rsquo;s default speed limits', head: ['Where you are', 'Limit'], rows: [
            ['Inside a city, town, village or other built-up area', '50 km/h'],
            ['Outside built-up areas', '80 km/h'],
            ['Freeways such as the 400-series and the QEW', 'As posted: set section by section'],
          ] }) +
          p('A limit is the most you&rsquo;re allowed to drive, not a target. In rain, snow, fog or heavy traffic, the safe speed is lower.') },
        { id: 'highways', h: 'The new 110 km/h highways near Hamilton', html: p('Ontario has been raising highway limits from 100 to 110 km/h. After the latest round, finished in September 2026, about 89% of the provincial highways that used to be 100 km/h are now 110. Around Hamilton:') +
          ul([
            '<strong>QEW east of Stoney Creek:</strong> 110 km/h from Millen Road toward Niagara.',
            '<strong>QEW from Burlington to Oakville:</strong> 110 km/h from the Freeman interchange to Highway 403, since September 30, 2026.',
            '<strong>QEW over the Burlington Skyway</strong> (between Freeman and Millen Road): still 100 km/h.',
            '<strong>Highway 403 through Hamilton and Burlington:</strong> 100 or 90 km/h.',
            '<strong>Highway 403 west of Ancaster</strong> toward Brantford: 110 km/h.',
          ]) +
          p('City roads set their own limits. The Red Hill Valley Parkway, for example, is posted at 80 km/h for most of its length. Whatever you read here, the sign in front of you is the rule.') },
        { id: 'fines', h: 'What a speeding ticket costs', html: p('The fine on a speeding ticket depends on how far over the limit you were:') +
          table({ caption: 'Set fines for speeding (out of court)', head: ['Speed over the limit', 'Fine per km/h over'], rows: [
            ['1 to 19 km/h', '$2.50'],
            ['20 to 29 km/h', '$3.75'],
            ['30 to 49 km/h', '$6.00'],
            ['50 km/h or more', 'No set fine: you have to go to court'],
          ] }) +
          p('Every ticket also adds $5 in costs and a victim fine surcharge that grows with the fine. Worked out from the official tables, that makes:') +
          ul(['<strong>15 km/h over:</strong> about $52.50 in total', '<strong>20 km/h over:</strong> about $95', '<strong>35 km/h over:</strong> about $265']) +
          p('Those are the amounts on the ticket. If you go to court and lose, the fines on conviction are higher, and at 50 km/h or more over, the court can also suspend your licence for up to 30 days.') },
        { id: 'zones', h: 'Community safety, construction and school zones', html: ul([
          '<strong>Community safety zones:</strong> speeding fines double during the hours and days posted on the signs.',
          '<strong>Construction zones:</strong> speeding fines double when workers are present.',
          '<strong>School zones:</strong> there&rsquo;s no single provincial school zone limit; cities set them. Hamilton has been lowering residential and collector streets to 40 km/h, with 30 km/h in school zones on those streets. School zones on Hamilton&rsquo;s main roads get flashing 40 km/h signs during school hours.',
        ]) + callout('local', 'Hamilton school zones', p('The City&rsquo;s own back-to-school advice is simple: the school zone limit is 30 km/h. Slow down near every school, and watch for children stepping out between parked cars.')) },
        inlineCta('Want a calm instructor to help you build safe speed habits? Call or text Mrs. Akbar.'),
        { id: 'points', h: 'Demerit points for speeding', html: table({ caption: 'Demerit points for speeding convictions', head: ['Speed over the limit', 'Demerit points'], rows: [
            ['1 to 15 km/h', '0'],
            ['16 to 29 km/h', '3'],
            ['30 to 49 km/h', '4'],
            ['50 km/h or more', '6'],
            ['Stunt driving or racing', '6'],
          ] }) +
          p('Points count for two years from the date of the offence. The <a href="/guides/demerit-points-ontario/">demerit points guide</a> explains what happens as they add up.') },
        { id: 'novice', h: 'If you&rsquo;re on a G1 or G2', html: p('New drivers reach consequences much sooner:') +
          ul([
            '<strong>Any conviction worth 4 or more points</strong>, which includes speeding 30 km/h or more over, brings a licence suspension: 30 days the first time, 90 days the second, and cancellation the third. A cancelled licence means starting over at G1.',
            '<strong>Points add up faster to a warning:</strong> a G1 or G2 driver gets a warning letter at 2 points and a 60-day suspension at 9.',
          ]) +
          callout('rule', 'One ticket can cost a month', p('A G2 driver convicted of going 30 km/h over the limit gets a 30-day suspension, plus the fine. For a fully licensed driver, the same ticket is 4 points and a fine.')) },
        { id: 'stunt', h: 'Stunt driving: where speeding becomes something else', html: p('In Ontario, it&rsquo;s stunt driving to drive:') +
          ul([
            '<strong>40 km/h or more over</strong> the limit where the limit is under 80 km/h',
            '<strong>50 km/h or more over</strong> where the limit is 80 km/h or more',
            '<strong>150 km/h or more</strong>, anywhere',
          ]) +
          p('Deliberately cutting off another car, blocking someone from passing, and following dangerously close can count as stunt driving too, and the rules apply in parking lots as well as on roads.') +
          h3('At the roadside') + p('Police suspend your licence for 30 days on the spot, and the car is impounded for 14 days at the owner&rsquo;s cost, even if it isn&rsquo;t yours.') +
          h3('If you&rsquo;re convicted') + ul([
            'A fine of $2,000 to $10,000, and up to six months in jail',
            '6 demerit points and a mandatory driver improvement course',
            'A licence suspension of at least 1 year for a first conviction, at least 3 years for a second, and an indefinite suspension for a third. Since January 1, 2026, these suspensions apply automatically.',
          ]) +
          callout('rule', '150 km/h on a 110 km/h highway', p('On the new 110 km/h highways, the stunt driving line is still 150 km/h. That&rsquo;s only 40 km/h over the limit.')) },
        { id: 'cameras', h: 'Speed cameras and red light cameras in Hamilton', html: ul([
          '<strong>Speed cameras are gone.</strong> Ontario banned municipal speed cameras as of November 14, 2025, and Hamilton&rsquo;s stopped that day. Camera tickets for speeding before that date still have to be paid.',
          '<strong>Red light cameras are still running.</strong> In Hamilton, a red light camera ticket totals $325 and goes to the vehicle&rsquo;s plate holder, whoever was driving. Camera tickets carry no demerit points. A red light ticket from a police officer is 3 points.',
        ]) },
        { id: 'ticket', h: 'Got a ticket in Hamilton? Your options', html: p('You have 15 days to choose one:') +
          ol(['<strong>Pay it.</strong> Paying counts as pleading guilty, so the conviction and any demerit points go on your record.', '<strong>Ask for an early resolution meeting</strong> with a prosecutor, by audio, video or in person.', '<strong>Ask for a trial.</strong>']) +
          p('If you do nothing, you can be convicted without a hearing. Hamilton&rsquo;s tickets are handled by the City&rsquo;s Provincial Offences Administration at 50 Main Street East. Its page explains how to pay or dispute online, by mail or in person.') },
        { id: 'insurance', h: 'Tickets and insurance', html: p('Your driving record is one of the things insurers use to set your rate, and ontario.ca warns that convictions for aggressive, careless or stunt driving can bring a substantial increase, or make you uninsurable. Your 3-year driver record lists convictions for three years, longer than demerit points count.') },
        { id: 'habits', h: 'Habits that keep you under the limit', html: ul([
          'Check your speedometer every time you check your mirrors.',
          'Look for a new limit sign after every turn onto a different road.',
          'Slow down before you enter a school zone or community safety zone, not once you&rsquo;re in it.',
          'On a highway, keep pace with the right lane rather than the fastest car around you.',
        ]) + quote(review('Mila Alieva', 'With your guidance and patience you taught me the skills to become a safe driver.', 'safe driver.')) },
      ],
      sources: [S.drivingAlong, S.hta, S.limits110, S.reg619, S.setFines, S.speeding, S.reg339, S.stuntReg, S.hamSafety, S.hamSchool, S.hamTickets, S.tickets],
      faqs: [
        ['How much is a speeding ticket in Ontario?', 'The set fine is $2.50 per km/h over for 1 to 19 over, $3.75 for 20 to 29 over and $6.00 for 30 to 49 over, plus $5 in costs and a victim fine surcharge. At 50 or more over there&rsquo;s no set fine, and you have to go to court.'],
        ['How many demerit points is 20 km/h over in Ontario?', 'Three. Speeding 16 to 29 km/h over is 3 points, 30 to 49 over is 4, and 50 or more over is 6.'],
        ['Is 40 over stunt driving in Ontario?', 'Yes, where the speed limit is under 80 km/h. Where the limit is 80 km/h or more, stunt driving starts at 50 over. Driving 150 km/h or more is stunt driving anywhere.'],
        ['What happens for a first stunt driving offence?', 'A 30-day roadside licence suspension and a 14-day vehicle impoundment. If you&rsquo;re convicted: a fine of $2,000 to $10,000, 6 demerit points, a driver improvement course and a licence suspension of at least one year.'],
        ['What happens if a G2 driver gets a speeding ticket?', 'If the conviction is worth 4 or more points (30 km/h or more over), the licence is suspended: 30 days the first time, 90 days the second, and cancelled the third. Smaller tickets add points, with a warning letter at 2.'],
        ['Are speed cameras still used in Hamilton?', 'No. Ontario banned municipal speed cameras as of November 14, 2025. Tickets for earlier camera violations still have to be paid. Red light cameras are still in use.'],
        ['Which highways near Hamilton are 110 km/h?', 'The QEW east of Millen Road in Stoney Creek, the QEW from Burlington&rsquo;s Freeman interchange to Highway 403 in Oakville, and Highway 403 west of Ancaster. The 403 through Hamilton and the QEW over the Skyway are 100 km/h or less.'],
        ['What is the speed limit in Hamilton school zones?', 'The City says 30 km/h. On some main roads, school zones have flashing 40 km/h signs during school hours, so follow the posted sign.'],
      ],
      related: ['demerit-points-ontario', 'distracted-driving-ontario', 'g-road-test-tips'],
      lessons: lessonsChips(['/g-road-test-preparation/', 'G test and highway'], ['/beginner-driving-lessons/', 'Beginner lessons']),
      cta: ['Keep your licence clean', 'Lessons build the habits that keep you under the limit without thinking about it. Call or text to book.'],
    }),

    /* ---------- Distracted driving ---------- */
    guidePage({
      slug: 'distracted-driving-ontario',
      published: DATE, updated: DATE,
      title: 'Distracted Driving in Ontario: Phone Laws and Fines | Mrs. Akbar',
      description: 'Ontario&rsquo;s distracted driving law in plain words: what you can and can&rsquo;t do with a phone, the $615 fine, demerit points, and the suspensions G1 and G2 drivers face.',
      script: 'rules of the road',
      dek: 'What the law actually says about phones, what&rsquo;s allowed, and why the penalties hit G1 and G2 drivers hardest.',
      intro: 'Ontario&rsquo;s distracted driving law is stricter than many people think. Simply holding your phone is enough, even at a red light. For a G1 or G2 driver, one conviction means a licence suspension. Here&rsquo;s what&rsquo;s allowed, what isn&rsquo;t, and what it costs.',
      sections: [
        { id: 'illegal', h: 'What&rsquo;s against the law', html: p('While you&rsquo;re driving, you can&rsquo;t:') +
          ul([
            'Hold a phone or other hand-held device, or use one to text, dial, browse or play anything. Just holding it is an offence.',
            'Use a hand-held entertainment device, like a gaming console or music player.',
            'Have a screen in view that has nothing to do with driving, like a video.',
            'Type into a GPS, unless you do it by voice.',
          ]) +
          callout('rule', 'Stopped still counts', p('Waiting at a red light or sitting in traffic is still driving. The ban only stops applying once you&rsquo;re off the road or lawfully parked, not moving, and not blocking traffic.')) },
        { id: 'allowed', h: 'What&rsquo;s allowed', html: ul([
          '<strong>Hands-free calls</strong> through Bluetooth, an earpiece or the car&rsquo;s system, touching the device only to turn it on or off.',
          '<strong>A mounted phone</strong>, pressing a button only to make, answer or end a call. The mount must hold it securely, where you can see it at a glance and reach it without changing your driving position.',
          '<strong>GPS</strong> that&rsquo;s built in or securely mounted, used for navigation. Set your destination before you leave, or by voice.',
          '<strong>Calling 911.</strong> It&rsquo;s exempt, though ontario.ca suggests pulling off somewhere safe first if you can.',
        ]) },
        { id: 'full', h: 'Penalties for fully licensed drivers', html: table({ caption: 'Distracted driving penalties: fully licensed drivers', head: ['Conviction', 'Fine', 'Also'], rows: [
            ['First', '$615 to $1,000', '3 demerit points and a 3-day suspension'],
            ['Second', 'Up to $2,000', '6 demerit points and a 7-day suspension'],
            ['Third or later', 'Up to $3,000', '6 demerit points and a 30-day suspension'],
          ] }) +
          p('The $615 is what you pay for a first ticket if you don&rsquo;t go to court; a court can set the fine as high as $1,000. A conviction only counts as a repeat if it comes within five years of the last one, and every suspension also means a $281 reinstatement fee.') },
        { id: 'novice', h: 'Penalties for G1 and G2 drivers', html: p('New drivers pay the same fines but get no demerit points. Instead, the licence is suspended:') +
          table({ caption: 'Distracted driving penalties: G1 and G2 drivers', head: ['Conviction', 'What happens'], rows: [
            ['First', '30-day licence suspension'],
            ['Second', '90-day licence suspension'],
            ['Third', 'Licence cancelled: you start graduated licensing again from G1'],
          ] }) +
          callout('rule', 'One text can cost a month', p('A G2 driver caught holding a phone at a red light can lose their licence for 30 days. A third conviction within five years means going back to a G1, with the waiting time starting over.')) },
        inlineCta('Want to build phone-free habits from your first lesson? Call or text Mrs. Akbar.'),
        { id: 'careless', h: 'It&rsquo;s not only phones', html: p('Eating, drinking, grooming, reading or reaching for something aren&rsquo;t covered by the phone law, but if they take your attention off the road, police can charge you with careless driving instead:') +
          ul([
            '<strong>Careless driving:</strong> 6 demerit points, a fine of $400 to $2,000, up to six months in jail, and a licence suspension of up to two years.',
            '<strong>Careless driving causing injury or death:</strong> a fine of $2,000 to $50,000, up to two years in jail, and a suspension of up to five years.',
          ]) +
          p('Careless driving charges apply in parking lots too. And in June 2026, Ontario passed a law that will raise careless driving fines and add roadside suspensions once it takes effect; it wasn&rsquo;t in force when we last checked.') },
        { id: 'why', h: 'Why it matters', html: ul([
          'Ontario says someone is killed or injured in a collision involving a distracted driver every hour.',
          'In 2022, more than 30,000 collisions in Ontario involved distracted or inattentive drivers, causing nearly 11,000 injuries and about 100 deaths.',
          'The Driver&rsquo;s Handbook says drivers aged 16 to 25 are the most likely to drive distracted, and that drivers who were texting or changing music travelled about 28 m further before reacting to a hazard. That&rsquo;s about half a hockey rink.',
        ]) },
        { id: 'habits', h: 'Habits that make it easy', html: ol([
          '<strong>Turn on your phone&rsquo;s driving or do-not-disturb mode</strong> before you start the car.',
          '<strong>Set your GPS and music before you pull away.</strong>',
          '<strong>Mount your phone</strong> if you use it for directions, or keep it out of reach if you don&rsquo;t.',
          '<strong>Let a passenger handle it,</strong> or pull over somewhere safe and park first.',
        ]) + p('On your road test, phones and other recording devices must be turned off, so it&rsquo;s worth practising without one anyway.') },
      ],
      sources: [S.distracted, S.situations, S.hta, S.reg366, S.setFines, S.reinstate, S.speeding],
      faqs: [
        ['Can I use my phone at a red light in Ontario?', 'No. Stopped in traffic or at a red light still counts as driving. You can only use a hand-held phone once you&rsquo;re off the road or lawfully parked and not blocking traffic.'],
        ['Is it illegal to just hold your phone while driving in Ontario?', 'Yes. Holding a phone or other hand-held device while driving is an offence, even if you aren&rsquo;t using it.'],
        ['Can I use Google Maps while driving in Ontario?', 'Yes, if the phone is securely mounted and you set the destination before you leave or by voice. Holding the phone or typing on it while driving isn&rsquo;t allowed.'],
        ['Can I touch my phone if it&rsquo;s mounted?', 'Only to press a button to make, answer or end a call. The mount must hold it securely, visible at a glance and within easy reach.'],
        ['How much is a distracted driving ticket in Ontario?', '$615 for a first conviction if you pay without going to court, or up to $1,000 if a court sets it, plus 3 demerit points and a 3-day suspension for fully licensed drivers.'],
        ['What happens if a G2 driver gets a distracted driving ticket?', 'If convicted, a G2 driver pays the same fine and has their licence suspended for 30 days. A second conviction means 90 days, and a third means starting again from G1.'],
        ['Is eating while driving illegal in Ontario?', 'It isn&rsquo;t covered by the phone law, but if it takes your attention off the road, you can be charged with careless driving.'],
        ['Can I call 911 while driving?', 'Yes. Calls to 911 are exempt, though it&rsquo;s safer to pull off the road first if you can.'],
      ],
      related: ['ontario-speed-limits-and-speeding-tickets', 'demerit-points-ontario', 'ontario-g1-g2-g-licence-explained'],
      lessons: lessonsChips(['/beginner-driving-lessons/', 'Beginner lessons'], ['/driving-lessons-for-nervous-drivers/', 'Nervous drivers']),
      cta: ['Good habits start early', 'Lessons are a good time to build phone-free driving habits. Call or text to book.'],
    }),

    /* ---------- Demerit points ---------- */
    guidePage({
      slug: 'demerit-points-ontario',
      published: DATE, updated: DATE,
      title: 'Demerit Points in Ontario: How They Work (2026) | Mrs. Akbar',
      description: 'How Ontario demerit points work: points for speeding and other tickets, when G1, G2 and full licences get suspended, how long points last and how to check yours.',
      script: 'rules of the road',
      dek: 'How points get added, what happens at each level for G1, G2 and full licences, and how long they stay on your record.',
      intro: 'Ontario&rsquo;s demerit point system isn&rsquo;t a bank of 15 points that you lose. You start at zero, and each conviction for a driving offence adds points. Collect too many within two years and you get a warning, then a second warning, then a suspension. On a G1 or G2, you reach each step much sooner.',
      sections: [
        { id: 'how', h: 'How demerit points work', html: ul([
          'Points go on your record when you&rsquo;re <strong>convicted</strong>, not when you get the ticket.',
          'Paying a ticket counts as pleading guilty, so paying means the points go on.',
          'Points are dated from the day of the offence and count for <strong>two years</strong> from that date.',
          'If one incident leads to several convictions, only the offence with the most points counts.',
          'If you appeal, the points aren&rsquo;t recorded unless the conviction is upheld.',
        ]) + callout('rule', 'Before you pay', p('Paying is the same as a conviction. If you believe a ticket is wrong, the time to dispute it is before you pay, usually within 15 days.')) },
        { id: 'novice', h: 'G1 and G2 drivers', html: table({ caption: 'Demerit points: G1 and G2 drivers', head: ['Points', 'What happens'], rows: [
            ['2 to 5', 'A warning letter'],
            ['6 to 8', 'A second warning letter. The Ministry can also call you to an interview.'],
            ['9 or more', 'A 60-day suspension. Your points drop to 4 afterwards; reach 9 again and it&rsquo;s 6 months.'],
          ] }) +
          h3('The suspensions that skip the points') + p('On top of points, G1 and G2 drivers face escalating suspensions for a conviction for breaking a G1 or G2 condition, for any offence worth 4 or more points, for fleeing police, or for distracted driving:') +
          ul(['<strong>First conviction:</strong> 30-day suspension', '<strong>Second:</strong> 90-day suspension', '<strong>Third:</strong> your licence is cancelled, and you start again at G1']) +
          p('Only convictions within five years of the last one escalate. For these offences, the suspension takes the place of the points.') },
        { id: 'full', h: 'Fully licensed drivers', html: table({ caption: 'Demerit points: fully licensed drivers', head: ['Points', 'What happens'], rows: [
            ['6 to 8', 'A warning letter'],
            ['9 to 14', 'A second warning letter. The Ministry can also call you to an interview.'],
            ['15 or more', 'A 30-day suspension. Your points drop to 7 afterwards; reach 15 again and it&rsquo;s 6 months.'],
          ] }) +
          p('Getting a suspended licence back costs a $281 reinstatement fee, and after a points suspension you may have to redo the vision, knowledge and road tests.') },
        inlineCta('New driver? Lessons help you build habits that keep your record clean. Call or text Mrs. Akbar.'),
        { id: 'table', h: 'Points for common tickets', html: table({ caption: 'Demerit points for common offences in Ontario', head: ['Offence', 'Points'], rows: [
            ['Speeding 1 to 15 km/h over', '0'],
            ['Speeding 16 to 29 km/h over', '3'],
            ['Speeding 30 to 49 km/h over', '4'],
            ['Speeding 50 km/h or more over', '6'],
            ['Racing or stunt driving', '6'],
            ['Careless driving', '6'],
            ['Failing to stop for a school bus with its red lights flashing', '6'],
            ['Failing to remain at the scene of a collision', '7'],
            ['Failing to stop for police', '7'],
            ['Following too closely', '4'],
            ['Failing to yield to a pedestrian', '4'],
            ['Pedestrian crossover or school crossing guard offence', '4'],
            ['Running a red light or stop sign', '3'],
            ['Failing to yield the right-of-way', '3'],
            ['Improper passing', '3'],
            ['Going around or under a railway crossing barrier', '3'],
            ['Not slowing down or moving over for a stopped emergency vehicle or tow truck', '3'],
            ['Opening a car door into traffic', '3'],
            ['Distracted driving, fully licensed', '3, or 6 for a repeat within five years'],
            ['Not leaving 1 m when passing a cyclist', '2'],
            ['Seatbelt and child car seat offences', '2'],
          ] }) +
          p('Driving 40 km/h or more over where the limit is under 80, or 50 or more over where it&rsquo;s 80 or higher, is stunt driving, which brings much more than points. The <a href="/guides/ontario-speed-limits-and-speeding-tickets/">speeding and stunt driving guide</a> has the details.') },
        { id: 'outside', h: 'Tickets from outside Ontario', html: p('Convictions in other provinces and territories, New York and Michigan add points to your Ontario record as if they happened here, for offences such as speeding, running a red light or stop sign, failing to stop for a school bus, careless driving, racing and failing to remain at a collision.') },
        { id: 'cameras', h: 'Camera tickets', html: p('A red light camera ticket goes to the vehicle&rsquo;s plate holder, whoever was driving, and carries no demerit points. In Hamilton it totals $325. A red light ticket from a police officer is 3 points. Ontario banned speed cameras as of November 14, 2025, though camera tickets for earlier dates still have to be paid.') },
        { id: 'insurance', h: 'Points and insurance', html: p('Insurers set your rate partly on your driving record, including collisions, speeding tickets and other convictions. FSRA, Ontario&rsquo;s insurance regulator, puts it plainly: the better your record, the lower your premium.',
          'FSRA also describes a graduated licensing discount: 10% for a year when you move up to a G2, and again at G, if you have no chargeable convictions or at-fault collisions. A clean record pays twice.') },
        { id: 'check', h: 'How to check your points', html: p('Order your <strong>3-year driver record</strong> from ServiceOntario. It shows your demerit point total, convictions and suspensions. An uncertified copy costs $12 and arrives by email as a PDF when you order online, or right away in person. A certified copy is $18 and is mailed within 15 business days. The free online licence status check doesn&rsquo;t show points.') },
      ],
      sources: [S.demerit, S.reg339, S.reg340, S.keeping, S.reinstate, S.record, S.fsraRate, S.fsraSave, S.hamSafety],
      faqs: [
        ['How long do demerit points stay on your record in Ontario?', 'Two years from the date of the offence.'],
        ['Do you start with 15 points in Ontario?', 'No. You start at zero and gain points for convictions. For a fully licensed driver, reaching 15 means a 30-day suspension.'],
        ['How many demerit points before a G2 licence is suspended?', 'Nine points means a 60-day suspension. But any single conviction worth 4 or more points, such as speeding 30 km/h over, already brings a 30-day suspension for a G1 or G2 driver.'],
        ['If I pay my ticket, do I get demerit points?', 'Yes. Paying counts as pleading guilty, so the conviction and its points go on your record.'],
        ['Do red light camera tickets give demerit points?', 'No. Camera tickets go to the plate holder and carry no points. A red light ticket from a police officer is 3 points.'],
        ['How do I check my demerit points in Ontario?', 'Order a 3-year driver record from ServiceOntario: $12 uncertified, or $18 certified.'],
        ['Do out-of-province tickets add demerit points in Ontario?', 'Yes, for convictions in other provinces and territories, New York and Michigan, for offences such as speeding, red lights, stop signs and careless driving.'],
        ['Do demerit points affect car insurance in Ontario?', 'Insurers look at your driving record, including tickets and convictions. FSRA says the better your record, the lower your premium.'],
      ],
      related: ['ontario-speed-limits-and-speeding-tickets', 'distracted-driving-ontario', 'ontario-g1-g2-g-licence-explained'],
      lessons: lessonsChips(['/beginner-driving-lessons/', 'Beginner lessons'], ['/g2-road-test-preparation/', 'G2 road test prep']),
      cta: ['Start with good habits', 'The best way to avoid points is to learn to drive the right way from the start. Call or text to book.'],
    }),

    /* ---------- Alcohol, cannabis and driving ---------- */
    guidePage({
      slug: 'impaired-driving-rules-ontario',
      published: DATE, updated: DATE,
      title: 'Alcohol, Cannabis and Driving: Ontario Zero Tolerance | Mrs. Akbar',
      description: 'Ontario’s zero tolerance rules for G1, G2 and drivers 21 and under: alcohol and cannabis limits, roadside suspensions, penalties, breath tests and the 2026 changes.',
      script: 'rules of the road',
      dek: 'Who has to be at zero, what happens at the roadside, and the rules that changed in 2026.',
      intro: 'If you hold a G1 or G2, or you&rsquo;re 21 or under, Ontario&rsquo;s rule is simple: no alcohol and no drugs in your system when you drive. Not one drink, and not the morning after if there&rsquo;s still alcohol in your blood. Here&rsquo;s who the zero tolerance rules cover, what happens if you&rsquo;re caught, and the rules that apply to every driver.',
      sections: [
        { id: 'zero', h: 'Who has to be at zero', html: p('Ontario&rsquo;s zero tolerance rules cover:') + ul([
          'Every driver <strong>21 or under</strong>, whatever licence they hold, even a full G',
          '<strong>G1 and G2 drivers</strong> of any age, along with M1 and M2 motorcycle drivers',
          'Anyone driving a vehicle that needs a commercial licence (classes A to F) or a CVOR certificate',
        ]) + p('For these drivers, the limit is zero for alcohol and zero for drugs, including cannabis. Police can check for drugs at the roadside with approved oral-fluid screening devices. People authorized to use medical cannabis are exempt from the zero-drug rule, but not from the penalties for driving while impaired.') +
          callout('rule', 'Zero means zero', p('There&rsquo;s no safe first drink for a G1 or G2 driver. Your blood alcohol has to be zero, so the only safe plan is not to drink at all before you drive.')) },
        { id: 'caught', h: 'If a G1, G2 or young driver is caught', html: p('Any alcohol or drugs in your system brings an immediate roadside licence suspension and a penalty, and both grow each time it happens:') +
          table({ caption: 'Roadside penalties for young and novice drivers in Ontario', head: ['When', 'Suspension', 'Penalty'], rows: [
            ['First time', '7 days', '$250'],
            ['Second time', '14 days', '$350'],
            ['Third time', '30 days', '$450'],
          ] }) + ul([
            'An 8-hour education program the first time, and a 16-hour treatment program the second and third times.',
            'A six-month ignition interlock condition the third time.',
            'A $281 fee to reinstate your licence after each suspension.',
            'If you&rsquo;re convicted, a fine and a further suspension. For G1 and G2 drivers it grows each time: 30 days, then 90 days, then the licence is cancelled and you start again from a G1.',
          ]) + callout('rule', 'What changed on January 1, 2026', p('Roadside suspensions for young and novice drivers, and for the warn range, went from 3, 7 and 30 days to 7, 14 and 30 days. Plenty of websites still show the old numbers.')) },
        { id: 'warn', h: 'The warn range: 0.05 to 0.079', html: p('Drivers 22 and over with a full licence can still be suspended at the roadside with a blood alcohol level from 0.05 to 0.079, or for failing a field sobriety test. The penalties match the table above: 7, 14 or 30 days, $250, $350 or $450, an education or treatment program, and a six-month ignition interlock condition the third time. Earlier suspensions now count for 10 years, up from 5.',
          'If you blow in the warn range, you can ask for a second test on a different device.') },
        { id: 'over', h: 'Over 0.08, refusing a test, or failing a drug evaluation', toc: 'Over 0.08 or refusing', html: p('At the roadside, every time: a 90-day licence suspension, a 7-day vehicle impoundment and a $550 penalty, followed by an education or treatment program. A criminal conviction comes on top of that:') + ul([
            '<strong>Fines:</strong> at least $1,000 for a first offence, $1,500 or $2,000 at higher blood alcohol levels, and $2,000 for refusing a test.',
            '<strong>Jail:</strong> at least 30 days for a second offence, and at least 120 days for a third.',
            '<strong>Your Ontario licence:</strong> suspended for at least a year on a first conviction, at least three years on a second within 10 years, and for life on a third, which may be reduced after 10 years.',
            '<strong>Ignition interlock:</strong> once your licence comes back, a breath-testing device in your car for at least a year after a first offence, or nine months if you install it within 30 days.',
            '<strong>A criminal record,</strong> plus $894 for the Back on Track program and the $281 reinstatement fee.',
          ]) },
        inlineCta('New driver? Learn the rules and the habits together. Call or text Mrs. Akbar to book lessons.'),
        { id: 'breath', h: 'Can police test you without a reason?', html: p('For alcohol, yes. Since 2018, a police officer who has lawfully stopped you and has an approved screening device can demand a breath sample, even without suspecting you&rsquo;ve been drinking. Refusing is a criminal offence with a minimum fine of $2,000, and it brings the same 90-day roadside suspension, 7-day impoundment and $550 penalty as failing.',
          'For drugs, police need a reasonable suspicion before they can demand an oral-fluid sample.') },
        { id: 'drugs', h: 'Cannabis, prescriptions and other drugs', html: ul([
          'Driving while impaired by drugs carries the same penalties as alcohol.',
          'Police use roadside oral-fluid screening, field sobriety tests and evaluations by specially trained drug recognition experts.',
          'Under the Criminal Code, 2 to under 5 nanograms of THC per millilitre of blood is a lesser offence with a fine of up to $1,000. Five or more, or 2.5 combined with a blood alcohol level of 0.05, carries the same penalties as alcohol-impaired driving.',
          'Ontario says cannabis impairment can last six hours or more, and there&rsquo;s no reliably safe waiting time.',
          'Prescription and over-the-counter medication counts too. If a medication can affect your driving, ask your doctor or pharmacist before you drive.',
        ]) },
        { id: 'car', h: 'Alcohol and cannabis in the car', html: ul([
          '<strong>Alcohol</strong> can only be in the car unopened, with the seal intact, or packed in closed luggage that isn&rsquo;t within easy reach.',
          '<strong>Passengers can&rsquo;t drink</strong> in a vehicle on the road.',
          '<strong>Cannabis</strong> has to be in its original unopened packaging, or packed in closed luggage that isn&rsquo;t within easy reach. That includes medical cannabis.',
          '<strong>Nobody in the car,</strong> passengers included, may smoke, vape or eat cannabis in a vehicle that&rsquo;s being driven or about to be.',
        ]) + p('Being impaired in a parked car can still lead to charges, so sleeping it off in the driver&rsquo;s seat isn&rsquo;t a safe plan either.') },
        { id: 'supervisor', h: 'The person beside a G1 driver', html: p('Your accompanying driver&rsquo;s blood alcohol must be under 0.05, and ontario.ca says it should be zero if they&rsquo;re 21 or under. If a roadside breath test shows they&rsquo;re at or over 0.05, or they refuse one, police can tell you to stop driving.') },
        { id: 'plan', h: 'Plan your way home', html: p('Decide how you&rsquo;re getting home before the first drink, not after. A sober designated driver, transit, a taxi or a rideshare, or staying over are all better than a suspension, a criminal record and a car you can&rsquo;t drive. And if you&rsquo;re the designated driver on a G1 or G2, your own limit is still zero.') },
      ],
      sources: [S.impaired, S.cannabisDriving, S.cannabisLaws, S.interlock, S.reinstate, S.getG, S.hbLicence, S.demerit, S.reg340, S.hta, S.ccImpaired, S.justice, S.bot, S.llca, S.cca],
      faqs: [
        ['Can I drive after one drink with my G2 in Ontario?', 'No. G1 and G2 drivers must have a blood alcohol level of zero, so even one drink is too many.'],
        ['What happens if a G1 or G2 driver is caught with alcohol?', 'An immediate roadside suspension of 7 days and a $250 penalty the first time, 14 days and $350 the second, and 30 days and $450 the third, plus an education or treatment program. A conviction adds a fine and further suspensions.'],
        ['Does zero tolerance apply if I&rsquo;m 21 with a full G?', 'Yes. Drivers 21 or under must have zero alcohol and zero drugs, whatever licence they hold.'],
        ['How long after using cannabis can I drive?', 'There&rsquo;s no reliably safe waiting time. Ontario says impairment can last six hours or more, and G1, G2 and young drivers can&rsquo;t have any cannabis in their system.'],
        ['Can police test for cannabis at the roadside?', 'Yes. Police can use approved oral-fluid screening devices, field sobriety tests and drug recognition experts.'],
        ['Can my G1 supervisor have a drink?', 'Their blood alcohol must be under 0.05, and ontario.ca says it should be zero if they&rsquo;re 21 or under.'],
        ['Can police make you take a breath test without a reason?', 'Yes. An officer who has lawfully stopped you and has an approved screening device can demand a breath sample without suspecting you&rsquo;ve been drinking.'],
        ['What happens if you refuse a breath test in Ontario?', 'It&rsquo;s a criminal offence with a minimum $2,000 fine, plus a 90-day roadside suspension, a 7-day vehicle impoundment and a $550 penalty.'],
        ['What is the warn range in Ontario?', 'A blood alcohol level from 0.05 to 0.079. It brings roadside suspensions of 7, 14 or 30 days and penalties of $250, $350 or $450.'],
        ['Can my passengers drink or use cannabis in the car?', 'No. Passengers can&rsquo;t drink in a vehicle on the road, and nobody may smoke, vape or eat cannabis in a vehicle that&rsquo;s being driven.'],
        ['How do I carry alcohol or cannabis in my car legally?', 'Alcohol must be unopened with the seal intact, and cannabis in its original unopened packaging, unless either is packed in closed luggage that isn&rsquo;t within easy reach.'],
      ],
      related: ['distracted-driving-ontario', 'demerit-points-ontario', 'ontario-g1-g2-g-licence-explained'],
      lessons: lessonsChips(['/beginner-driving-lessons/', 'Beginner lessons'], ['/g2-road-test-preparation/', 'G2 road test prep']),
      cta: ['Good habits start early', 'The safest drivers learn the rules and the habits together. Call or text to book lessons.'],
    }),

    /* ---------- After a collision ---------- */
    guidePage({
      slug: 'what-to-do-after-a-car-accident-ontario',
      published: DATE, updated: DATE,
      title: 'What to Do After a Car Accident in Ontario (Hamilton) | Mrs. Akbar',
      description: 'What to do after a car accident in Ontario: your duties at the scene, when to call police, Hamilton’s collision reporting centres, towing rights and insurance.',
      script: 'rules of the road',
      dek: 'Your duties at the scene, when to call police, where to report in Hamilton, and what happens with towing and insurance.',
      intro: 'A collision is stressful even when it&rsquo;s small, and new drivers often aren&rsquo;t sure what the law expects of them. This guide walks through what to do at the scene, when you must report to police, how Hamilton&rsquo;s collision reporting centres work, and what to tell your insurer. It&rsquo;s worth saving on your phone.',
      sections: [
        { id: 'scene', h: 'At the scene, step by step', html: ol([
          '<strong>Stop.</strong> Every driver involved must stay at the scene, or go straight back to it, and help however they can.',
          '<strong>Check for injuries.</strong> Call 911 if anyone is hurt, fuel is leaking or the damage is serious. Don&rsquo;t move an injured person unless there&rsquo;s a danger of fire; keep them warm and stay with them.',
          '<strong>Make the scene safe.</strong> Turn on your hazard lights. If anyone is hurt or fuel is leaking, turn off the engines. Set out warning devices well back from the scene, if you have them.',
          '<strong>Clear the road if you can.</strong> If nobody is hurt and the cars can be driven, move them as far off the road as possible. The Handbook calls it &ldquo;Steer it, Clear it.&rdquo;',
          '<strong>Exchange information</strong> with the other driver (see below).',
          '<strong>Take photos</strong> if it&rsquo;s safe: the damage, the scene and the other car&rsquo;s plate.',
          '<strong>Report it</strong> to police if the law requires it, and to your insurer within seven days.',
        ]) + callout('rule', 'Never drive away', p('Leaving the scene of a collision you were involved in can mean a fine of $400 to $2,000, up to six months in jail, a licence suspension of up to two years and 7 demerit points. It can also be a criminal offence.')) },
        { id: 'police', h: 'When you must call police', html: p('Report the collision to police right away if:') + ul([
          'Anyone is hurt',
          'The total damage to all the vehicles and property looks like more than $5,000',
          'A car door hit a cyclist or another vehicle',
        ]) + p('If none of those apply, you don&rsquo;t need a police report, but you still have to exchange information. Damage to roadside property, such as a pole, sign or fence, has to be reported right away, whatever the amount. Not reporting a collision when you have to can mean a ticket and 3 demerit points.') +
          callout('rule', 'The $5,000 rule is new', p('The threshold rose from $2,000 to $5,000 on January 1, 2025. Plenty of websites, and even some official pages, still say $2,000.')) },
        { id: 'hamilton', h: 'Reporting a collision in Hamilton', html: p('Hamilton Police no longer come to collisions where there&rsquo;s only property damage. Instead, you start a report online at reportacollision.com, then take your car to a collision reporting centre to finish it. If your car can be driven, you have 48 hours.') +
          h3('Mountain Station') + ul(['400 Rymal Road East', 'Phone: <a href="tel:+19053852426">(905) 385-2426</a>', 'Monday to Friday, 8 a.m. to 8 p.m.; Saturday and Sunday, 10 a.m. to 6 p.m.']) +
          h3('East End Station') + ul(['2825 King Street', 'Phone: <a href="tel:+19055600510">(905) 560-0510</a>', 'Monday to Friday, 10 a.m. to 6 p.m.; closed weekends']) +
          p('Both are closed on holidays. The collision must have happened in Hamilton, and the car has to be there with you. Bring your driver&rsquo;s licence, ownership and insurance. Staff photograph the damage and put a &ldquo;Damage Reported&rdquo; sticker on the car.') +
          h3('When police do come') + ul([
            'Anyone is killed or injured, or taken to hospital by ambulance',
            'Emergency or government vehicles are involved',
            'Dangerous goods are involved',
            'There&rsquo;s criminal activity, a suspended driver, or alcohol or drugs',
            'The collision is blocking traffic, or the damage creates a safety risk',
          ]) +
          callout('local', 'On the QEW or Highway 403', p('Provincial highways are patrolled by the Ontario Provincial Police, and the OPP doesn&rsquo;t take collision reports online. Call the OPP at <a href="tel:+18883101122">1-888-310-1122</a>, or 911 in an emergency.')) +
          p('Need a copy of the police collision report later? Hamilton Police charge $50 plus HST, through the records office at Central Station.') },
        { id: 'exchange', h: 'What to exchange with the other driver', html: p('Every driver involved must give this information in writing to anyone who was hurt or had property damaged, to a police officer, or to a witness, if they ask:') + ul([
          'Name and address',
          'Driver&rsquo;s licence number, and the province or state that issued it',
          'Insurance company and policy number',
          'The registered owner&rsquo;s name and address',
          'The vehicle permit number',
        ]) + p('Hamilton Police also suggest noting phone numbers, the plate, make, model and year of each car, and the names and phone numbers of any witnesses.') },
        inlineCta('Shaken after a collision? Calm, patient lessons can help you feel safe behind the wheel again. Call or text Mrs. Akbar.'),
        { id: 'towing', h: 'Towing: know your rights', html: p('Tow and storage companies in Ontario must be certified by the province. Unless you&rsquo;re in a restricted tow zone:') + ul([
          'You choose the tow company, and where your car goes.',
          'Before towing, the operator must give you their maximum rates and a list of your rights.',
          'You sign a consent form that names the destination. Don&rsquo;t sign a blank one.',
          'You can see an itemized invoice before you pay, and pay by credit card, debit or cash.',
          'They can&rsquo;t charge more than their published maximum rates.',
        ]) + p('Restricted tow zones cover stretches of busy highways in the Greater Toronto and Hamilton Area, including the QEW from the Highway 403 split to Fifty Road. In a zone, only the authorized operator can tow you, and you choose where the car goes once it&rsquo;s out of the zone. If you need a tow there, call 511 from a safe spot, or 911 if you&rsquo;re stuck in a live lane.') },
        { id: 'insurance', h: 'Insurance: what happens next', html: ul([
          '<strong>Tell your insurer within seven days,</strong> or as soon as you can. Reporting late can put your claim at risk.',
          '<strong>Your own insurer pays for your car&rsquo;s damage</strong> under direct compensation (DCPD), based on how much of the collision was your fault. Since 2024 you can opt out of DCPD in writing, but then you can&rsquo;t buy collision coverage.',
          '<strong>Fault is set by Ontario&rsquo;s Fault Determination Rules,</strong> from 0 to 100%, not by who got a ticket. Being found 50% or more at fault is what usually raises your premium.',
          '<strong>If the other driver had no insurance,</strong> your policy covers damage to your car up to $25,000, minus the first $300, as long as the owner or driver can be identified.',
        ]) + h3('Should you pay for a small accident yourself?') + p('Ontario&rsquo;s rules stop an insurer from using one minor at-fault accident in three years against your rate if nobody was hurt, the insurer paid nothing and you paid for the damage yourself. Since July 1, 2026, that covers damage of up to $5,000 per vehicle, up from $2,000. Ask your insurer how it applies before you decide.') +
          h3('Accident benefits changed in 2026') + p('For policies issued or renewed on or after July 1, 2026, only medical, rehabilitation and attendant care benefits are mandatory. Income replacement and several other benefits became optional; if you renewed, you keep the benefits you had unless you declined them in writing. To claim accident benefits, tell your insurer within seven days and return the application within 30 days of receiving it.') },
        { id: 'charged', h: 'If you&rsquo;re charged as a new driver', html: p('A collision on its own doesn&rsquo;t cost a G1 or G2 driver their licence, but a conviction can. For a novice driver, any conviction worth 4 or more demerit points, such as careless driving (6 points) or following too closely (4), brings a 30-day suspension the first time, 90 days the second, and cancellation of the licence the third.',
          'Careless driving carries a fine of $400 to $2,000, up to six months in jail and a suspension of up to two years, and much more if someone is hurt or killed. Since December 2024, it applies in parking lots too. The <a href="/guides/demerit-points-ontario/">demerit points guide</a> explains how points and suspensions work.') },
        { id: 'confidence', h: 'Getting back behind the wheel', html: p('Feeling shaky after a collision is normal, even after a minor one, and even if it wasn&rsquo;t your fault. Short drives on familiar roads at quiet times help, and so does practising with someone calm beside you. If the nerves don&rsquo;t settle, lessons focused on confidence can make a real difference.') +
          quote(review('Fareha Hamid', 'She explained everything clearly', 'confident behind the wheel.')) +
          p('The <a href="/guides/nervous-driver-tips/">nervous driver guide</a> has more ideas that help.') },
      ],
      sources: [S.hta, S.reg596, S.hbEmergencies, S.keeping, S.demerit, S.hpsReport, S.accHamilton, S.opp, S.ccFail, S.tow, S.towZone, S.fsraAfter, S.fsraClaims, S.insAct, S.sabs, S.reg664],
      faqs: [
        ['Do I have to call police after a minor accident in Ontario?', 'Only if someone is hurt, the total damage looks like more than $5,000, or a car door hit a cyclist or another vehicle. Otherwise, exchange information and tell your insurer.'],
        ['How much damage do you have to report to police in Ontario?', 'More than $5,000 in total, across all vehicles and property. The threshold was $2,000 until January 1, 2025.'],
        ['Where are the collision reporting centres in Hamilton?', 'Mountain Station at 400 Rymal Road East, and East End Station at 2825 King Street. Start your report online at reportacollision.com first.'],
        ['How long do I have to report a collision in Hamilton?', 'If your car can be driven, Hamilton&rsquo;s collision reporting centres give you 48 hours. If anyone is hurt, call 911 right away.'],
        ['What information do you exchange after an accident?', 'Your name and address, driver&rsquo;s licence number, insurance company and policy number, the registered owner&rsquo;s name and address, and the vehicle permit number.'],
        ['How long do I have to tell my insurance company about an accident?', 'Within seven days, or as soon as you can after that.'],
        ['Will my insurance go up if the accident wasn&rsquo;t my fault?', 'It&rsquo;s being found 50% or more at fault that usually raises your premium. Fault is set under Ontario&rsquo;s Fault Determination Rules, and getting a ticket doesn&rsquo;t decide it.'],
        ['Should I pay for a minor accident myself?', 'It can make sense. An insurer can&rsquo;t use one minor at-fault accident in three years against your rate if nobody was hurt, the insurer paid nothing and you paid for the damage, up to $5,000 per vehicle. Ask your insurer first.'],
        ['Can I choose my own tow truck?', 'Yes, except in a restricted tow zone. You choose the company and where your car goes, and you sign a consent form before the tow.'],
        ['What happens if a G2 driver gets in an accident?', 'The collision itself doesn&rsquo;t suspend your licence. A conviction for an offence worth 4 or more demerit points, such as careless driving, brings a 30-day suspension the first time.'],
        ['What happens if you leave the scene of an accident?', 'It&rsquo;s an offence: a fine of $400 to $2,000, up to six months in jail, a suspension of up to two years and 7 demerit points. It can also be a criminal charge.'],
        ['What if the other driver has no insurance?', 'Your policy covers damage to your car up to $25,000, minus the first $300, as long as the owner or driver can be identified.'],
      ],
      related: ['defensive-driving-tips', 'demerit-points-ontario', 'winter-driving-in-hamilton'],
      lessons: lessonsChips(['/driving-lessons-for-nervous-drivers/', 'Nervous drivers'], ['/beginner-driving-lessons/', 'Beginner lessons']),
      cta: ['Feel confident again', 'After a collision, patient lessons at your own pace can help. Call or text to book.'],
    }),
  ];
}
