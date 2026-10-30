// Driving skill guides: the highway, turns, and night and rain. Checked 2026-10-30 against the
// Official MTO Driver's Handbook (freeway driving, changing directions, traffic lights, driving
// along, night and bad weather, particular situations, emergencies), the Highway Traffic Act
// (ss. 62, 141, 144, 147, 154, 159, 168) and O. Reg. 340/94. Paraphrased, never copied.
import { guidePage } from './pages-guides.mjs';
import { callout, inlineCta, quote } from './ui.mjs';
import { review } from './core.mjs';
import { p, ul, ol, h3, table, lessonsChips } from './guide-kit.mjs';

const DATE = '2026-10-30';
const S = {
  hbFreeway: ['Driver&rsquo;s Handbook: freeway driving (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/freeway-driving'],
  hbAlong: ['Driver&rsquo;s Handbook: driving along (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/driving-along'],
  hbDirections: ['Driver&rsquo;s Handbook: changing directions (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/changing-directions'],
  hbLights: ['Driver&rsquo;s Handbook: traffic lights (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/traffic-lights'],
  hbIntersections: ['Driver&rsquo;s Handbook: driving through intersections (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/driving-through-intersections'],
  hbNight: ['Driver&rsquo;s Handbook: driving at night and in bad weather (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/driving-night-and-bad-weather'],
  hbSituations: ['Driver&rsquo;s Handbook: dealing with particular situations (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/dealing-particular-situations'],
  hbEmergencies: ['Driver&rsquo;s Handbook: dealing with emergencies (ontario.ca)', 'https://www.ontario.ca/document/official-mto-drivers-handbook/dealing-emergencies'],
  hta: ['Highway Traffic Act (ontario.ca/laws)', 'https://www.ontario.ca/laws/statute/90h08'],
  reg340: ['O. Reg. 340/94, Drivers&rsquo; Licences, section 5 (ontario.ca/laws)', 'https://www.ontario.ca/laws/regulation/940340'],
  limits110: ['Raising speed limits on Ontario highways (ontario.ca)', 'https://www.ontario.ca/page/raising-speed-limits-ontario-highways'],
  hamStopping: ['Safe stopping and right turns on red (hamilton.ca)', 'https://www.hamilton.ca/home-neighbourhood/getting-around/driving-traffic/vision-zero-roadway-safety/safe-stopping'],
};

export function drivingGuides() {
  return [
    /* ---------- The highway, the first time ---------- */
    guidePage({
      slug: 'how-to-drive-on-the-highway',
      published: DATE, updated: DATE,
      title: 'How to Drive on the Highway for the First Time (Ontario)',
      description: 'Your first highway drive, step by step: merging from the on-ramp, speed and space, lane changes, exits, and what to do if something goes wrong.',
      script: 'skills',
      dek: 'Merging, keeping your space, changing lanes and getting off at the right exit, plus where to start around Hamilton.',
      intro: 'The first highway drive feels like a big jump, mostly because of the speed. In some ways, though, a highway is simpler than a city street: there are no traffic lights, no pedestrians and no left turns across traffic. It comes down to a few skills done calmly: merge, keep your space, change lanes and exit. Here&rsquo;s each one, following Ontario&rsquo;s Driver&rsquo;s Handbook.',
      sections: [
        { id: 'ready', h: 'Before your first highway drive', toc: 'Before you go', html: ul([
            '<strong>Be comfortable in city traffic first.</strong> The Handbook says new drivers should learn to drive with other vehicles around them at low speeds before they try a freeway.',
            '<strong>Know your licence rules.</strong> On a G1 you can only use the 400-series highways and the QEW with a licensed driving instructor. On a G2 you can drive them on your own. The <a href="/guides/g1-licence-rules-ontario/">G1 rules guide</a> lists exactly which roads are which.',
            '<strong>Set your mirrors properly,</strong> so as little as possible hides in your blind spots. The <a href="/guides/how-to-check-your-blind-spot/">blind spot guide</a> shows how.',
            '<strong>Plan the route,</strong> including the exit you want, so you&rsquo;re not reading signs at the last second.',
            '<strong>Pick a quiet time</strong> for the first drive, like a weekend morning, rather than rush hour.',
          ]) },
        { id: 'merge', h: 'Merging onto the highway', toc: 'Merging', html: ol([
            '<strong>Look ahead on the ramp.</strong> Check your mirrors and blind spot to see the traffic you&rsquo;re joining and where you&rsquo;ll fit in.',
            '<strong>Signal as you reach the acceleration lane,</strong> the lane beside the highway that&rsquo;s there for building up speed.',
            '<strong>Speed up to match the traffic.</strong> Merging at the same speed as the cars around you is what makes it smooth. Merging too slowly forces the drivers behind you to brake.',
            '<strong>Pick your gap and shoulder check.</strong> Look over your left shoulder for anyone in your blind spot, then move over smoothly.',
            '<strong>Cancel your signal</strong> and settle into the lane.',
          ]) +
          p('Highway drivers are supposed to move over to make room for merging traffic when it&rsquo;s safe, but don&rsquo;t count on it. A few ramps join on the left, which puts you straight into the fastest lane, so build your speed more quickly there.') },
        { id: 'along', h: 'Speed, space and which lane to use', toc: 'Speed and space', html: p('Once you&rsquo;re on, drive at a steady speed and keep right. The left lanes are for passing, and Ontario law says any vehicle moving slower than the normal speed of traffic should use the right-hand lane where it can.') + ul([
            '<strong>Look far ahead.</strong> At highway speed, look 15 to 20 seconds down the road, as far as you can see, and keep your eyes moving between the road ahead, your mirrors and the sides.',
            '<strong>Keep at least two seconds behind the car ahead.</strong> When it passes a sign or a bridge, count &ldquo;one thousand and one, one thousand and two.&rdquo; If you reach the same spot first, you&rsquo;re too close. Two seconds is the minimum in ideal conditions; leave more in rain, snow or behind a truck.',
            '<strong>Give large trucks room.</strong> They block your view and need more space. On many freeways with three or more lanes each way, trucks can&rsquo;t use the far-left lane.',
            '<strong>Watch the speed limit.</strong> Highway 403 through Hamilton is posted at 100 or 90&nbsp;km/h, and the QEW east of Millen Road in Stoney Creek at 110. The <a href="/guides/ontario-speed-limits-and-speeding-tickets/">speed limits guide</a> covers the rest.',
          ]) },
        { id: 'lanes', h: 'Changing lanes', html: ol([
            'Check your mirrors and decide where you&rsquo;re going.',
            'Signal early, so the drivers around you know.',
            'Shoulder check the blind spot on that side.',
            'Move over gradually, keeping your speed, without cutting in front of anyone.',
            'Cancel your signal.',
          ]) +
          p('Change one lane at a time, and only when it&rsquo;s safe. Ontario&rsquo;s Highway Traffic Act says you can&rsquo;t move from one lane to another until you&rsquo;ve made sure it can be done safely, and the Handbook warns that cutting in front of a faster vehicle is dangerous and illegal.') },
        inlineCta('First highway drive coming up? Call or text Mrs. Akbar to practise it with an instructor.'),
        { id: 'exit', h: 'Getting off at your exit', toc: 'Exiting', html: ol([
            '<strong>Get into the right lane early.</strong> Exit signs come far enough ahead to change lanes safely.',
            '<strong>Signal and move into the exit lane</strong> without slowing down on the highway itself.',
            '<strong>Slow down gradually in the exit lane</strong> to the speed posted for the ramp, and check your speedometer.',
            '<strong>Be ready to stop</strong> at the end of the ramp, where there may be a stop sign, a yield sign or a traffic light.',
          ]) +
          callout('rule', 'Missed your exit?', p('Never stop or back up on the highway. Take the next exit. Driving in reverse on a divided road with a speed limit over 80&nbsp;km/h is illegal, and that includes the shoulder.')) +
          p('After a while at highway speed, 60&nbsp;km/h can feel like walking pace. The Handbook calls this speed adaptation, or velocitization, and it&rsquo;s why you check the speedometer instead of trusting how fast it feels.') },
        { id: 'trouble', h: 'If something goes wrong', toc: 'Breakdowns and emergencies', html: h3('Car trouble') + p('At the first sign of trouble, start pulling over. Don&rsquo;t wait for the car to stall. Check your mirrors, turn on your hazard lights, ease off the gas and get onto the nearest shoulder. Never stop in a driving lane.',
          'If you have to get out, use the door away from traffic, and don&rsquo;t raise the hood. The Handbook&rsquo;s advice is to wait in the car with the doors locked; the Ontario Provincial Police patrol the QEW and the 400-series highways.') +
          h3('An emergency vehicle behind you') + p('Move toward the nearest edge of the road and stop, parallel to it and clear of any ramp. On a highway with more than two lanes each way, that can be the left or right edge, whichever is closer. Don&rsquo;t stop on the shoulder itself, which emergency vehicles may need.') +
          h3('The Move Over law') + p('When you approach an emergency vehicle stopped with red, or red and blue, lights flashing, or a tow truck with amber lights flashing, slow down and pass with caution. With two or more lanes going your way, move into a lane away from it if you can do it safely. A first offence carries a fine of $400 to $2,000.') },
        { id: 'hamilton', h: 'Where to start around Hamilton', toc: 'Hamilton routes', html: p('Hamilton has a natural ladder of fast roads to work up:') + ol([
            '<strong>The Linc</strong> (the Lincoln Alexander Parkway), across the Mountain at 90&nbsp;km/h, from the 403 to the Red Hill.',
            '<strong>The Red Hill Valley Parkway,</strong> mostly 80&nbsp;km/h, with curves through the valley down to the QEW.',
            '<strong>Highway 403,</strong> west through Ancaster and north through the west end, at 100 or 90&nbsp;km/h.',
            '<strong>The QEW</strong> through Stoney Creek, at 100&nbsp;km/h, then 110 east of Millen Road.',
          ]) +
          p('The Linc and the Red Hill aren&rsquo;t on the list of highways closed to G1 drivers, so they&rsquo;re open with a qualified accompanying driver. On a G1, the 403 and the QEW need a licensed driving instructor beside you.') },
        { id: 'nerves', h: 'If the highway makes you nervous', toc: 'Highway nerves', html: p('Plenty of new drivers feel that way, and it gets easier with practice. Start with a short stretch, one exit at a time, at a quiet hour. Stay in the right lane and let faster traffic go by. Breathe out slowly before you merge.',
          'A lesson helps, too: an instructor can talk you through the first merges and choose a stretch of road that suits where you are.') +
          quote(review('Tega Edwin', 'She made every lesson clear', 'explained step-by-step.')) +
          p('There are more ideas in the <a href="/guides/nervous-driver-tips/">nervous driver guide</a>.') },
      ],
      sources: [S.hbFreeway, S.hbAlong, S.hbDirections, S.hbSituations, S.hbEmergencies, S.hta, S.reg340, S.limits110],
      faqs: [
        ['How do you merge onto a highway?', 'Signal in the acceleration lane, speed up to match the traffic, check your mirror and blind spot, and move into a gap smoothly. Merge at the speed of traffic, not below it.'],
        ['How fast should I go on the on-ramp?', 'Follow any speed posted for the ramp itself, then use the acceleration lane to build up to the speed of highway traffic before you merge.'],
        ['What is a safe following distance on the highway?', 'At least two seconds behind the vehicle ahead in ideal conditions, and more in rain, snow or fog, or behind a large truck.'],
        ['Which lane should I drive in on the highway?', 'The right-hand lane, when you can. The left lanes are for passing, and Ontario law says traffic moving slower than the normal speed should keep right.'],
        ['Can a G1 driver drive on the highway in Ontario?', 'Not on 400-series highways or the QEW, unless a licensed driving instructor is beside them. Roads like the Linc and the Red Hill are allowed with a qualified accompanying driver.'],
        ['Can G2 drivers drive on the highway?', 'Yes. A G2 lets you drive on every Ontario road, highways included, on your own.'],
        ['What should I do if I miss my highway exit?', 'Take the next one. Never stop or reverse on the highway: backing up on a divided road with a limit over 80&nbsp;km/h is illegal.'],
        ['What do I do if my car breaks down on the highway?', 'Pull onto the nearest shoulder at the first sign of trouble, turn on your hazard lights, and never stop in a driving lane. If you get out, use the door away from traffic, then wait in the car with the doors locked.'],
        ['Do I have to move over for a tow truck on the highway?', 'Yes. A tow truck stopped with amber lights flashing is covered by the same law as emergency vehicles: slow down, and move into another lane if you can do it safely.'],
        ['How do I stop being scared of highway driving?', 'Start small: one exit at a time, at a quiet hour, staying in the right lane. Practise merging until it feels routine, and consider a lesson so an instructor can talk you through the first drives.'],
      ],
      related: ['g-road-test-tips', 'how-to-check-your-blind-spot', 'defensive-driving-tips'],
      lessons: lessonsChips(['/g-road-test-preparation/', 'G test and highway'], ['/driving-lessons-for-nervous-drivers/', 'Nervous drivers']),
      cta: ['Practise the highway with an instructor', 'Lessons can start on the Linc or the Red Hill and build up to the 403 and the QEW. Call or text to book.'],
    }),

    /* ---------- Left and right turns ---------- */
    guidePage({
      slug: 'how-to-turn-left-and-right',
      published: DATE, updated: DATE,
      title: 'How to Turn Left and Right at an Intersection (Ontario)',
      description: 'Left and right turns step by step: the right lane, signalling, wheels straight while you wait, advance greens and arrows, and turning on a red light in Ontario.',
      script: 'skills',
      dek: 'The lane to start in, the lane to finish in, when to signal, and what every light and arrow means for your turn.',
      intro: 'Turns are part of every road test, and they&rsquo;re where small habits show. The good news is that a safe turn is the same handful of steps every time. Here they are for right turns, left turns, arrows and red lights, following Ontario&rsquo;s Driver&rsquo;s Handbook and the Highway Traffic Act.',
      sections: [
        { id: 'steps', h: 'Every turn, step by step', toc: 'Step by step', html: ol([
            '<strong>Signal early,</strong> well before the turn.',
            '<strong>Check your mirrors and blind spot,</strong> then move into the correct lane when it&rsquo;s clear: the far right lane for a right turn, or the far left lane for your direction for a left turn.',
            '<strong>Slow down before the turn,</strong> and finish braking before you start turning the wheel. The sharper the turn, the slower you go.',
            '<strong>Look left, right and left again,</strong> and check for pedestrians and cyclists.',
            '<strong>Turn smoothly.</strong> For a sharp turn, use hand-over-hand steering: turn the wheel with one hand, cross the other hand over, grip and keep turning.',
            '<strong>Straighten up</strong> by letting the wheel slide back through your hands, then speed up gradually.',
          ]) +
          p('Try not to brake and steer at the same time; the Handbook notes that drivers often lose control by trying to do more than one thing at once. And never turn the wheel with one finger or the flat of your palm.') },
        { id: 'right', h: 'Right turns', html: p('Start and finish close to the right side of the road: from the right-hand lane into the right-hand lane of the street you&rsquo;re entering. If there are no lane markings, keep as far right as you can.') + ul([
            'Check your right blind spot for cyclists before you turn, especially where there&rsquo;s a bike lane.',
            'Let cyclists, mopeds and limited-speed motorcycles go through first.',
            'Yield to pedestrians crossing the road you&rsquo;re turning into.',
            'Where two lanes are marked for right turns, finish in the lane that matches the one you started in.',
          ]) },
        { id: 'left', h: 'Left turns', html: p('Start in the far left lane for your direction, and wait for oncoming traffic and pedestrians to clear before you go. Ontario law says you can&rsquo;t turn left across an approaching vehicle unless its driver has a reasonable chance to avoid a collision.') +
          callout('rule', 'Keep your wheels straight while you wait', p('Don&rsquo;t turn the wheel until you&rsquo;re ready to go. If you&rsquo;re hit from behind with your wheels turned left, your car could be pushed into oncoming traffic.')) +
          h3('Which lane to turn into') +
          table({ caption: 'Left turns: where to start and where to finish', head: ['Turning from', 'Start in', 'Finish in'], rows: [
            ['A two-way road onto a two-way road', 'The lane closest to the centre line', 'The lane just right of the centre line, then move right when you can'],
            ['A two-way road onto a one-way road', 'The lane closest to the centre line', 'The left curb lane'],
            ['A one-way road onto a two-way road', 'The left curb lane', 'The lane just right of the centre line, then move right when you can'],
            ['A one-way road onto a one-way road', 'The left curb lane', 'The left curb lane'],
          ] }) +
          ul([
            'When two drivers facing each other both turn left, each turns to the left of the other.',
            'Where two lanes are marked for left turns, finish in the lane that matches the one you started in.',
            'Behind a cyclist or motorcyclist who&rsquo;s turning left, stay behind and turn after them. Don&rsquo;t pull up beside them.',
          ]) },
        { id: 'lights', h: 'Lights and arrows for turning', toc: 'Lights and arrows', html: table({ caption: 'What turning signals mean in Ontario', head: ['Signal', 'What you can do'], rows: [
            ['Solid green', 'Turn left or right after yielding to pedestrians and to traffic already in the intersection. For a left, wait for a safe gap in oncoming traffic.'],
            ['Flashing green, or a left green arrow with a green light', 'An advance green: turn left, go straight or turn right from the proper lane. Oncoming traffic faces a red.'],
            ['Left green arrow with a red light', 'Turn left from the left-turn lane. Drivers opposite you may be turning left at the same time.'],
            ['Yellow arrow after a green arrow', 'Don&rsquo;t start your turn. Stop if you safely can; if you can&rsquo;t, finish the turn with caution.'],
            ['Solid yellow', 'Stop if you can do it safely; otherwise, go with caution.'],
            ['Red', 'Stop. You may still turn right, or left from one one-way street onto another, after a complete stop.'],
          ] }) +
          p('If you&rsquo;re in the intersection waiting to turn left when the light turns red, complete your turn when it&rsquo;s safe. Where left turns have their own fully protected signal, you can&rsquo;t start a left once your arrow has ended and the through traffic has a green.') },
        inlineCta('Want to practise turns before your road test? Call or text Mrs. Akbar.'),
        { id: 'red', h: 'Turning on a red light in Ontario', toc: 'Turning on red', html: h3('Right turns on red') + p('Unless a sign says otherwise, you can turn right on a red light in Ontario. The rules are strict, though:') + ol([
            'Come to a complete stop at the stop line. If there&rsquo;s no line, stop at the crosswalk; with no crosswalk, at the edge of the sidewalk; with no sidewalk, at the edge of the intersection.',
            'Yield to pedestrians in the crosswalk and to traffic in the intersection.',
            'Turn from the right-hand lane, or from a lane marked for right turns, and only when the way is clear.',
          ]) +
          p('A rolling right on red isn&rsquo;t a legal right on red: the stop has to be complete. Watch for &ldquo;No right turn on red&rdquo; signs. In Hamilton, right turns on red are banned at a number of intersections along Main Street and King Street downtown.') +
          h3('Left turns on red') + p('You can turn left on a red light only from a one-way street onto another one-way street, after a complete stop, yielding to pedestrians and traffic. From or onto a two-way street, a left on red isn&rsquo;t allowed. It comes up wherever two one-way streets meet, so read the signs at each corner; the <a href="/driving-lessons-downtown-hamilton/">downtown Hamilton lessons</a> page covers the city&rsquo;s one-way grid.') },
        { id: 'uturns', h: 'U-turns and turning around', toc: 'U-turns', html: p('Before a U-turn, check for a sign that forbids it. U-turns are illegal on a curve, on or near a railway crossing or a hilltop, and near a bridge or tunnel that blocks your view, and you need to be able to see at least 150 metres both ways.',
          'Often the simplest and safest way to turn around is to drive around the block. Where you can&rsquo;t, a three-point turn may be the answer; the <a href="/guides/how-to-do-a-three-point-turn/">three-point turn guide</a> walks through it.') },
        { id: 'centre-lane', h: 'Two-way left-turn lanes', html: p('Some roads have a centre lane marked for left turns in both directions. To use one:') + ol([
            'Signal and move into the centre lane shortly before your turn, and slow down.',
            'Move forward carefully to a spot opposite the street or driveway you want.',
            'Turn when the way is clear.',
          ]) +
          p('Drivers coming the other way use the same lane, and they can block your view of oncoming traffic, so only go when you&rsquo;re sure. These lanes are never for passing.') },
        { id: 'test', h: 'Turns on the road test', html: p('Examiners look closely at turns on the G2 test. The details they mark include signalling before you slow down, keeping your wheels straight while you wait, not cutting across lane markings or bumping the curb, and finishing in the correct lane. The <a href="/guides/why-people-fail-the-g2-road-test/">G2 mistakes guide</a> has the full list.') +
          quote(review('salami eniola', 'She gives relatable tips to understand the signs and rules of driving.')) },
      ],
      sources: [S.hbDirections, S.hbLights, S.hbIntersections, S.hta, S.hamStopping],
      faqs: [
        ['Can you turn right on a red light in Ontario?', 'Yes, unless a sign forbids it. Come to a complete stop first, yield to pedestrians and traffic, and turn only when the way is clear.'],
        ['Can you turn left on a red light in Ontario?', 'Only from a one-way street onto another one-way street, after a complete stop and yielding to pedestrians and traffic.'],
        ['Can you turn right on red from the second lane?', 'Only if that lane is marked for right turns. Otherwise, right turns are made from the right-hand lane.'],
        ['What does a flashing green light mean in Ontario?', 'It&rsquo;s an advance green: you can turn left, go straight or turn right from the proper lane while oncoming traffic faces a red.'],
        ['What if the light turns red while I&rsquo;m waiting to turn left?', 'If you&rsquo;re already in the intersection, complete your turn when it&rsquo;s safe to do so.'],
        ['Which lane should I turn into?', 'For a right turn, the right-hand lane of the new road. For a left turn, the lane just right of the centre line, or the left curb lane if you&rsquo;re turning onto a one-way street.'],
        ['When should I signal for a turn?', 'Well before the turn, and before you start slowing down, so the drivers around you know what you&rsquo;re about to do.'],
        ['Are U-turns legal in Ontario?', 'Where there&rsquo;s no sign against it and you can see at least 150 metres both ways. They&rsquo;re illegal on curves, on or near railway crossings and hilltops, and near bridges or tunnels that block your view.'],
      ],
      related: ['right-of-way-rules-ontario', 'how-to-drive-a-roundabout', 'why-people-fail-the-g2-road-test'],
      lessons: lessonsChips(['/beginner-driving-lessons/', 'Beginner lessons'], ['/g2-road-test-preparation/', 'G2 road test prep']),
      cta: ['Make turns automatic', 'Tell her which turns feel shaky, and that&rsquo;s where the lesson starts.'],
    }),

    /* ---------- Night and rain ---------- */
    guidePage({
      slug: 'driving-at-night-and-in-the-rain',
      published: DATE, updated: DATE,
      title: 'Driving at Night and in the Rain: Tips for New Drivers',
      description: 'How to drive safely at night and in rain or fog: when headlights are required, high beams, glare, hydroplaning, following distance and drowsy driving.',
      script: 'skills',
      dek: 'Headlights, glare, rain, fog and tiredness: what changes when you can&rsquo;t see as far, and how to stay in control.',
      intro: 'At night and in bad weather you simply can&rsquo;t see as far, even with your headlights on. Almost everything in this guide comes back to that: slow down, leave more space, and make sure other drivers can see you. Here&rsquo;s how, following Ontario&rsquo;s Driver&rsquo;s Handbook and the Highway Traffic Act.',
      sections: [
        { id: 'lights', h: 'When your headlights must be on', toc: 'Headlights', html: p('Ontario law requires your lights from half an hour before sunset to half an hour after sunrise, and at any other time you can&rsquo;t clearly see people and vehicles 150 metres away, such as in rain, snow or fog.') +
          callout('tip', 'Make sure your lights are really on', p('Automatic lights are common, but don&rsquo;t assume. Whenever the law requires lights, check that your headlights and your tail lights are on, including in daytime rain and fog.')) +
          h3('High beams') + p('High beams help on dark roads, but switch to low beams within 150 metres of an oncoming vehicle, and whenever you&rsquo;re following another vehicle within 60 metres. On country roads, switch to low beams at curves and hilltops so you don&rsquo;t blind drivers you can&rsquo;t see yet, then switch back once the road is clear.') },
        { id: 'night', h: 'Driving at night', toc: 'At night', html: ul([
            '<strong>Don&rsquo;t overdrive your headlights.</strong> If your stopping distance is longer than you can see, you can&rsquo;t stop in time for what appears in your lights. Reflective signs can make you think you see farther than you really do.',
            '<strong>Handle glare.</strong> When oncoming headlights are bright, look up, beyond and slightly to the right of them. Don&rsquo;t stare into them.',
            '<strong>Keep your glass clean,</strong> inside and out. A dirty windshield makes glare much worse.',
            '<strong>Watch the edges of the road</strong> for pedestrians, cyclists and animals. Wild animals are most active from dusk to dawn.',
            '<strong>Know the rules for your licence.</strong> G1 drivers can&rsquo;t drive between midnight and 5&nbsp;a.m., and G2 drivers aged 19 or under have a passenger limit at those hours. The <a href="/guides/g1-licence-rules-ontario/">G1 rules</a> and <a href="/guides/g2-licence-rules-ontario/">G2 rules</a> guides explain both.',
          ]) },
        { id: 'rain', h: 'Driving in the rain', toc: 'In the rain', html: p('Rain makes roads slippery, especially in the first few minutes, as the first drops fall. It also cuts how far you can see. So:') + ul([
            '<strong>Slow down</strong> enough to stop within the distance you can see.',
            '<strong>Leave more space.</strong> The two-second rule is a minimum for ideal conditions; in rain, leave more. It also keeps you out of the spray from the car ahead.',
            '<strong>Be smooth.</strong> Gentle steering, braking and accelerating reduce the chance of a skid.',
            '<strong>Turn your lights on</strong> whenever you can&rsquo;t clearly see 150 metres ahead.',
            '<strong>Keep your wipers in good shape.</strong> If they streak, replace them.',
            '<strong>Avoid puddles.</strong> They can hide potholes, spray pedestrians and other drivers, stall your engine and make your brakes less effective.',
            '<strong>Stay off flooded roads.</strong> If you have to drive through water, test your brakes afterwards: when it&rsquo;s safe, brake firmly at 50&nbsp;km/h and check that the car stops straight and the pedal feels firm.',
          ]) },
        { id: 'skids', h: 'Hydroplaning and skids', html: p('With too much water on the road or too much speed, your tires can ride up on the water like water skis. That&rsquo;s hydroplaning, and it makes steering and braking very hard. Good tires with deep tread, and a lower speed in the wet, are the best prevention.') +
          h3('If you start to skid') + ol([
            'Don&rsquo;t panic. Ease off the gas or the brake.',
            'Keep steering where you want the car to go, without oversteering.',
            'Once you&rsquo;re back in control, brake gently if you need to.',
          ]) +
          h3('Braking hard in an emergency') + p('With anti-lock brakes (ABS), press the pedal hard and hold it; don&rsquo;t pump it. The pedal may pulse under your foot, and that&rsquo;s normal. ABS helps you keep steering, but it doesn&rsquo;t shorten your stopping distance. In a car without ABS, use threshold braking: brake hard until a wheel starts to lock, ease off slightly, and keep firm pressure without pumping.') },
        inlineCta('Nervous about driving in the dark or the rain? Call or text Mrs. Akbar.'),
        { id: 'fog', h: 'Fog', html: p('The best plan in fog is not to drive in it: check the forecast, and if there&rsquo;s a fog warning, wait for it to clear. If you get caught in it:') + ul([
            'Slow down gradually, with your full lighting system on and your low beams. High beams reflect off the fog and make it harder to see.',
            'Use your fog lights too, if your car has them.',
            'Follow the right edge of the road rather than the centre line, and leave extra following distance.',
            'Avoid passing, changing lanes and crossing traffic.',
            'Don&rsquo;t stop on the road. If it&rsquo;s too thick to go on, pull completely off into a safe place, and turn on your hazard lights as well as your low beams.',
            'Don&rsquo;t speed up suddenly, even if it seems to be clearing. You may drive straight back into it.',
          ]) },
        { id: 'tired', h: 'Drowsy driving', html: p('Tired drivers react more slowly and can be as impaired as drunk drivers. Collisions involving drowsiness tend to happen late at night and early in the morning, between 2 and 6&nbsp;a.m., and in the afternoon, between 2 and 4&nbsp;p.m. Warning signs include:') + ul([
            'trouble keeping your eyes open, or your head nodding forward',
            'yawning again and again',
            'not remembering the last few kilometres',
            'missing traffic lights and signs',
            'drifting into the next lane, or off the road',
          ]) +
          p('If you notice any of them, pull off somewhere safe and well lit and take a nap. Coffee, loud music and an open window only help for a short time. Sleep is the only fix.') },
        { id: 'lights-out', h: 'If your headlights fail', html: p('Check the switch first. If they stay out, turn on your hazard lights, stop safely off the road and call for help. Driving at night without lights is dangerous and illegal.') },
        { id: 'daylight', h: 'Practise in daylight first', html: p('Some roads are worth learning in good conditions before you drive them at night or in the rain. Around Hamilton, parts of Airport Road and Glancaster Road near Mount Hope have no street lights, and the <a href="/guides/driving-the-hamilton-mountain-accesses/">Mountain accesses</a> are steep and curved. For snow and ice, see the <a href="/guides/winter-driving-in-hamilton/">winter driving guide</a>.') +
          quote(review('Mila Alieva', 'With your guidance and patience you taught me the skills to become a safe driver.')) },
      ],
      sources: [S.hbNight, S.hbAlong, S.hbSituations, S.hbEmergencies, S.hta, S.reg340],
      faqs: [
        ['When do you have to turn on your headlights in Ontario?', 'From half an hour before sunset to half an hour after sunrise, and any time you can&rsquo;t clearly see people and vehicles 150 metres away, such as in rain, snow or fog.'],
        ['When do you have to dim your high beams?', 'Within 150 metres of an oncoming vehicle, and when you&rsquo;re following another vehicle within 60 metres.'],
        ['How do I avoid being blinded by oncoming headlights?', 'Look up, beyond and slightly to the right of the oncoming lights, and keep your windshield clean inside and out.'],
        ['What should I do if my car hydroplanes?', 'Ease off the gas, don&rsquo;t brake hard, and keep steering where you want to go until the tires grip again. Slowing down in heavy rain is the best prevention.'],
        ['How much following distance should I leave in the rain?', 'More than the two-second minimum, which only applies in ideal conditions. Extra space also keeps you out of the spray from the car ahead.'],
        ['Should I use high beams in fog?', 'No. High beams reflect off the fog and make it harder to see. Use low beams, plus fog lights if you have them.'],
        ['Is night driving allowed on a G1 or a G2?', 'On a G1, until midnight: there&rsquo;s no driving between midnight and 5&nbsp;a.m. A G2 can drive at any hour, but drivers aged 19 or under have a passenger limit between midnight and 5&nbsp;a.m.'],
        ['Is it safe to drive through a flooded road?', 'Avoid it, because water can stop your brakes from working properly. If you have to, test your brakes afterwards by braking firmly at 50&nbsp;km/h when it&rsquo;s safe.'],
        ['What should I do if my headlights stop working at night?', 'Check the switch, then turn on your hazard lights, stop safely off the road and call for help.'],
      ],
      related: ['winter-driving-in-hamilton', 'defensive-driving-tips', 'how-to-drive-on-the-highway'],
      lessons: lessonsChips(['/driving-lessons-for-nervous-drivers/', 'Nervous drivers'], ['/beginner-driving-lessons/', 'Beginner lessons']),
      cta: ['Practise with someone calm beside you', 'Tell her what worries you about driving in the dark or the rain, and the lesson can work on it.'],
    }),
  ];
}
